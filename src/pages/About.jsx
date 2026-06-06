import React from 'react';
import { useTranslation } from 'react-i18next';

export default function About() {
  const { t } = useTranslation();

  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh', backgroundColor: 'var(--color-bg-main)' }}>
      <div className="container" style={{ paddingBottom: '4rem' }}>
        <div className="glass animate-slide-up" style={{ padding: '4rem', borderRadius: '24px', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '2rem', color: 'var(--color-primary-dark)' }}>
            {t('about.title')}
          </h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)', lineHeight: '1.8', marginBottom: '2rem' }} dangerouslySetInnerHTML={{ __html: t('about.p1') }} />
          <p style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)', lineHeight: '1.8' }} dangerouslySetInnerHTML={{ __html: t('about.p2') }} />
        </div>
      </div>
    </div>
  );
}
