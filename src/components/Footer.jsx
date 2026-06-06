import React from 'react';
import { useTranslation } from 'react-i18next';
import { Rocket } from 'lucide-react';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer style={{ backgroundColor: 'var(--color-text-main)', color: '#fff', padding: '4rem 0 2rem 0' }}>
      <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.5rem', fontWeight: 'bold' }}>
          <Rocket size={28} color="var(--color-primary)" />
          <span>FundNova</span>
        </div>
        
        <div style={{ width: '100%', height: '1px', backgroundColor: 'rgba(255,255,255,0.1)' }}></div>
        
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
          © {new Date().getFullYear()} FundNova. {t('footer.rights')}
        </p>
      </div>
    </footer>
  );
}
