import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function Register() {
  const { t } = useTranslation();
  const [tab, setTab] = useState('investor'); // 'investor' or 'borrower'

  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', backgroundColor: 'var(--color-bg-main)' }}>
      <div className="glass animate-slide-up" style={{ width: '100%', maxWidth: '600px', margin: '2rem', padding: '2rem', borderRadius: '24px' }}>
        <h2 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '2rem' }}>{t('register.title')}</h2>

        <div style={{ display: 'flex', borderBottom: '1px solid var(--color-border)', marginBottom: '2rem' }}>
          <button 
            style={{ flex: 1, padding: '1rem', background: 'none', border: 'none', borderBottom: tab === 'investor' ? '3px solid var(--color-primary)' : '3px solid transparent', color: tab === 'investor' ? 'var(--color-primary)' : 'var(--color-text-muted)', fontWeight: 600, cursor: 'pointer', transition: 'var(--transition-smooth)' }}
            onClick={() => setTab('investor')}
          >
            {t('register.investor')}
          </button>
          <button 
            style={{ flex: 1, padding: '1rem', background: 'none', border: 'none', borderBottom: tab === 'borrower' ? '3px solid var(--color-primary)' : '3px solid transparent', color: tab === 'borrower' ? 'var(--color-primary)' : 'var(--color-text-muted)', fontWeight: 600, cursor: 'pointer', transition: 'var(--transition-smooth)' }}
            onClick={() => setTab('borrower')}
          >
            {t('register.borrower')}
          </button>
        </div>

        <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }} onSubmit={e => e.preventDefault()}>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <input type="text" placeholder={t('register.fname')} style={{ flex: 1, padding: '1rem', borderRadius: '8px', border: '1px solid var(--color-border)', outline: 'none' }} />
            <input type="text" placeholder={t('register.lname')} style={{ flex: 1, padding: '1rem', borderRadius: '8px', border: '1px solid var(--color-border)', outline: 'none' }} />
          </div>
          <input type="email" placeholder={t('register.email')} style={{ padding: '1rem', borderRadius: '8px', border: '1px solid var(--color-border)', outline: 'none' }} />
          
          {tab === 'investor' && (
            <>
              <select style={{ padding: '1rem', borderRadius: '8px', border: '1px solid var(--color-border)', outline: 'none', backgroundColor: 'var(--color-bg-card)', color: 'var(--color-text-main)' }}>
                <option value="">{t('register.risk_profile')}</option>
                <option value="low">{t('register.risk_low')}</option>
                <option value="medium">{t('register.risk_med')}</option>
                <option value="high">{t('register.risk_high')}</option>
              </select>
            </>
          )}

          {tab === 'borrower' && (
            <>
              <input type="text" placeholder={t('register.company_name')} style={{ padding: '1rem', borderRadius: '8px', border: '1px solid var(--color-border)', outline: 'none' }} />
              <input type="text" placeholder={t('register.tax_id')} style={{ padding: '1rem', borderRadius: '8px', border: '1px solid var(--color-border)', outline: 'none' }} />
              <select style={{ padding: '1rem', borderRadius: '8px', border: '1px solid var(--color-border)', outline: 'none', backgroundColor: 'var(--color-bg-card)', color: 'var(--color-text-main)' }}>
                <option value="">{t('register.fund_type')}</option>
                <option value="debt">{t('register.fund_debt')}</option>
                <option value="equity">{t('register.fund_equity')}</option>
              </select>
            </>
          )}

          <input type="password" placeholder={t('register.password')} style={{ padding: '1rem', borderRadius: '8px', border: '1px solid var(--color-border)', outline: 'none' }} />
          <button className="btn btn-primary" style={{ width: '100%', padding: '1rem', marginTop: '1rem' }}>{t('register.submit')}</button>
        </form>
      </div>
    </div>
  );
}
