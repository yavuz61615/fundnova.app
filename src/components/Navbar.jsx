import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, Menu, X, Rocket, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const languages = [
  { code: 'tr', label: 'Türkçe' },
  { code: 'en', label: 'English' },
  { code: 'ar', label: 'العربية', dir: 'rtl' },
  { code: 'fr', label: 'Français' },
  { code: 'ur', label: 'اردو', dir: 'rtl' },
  { code: 'ms', label: 'Bahasa Melayu' },
  { code: 'ru', label: 'Русский' }
];

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [langDropdown, setLangDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang.code);
    document.documentElement.dir = lang.dir || 'ltr';
    setLangDropdown(false);
    setDrawerOpen(false);
  };

  return (
    <nav className={`glass-nav ${scrolled ? 'glass' : ''}`} style={{ padding: '1rem 0', backgroundColor: scrolled ? 'var(--glass-bg)' : 'transparent', borderBottom: scrolled ? '1px solid var(--color-border)' : 'none' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--color-primary)' }}>
          <Rocket size={28} />
          <span>FundNova</span>
        </Link>

        {/* Center Top Navigation (Desktop) */}
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', fontWeight: 600, fontSize: '0.95rem' }} className="top-nav-links">
          <Link to="/explore">{t('nav.explore')}</Link>
          <Link to="/explore?category=debt">{t('nav.debt', 'Borca Dayalı')}</Link>
          <Link to="/explore?category=equity">{t('nav.equity', 'Hisseye Dayalı')}</Link>
          <Link to="/explore?category=donation">{t('nav.donation', 'Bağış')}</Link>
          <Link to="/market" style={{ color: 'var(--color-primary)' }}>{t('nav.market')}</Link>
        </div>

        {/* Right Side: Hamburger Menu */}
        <div style={{ position: 'relative' }}>
          <button 
            onClick={() => setDrawerOpen(!drawerOpen)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-main)' }}
          >
            {drawerOpen ? <X size={32} /> : <Menu size={32} />}
          </button>

          {/* Drawer / Dropdown Menu */}
          {drawerOpen && (
            <div className="glass animate-slide-up" style={{
              position: 'absolute', right: 0, top: '150%', width: '280px', 
              borderRadius: '16px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem',
              boxShadow: 'var(--glass-shadow)', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-card)'
            }}>
              
              <Link to="/about" onClick={() => setDrawerOpen(false)} style={{ fontWeight: 600, padding: '0.75rem', borderBottom: '1px solid var(--color-border)', fontSize: '1.1rem' }}>
                {t('nav.about')}
              </Link>
              
              <Link to="/register" onClick={() => setDrawerOpen(false)} style={{ fontWeight: 600, padding: '0.75rem', borderBottom: '1px solid var(--color-border)', color: 'var(--color-primary)', fontSize: '1.1rem' }}>
                {t('nav.register')}
              </Link>

              {/* Language Selector inside Drawer */}
              <div style={{ padding: '0.75rem' }}>
                <div 
                  onClick={() => setLangDropdown(!langDropdown)} 
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 600, cursor: 'pointer', fontSize: '1.1rem' }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Globe size={20} /> {languages.find(l => l.code === i18n.language)?.label || 'Language'}</span>
                  <ChevronDown size={20} />
                </div>
                
                {langDropdown && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1rem', paddingLeft: '1rem' }}>
                    {languages.map(lang => (
                      <button 
                        key={lang.code} 
                        onClick={() => handleLanguageChange(lang)}
                        style={{ background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', color: 'var(--color-text-muted)', fontSize: '1rem', fontWeight: 500 }}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

            </div>
          )}
        </div>
      </div>
      
      <style>{`
        @media (max-width: 900px) {
          .top-nav-links {
            display: none !important;
          }
        }
      `}</style>
    </nav>
  );
}
