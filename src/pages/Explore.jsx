import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ShieldCheck, TrendingUp, Heart, PieChart, X, FileText, Info } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export default function Explore() {
  const { t } = useTranslation();
  const [selectedProject, setSelectedProject] = useState(null);
  
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryFilter = queryParams.get('category');

  const mockProjects = [
    {
      id: 1,
      title: "TechNova AI Solutions",
      categoryKey: "equity",
      category: t('explore.cat_equity'),
      risk: "A",
      target: 500000,
      raised: 350000,
      desc: t('explore.desc_1'),
      analysis: t('explore.analysis_1'),
      icon: <PieChart size={24} />,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1470&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "GreenEnergy Solar Farm",
      categoryKey: "debt",
      category: t('explore.cat_debt'),
      risk: "B+",
      target: 1200000,
      raised: 900000,
      desc: t('explore.desc_2'),
      analysis: t('explore.analysis_2'),
      icon: <TrendingUp size={24} />,
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1472&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "Clean Water for Africa",
      categoryKey: "donation",
      category: t('explore.cat_donation'),
      risk: "N/A",
      target: 50000,
      raised: 45000,
      desc: t('explore.desc_3'),
      analysis: t('explore.analysis_3'),
      icon: <Heart size={24} />,
      image: "https://images.unsplash.com/photo-1516023249764-50d4ebf0b8af?q=80&w=1374&auto=format&fit=crop"
    },
    {
      id: 4,
      title: "FinTech MikroKredi",
      categoryKey: "debt",
      category: t('explore.cat_debt'),
      risk: "A",
      target: 200000,
      raised: 200000,
      desc: t('explore.desc_4'),
      analysis: t('explore.analysis_4'),
      icon: <TrendingUp size={24} />,
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1370&auto=format&fit=crop"
    }
  ];

  const filteredProjects = categoryFilter 
    ? mockProjects.filter(p => p.categoryKey === categoryFilter)
    : mockProjects;

  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh', backgroundColor: 'var(--color-bg-main)' }}>
      <div className="container" style={{ paddingBottom: '4rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{t('explore.title')}</h1>
        <p style={{ color: 'var(--color-text-muted)', marginBottom: '3rem', fontSize: '1.1rem' }}>
          {categoryFilter 
            ? t(`nav.${categoryFilter}`) + ' - ' + t('explore.subtitle')
            : t('explore.subtitle')}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '2rem' }}>
          {filteredProjects.map(project => {
            const progress = (project.raised / project.target) * 100;
            return (
              <div 
                key={project.id} 
                className="glass" 
                style={{ borderRadius: '16px', overflow: 'hidden', display: 'flex', flexDirection: 'column', transition: 'transform 0.2s', cursor: 'pointer', backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                onClick={() => setSelectedProject(project)}
              >
                {/* High Resolution Image Placeholder */}
                <div style={{ width: '100%', height: '200px', backgroundImage: `url(${project.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                
                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-primary)', fontWeight: 600 }}>
                      {project.icon}
                      <span style={{ textTransform: 'capitalize' }}>{project.category}</span>
                    </div>
                    {project.risk !== 'N/A' && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', background: 'var(--color-primary-light)', padding: '0.3rem 0.6rem', borderRadius: '8px', color: 'var(--color-primary-dark)', fontWeight: 'bold', fontSize: '0.9rem' }}>
                        <ShieldCheck size={16} /> {t('explore.risk')}: {project.risk}
                      </div>
                    )}
                  </div>

                  <h3 style={{ fontSize: '1.25rem', marginTop: '0.5rem' }}>{project.title}</h3>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', minHeight: '60px' }}>{project.desc}</p>

                  <div style={{ marginTop: 'auto' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 600 }}>
                      <span>${project.raised.toLocaleString()}</span>
                      <span style={{ color: 'var(--color-text-muted)' }}>{t('explore.target')}: ${project.target.toLocaleString()}</span>
                    </div>
                    <div style={{ width: '100%', height: '8px', backgroundColor: 'var(--color-border)', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: `${progress}%`, height: '100%', backgroundColor: progress >= 100 ? '#10B981' : 'var(--color-primary)', transition: 'width 1s ease-in-out' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {filteredProjects.length === 0 && (
          <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--color-text-muted)', fontSize: '1.2rem' }}>
            Bu kategoride henüz proje bulunmamaktadır.
          </div>
        )}
      </div>

      {selectedProject && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '1rem' }} onClick={() => setSelectedProject(null)}>
          <div className="glass animate-slide-up" style={{ width: '100%', maxWidth: '700px', backgroundColor: 'var(--color-bg-card)', borderRadius: '24px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }} onClick={e => e.stopPropagation()}>
            <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: '1.5rem', color: 'var(--color-primary-dark)' }}>{selectedProject.title}</h2>
              <button onClick={() => setSelectedProject(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)' }}>
                <X size={24} />
              </button>
            </div>
            
            <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', maxHeight: '70vh', overflowY: 'auto' }}>
              
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: '150px', background: 'var(--color-bg-main)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
                  <div style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', fontWeight: 'bold', textTransform: 'uppercase' }}>{t('explore.category')}</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--color-primary)' }}>{selectedProject.category}</div>
                </div>
                <div style={{ flex: 1, minWidth: '150px', background: 'var(--color-bg-main)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
                  <div style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', fontWeight: 'bold', textTransform: 'uppercase' }}>{t('explore.risk')}</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--color-primary)' }}>{selectedProject.risk}</div>
                </div>
                <div style={{ flex: 1, minWidth: '150px', background: 'var(--color-bg-main)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
                  <div style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', fontWeight: 'bold', textTransform: 'uppercase' }}>{t('explore.raised_amt')}</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#10B981' }}>${selectedProject.raised.toLocaleString()}</div>
                </div>
              </div>

              <div>
                <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'var(--color-text-main)' }}>
                  <Info size={18} color="var(--color-primary)" /> {t('explore.project_details')}
                </h4>
                <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.6' }}>{selectedProject.desc}</p>
              </div>

              <div>
                <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'var(--color-text-main)' }}>
                  <FileText size={18} color="var(--color-primary)" /> {t('explore.financial_analysis')}
                </h4>
                <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.6', background: 'var(--color-bg-main)', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid var(--color-primary)' }}>
                  {selectedProject.analysis}
                </p>
              </div>

              <button className="btn btn-primary" style={{ marginTop: '1rem', width: '100%', justifyContent: 'center' }}>
                {t('explore.invest_btn')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
