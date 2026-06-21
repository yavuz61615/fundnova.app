import codecs
import json
import re
import time
from deep_translator import GoogleTranslator

app_path = r'c:\Users\Yavuz Selim\Desktop\kursodev\src\App.jsx'
locales_path = r'c:\Users\Yavuz Selim\Desktop\kursodev\src\locales.js'
try:
    with codecs.open(app_path, 'r', 'utf-8') as f:
        content = f.read()

    # 1. Find all JSX text nodes
    texts = re.findall(r'>([^<A-Za-z0-9{}]*[a-zA-ZçğıöşüÇĞİÖŞÜ0-9][^<]*?)<', content)

    # 2. Find all placeholder='...'
    placeholders = re.findall(r'placeholder=\"([^\"]+)\"', content)

    # 3. Find strings in data arrays like name: '...', desc: '...'
    data_strings = re.findall(r'(?:desc|title|name|company):\s*[\'\"]([^\'\"]+)[\'\"]', content)

    # Combine and filter
    all_strings = set([t.strip() for t in texts] + placeholders + data_strings)

    strings = []
    for s in all_strings:
        s = s.strip()
        if len(s) < 3: continue
        if re.match(r'^[\d\s\W]+$', s): continue
        if 'className' in s or '=>' in s or 'return' in s or 'import' in s: continue
        if '{' in s or '}' in s: continue
        if s in ['Home', 'Debt-Based', 'Equity-Based']: continue
        strings.append(s)

    # Sort strings by length descending
    strings.sort(key=len, reverse=True)
except Exception as e:
    print("Error extracting:", e)
    exit(1)

from deep_translator import GoogleTranslator
from concurrent.futures import ThreadPoolExecutor

langs = ['en']
translations = {'tr': {}, 'en': {}}

# Map string to key
string_to_key = {}
for i, s in enumerate(strings):
    key = f'k{i}'
    string_to_key[s] = key
    translations['tr'][key] = s

print(f"Translating {len(strings)} strings to English...")

def translate_str(s, i):
    try:
        translator = GoogleTranslator(source='tr', target='en')
        res = translator.translate(s)
        return f'k{i}', res
    except Exception as e:
        return f'k{i}', s

with ThreadPoolExecutor(max_workers=10) as executor:
    futures = []
    for i, s in enumerate(strings):
        futures.append(executor.submit(translate_str, s, i))
            
    for future in futures:
        key, res = future.result()
        translations['en'][key] = res

print("Translations complete. Updating App.jsx...")

with codecs.open(app_path, 'r', 'utf-8') as f:
    app_content = f.read()

def replace_in_jsx(content, s, key):
    escaped_s = re.escape(s)
    content = re.sub(r'>(\s*)' + escaped_s + r'(\s*)<', r'>\g<1>{t(\'dynamic.' + key + r'\')}\g<2><', content)
    content = re.sub(r'([\'\"])' + escaped_s + r'([\'\"])', r"t('dynamic." + key + r"')", content)
    return content

for s, key in string_to_key.items():
    app_content = replace_in_jsx(app_content, s, key)

with codecs.open(app_path, 'w', 'utf-8') as f:
    f.write(app_content)

print("App.jsx updated. Updating locales.js...")

locales_path = r'c:\Users\Yavuz Selim\Desktop\kursodev\src\locales.js'
import json

append_text = "\n\n/* ── AUTO GENERATED DYNAMIC TRANSLATIONS ── */\n"
append_text += f"tr.dynamic = {json.dumps(translations['tr'], ensure_ascii=False, indent=2)};\n"
append_text += f"en.dynamic = {json.dumps(translations['en'], ensure_ascii=False, indent=2)};\n"

with codecs.open(locales_path, 'a', 'utf-8') as f:
    f.write(append_text)

print("locales.js updated. Success!")
