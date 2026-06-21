import codecs

app_path = r'c:\Users\Yavuz Selim\Desktop\kursodev\src\App.jsx'
with codecs.open(app_path, 'r', 'utf-8') as f:
    content = f.read()

content = content.replace(r"\'", "'")

with codecs.open(app_path, 'w', 'utf-8') as f:
    f.write(content)
