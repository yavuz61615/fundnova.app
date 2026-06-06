import React from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      background: 'linear-gradient(135deg, var(--color-primary-light) 0%, #FFFFFF 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background decoration */}
      <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '500px', height: '500px', background: 'var(--color-primary)', opacity: '0.05', borderRadius: '50%', filter: 'blur(60px)' }}></div>
      <div style={{ position: 'absolute', bottom: '-10%', left: '-5%', width: '400px', height: '400px', background: 'var(--color-accent)', opacity: '0.05', borderRadius: '50%', filter: 'blur(60px)' }}></div>

      <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '3rem', position: 'relative', zIndex: 10 }}>
        
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', paddingTop: '80px' }} className="animate-slide-up">
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: '1.1', marginBottom: '1.5rem', color: 'var(--color-primary-dark)' }}>
            {t('hero.title')}
          </h1>
          <p style={{ fontSize: 'clamp(1.1rem, 2vw, 1.3rem)', color: 'var(--color-text-muted)', marginBottom: '2.5rem' }}>
            {t('hero.subtitle')}
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
              {t('hero.cta')} <ArrowRight size={20} />
            </button>
          </div>
        </div>

        {/* Hero Image / Placeholder that looks premium */}
        <div className="glass animate-slide-up" style={{ 
          width: '100%', 
          height: '500px', 
          borderRadius: '24px', 
          overflow: 'hidden',
          animationDelay: '0.2s',
          backgroundImage: 'url(https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}>
        </div>

      </div>
    </section>
  );
}
