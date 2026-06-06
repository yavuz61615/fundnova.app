# FundNova — Antigravity Deployment Guide

## Proje Özeti

FundNova, İslami finans prensiplerine tam uyumlu bir hibrid kitle fonlama platformudur.  
Stack: **React 19 + Vite + Tailwind CSS v3 + lucide-react + react-i18next + react-router-dom**

---

## Klasör Yapısı

```
fundnova/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── App.css
    ├── index.css
    ├── i18n.js
    ├── assets/
    │   └── hero.png
    ├── components/
    │   ├── Navbar.jsx
    │   ├── Hero.jsx
    │   ├── CrowdfundingOptions.jsx
    │   └── Footer.jsx
    ├── pages/
    │   ├── Home.jsx
    │   ├── Explore.jsx
    │   ├── SecondaryMarket.jsx
    │   ├── Register.jsx
    │   └── About.jsx
    └── locales/
        ├── tr/translation.json
        ├── en/translation.json
        ├── ar/translation.json
        ├── fr/translation.json
        ├── ms/translation.json
        ├── ru/translation.json
        └── ur/translation.json
```

---

## Dosya İçerikleri

### `package.json`

```json
{
  "name": "fundnova",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "i18next": "^26.3.0",
    "lucide-react": "^1.16.0",
    "react": "^19.2.6",
    "react-dom": "^19.2.6",
    "react-i18next": "^17.0.8",
    "react-router-dom": "^7.15.1"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^6.0.1",
    "autoprefixer": "^10.5.0",
    "postcss": "^8.5.15",
    "tailwindcss": "^3.4.19",
    "vite": "^8.0.12"
  }
}
```

---

### `index.html`

```html
<!doctype html>
<html lang="tr">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>FundNova — Faizsiz Kitle Fonlama</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

---

### `vite.config.js`

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    strictPort: true
  }
})
```

---

### `tailwind.config.js`

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        emerald: { 950: '#022c22' },
        navy: {
          900: '#0c1a2e',
          800: '#0f2a44',
          700: '#153654',
        }
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
```

---

### `postcss.config.js`

```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

---

### `src/main.jsx`

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import './i18n.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
```

---

### `src/i18n.js`

```js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import tr from './locales/tr/translation.json';
import en from './locales/en/translation.json';
import ar from './locales/ar/translation.json';
import fr from './locales/fr/translation.json';
import ms from './locales/ms/translation.json';
import ru from './locales/ru/translation.json';
import ur from './locales/ur/translation.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      tr: { translation: tr },
      en: { translation: en },
      ar: { translation: ar },
      fr: { translation: fr },
      ms: { translation: ms },
      ru: { translation: ru },
      ur: { translation: ur },
    },
    lng: 'tr',
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });

export default i18n;
```

> **Not:** `i18next-browser-languagedetector` paketini ekleyin:
> ```bash
> npm install i18next-browser-languagedetector
> ```

---

### `src/index.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --color-primary: #059669;
  --color-primary-dark: #065f46;
  --color-primary-light: #d1fae5;
  --color-bg-main: #f8fafc;
  --color-bg-card: #ffffff;
  --color-border: #e2e8f0;
  --color-text-main: #1e293b;
  --color-text-muted: #64748b;
  --transition-smooth: all 0.2s ease;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  background-color: var(--color-bg-main);
  color: var(--color-text-main);
  line-height: 1.6;
}

.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.glass {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--color-border);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  border: none;
  transition: var(--transition-smooth);
  text-decoration: none;
}

.btn-primary {
  background-color: var(--color-primary);
  color: white;
}

.btn-primary:hover {
  background-color: var(--color-primary-dark);
  transform: translateY(-1px);
  box-shadow: 0 4px 16px rgba(5, 150, 105, 0.3);
}

.btn-outline {
  background: transparent;
  color: var(--color-primary);
  border: 2px solid var(--color-primary);
}

.btn-outline:hover {
  background: var(--color-primary-light);
}

@keyframes slide-up {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

.animate-slide-up {
  animation: slide-up 0.4s ease forwards;
}
```

---

### `src/App.css`

```css
/* App.css — Ek stiller (isteğe bağlı) */
#root {
  min-height: 100vh;
}
```

---

### `src/App.jsx`

```jsx
import React, { useState } from 'react';
import {
  ShieldCheck, Globe, Info, User, Activity, Users, LineChart,
  Building2, ArrowUpRight, ArrowRightLeft, HeartHandshake, Heart
} from 'lucide-react';

export default function HybridFundPlatform() {
  const [activeTab, setActiveTab] = useState('home');

  /* ── HEADER ── */
  const Header = () => (
    <header className="bg-white/90 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <div className="flex items-center cursor-pointer group" onClick={() => setActiveTab('home')}>
            <div className="w-9 h-9 bg-emerald-700 rounded-xl flex items-center justify-center mr-3 group-hover:bg-emerald-600 transition-colors shadow-sm">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-black text-slate-800 tracking-tight group-hover:text-emerald-700 transition-colors">
              FundNova
            </span>
          </div>

          {/* Nav */}
          <nav className="hidden lg:flex space-x-1">
            {[
              { id: 'home',     label: 'Ana Sayfa'    },
              { id: 'debt',     label: 'Borca Dayalı' },
              { id: 'equity',   label: 'Hisseye Dayalı' },
              { id: 'charity',  label: 'STK & Bağış'  },
              { id: 'exchange', label: 'İkincil Piyasa' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-emerald-50 text-emerald-700 shadow-sm ring-1 ring-emerald-500/20'
                    : 'text-slate-600 hover:text-emerald-700 hover:bg-slate-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            <button className="flex items-center px-3 py-2 rounded-lg text-slate-600 hover:text-emerald-700 hover:bg-slate-50 text-sm font-semibold transition-colors border border-transparent hover:border-slate-200">
              <Globe className="w-4 h-4 mr-1.5" /> TR
            </button>
            <button className="hidden md:flex items-center px-3 py-2 rounded-lg text-slate-600 hover:text-emerald-700 hover:bg-slate-50 text-sm font-semibold transition-colors">
              <Info className="w-4 h-4 mr-1.5" /> Hakkımızda
            </button>
            <button className="bg-emerald-700 hover:bg-emerald-800 text-white px-5 py-2.5 rounded-lg text-sm font-bold flex items-center transition-all shadow-md shadow-emerald-700/20 hover:shadow-emerald-700/40 transform hover:-translate-y-0.5">
              <User className="w-4 h-4 mr-2" /> Kayıt Ol
            </button>
          </div>
        </div>
      </div>
    </header>
  );

  /* ── HOME TAB ── */
  const HomeTab = () => (
    <div className="animate-in fade-in duration-500 fade-in-0 slide-in-from-bottom-4">
      {/* Hero */}
      <div className="bg-slate-900 text-white py-24 px-4 sm:px-6 lg:px-8 rounded-b-[2.5rem] mb-12 max-w-7xl mx-auto shadow-2xl border-t-4 border-emerald-500 relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-3xl relative z-10">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-bold bg-emerald-500/10 text-emerald-400 mb-8 border border-emerald-500/20 backdrop-blur-sm shadow-sm">
            <ShieldCheck className="w-4 h-4 mr-2" /> İslami Finans Prensiplerine Tam Uyumlu
          </span>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-8 leading-[1.1]">
            Geleceğin Finansmanı <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">
              Tek Platformda.
            </span>
          </h1>
          <p className="text-xl text-slate-300 mb-10 max-w-2xl leading-relaxed font-medium">
            Sukuk, Murabaha, Girişim Sermayesi ve STK Bağış modellerini harmanlayan, küresel ve faizsiz kitle fonlama ekosistemi.
          </p>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setActiveTab('debt')}
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-4 rounded-xl font-bold flex items-center shadow-lg shadow-emerald-900/40 transition-all hover:-translate-y-1 text-lg"
            >
              Projeleri Keşfet <ArrowUpRight className="ml-2 w-5 h-5" />
            </button>
            <button
              onClick={() => setActiveTab('exchange')}
              className="bg-slate-800/80 backdrop-blur-md hover:bg-slate-700 text-white px-8 py-4 rounded-xl font-bold flex items-center border border-slate-600 hover:border-slate-500 transition-all hover:-translate-y-1 text-lg"
            >
              <LineChart className="w-5 h-5 mr-3 text-emerald-400" /> İkincil Piyasa
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: 'Toplam Fonlama',   value: '$45M+',   icon: <Activity  className="text-emerald-600 w-7 h-7" /> },
            { label: 'Aktif Proje',      value: '350+',    icon: <Building2 className="text-emerald-600 w-7 h-7" /> },
            { label: 'Kayıtlı Kullanıcı',value: '85.000+', icon: <Users    className="text-emerald-600 w-7 h-7" /> },
            { label: 'Desteklenen Ülke', value: '12',      icon: <Globe     className="text-emerald-600 w-7 h-7" /> },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
              <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-emerald-600 transition-colors duration-300">
                {React.cloneElement(stat.icon, { className: 'w-7 h-7 text-emerald-600 group-hover:text-white transition-colors' })}
              </div>
              <h3 className="text-4xl font-black text-slate-800 mb-2">{stat.value}</h3>
              <p className="text-slate-500 font-semibold">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  /* ── DEBT TAB ── */
  const DebtTab = () => (
    <div className="max-w-7xl mx-auto px-4 py-12 animate-in fade-in duration-500 slide-in-from-bottom-4">
      <div className="mb-10 text-center max-w-3xl mx-auto">
        <h2 className="text-4xl font-black text-slate-900 mb-4">Borca Dayalı Finansman</h2>
        <p className="text-slate-500 text-lg font-medium">KOBİ ve Kurumsal şirketlerin İslami prensiplere tam uyumlu, sabit getirili yatırım projeleri.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* İcara Sukuk */}
        <div className="bg-white rounded-[2rem] shadow-sm border border-slate-200 overflow-hidden flex flex-col hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
          <div className="relative h-64 overflow-hidden">
            <img src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1470" alt="Lojistik" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute top-4 left-4 bg-amber-500/90 backdrop-blur-sm text-white px-4 py-1.5 rounded-lg font-bold text-sm shadow-lg border border-amber-400/50">
              İcara Sukuk
            </div>
          </div>
          <div className="p-8 flex-1 flex flex-col">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1 block">LogiSpeed A.Ş.</span>
            <h3 className="text-2xl font-black text-slate-900 leading-tight mb-4">Körfez Lojistik Filo Büyümesi</h3>
            <p className="text-slate-500 mb-8 flex-1 leading-relaxed">Genişleyen operasyonlar için yeni ticari araç alımı finansmanı. Düzenli kira sertifikası ödemeleri.</p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex flex-col items-center text-center">
                <span className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Beklenen Getiri</span>
                <span className="text-2xl font-black text-emerald-600">%14.5<span className="text-sm ml-1">/ Yıl</span></span>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex flex-col items-center text-center">
                <span className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Risk & Pd</span>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-black text-slate-800">A-</span>
                  <span className="text-sm font-bold text-slate-400 bg-slate-200 px-2 py-0.5 rounded-md">%1.2</span>
                </div>
              </div>
            </div>
            <div className="mb-8">
              <div className="flex justify-between text-sm mb-3">
                <span className="text-slate-600 font-bold">Toplanan Fon</span>
                <span className="font-bold text-slate-900">$125,000 <span className="text-slate-400 font-medium">/ $150,000</span></span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden border border-slate-200">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: '83%' }} />
              </div>
            </div>
            <button className="w-full bg-slate-900 text-white py-4 rounded-xl text-base font-bold hover:bg-slate-800 transition-colors shadow-lg">
              Projeyi İncele ve Yatırım Yap
            </button>
          </div>
        </div>

        {/* Emtia Murabaha */}
        <div className="bg-white rounded-[2rem] shadow-sm border border-slate-200 overflow-hidden flex flex-col hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
          <div className="relative h-64 overflow-hidden">
            <img src="https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1472" alt="Enerji" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute top-4 left-4 bg-emerald-600/90 backdrop-blur-sm text-white px-4 py-1.5 rounded-lg font-bold text-sm shadow-lg border border-emerald-500/50">
              Emtia Murabaha
            </div>
          </div>
          <div className="p-8 flex-1 flex flex-col">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1 block">GreenEnergy Ltd.</span>
            <h3 className="text-2xl font-black text-slate-900 leading-tight mb-4">Güneş Paneli Ekipman Alımı</h3>
            <p className="text-slate-500 mb-8 flex-1 leading-relaxed">Yenilenebilir enerji santrali kurulumu için hammadde ve peşin panel alım finansmanı.</p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex flex-col items-center text-center">
                <span className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Beklenen Getiri</span>
                <span className="text-2xl font-black text-emerald-600">%16.0<span className="text-sm ml-1">/ Yıl</span></span>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex flex-col items-center text-center">
                <span className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Risk & Pd</span>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-black text-slate-800">B+</span>
                  <span className="text-sm font-bold text-slate-400 bg-slate-200 px-2 py-0.5 rounded-md">%3.5</span>
                </div>
              </div>
            </div>
            <div className="mb-8">
              <div className="flex justify-between text-sm mb-3">
                <span className="text-slate-600 font-bold">Toplanan Fon</span>
                <span className="font-bold text-slate-900">$45,000 <span className="text-slate-400 font-medium">/ $100,000</span></span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden border border-slate-200">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: '45%' }} />
              </div>
            </div>
            <button className="w-full bg-slate-900 text-white py-4 rounded-xl text-base font-bold hover:bg-slate-800 transition-colors shadow-lg">
              Projeyi İncele ve Yatırım Yap
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  /* ── EQUITY TAB ── */
  const EquityTab = () => (
    <div className="max-w-7xl mx-auto px-4 py-12 animate-in fade-in duration-500 slide-in-from-bottom-4">
      <div className="mb-10 text-center max-w-3xl mx-auto">
        <h2 className="text-4xl font-black text-slate-900 mb-4">Girişim Sermayesi (Hisse)</h2>
        <p className="text-slate-500 text-lg font-medium">İnovatif teknoloji girişimlerinin büyüme yolculuğuna ortak olun.</p>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-[2rem] shadow-sm border border-slate-200 overflow-hidden flex flex-col md:flex-row hover:shadow-2xl transition-all duration-300 group">
          <div className="md:w-5/12 relative h-72 md:h-auto overflow-hidden">
            <img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1370" alt="Fintech" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute top-4 left-4 bg-slate-900/90 backdrop-blur-sm text-white px-4 py-1.5 rounded-lg font-bold text-sm shadow-lg border border-slate-700">
              FinTech / Z Kuşağı
            </div>
          </div>
          <div className="p-8 md:p-10 md:w-7/12 flex flex-col justify-center">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 mb-2 block">Seri A Yatırım Turu</span>
            <h3 className="text-3xl font-black text-slate-900 mb-4 leading-tight">PayTech İslami Cüzdan</h3>
            <p className="text-slate-500 text-base mb-8 leading-relaxed">
              Z kuşağı için özel olarak tasarlanmış, sıfır faizli, akıllı harcama ve dijital birikim uygulaması. Lansmanından bu yana 100 bin aktif kullanıcıya ulaştı ve aylık işlem hacmi %35 büyüyor.
            </p>
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 flex flex-col">
                <span className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">Şirket Değerlemesi</span>
                <span className="text-3xl font-black text-slate-800">$12.5M</span>
              </div>
              <div className="bg-emerald-50 p-5 rounded-2xl border border-emerald-100 flex flex-col">
                <span className="text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">Arz Edilen Hisse</span>
                <span className="text-3xl font-black text-emerald-600">%8.5</span>
              </div>
            </div>
            <div className="mb-8">
              <div className="flex justify-between text-sm mb-3">
                <span className="text-slate-600 font-bold">Toplanan Fon</span>
                <span className="font-bold text-slate-900">$820,000 <span className="text-slate-400 font-medium">/ $1,062,500</span></span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden border border-slate-200">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: '77%' }} />
              </div>
            </div>
            <button className="w-full bg-slate-900 text-white py-4 rounded-xl text-base font-bold hover:bg-slate-800 transition-colors shadow-lg">
              Yatırım Turuna Katıl
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  /* ── CHARITY TAB ── */
  const CharityTab = () => (
    <div className="max-w-7xl mx-auto px-4 py-12 animate-in fade-in duration-500 slide-in-from-bottom-4">
      <div className="mb-10 text-center max-w-3xl mx-auto">
        <h2 className="text-4xl font-black text-slate-900 mb-4">STK & Bağış Kampanyaları</h2>
        <p className="text-slate-500 text-lg font-medium">Zekat, Sadaka-i Cariye ve acil insani yardım projelerine güvenle destek olun.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Su Kuyusu */}
        <div className="bg-white rounded-[2rem] shadow-sm border border-slate-200 overflow-hidden flex flex-col hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
          <div className="relative h-64 overflow-hidden">
            <img src="https://images.unsplash.com/photo-1508847154043-be5407fcaa5a?q=80&w=1374" alt="Su Kuyusu" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute top-4 left-4 bg-teal-500/90 backdrop-blur-sm text-white px-4 py-1.5 rounded-lg font-bold text-sm shadow-lg border border-teal-400/50 flex items-center">
              <Heart className="w-4 h-4 mr-2" /> Sadaka-i Cariye
            </div>
          </div>
          <div className="p-8 flex-1 flex flex-col">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1 block">İHH İnsani Yardım Vakfı</span>
            <h3 className="text-2xl font-black text-slate-900 leading-tight mb-4">Afrika Su Kuyusu Projesi</h3>
            <p className="text-slate-500 mb-6 flex-1 leading-relaxed">Kuraklık yaşanan 3 farklı köyde sürdürülebilir ve güneş enerjisi ile çalışan derin su kuyusu inşası.</p>
            <div className="flex items-center gap-2 mb-6 bg-slate-50 p-3 rounded-xl border border-slate-100">
              <Users className="text-emerald-600 w-5 h-5" />
              <span className="text-sm font-semibold text-slate-700"><span className="text-emerald-700 font-bold">1,452</span> hayırsever bağış yaptı</span>
            </div>
            <div className="mb-8">
              <div className="flex justify-between text-sm mb-3">
                <span className="text-slate-600 font-bold">Toplanan Bağış</span>
                <span className="font-bold text-slate-900">$60,000 <span className="text-slate-400 font-medium">/ $75,000</span></span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden border border-slate-200">
                <div className="bg-teal-500 h-full rounded-full" style={{ width: '80%' }} />
              </div>
            </div>
            <button className="w-full bg-teal-600 text-white py-4 rounded-xl text-base font-bold hover:bg-teal-700 transition-colors shadow-lg shadow-teal-600/30 flex justify-center items-center">
              <HeartHandshake className="w-5 h-5 mr-2" /> Şimdi Bağış Yap
            </button>
          </div>
        </div>

        {/* Gıda Yardımı */}
        <div className="bg-white rounded-[2rem] shadow-sm border border-slate-200 overflow-hidden flex flex-col hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
          <div className="relative h-64 overflow-hidden">
            <img src="https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?q=80&w=1470" alt="Gıda Yardımı" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute top-4 left-4 bg-emerald-600/90 backdrop-blur-sm text-white px-4 py-1.5 rounded-lg font-bold text-sm shadow-lg border border-emerald-500/50 flex items-center">
              <Heart className="w-4 h-4 mr-2 fill-emerald-100" /> Zekata Uygun
            </div>
          </div>
          <div className="p-8 flex-1 flex flex-col">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1 block">Cansuyu Derneği</span>
            <h3 className="text-2xl font-black text-slate-900 leading-tight mb-4">Gazze Acil Gıda Kampanyası</h3>
            <p className="text-slate-500 mb-6 flex-1 leading-relaxed">Çatışma bölgelerinde yer alan sivillere yönelik temel gıda ve tıbbi malzeme içeren acil yardım kolileri.</p>
            <div className="flex items-center gap-2 mb-6 bg-slate-50 p-3 rounded-xl border border-slate-100">
              <Users className="text-emerald-600 w-5 h-5" />
              <span className="text-sm font-semibold text-slate-700"><span className="text-emerald-700 font-bold">5,320</span> hayırsever bağış yaptı</span>
            </div>
            <div className="mb-8">
              <div className="flex justify-between text-sm mb-3">
                <span className="text-slate-600 font-bold">Toplanan Bağış</span>
                <span className="font-bold text-slate-900">$125,000 <span className="text-slate-400 font-medium">/ $150,000</span></span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden border border-slate-200">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: '83%' }} />
              </div>
            </div>
            <button className="w-full bg-emerald-600 text-white py-4 rounded-xl text-base font-bold hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-600/30 flex justify-center items-center">
              <HeartHandshake className="w-5 h-5 mr-2" /> Şimdi Bağış Yap
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  /* ── EXCHANGE TAB ── */
  const ExchangeTab = () => (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-in fade-in duration-500 slide-in-from-bottom-4">
      <div className="bg-rose-50 border-l-4 border-rose-500 p-5 rounded-r-xl mb-8 flex items-start shadow-sm">
        <Info className="w-6 h-6 text-rose-500 mr-4 flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="text-lg font-bold text-rose-800 mb-1">Katı SPOT Piyasa Kuralları Uygulanmaktadır</h4>
          <p className="text-rose-700 text-sm font-medium">
            Platformumuzda İslami finans ilkeleri gereği kaldıraçlı işlemler (margin), açığa satış (short-selling) ve kredili işlem KESİNLİKLE YAPILAMAZ. Sadece cüzdanınızdaki nakit kadar alım yapabilir, sadece sahip olduğunuz varlıkları satabilirsiniz (Long-Only).
          </p>
        </div>
      </div>

      <div className="mb-8 border-b border-slate-200 pb-6 flex items-center justify-between">
        <h2 className="text-3xl font-black text-slate-900">İkincil Piyasa (Borsa)</h2>
        <div className="flex items-center text-emerald-800 bg-emerald-100 px-4 py-2 rounded-lg font-bold text-sm shadow-sm">
          <ShieldCheck className="w-5 h-5 mr-2" /> Canlı Spot Piyasa
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Emir Paneli */}
        <div className="lg:col-span-5 bg-white p-8 rounded-[2rem] shadow-sm border border-slate-200 h-max flex flex-col">
          <h3 className="text-2xl font-bold text-slate-800 mb-8 flex items-center">
            <LineChart className="w-6 h-6 text-emerald-600 mr-2" /> Emir Paneli
          </h3>

          <div className="mb-6">
            <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wide">Varlık Seçimi</label>
            <div className="relative">
              <select className="w-full bg-slate-50 border border-slate-300 rounded-xl px-5 py-4 text-base font-bold text-slate-800 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 appearance-none shadow-inner cursor-pointer">
                <option>GL-SKK (Körfez Lojistik İcara Sukuk)</option>
                <option>AG-MRB (Anadolu Agro Murabahası)</option>
                <option>PT-HSS (PayTech Hisse)</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 p-6 rounded-2xl mb-8 flex justify-between items-center text-white shadow-inner">
            <span className="text-base font-medium text-slate-300">Son Spot Fiyat</span>
            <span className="text-3xl font-black text-emerald-400 font-mono">1,024.50 ₺</span>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wide">Fiyat (₺)</label>
              <input type="number" defaultValue="1024.50" step="0.10" className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-4 text-base font-bold text-slate-800 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 shadow-inner font-mono" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wide">Miktar (Lot)</label>
              <input type="number" defaultValue="1" min="1" className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-4 text-base font-bold text-slate-800 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 shadow-inner font-mono" />
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-8">
            <div className="flex justify-between items-center text-sm font-bold text-slate-600 mb-2">
              <span>Kullanılabilir Bakiye:</span>
              <span className="font-mono text-emerald-700">45,000.00 ₺</span>
            </div>
            <div className="flex justify-between items-center text-sm font-bold text-slate-600">
              <span>İşlem Tutarı:</span>
              <span className="font-mono text-slate-900">1,024.50 ₺</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-auto">
            <button className="bg-emerald-600 hover:bg-emerald-500 text-white py-4 rounded-xl font-black transition-all shadow-lg shadow-emerald-600/30 text-lg flex items-center justify-center">
              AL <span className="text-xs bg-emerald-700/50 px-2 py-1 rounded ml-2 font-semibold">SPOT</span>
            </button>
            <button className="bg-rose-600 hover:bg-rose-500 text-white py-4 rounded-xl font-black transition-all shadow-lg shadow-rose-600/30 text-lg">
              SAT
            </button>
          </div>
        </div>

        {/* Canlı Emir Defteri */}
        <div className="lg:col-span-7 bg-slate-900 rounded-[2rem] p-8 text-white shadow-2xl border border-slate-800 flex flex-col">
          <div className="flex justify-between items-center mb-8 pb-6 border-b border-slate-800">
            <h3 className="text-2xl font-bold flex items-center">
              <Activity className="w-6 h-6 text-blue-400 mr-3" /> Canlı Emir Defteri
            </h3>
            <span className="text-xs font-black uppercase tracking-widest bg-slate-800 px-4 py-2 rounded-lg text-slate-400 border border-slate-700">Derinlik Tablosu</span>
          </div>

          <div className="grid grid-cols-3 text-sm font-bold text-slate-500 mb-4 px-2 uppercase tracking-wider">
            <div>Fiyat (₺)</div>
            <div className="text-right">Miktar (Lot)</div>
            <div className="text-right">Toplam (₺)</div>
          </div>

          {/* Satışlar */}
          <div className="space-y-1.5 mb-6">
            {[
              { price: '1,026.00', amount: '45',  total: '46,170'  },
              { price: '1,025.50', amount: '12',  total: '12,306'  },
              { price: '1,025.20', amount: '8',   total: '8,201'   },
              { price: '1,024.90', amount: '25',  total: '25,622'  },
              { price: '1,024.70', amount: '110', total: '112,717' },
            ].map((o, i) => (
              <div key={`sell-${i}`} className="grid grid-cols-3 text-base py-2 relative px-2 hover:bg-slate-800/80 rounded transition-colors cursor-pointer">
                <div className="absolute right-0 top-0 bottom-0 bg-rose-500/15 rounded" style={{ width: `${Math.min(100, parseInt(o.amount) * 1.5)}%` }} />
                <span className="text-rose-400 font-mono font-bold z-10">{o.price}</span>
                <span className="text-slate-300 font-mono font-semibold z-10 text-right">{o.amount}</span>
                <span className="text-slate-500 font-mono z-10 text-right">{o.total}</span>
              </div>
            ))}
          </div>

          {/* Güncel Fiyat */}
          <div className="flex items-center justify-between py-5 border-y border-slate-700 my-2 bg-slate-800/30 rounded-xl px-4">
            <span className="text-3xl font-black text-emerald-400 font-mono tracking-tight">1,024.50 ₺</span>
            <div className="flex items-center text-slate-400 text-sm font-bold">
              Son İşlem <ArrowRightLeft className="w-4 h-4 ml-2" />
            </div>
          </div>

          {/* Alışlar */}
          <div className="space-y-1.5 mt-6">
            {[
              { price: '1,024.10', amount: '15',  total: '15,361'  },
              { price: '1,023.80', amount: '32',  total: '32,761'  },
              { price: '1,023.00', amount: '60',  total: '61,380'  },
              { price: '1,022.50', amount: '145', total: '148,262' },
              { price: '1,021.00', amount: '350', total: '357,350' },
            ].map((o, i) => (
              <div key={`buy-${i}`} className="grid grid-cols-3 text-base py-2 relative px-2 hover:bg-slate-800/80 rounded transition-colors cursor-pointer">
                <div className="absolute left-0 top-0 bottom-0 bg-emerald-500/15 rounded" style={{ width: `${Math.min(100, parseInt(o.amount) * 0.5)}%` }} />
                <span className="text-emerald-400 font-mono font-bold z-10">{o.price}</span>
                <span className="text-slate-300 font-mono font-semibold z-10 text-right">{o.amount}</span>
                <span className="text-slate-500 font-mono z-10 text-right">{o.total}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  /* ── RENDER ── */
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-emerald-200">
      <Header />
      <main>
        {activeTab === 'home'     && <HomeTab     />}
        {activeTab === 'debt'     && <DebtTab     />}
        {activeTab === 'equity'   && <EquityTab   />}
        {activeTab === 'charity'  && <CharityTab  />}
        {activeTab === 'exchange' && <ExchangeTab />}
      </main>
    </div>
  );
}
```

---

### `src/locales/tr/translation.json`

```json
{
  "nav": {
    "explore": "Projeleri Keşfet",
    "market": "İkincil Piyasa",
    "about": "Hakkımızda",
    "register": "Kayıt Ol"
  },
  "explore": {
    "title": "Projeleri Keşfet",
    "subtitle": "Sürdürülebilir büyüme için yatırım yapın veya sosyal değer yaratın.",
    "cat_equity": "Girişim Sermayesi (Hisse)",
    "cat_debt": "KOBİ Borcu (Murabaha/Sukuk)",
    "cat_donation": "STK (Bağış)",
    "risk": "Risk Derecesi",
    "target": "Hedef",
    "category": "Kategori",
    "raised_amt": "Toplanan Fon",
    "project_details": "Proje Detayları",
    "financial_analysis": "Finansal Analiz & Beklentiler",
    "invest_btn": "Yatırım Yap / Fonla",
    "desc_1": "Yapay zeka destekli müşteri hizmetleri optimizasyon yazılımı. Küresel genişleme için tohum yatırımı.",
    "analysis_1": "%25 yıllık büyüme öngörülüyor. 3. yıl sonunda Seri A ile hisse değerinde 4x artış bekleniyor.",
    "desc_2": "Yıllık %18 getiri hedefiyle Güneş Enerji Santrali genişletme projesi Murabaha finansmanı.",
    "analysis_2": "Devlet alım garantili enerji satışı. Sabit getirili, düşük riskli, üç aylık kupon ödemeli sukuk modeli.",
    "desc_3": "Susuzluk çeken 3 farklı köyde sürdürülebilir su kuyusu inşaatı için bağış kampanyası.",
    "analysis_3": "Finansal getiri yoktur. %100 Sosyal Etki puanı. Tam şeffaf bütçe kullanımı ve anlık fotoğraflı raporlama.",
    "desc_4": "KOBİ'ler için kısa vadeli mikro kredi havuzu oluşturulması. Düzenli aylık ödeme garantili.",
    "analysis_4": "Geniş tabanlı risk dağılımı. Platform algoritması ile otomatik temerrüt yönetimi. Yıllık %15-20 arası tahmini getiri."
  },
  "market": {
    "title": "İkincil Piyasa (Borsa)",
    "asset_equity": "TechNova Hisse (EQ-TCNV)",
    "asset_debt": "GreenEnergy Sukuk (SK-GREN)",
    "last_price": "Son Fiyat",
    "change_24h": "24s Değişim",
    "volume_24h": "24s Hacim",
    "charts": "Grafikler",
    "debt_info": "Borç (Sukuk/Murabaha) enstrümanları için grafik içermeyen, risksiz emir defteri görünümü aktiftir.",
    "order_book": "Emir Defteri",
    "price": "Fiyat",
    "amount": "Miktar",
    "total": "Toplam",
    "spot_trade": "Spot İşlem",
    "no_shorting": "Açığa Satış Yok",
    "buy": "AL",
    "sell": "SAT",
    "qty": "Adet",
    "total_sum": "Toplam",
    "buy_stock": "Emri Onayla"
  },
  "register": {
    "title": "Bize Katılın",
    "investor": "Yatırımcı Ol",
    "borrower": "Fon Arayan / KOBİ",
    "fname": "Ad",
    "lname": "Soyad",
    "email": "E-posta Adresi",
    "risk_profile": "Risk Profili",
    "risk_low": "Düşük Risk (Sabit Getiri)",
    "risk_med": "Orta Risk (Dengeli)",
    "risk_high": "Yüksek Risk (Agresif Büyüme)",
    "company_name": "Şirket Adı",
    "tax_id": "Vergi / Kayıt No",
    "fund_type": "Talep Edilen Fon Modeli",
    "fund_debt": "Borç (Murabaha / Sukuk)",
    "fund_equity": "Hisse",
    "password": "Şifre",
    "submit": "Kayıt Ol"
  },
  "about": {
    "title": "Vizyonumuz",
    "p1": "FundNova, KOBİ'lerin finansmana erişimini kolaylaştıran modern bir platformdur. <strong>Beehive</strong> ve <strong>Raqamyah</strong> gibi öncü finansal sürdürülebilirlik modellerini <strong>LaunchGood</strong>'un topluluk enerjisiyle harmanlıyoruz.",
    "p2": "Amacımız, yatırımcılara şeffaf ve spot piyasa kurallarına uyan bir ikincil piyasa sunmak; sosyal projeler için kesintisiz bir bağış havuzu oluşturmaktır. Borç, hisse ve bağış modellerini tek çatı altında birleştirerek geleceğin finansal modelini inşa ediyoruz."
  }
}
```

---

### `src/locales/en/translation.json`

```json
{
  "nav": {
    "explore": "Explore Projects",
    "market": "Secondary Market",
    "about": "About Us",
    "register": "Register"
  },
  "explore": {
    "title": "Explore Projects",
    "subtitle": "Invest for sustainable growth or create social value.",
    "cat_equity": "Venture Capital (Equity)",
    "cat_debt": "SME Debt (Murabaha/Sukuk)",
    "cat_donation": "NGO (Donation)",
    "risk": "Risk Grade",
    "target": "Target",
    "category": "Category",
    "raised_amt": "Funds Raised",
    "project_details": "Project Details",
    "financial_analysis": "Financial Analysis & Expectations",
    "invest_btn": "Invest / Fund",
    "desc_1": "AI-supported customer service optimization software. Seed investment for global expansion.",
    "analysis_1": "Projected 25% annual growth. Expected 4x increase in share value with Series A at the end of year 3.",
    "desc_2": "Solar Power Plant expansion project Murabaha financing with an 18% annual return target.",
    "analysis_2": "Energy sales with state purchase guarantee. Fixed yield, low-risk, quarterly coupon payment sukuk model.",
    "desc_3": "Donation campaign for the construction of sustainable water wells in 3 different villages suffering from thirst.",
    "analysis_3": "No financial return. 100% Social Impact score. Fully transparent budget usage and instant photo reporting.",
    "desc_4": "Creation of a short-term micro-credit pool for SMEs. Regular monthly payment guaranteed.",
    "analysis_4": "Broad-based risk distribution. Automatic default management with platform algorithm. Estimated yield between 15-20% annually."
  },
  "market": {
    "title": "Secondary Market (Exchange)",
    "asset_equity": "TechNova Equity (EQ-TCNV)",
    "asset_debt": "GreenEnergy Sukuk (SK-GREN)",
    "last_price": "Last Price",
    "change_24h": "24h Change",
    "volume_24h": "24h Volume",
    "charts": "Charts",
    "debt_info": "Risk-free order book view without charts is active for Debt (Sukuk/Murabaha) instruments.",
    "order_book": "Order Book",
    "price": "Price",
    "amount": "Amount",
    "total": "Total",
    "spot_trade": "Spot Trade",
    "no_shorting": "No Short Selling",
    "buy": "Buy",
    "sell": "Sell",
    "qty": "Qty",
    "total_sum": "Total",
    "buy_stock": "Confirm Order"
  },
  "register": {
    "title": "Join Us",
    "investor": "Become an Investor",
    "borrower": "Seeking Funds / SME",
    "fname": "First Name",
    "lname": "Last Name",
    "email": "Email Address",
    "risk_profile": "Risk Profile",
    "risk_low": "Low Risk (Fixed Return)",
    "risk_med": "Medium Risk (Balanced)",
    "risk_high": "High Risk (Aggressive Growth)",
    "company_name": "Company Name",
    "tax_id": "Tax / Registration ID",
    "fund_type": "Requested Fund Model",
    "fund_debt": "Debt (Murabaha / Sukuk)",
    "fund_equity": "Equity",
    "password": "Password",
    "submit": "Register"
  },
  "about": {
    "title": "Our Vision",
    "p1": "FundNova is a modern platform that facilitates access to financing for SMEs. We blend pioneering financial sustainability models like <strong>Beehive</strong> and <strong>Raqamyah</strong> with the community energy of <strong>LaunchGood</strong>.",
    "p2": "Our goal is to provide investors with a secondary market that is transparent and complies with spot market rules; while creating an uninterrupted donation pool for social projects. We are building the financial model of the future by combining debt, equity, and donation models under one roof."
  }
}
```

---

## Antigravity'e Deploy Adımları

### 1. Projeyi Antigravity'e Yükle

Antigravity (Netlify/Vercel benzeri) için proje kökünde şu ayarlar yapılmalıdır:

| Ayar | Değer |
|---|---|
| **Build Command** | `npm run build` |
| **Output Directory** | `dist` |
| **Node Version** | `18+` |
| **Install Command** | `npm install` |

### 2. Environment Notları

- Proje `.env` dosyası gerektirmiyor — tüm config statik.
- Dil dosyaları (`locales/`) statik JSON, CDN'den servis edilebilir.
- `react-router-dom` kullanıldığı için **SPA redirect kuralı** ekle:

```
/* → /index.html  (200)
```

> Netlify için: `public/_redirects` dosyası oluştur, içine `/* /index.html 200` yaz.  
> Vercel için: `vercel.json`'a `"rewrites": [{"source": "/(.*)", "destination": "/"}]` ekle.

### 3. Eksik Bağımlılık

`i18n.js` dosyasında `i18next-browser-languagedetector` import ediliyor. Deploy öncesi kur:

```bash
npm install i18next-browser-languagedetector
```

### 4. Lokal Test

```bash
npm install
npm run dev       # → http://localhost:3000
npm run build     # → dist/ klasörü oluşur
npm run preview   # → build önizleme
```

---

## Önemli Notlar

- `App.jsx` dosyası **tek başına çalışır** (router, i18n bağımlılığı yok), standalone demo olarak kullanılabilir.
- `src/pages/` altındaki sayfalar (`Explore`, `Register`, `About`, `SecondaryMarket`) **react-router-dom** ve **react-i18next** gerektirir.
- Görseller Unsplash CDN'den yükleniyor, internet bağlantısı gerekir. Offline için `src/assets/` altına indir ve import'ları güncelle.
- Tüm locales (`ar`, `fr`, `ms`, `ru`, `ur`) mevcut — i18n.js'e eklendiler.
