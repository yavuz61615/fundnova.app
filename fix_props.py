import codecs
import re
app_path = r'c:\Users\Yavuz Selim\Desktop\kursodev\src\App.jsx'
with codecs.open(app_path, 'r', 'utf-8') as f:
    content = f.read()

# Fix unbraced t('...') in JSX props:
# alt=t('dynamic.k178') -> alt={t('dynamic.k178')}
content = re.sub(r'([a-zA-Z0-9_]+)=t\(([\'\"].*?[\'\"])\)', r'\1={t(\2)}', content)

# Fix double braces if any
content = content.replace('{{t(', '{t(').replace('))}}', ')}}')

with codecs.open(app_path, 'w', 'utf-8') as f:
    f.write(content)
