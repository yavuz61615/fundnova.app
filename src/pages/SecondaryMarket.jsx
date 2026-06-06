import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BarChart2, List, Info } from 'lucide-react';

export default function SecondaryMarket() {
  const { t } = useTranslation();
  const [assetType, setAssetType] = useState('equity'); // 'equity', 'debt'

  // Mock Order Book Data
  const asks = [
    { price: 105.50, amount: 120, total: 12660 },
    { price: 105.25, amount: 450, total: 47362 },
    { price: 105.00, amount: 800, total: 84000 },
    { price: 104.80, amount: 150, total: 15720 },
    { price: 104.50, amount: 300, total: 31350 },
  ].reverse(); // Asks typically shown highest to lowest approaching spread

  const bids = [
    { price: 104.20, amount: 500, total: 52100 },
    { price: 104.00, amount: 1200, total: 124800 },
    { price: 103.80, amount: 350, total: 36330 },
    { price: 103.50, amount: 900, total: 93150 },
    { price: 103.00, amount: 200, total: 20600 },
  ];

  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh', backgroundColor: '#0B0E14', color: '#EAECEF', fontFamily: 'Inter, sans-serif' }}>
      
      {/* Top Bar */}
      <div style={{ display: 'flex', borderBottom: '1px solid #2B3139', padding: '1rem 2rem', gap: '2rem', backgroundColor: '#181A20' }}>
        <h2 style={{ fontSize: '1.2rem', color: '#FCD535' }}>{t('market.title')}</h2>
        
        <select 
          style={{ background: '#2B3139', color: '#fff', border: 'none', padding: '0.5rem', borderRadius: '4px', outline: 'none' }}
          value={assetType}
          onChange={(e) => setAssetType(e.target.value)}
        >
          <option value="equity">{t('market.asset_equity')}</option>
          <option value="debt">{t('market.asset_debt')}</option>
        </select>

        <div style={{ display: 'flex', gap: '2rem', marginLeft: 'auto', fontSize: '0.9rem' }}>
          <div>
            <div style={{ color: '#848E9C' }}>{t('market.last_price')}</div>
            <div style={{ color: '#0ECB81', fontWeight: 'bold' }}>104.35 ₺</div>
          </div>
          <div>
            <div style={{ color: '#848E9C' }}>{t('market.change_24h')}</div>
            <div style={{ color: '#0ECB81' }}>+2.4%</div>
          </div>
          <div>
            <div style={{ color: '#848E9C' }}>{t('market.volume_24h')}</div>
            <div style={{ color: '#EAECEF' }}>1,245,000 ₺</div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px 320px', height: 'calc(100vh - 140px)' }}>
        
        {/* Left: Chart Area */}
        <div style={{ borderRight: '1px solid #2B3139', padding: '1rem', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid #2B3139', paddingBottom: '1rem', marginBottom: '1rem' }}>
            <button style={{ background: 'transparent', border: 'none', color: '#FCD535', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <BarChart2 size={16} /> {t('market.charts')}
            </button>
          </div>
          
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            {assetType === 'equity' ? (
              // Simple CSS Candlestick Chart Mockup
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '12px', height: '300px' }}>
                {[...Array(20)].map((_, i) => {
                  const isUp = Math.random() > 0.4;
                  const height = 40 + Math.random() * 150;
                  const wickHeight = height + 20 + Math.random() * 40;
                  const color = isUp ? '#0ECB81' : '#F6465D';
                  return (
                    <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', position: 'relative' }}>
                       {/* Wick */}
                       <div style={{ position: 'absolute', width: '2px', height: `${wickHeight}px`, backgroundColor: color, bottom: `${Math.random() * 50}px` }}></div>
                       {/* Body */}
                       <div style={{ width: '12px', height: `${height}px`, backgroundColor: color, zIndex: 1, bottom: `${Math.random() * 50 + 20}px`, position: 'absolute' }}></div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div style={{ color: '#848E9C', textAlign: 'center' }}>
                <List size={48} style={{ margin: '0 auto', marginBottom: '1rem', opacity: 0.5 }} />
                <p>{t('market.debt_info')}</p>
              </div>
            )}
          </div>
        </div>

        {/* Middle: Order Book */}
        <div style={{ borderRight: '1px solid #2B3139', padding: '1rem', fontSize: '0.85rem' }}>
          <h3 style={{ fontSize: '1rem', borderBottom: '1px solid #2B3139', paddingBottom: '0.5rem', marginBottom: '1rem' }}>{t('market.order_book')}</h3>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#848E9C', marginBottom: '0.5rem' }}>
            <span>{t('market.price')} (₺)</span>
            <span>{t('market.amount')}</span>
            <span>{t('market.total')}</span>
          </div>

          {/* Asks (Sell Orders) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '1rem' }}>
            {asks.map((ask, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
                <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: `${(ask.amount / 1000) * 100}%`, backgroundColor: 'rgba(246, 70, 93, 0.1)', zIndex: 0 }}></div>
                <span style={{ color: '#F6465D', zIndex: 1 }}>{ask.price.toFixed(2)}</span>
                <span style={{ zIndex: 1 }}>{ask.amount}</span>
                <span style={{ zIndex: 1 }}>{ask.total}</span>
              </div>
            ))}
          </div>

          <div style={{ fontSize: '1.2rem', color: '#0ECB81', fontWeight: 'bold', margin: '1rem 0', textAlign: 'center', borderTop: '1px solid #2B3139', borderBottom: '1px solid #2B3139', padding: '0.5rem 0' }}>
            104.35 ₺
          </div>

          {/* Bids (Buy Orders) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {bids.map((bid, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
                <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: `${(bid.amount / 1200) * 100}%`, backgroundColor: 'rgba(14, 203, 129, 0.1)', zIndex: 0 }}></div>
                <span style={{ color: '#0ECB81', zIndex: 1 }}>{bid.price.toFixed(2)}</span>
                <span style={{ zIndex: 1 }}>{bid.amount}</span>
                <span style={{ zIndex: 1 }}>{bid.total}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Trading Panel */}
        <div style={{ padding: '1rem', backgroundColor: '#181A20' }}>
          <h3 style={{ fontSize: '1rem', borderBottom: '1px solid #2B3139', paddingBottom: '0.5rem', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between' }}>
            <span>{t('market.spot_trade')}</span>
            <span style={{ color: '#848E9C', fontSize: '0.8rem' }}><Info size={14} style={{ verticalAlign: 'middle' }}/> {t('market.no_shorting')}</span>
          </h3>

          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
            <button style={{ flex: 1, padding: '0.75rem', background: '#0ECB81', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold' }}>{t('market.buy')}</button>
            <button style={{ flex: 1, padding: '0.75rem', background: 'transparent', color: '#F6465D', border: '1px solid #F6465D', borderRadius: '4px', fontWeight: 'bold' }}>{t('market.sell')}</button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ background: '#2B3139', padding: '0.75rem', borderRadius: '4px', display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#848E9C' }}>{t('market.price')}</span>
              <input type="text" defaultValue="104.35" style={{ background: 'transparent', border: 'none', color: '#EAECEF', textAlign: 'right', outline: 'none', width: '100px' }} />
              <span>₺</span>
            </div>
            <div style={{ background: '#2B3139', padding: '0.75rem', borderRadius: '4px', display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#848E9C' }}>{t('market.amount')}</span>
              <input type="text" placeholder="0.00" style={{ background: 'transparent', border: 'none', color: '#EAECEF', textAlign: 'right', outline: 'none', width: '100px' }} />
              <span>{t('market.qty')}</span>
            </div>
            
            <div style={{ height: '1px', backgroundColor: '#2B3139', margin: '0.5rem 0' }}></div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#EAECEF' }}>
              <span>{t('market.total_sum')}:</span>
              <span>0.00 ₺</span>
            </div>

            <button style={{ width: '100%', padding: '1rem', background: '#0ECB81', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold', marginTop: '1rem' }}>
              {t('market.buy_stock')}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
