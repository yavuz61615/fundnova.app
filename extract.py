import re
import codecs
from googletrans import Translator
import time
import json
import traceback

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

    valid_strings = []
    for s in all_strings:
        s = s.strip()
        if len(s) < 3: continue
        if re.match(r'^[\d\s\W]+$', s): continue
        if 'className' in s or '=>' in s or 'return' in s or 'import' in s: continue
        if '{' in s or '}' in s: continue
        if s in ['Home', 'Debt-Based', 'Equity-Based']: continue
        valid_strings.append(s)

    # Sort by length descending to replace longer strings first to avoid substring replacements
    valid_strings.sort(key=len, reverse=True)

    print(f'Found {len(valid_strings)} valid strings to translate.')

    with codecs.open(r'c:\Users\Yavuz Selim\Desktop\kursodev\strings_to_translate.json', 'w', 'utf-8') as f:
        json.dump(valid_strings, f, ensure_ascii=False, indent=2)

except Exception as e:
    traceback.print_exc()
