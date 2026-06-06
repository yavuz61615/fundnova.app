import React from 'react';
import { useTranslation } from 'react-i18next';
import { TrendingUp, PieChart, HeartHandshake } from 'lucide-react';

export default function CrowdfundingOptions() {
  const { t } = useTranslation();

  const options = [
    {
      id: 'debt',
      icon: <TrendingUp size={48} color="var(--color-primary)" />,
      title: t('options.debt_title'),
      desc: t('options.debt_desc'),
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 'equity',
      icon: <PieChart size={48} color="var(--color-primary)" />,
      title: t('options.equity_title'),
      desc: t('options.equity_desc'),
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 'donation',
      icon: <HeartHandshake size={48} color="var(--color-primary)" />,
      title: t('options.donation_title'),
      desc: t('options.donation_desc'),
      image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <section style={{ padding: '6rem 0', backgroundColor: '#fff' }}>
      <div className="container">
        <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '4rem' }}>
          {t('options.title')}
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {options.map((opt) => (
            <div id={opt.id} key={opt.id} className="glass" style={{ 
              borderRadius: '20px', 
              overflow: 'hidden',
              transition: 'var(--transition-smooth)',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{ 
                height: '200px', 
                backgroundImage: `url(${opt.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}></div>
              
              <div style={{ padding: '2rem' }}>
                <div style={{ marginBottom: '1.5rem', background: 'var(--color-primary-light)', display: 'inline-flex', padding: '1rem', borderRadius: '16px' }}>
                  {opt.icon}
                </div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{opt.title}</h3>
                <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.6' }}>{opt.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
