import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Globe, Info, User, Activity, Users, LineChart,
  Building2, ArrowUpRight, ArrowRightLeft, HeartHandshake, Heart, ShieldCheck,
  X, TrendingUp, Calculator, AlertTriangle, CheckCircle, LayoutDashboard, Briefcase, Megaphone, BarChart3, ChevronRight, ChevronLeft, Bitcoin, CreditCard, Wallet, QrCode, Copy
} from 'lucide-react';

export default function HybridFundPlatform() {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState('home');
  const [activeProject, setActiveProject] = useState(null);
  const [userProfile, setUserProfile] = useState(null);

  // Exchange Tab State (Lifted for persistence)
  const [exchangeAssetId, setExchangeAssetId] = useState('equity1');
  const [exchangeLotAmount, setExchangeLotAmount] = useState(1);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentData, setPaymentData] = useState(null);

  useEffect(() => {
    document.dir = i18n.dir();
  }, [i18n.language]);

  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    const observeAll = () => {
      document.querySelectorAll('.animate-on-scroll:not(.is-visible)').forEach(el => io.observe(el));
    };

    observeAll();

    const mo = new MutationObserver(() => {
      observeAll();
    });

    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  const changeLanguage = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  /* ── MODAL COMPONENT ── */
  const ProjectModal = ({ project, onClose, onProceedToPayment }) => {
    const isEquity = !!project.isEquity;
    const isCharity = !!project.isCharity;
    const isKarz = !!project.isKarz;

    const [lotAmount, setLotAmount] = useState(10);
    const sharePrice = project.sharePrice || 50;
    const [investAmount, setInvestAmount] = useState(1000);
    const [showDetails, setShowDetails] = useState(false);
    const [isRecurring, setIsRecurring] = useState(false);

    const amount = isEquity ? (Number(lotAmount) * sharePrice) : (Number(investAmount) || 0);

    // Sabit kazanç veya equity simülasyonu
    const profit = isCharity || isKarz ? 0 : (isEquity ? (amount * 1.5) : (amount * ((project.returnRate || 0) / 100)));
    const total = amount + profit;

    const maxBarValue = Math.max(total, 1);
    const principalHeight = `${(amount / maxBarValue) * 100}%`;
    const profitHeight = `${(profit / maxBarValue) * 100}%`;

    const details = {
      process: t('modal.process'),
      location: t('modal.location'),
      duration: isEquity ? "Süresiz (Hisse Ortaklığı)" : `12 ${t('modal.month')} ${t('modal.durationPlan')}`,
      agreements: t('modal.agreements'),
      financials: t('modal.financials'),
      trust: t('modal.trust')
    };

    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-md animate-in fade-in duration-300 overflow-y-auto">
        <div className="bg-surface border border-borderBase rounded-[24px] w-full max-w-5xl shadow-2xl flex flex-col my-auto max-h-[95vh]">

          <div className="border-b border-borderBase px-8 py-6 flex justify-between items-center sticky top-0 z-10 bg-surface/95 backdrop-blur rounded-t-[24px]">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-primary mb-1 block">{project.company}</span>
              <h3 className="text-2xl font-black text-textMain fluid-h3">{project.title}</h3>
            </div>
            <button onClick={onClose} className="p-2 bg-transparent border border-borderBase rounded-full hover:bg-background transition-colors text-textMain flex-shrink-0">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-8 overflow-y-auto flex-1 grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="flex flex-col space-y-8">
              <div>
                <p className="text-textMuted leading-relaxed font-medium mb-4">{project.desc}</p>

                {!showDetails ? (
                  <button onClick={() => setShowDetails(true)} className="text-primary font-bold text-sm flex items-center hover:underline">
                    {t('modal.readMore')} <ArrowUpRight className="w-4 h-4 ml-1" />
                  </button>
                ) : (
                  <div className="bg-background border border-borderBase rounded-xl p-6 mt-4 space-y-4 animate-in fade-in slide-in-from-top-4">
                    <h4 className="text-textMain font-black border-b border-borderBase pb-2">{t('modal.detailsTitle')}</h4>
                    <div className="space-y-3">
                      <div><span className="text-xs font-bold text-textMuted uppercase block mb-0.5">{t('modal.process')}</span><p className="text-sm text-textMain font-medium leading-relaxed">Proje 3 faza ayrılmıştır: İzin & Altyapı, Tedarik & Kurulum, Faaliyet.</p></div>
                      <div><span className="text-xs font-bold text-textMuted uppercase block mb-0.5">{t('modal.location')}</span><p className="text-sm text-textMain font-medium">Uluslararası</p></div>
                      <div><span className="text-xs font-bold text-textMuted uppercase block mb-0.5">{t('modal.durationPlan')}</span><p className="text-sm text-textMain font-medium">{details.duration}</p></div>
                      <div><span className="text-xs font-bold text-textMuted uppercase block mb-0.5">{t('modal.agreements')}</span><p className="text-sm text-textMain font-medium">Akıllı Sözleşme (Smart Contract) & Teminatlı Hukuki Sözleşmeler.</p></div>
                      <div><span className="text-xs font-bold text-textMuted uppercase block mb-0.5">{t('modal.financials')}</span><p className="text-sm text-textMain font-medium leading-relaxed">Toplanan fon sadece projenin ana giderlerinde kullanılır.</p></div>
                      <div><span className="text-xs font-bold text-textMuted uppercase block mb-0.5">{t('modal.trust')}</span><p className="text-sm text-textMain font-medium leading-relaxed">Uluslararası Bağımsız Denetim Firması tarafından raporlama.</p></div>
                    </div>
                    <button onClick={() => setShowDetails(false)} className="text-textMuted font-bold text-xs flex items-center hover:text-textMain mt-4">
                      {t('modal.shrink')}
                    </button>
                  </div>
                )}

                {!isCharity && !isKarz && (
                  <div className="flex gap-4 mt-6">
                    <div className="bg-primary/10 px-4 py-3 rounded-xl border border-primary/20 flex-1">
                      <span className="text-xs text-primary font-bold uppercase block mb-1">
                        {isEquity ? 'Firma Değeri' : t('modal.annualReturn')}
                      </span>
                      <span className="text-2xl font-black text-primary">
                        {isEquity ? `$${(project.valuation / 1000000).toFixed(1)}M` : `%${project.returnRate}`}
                      </span>
                    </div>
                    <div className="bg-background px-4 py-3 rounded-xl border border-borderBase flex-1">
                      <span className="text-xs text-textMuted font-bold uppercase block mb-1">
                        {isEquity ? 'Alınan Pay' : t('modal.riskClass')}
                      </span>
                      <span className="text-2xl font-black text-textMain">
                        {isEquity ? `%${((amount / (project.valuation || 1)) * 100).toFixed(4)}` : project.risk}
                      </span>
                    </div>
                  </div>
                )}

                {isKarz && (
                  <div className="bg-primary/10 px-4 py-3 rounded-xl border border-primary/20 mt-6">
                     <span className="text-xs text-primary font-bold uppercase block mb-1">Yatırım Modeli</span>
                     <span className="text-2xl font-black text-primary flex items-center"><HeartHandshake className="w-5 h-5 mr-2"/> Karz-ı Hasen (Sıfır Kazanç)</span>
                     <span className="text-sm text-textMain mt-1 block">Yatırdığınız anapara, proje sonunda tarafınıza iade edilir. İyilik temelli finansmandır.</span>
                  </div>
                )}
              </div>

              {!isCharity && (
                <div className="bg-background border border-borderBase rounded-2xl p-6 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
                  <h4 className="font-bold text-textMain mb-6 flex items-center">
                    <Calculator className="w-5 h-5 mr-2 text-primary" /> {t('modal.simulator')}
                  </h4>

                  <div className="mb-5">
                    {isEquity ? (
                      <div className="flex gap-4">
                        <div className="flex-1">
                          <label className="block text-xs font-bold text-textMuted uppercase tracking-wider mb-2">Hisse Fiyatı</label>
                          <div className="input font-mono text-xl font-bold bg-surface/50 text-textMuted flex items-center h-[52px]">
                            ${sharePrice.toLocaleString()}
                          </div>
                        </div>
                        <div className="flex-1">
                          <label className="block text-xs font-bold text-textMuted uppercase tracking-wider mb-2">Lot Adedi</label>
                          <input
                            type="number"
                            min="1"
                            value={lotAmount}
                            onChange={(e) => setLotAmount(e.target.value)}
                            className="input font-mono text-xl font-bold bg-surface"
                          />
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex justify-between items-center mb-2">
                          <label className="block text-xs font-bold text-textMuted uppercase tracking-wider">{t('modal.investAmount')}</label>
                        </div>
                        <input
                          type="number"
                          value={investAmount}
                          onChange={(e) => setInvestAmount(e.target.value)}
                          className="input font-mono text-xl font-bold bg-surface"
                        />
                      </>
                    )}
                  </div>

                  <div className="space-y-3 text-textMain mt-6">
                    <div className="flex justify-between items-center pb-3 border-b border-borderBase">
                      <span className="text-sm font-semibold text-textMuted">{t('modal.principal')}</span>
                      <span className="font-mono font-bold">${amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-borderBase">
                      <span className="text-sm font-semibold text-secondary">
                        {isKarz ? 'Karz-ı Hasen Getirisi:' : (isEquity ? 'Hedeflenen Çıkış Değeri (2.5x):' : `${t('modal.estProfit')} (+%${project.returnRate}):`)}
                      </span>
                      <span className="font-mono font-bold text-secondary">+${profit.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-base font-black">{t('modal.totalEnd')}</span>
                      <span className="font-mono font-black text-2xl text-primary">${total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                    </div>
                  </div>
                </div>
              )}

              {isCharity && (
                <div className="bg-background border border-borderBase rounded-2xl p-6 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-[#10b981]"></div>
                  <h4 className="font-bold text-textMain mb-6 flex items-center">
                    <Heart className="w-5 h-5 mr-2 text-[#10b981]" /> Bağış Detayları
                  </h4>
                  <div className="mb-5">
                    <label className="block text-xs font-bold text-textMuted uppercase tracking-wider mb-2">Bağış Miktarı ($)</label>
                    <input
                      type="number"
                      min="1"
                      value={investAmount}
                      onChange={(e) => setInvestAmount(e.target.value)}
                      className="input font-mono text-2xl font-bold bg-surface text-[#10b981] border-[#10b981]/30 focus:border-[#10b981]"
                    />
                  </div>

                  <div className="mt-6 pt-6 border-t border-borderBase">
                    <label className="flex items-center cursor-pointer group">
                      <div className="relative flex items-center justify-center w-6 h-6 mr-3">
                        <input
                          type="checkbox"
                          className="sr-only"
                          checked={isRecurring}
                          onChange={(e) => setIsRecurring(e.target.checked)}
                        />
                        <div className={`w-6 h-6 rounded border transition-colors flex items-center justify-center ${isRecurring ? 'bg-[#10b981] border-[#10b981]' : 'bg-surface border-borderBase group-hover:border-[#10b981]/50'}`}>
                          {isRecurring && <CheckCircle className="w-4 h-4 text-white" />}
                        </div>
                      </div>
                      <div>
                        <span className="block text-sm font-bold text-textMain">Her Ay Düzenli Bağış Yap</span>
                        <span className="block text-xs text-textMuted mt-0.5">Kredi kartı ekstremden her ay bu tutar otomatik çekilsin.</span>
                      </div>
                    </label>
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col justify-between">
              {!isCharity ? (
                <div className="bg-background rounded-2xl p-8 flex flex-col items-center justify-center border border-borderBase flex-1 relative overflow-hidden shadow-inner min-h-[300px]">
                  <h4 className="text-textMuted font-bold uppercase tracking-widest text-xs mb-8 absolute top-6 left-6">{t('modal.projection')}</h4>

                  <div className="w-full max-w-sm mt-6">
                    <div className="flex justify-between text-sm font-bold mb-3">
                      <span className="text-textMuted">Yatırım Tutarı</span>
                      <span className="text-textMain">${amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                    </div>

                    {/* Horizontal Stacked Bar */}
                    <div className="w-full h-10 bg-surface rounded-lg flex overflow-hidden shadow-inner relative group cursor-crosshair">
                      {/* Principal Bar */}
                      <div
                        className="bg-borderBase h-full flex items-center justify-center relative transition-all duration-700 ease-out border-r border-background/20"
                        style={{ width: `${(amount / (total || 1)) * 100}%` }}
                        title={`Ana Para: $${amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
                      >
                        <span className="text-[10px] font-bold text-textMuted group-hover:text-textMain transition-colors">ANA PARA</span>
                      </div>

                      {/* Profit Bar */}
                      {!isKarz && (
                        <div
                          className="bg-gradient-to-r from-[#10b981] to-[#34d399] h-full flex items-center justify-center relative transition-all duration-700 ease-out"
                          style={{ width: `${(profit / (total || 1)) * 100}%` }}
                          title={`Kâr: +$${profit.toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
                        >
                          <span className="text-[10px] font-black text-background opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap px-1">+ KÂR</span>
                        </div>
                      )}
                    </div>

                    <div className="flex justify-between text-sm font-bold mt-4 pb-4 border-b border-borderBase/50">
                      <span className="text-[#10b981]">{isKarz ? 'Karz-ı Hasen Kazancı' : (isEquity ? 'Tahmini Getiri (2.5x)' : `Tahmini Kazanç (+%${project.returnRate})`)}</span>
                      <span className="text-[#10b981]">+${profit.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                    </div>

                    <div className="mt-4 pt-2 flex justify-between items-center">
                      <span className="text-base font-black text-textMain">Dönem Sonu Toplam</span>
                      <span className="text-2xl font-black text-[#10b981]">${total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-background rounded-2xl p-8 flex flex-col items-center justify-center border border-borderBase flex-1 relative overflow-hidden text-center min-h-[300px]">
                  <HeartHandshake className="w-24 h-24 text-[#10b981]/20 mb-6" />
                  <h4 className="text-xl font-bold text-textMain mb-2">{isRecurring ? 'Düzenli İyilik Elçisi' : 'İyiliğe Ortak Olun'}</h4>
                  <p className="text-textMuted text-sm leading-relaxed">
                    {isRecurring
                      ? `Her ay düzenli olarak yapacağınız güçlü destek ($${amount.toLocaleString()}) ile iyiliği sürdürülebilir kılıyorsunuz.`
                      : `Yapacağınız $${amount.toLocaleString()} tutarındaki bağış, %100 şeffaflık ilkesiyle doğrudan ihtiyaç sahiplerine ulaştırılacaktır.`}
                  </p>
                </div>
              )}

              <div className="mt-8">
                <button
                  className={`w-full text-lg py-4 ${isCharity ? 'bg-[#10b981] hover:bg-[#10b981]/90 text-white font-bold rounded-xl flex items-center justify-center transition-all' : 'btn-primary'}`}
                  onClick={() => onProceedToPayment(project, amount, isRecurring)}
                >
                  <HeartHandshake className="w-6 h-6 mr-2" /> {isCharity ? (isRecurring ? 'Düzenli Bağışı Başlat' : 'Bağışı Tamamla') : (isKarz ? 'Karz-ı Hasen İşlemini Tamamla' : t('modal.confirm'))}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  /* ── HEADER ── */
  const Header = () => (
    <header className="nav-glass fixed top-0 w-full z-50">
      <div className="container">
        <div className="flex justify-between items-center h-20">

          <div className="flex items-center cursor-pointer group" onClick={() => setActiveTab('home')}>
            <div className="w-10 h-10 mr-3 flex items-center justify-center transition-transform group-hover:scale-105">
              <img src="/logo.png" alt="FundNova Logo" className="w-full h-full object-contain filter drop-shadow-md" />
            </div>
            <span className="text-xl font-black text-textMain tracking-tight group-hover:text-primary transition-colors font-display">
              FundNova
            </span>
          </div>

          <nav className="hidden lg:flex space-x-2">
            {[
              { id: 'home', label: t('nav.home') },
              { id: 'debt', label: t('nav.debt') },
              { id: 'equity', label: t('nav.equity') },
              { id: 'charity', label: t('nav.charity') },
              { id: 'exchange', label: t('nav.exchange') },
              { id: 'risk', label: 'Risk Sınıfları' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${activeTab === tab.id
                  ? 'bg-primary/10 text-primary shadow-sm border border-primary/20'
                  : 'text-textMuted hover:text-primary hover:bg-surface'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <div className="relative flex items-center bg-surface border border-borderBase rounded-lg px-2 hover:border-primary/50 transition-colors">
              <Globe className="w-4 h-4 text-textMuted mr-1" />
              <select onChange={changeLanguage} value={i18n.language} className="bg-transparent outline-none text-sm font-bold text-textMain py-2 cursor-pointer appearance-none pr-2">
                <option value="tr" className="bg-surface text-textMain">TR</option>
                <option value="en" className="bg-surface text-textMain">EN</option>
                <option value="ar" className="bg-surface text-textMain">AR</option>
                <option value="ur" className="bg-surface text-textMain">UR</option>
                <option value="ms" className="bg-surface text-textMain">MS</option>
                <option value="fr" className="bg-surface text-textMain">FR</option>
                <option value="ru" className="bg-surface text-textMain">RU</option>
              </select>
            </div>

            {userProfile ? (
              <button onClick={() => setActiveTab('dashboard')} className={`flex items-center px-4 py-2 rounded-lg text-sm font-bold transition-all duration-200 ${activeTab === 'dashboard' ? 'bg-accent/10 text-accent border border-accent/30' : 'text-accent border border-accent/30 hover:bg-accent/10'}`}>
                <LayoutDashboard className="w-4 h-4 mr-2" /> {t('nav.dashboard')}
              </button>
            ) : (
              <>
                <button onClick={() => setActiveTab('about')} className={`hidden md:flex items-center px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${activeTab === 'about' ? 'text-primary' : 'text-textMuted hover:text-primary'}`}>
                  <Info className="w-4 h-4 mr-1.5" /> {t('nav.about')}
                </button>
                <button onClick={() => setActiveTab('register')} className="btn-primary text-sm py-2">
                  <User className="w-4 h-4 mr-2" /> {t('nav.register')}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );

  /* ── HOME TAB ── */
  const HomeTab = () => (
    <div className="animate-in fade-in duration-500">
      <div className="hero-bg relative overflow-hidden border-b border-borderBase">
        <div className="container py-[120px] lg:py-[160px] relative z-10 flex flex-col items-center text-center">

          <div className="animate-on-scroll relative w-32 h-32 md:w-40 md:h-40 mb-8 flex items-center justify-center">
            <img src="/logo.png" alt="FundNova Logo" className="w-full h-full object-contain filter drop-shadow-[0_0_15px_rgba(56,189,248,0.4)]" />
          </div>

          <span className="animate-on-scroll inline-flex items-center px-4 py-1.5 rounded-full text-sm font-bold bg-primary/10 text-primary mb-8 border border-primary/20 backdrop-blur-sm">
            <ShieldCheck className="w-4 h-4 mr-2" /> {t('common.compliance')}
          </span>

          <h1 className="animate-on-scroll stagger-1 fluid-h1 font-black text-textMain tracking-tight mb-8 max-w-4xl">
            {t('home.title1')} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              {t('home.title2')}
            </span>
          </h1>

          <p className="animate-on-scroll stagger-2 text-xl text-textMuted mb-12 max-w-2xl leading-relaxed">
            {t('home.desc')}
          </p>

          <div className="animate-on-scroll stagger-3 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setActiveTab('debt')}
              className="btn-primary text-lg px-8 py-4"
            >
              {t('home.exploreBtn')} <ArrowUpRight className="ml-2 w-5 h-5" />
            </button>
            <button
              onClick={() => setActiveTab('exchange')}
              className="btn-ghost text-lg px-8 py-4"
            >
              <LineChart className="w-5 h-5 mr-3 text-primary" /> {t('home.marketBtn')}
            </button>
          </div>
        </div>
      </div>

      <div className="container py-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { label: t('stats.fund'), value: '$45M+', icon: <Activity /> },
            { label: t('stats.projects'), value: '350+', icon: <Building2 /> },
            { label: t('stats.users'), value: '85.000+', icon: <Users /> },
            { label: t('stats.countries'), value: '12', icon: <Globe /> },
          ].map((stat, i) => (
            <div key={i} className={`card animate-on-scroll stagger-${i + 1} flex flex-col items-center text-center`}>
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 border border-primary/20">
                {React.cloneElement(stat.icon, { className: 'w-7 h-7 text-primary' })}
              </div>
              <h3 className="text-4xl font-black text-textMain mb-2 font-display">{stat.value}</h3>
              <p className="text-textMuted font-semibold">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  /* ── ABOUT TAB ── */
  const AboutTab = () => (
    <div className="container py-16 animate-in fade-in duration-500 space-y-20">
      {/* Vizyon ve Misyon */}
      <div className="max-w-4xl mx-auto card relative overflow-hidden text-center">
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-primary/20 rounded-full blur-[80px] pointer-events-none"></div>
        <div className="w-20 h-20 bg-primary/10 border border-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-8">
          <Info className="w-10 h-10 text-primary" />
        </div>
        <h2 className="fluid-h2 font-black text-textMain mb-6">Vizyonumuz ve Misyonumuz</h2>
        <p className="text-xl text-textMuted leading-relaxed mb-6 font-medium">
          FundNova, yatırımcılar ile yenilikçi projeleri buluşturan ve tamamen İslami finans prensiplerine uygun olarak çalışan küresel bir kitle fonlama ekosistemidir.
          Amacımız, faizsiz finansı sadece bir alternatif olmaktan çıkarıp; ana akım, güvenilir ve herkes için erişilebilir bir küresel standart haline getirmektir.
        </p>
        <p className="text-lg text-textMuted leading-relaxed">
          Şeffaflık, güven ve değer odaklı yatırım anlayışımızla; Sukuk, Murabaha ve Girişim Sermayesi gibi faizsiz enstrümanları en gelişmiş modern teknoloji ile harmanlıyor, geleceğin finansal altyapısını sağlam temeller üzerine inşa ediyoruz.
        </p>
      </div>

      {/* Yönetim Kurulu */}
      <div>
        <div className="mb-12 text-center">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-bold bg-primary/10 text-primary mb-4 border border-primary/20">
            <Users className="w-4 h-4 mr-2" /> Liderlik
          </span>
          <h3 className="text-3xl md:text-4xl font-black text-textMain">Yönetim Kurulu</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="card text-center flex flex-col items-center hover:border-primary/50 transition-colors group">
            <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-surface shadow-xl mb-6 relative">
              <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors z-10"></div>
              <img src="/Screenshot_1.png" alt="Yusuf Gataullin" className="w-full h-full object-cover bg-background" onError={(e) => { e.target.src = 'https://ui-avatars.com/api/?name=Yusuf+Gataullin&background=random'; }} />
            </div>
            <h4 className="text-2xl font-black text-textMain mb-1">Yusuf Gataullin</h4>
            <p className="text-primary font-bold text-sm uppercase tracking-widest">Kurucu Ortak & CEO</p>
          </div>

          <div className="card text-center flex flex-col items-center hover:border-primary/50 transition-colors group">
            <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-surface shadow-xl mb-6 relative">
              <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors z-10"></div>
              <img src="/Screenshot_2.png" alt="Yavuz Selim Şengül" className="w-full h-full object-cover bg-background" onError={(e) => { e.target.src = 'https://ui-avatars.com/api/?name=Yavuz+Selim&background=random'; }} />
            </div>
            <h4 className="text-2xl font-black text-textMain mb-1">Yavuz Selim Şengül</h4>
            <p className="text-primary font-bold text-sm uppercase tracking-widest">Kurucu Ortak & CTO</p>
          </div>

          <div className="card text-center flex flex-col items-center hover:border-primary/50 transition-colors group">
            <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-surface shadow-xl mb-6 relative">
              <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors z-10"></div>
              <img src="/taha.jpg" alt="Taha Övüt" className="w-full h-full object-cover bg-background" onError={(e) => { e.target.src = 'https://ui-avatars.com/api/?name=Taha+Övüt&background=random'; }} />
            </div>
            <h4 className="text-2xl font-black text-textMain mb-1">Taha Övüt</h4>
            <p className="text-primary font-bold text-sm uppercase tracking-widest">Kurucu Ortak & COO</p>
          </div>
        </div>
      </div>

      {/* Yatırım Ekibi */}
      <div>
        <div className="mb-12 text-center">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-bold bg-accent/10 text-accent mb-4 border border-accent/20">
            <ShieldCheck className="w-4 h-4 mr-2" /> Denetim
          </span>
          <h3 className="text-3xl md:text-4xl font-black text-textMain">Yatırım Ekibi</h3>
          <p className="text-textMuted max-w-2xl mx-auto mt-4 text-lg">Emtia ve ticaret bazlı yatırımların güvencesini sağlamak, tedarik süreçlerini denetlemek ve riskleri minimize etmekle görevli uzman ekibimiz.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="card text-center flex flex-col items-center bg-surface hover:shadow-lg transition-all duration-300">
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-accent/30 mb-4">
              <img src="/oktay-solmaz.png" alt="Oktay Solmaz" className="w-full h-full object-cover" />
            </div>
            <h4 className="text-xl font-bold text-textMain mb-1">Oktay Solmaz</h4>
            <p className="text-accent font-semibold text-xs uppercase tracking-wider mb-4">Tahsis Yöneticisi</p>
            <p className="text-sm text-textMuted leading-relaxed">Tedarikçi anlaşmaları ve fon onay süreçlerinin risk analizi ve uçtan uca takibi.</p>
          </div>

          <div className="card text-center flex flex-col items-center bg-surface hover:shadow-lg transition-all duration-300">
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-accent/30 mb-4">
              <img src="/ugur-cicek.png" alt="Uğur Çiçek" className="w-full h-full object-cover" />
            </div>
            <h4 className="text-xl font-bold text-textMain mb-1">Uğur Çiçek</h4>
            <p className="text-accent font-semibold text-xs uppercase tracking-wider mb-4">Operasyon Denetmeni</p>
            <p className="text-sm text-textMuted leading-relaxed">Murabaha işlemlerindeki satınalma, faturalandırma ve şeffaflık uygunluklarının denetimi.</p>
          </div>

          <div className="card text-center flex flex-col items-center bg-surface hover:shadow-lg transition-all duration-300">
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-accent/30 mb-4">
              <img src="/ugur-dogan.png" alt="Uğur Doğan" className="w-full h-full object-cover" />
            </div>
            <h4 className="text-xl font-bold text-textMain mb-1">Uğur Doğan</h4>
            <p className="text-accent font-semibold text-xs uppercase tracking-wider mb-4">Risk Analisti</p>
            <p className="text-sm text-textMuted leading-relaxed">Projelerin nakit akışı ve geri dönüş modellerinin değerlendirilmesi.</p>
          </div>
        </div>
      </div>

      {/* Danışma Kurulu */}
      <div>
        <div className="mb-12 text-center">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-bold bg-[#10b981]/10 text-[#10b981] mb-4 border border-[#10b981]/20">
            <Building2 className="w-4 h-4 mr-2" /> Şer'i Uyum
          </span>
          <h3 className="text-3xl md:text-4xl font-black text-textMain">Danışma Kurulu</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="card border-t-4 border-[#10b981] bg-surface hover:-translate-y-1 transition-transform">
            <h4 className="text-xl font-bold text-textMain mb-2">Prof. Dr. İbrahim Halil</h4>
            <p className="text-[#10b981] font-bold text-xs uppercase tracking-wider mb-4">Fıkıh Kurulu Başkanı</p>
            <p className="text-sm text-textMuted leading-relaxed">İslami finans sözleşmelerinin şeriata uygunluk onayını sağlayan ve icazet belgelerini düzenleyen baş danışman.</p>
          </div>

          <div className="card border-t-4 border-[#10b981] bg-surface hover:-translate-y-1 transition-transform">
            <h4 className="text-xl font-bold text-textMain mb-2">Dr. Mustafa Kaya</h4>
            <p className="text-[#10b981] font-bold text-xs uppercase tracking-wider mb-4">Şer'i Risk Uzmanı</p>
            <p className="text-sm text-textMuted leading-relaxed">Finansal modellemelerin fıkhi sürdürülebilirliğini ve dönemsel denetimlerini yönetir.</p>
          </div>

          <div className="card border-t-4 border-[#10b981] bg-surface hover:-translate-y-1 transition-transform">
            <h4 className="text-xl font-bold text-textMain mb-2">Ali Rıza Can</h4>
            <p className="text-[#10b981] font-bold text-xs uppercase tracking-wider mb-4">Bağımsız Denetçi</p>
            <p className="text-sm text-textMuted leading-relaxed">Uluslararası kitle fonlama pazarında İslami kurallara uygun fon akışını denetleyen kıdemli analist.</p>
          </div>
        </div>
      </div>

      {/* Sertifikalar ve Onaylar */}
      <div>
        <div className="mb-12 text-center">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-bold bg-primary/10 text-primary mb-4 border border-primary/20">
            <ShieldCheck className="w-4 h-4 mr-2" /> Güven ve Şeffaflık
          </span>
          <h3 className="text-3xl md:text-4xl font-black text-textMain">Sertifikalar ve Onaylar</h3>
          <p className="text-textMuted max-w-2xl mx-auto mt-4 text-lg">
            Platformumuz, uluslararası geçerliliğe sahip bağımsız denetim kuruluşları ve bankalar tarafından onaylanmış sertifikalara sahiptir.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* IsDB Onayı */}
          <div className="card border border-borderBase bg-surface flex items-start p-8 hover:border-primary/50 transition-colors group">
            <div className="w-16 h-16 rounded-full bg-surface flex items-center justify-center flex-shrink-0 mr-6 group-hover:scale-110 transition-transform border border-borderBase overflow-hidden shadow-sm">
              <img src="/indir.jpg" alt="IsDB Logo" className="w-full h-full object-contain p-1" />
            </div>
            <div>
              <h4 className="text-xl font-bold text-textMain mb-2">İslam Kalkınma Bankası (IsDB) Onaylı</h4>
              <p className="text-sm text-textMuted leading-relaxed">
                Platformumuz, İslam Kalkınma Bankası'nın belirlediği faizsiz finans kriterlerine tam uyumluluk göstermekte olup, proje fonlama süreçlerindeki şeffaflık nedeniyle resmi sertifika ve destek ile ödüllendirilmiştir.
              </p>
            </div>
          </div>

          {/* AAOIFI Onayı */}
          <div className="card border border-borderBase bg-surface flex items-start p-8 hover:border-[#10b981]/50 transition-colors group">
            <div className="w-16 h-16 rounded-full bg-surface flex items-center justify-center flex-shrink-0 mr-6 group-hover:scale-110 transition-transform border border-borderBase overflow-hidden shadow-sm">
              <img src="/111.png" alt="AAOIFI Logo" className="w-full h-full object-contain p-1" />
            </div>
            <div>
              <h4 className="text-xl font-bold text-textMain mb-2">AAOIFI Şer'i Uygunluk Sertifikası</h4>
              <p className="text-sm text-textMuted leading-relaxed">
                İslami Finans Kuruluşları Muhasebe ve Denetim Kurumu (AAOIFI) standartlarına tam entegre çalışıyoruz. Tüm akıllı sözleşme süreçlerimiz bağımsız İslami denetim komitelerince düzenli olarak denetlenmekte ve onaylanmaktadır.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  /* ── REGISTER TAB (MULTI-STEP & RISK TEST) ── */
  const RegisterTab = () => {
    const [step, setStep] = useState(1);
    const [role, setRole] = useState(null);
    const [answers, setAnswers] = useState({ q1: null, q2: null, q3: null });
    const [isCreatingWallet, setIsCreatingWallet] = useState(false);
    const [walletCreated, setWalletCreated] = useState(false);

    const handleFinish = () => {
      setIsCreatingWallet(true);
      
      setTimeout(() => {
        setWalletCreated(true);
        setTimeout(() => {
          let profile = 'micro';
          if (role === 'corp') profile = 'corp';
          else if (role === 'ngo') profile = 'ngo';
          else if (answers.q3 === 'a3_2') profile = 'macro';

          setUserProfile(profile);
          setActiveTab('dashboard');
        }, 1500);
      }, 3000);
    };

    return (
      <div className="container py-16 animate-in fade-in duration-500">
        <div className="max-w-xl mx-auto card relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent"></div>

          {isCreatingWallet ? (
            <div className="py-12 flex flex-col items-center justify-center text-center animate-in fade-in duration-500">
              {!walletCreated ? (
                <>
                  <div className="relative mb-8">
                    <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse"></div>
                    <div className="w-20 h-20 bg-surface border-2 border-primary/50 rounded-full flex items-center justify-center relative z-10 animate-[spin_3s_linear_infinite]">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center animate-[spin_3s_linear_infinite_reverse]">
                        <Wallet className="w-8 h-8 text-primary animate-pulse" />
                      </div>
                    </div>
                  </div>
                  <h3 className="text-2xl font-black text-textMain mb-4">Web3 Cüzdanınız Oluşturuluyor</h3>
                  <p className="text-textMuted max-w-sm mx-auto leading-relaxed">
                    Akıllı sertifikalarınızı ve hisselerinizi güvenle saklayabilmeniz için kişisel blokzincir cüzdanınız (Account Abstraction) arka planda otomatik olarak oluşturuluyor... Lütfen bekleyin.
                  </p>
                </>
              ) : (
                <div className="animate-in zoom-in-95 duration-300">
                  <div className="w-20 h-20 bg-[#10b981]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-[#10b981]" />
                  </div>
                  <h3 className="text-2xl font-black text-[#10b981] mb-2">Cüzdanınız Hazır!</h3>
                  <p className="text-textMuted">Dashboard'a yönlendiriliyorsunuz...</p>
                </div>
              )}
            </div>
          ) : (
            <>
              <div className="bg-primary/10 border border-primary/20 rounded-xl p-5 mb-8 flex items-start animate-in fade-in slide-in-from-top-4">
                <Wallet className="w-6 h-6 text-primary flex-shrink-0 mr-3 mt-0.5 animate-pulse" />
                <div>
                  <h4 className="text-sm font-bold text-textMain mb-1">Web3 Altyapısı ile Tam Şeffaflık</h4>
                  <p className="text-xs text-textMuted leading-relaxed">
                    Kayıt işlemini tamamladığınızda adınıza otomatik olarak güvenli bir <strong>Blokzincir Cüzdanı (Account Abstraction)</strong> oluşturulacaktır. Tüm yatırımlarınız, akıllı sertifikalarınız ve hisseleriniz %100 şeffaflıkla bu cüzdanda saklanacak ve ikincil piyasa işlemleri buradan yapılacaktır.
                  </p>
                </div>
              </div>

              {step === 1 && (
                <div>
                  <h2 className="fluid-h2 font-black text-textMain mb-10 text-center">{t('registerFlow.step1')}</h2>
              <div className="space-y-4">
                <button onClick={() => { setRole('indiv'); setStep(2); }} className="w-full card border border-borderBase hover:border-primary transition-colors flex items-center p-6 bg-background">
                  <User className="w-8 h-8 text-primary mr-4" />
                  <span className="text-xl font-bold text-textMain">{t('registerFlow.indiv')}</span>
                  <ChevronRight className="w-6 h-6 ml-auto text-textMuted" />
                </button>
                <button onClick={() => { setRole('corp'); setStep(2); }} className="w-full card border border-borderBase hover:border-primary transition-colors flex items-center p-6 bg-background">
                  <Briefcase className="w-8 h-8 text-primary mr-4" />
                  <span className="text-xl font-bold text-textMain">{t('registerFlow.corp')}</span>
                  <ChevronRight className="w-6 h-6 ml-auto text-textMuted" />
                </button>
                <button onClick={() => { setRole('ngo'); setStep(2); }} className="w-full card border border-borderBase hover:border-primary transition-colors flex items-center p-6 bg-background">
                  <Heart className="w-8 h-8 text-primary mr-4" />
                  <span className="text-xl font-bold text-textMain">{t('registerFlow.ngo')}</span>
                  <ChevronRight className="w-6 h-6 ml-auto text-textMuted" />
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="animate-in slide-in-from-right-4">
              <button onClick={() => setStep(1)} className="text-textMuted hover:text-primary flex items-center mb-6 text-sm font-bold"><ChevronLeft className="w-4 h-4 mr-1" /> {t('registerFlow.back')}</button>
              <h2 className="text-2xl font-black text-textMain mb-8">{t('registerFlow.step2')}</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-textMuted mb-2 uppercase tracking-wider">{t('register.name')}</label>
                  <input type="text" className="input" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-textMuted mb-2 uppercase tracking-wider">{t('register.email')}</label>
                  <input type="email" className="input" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-textMuted mb-2 uppercase tracking-wider">{t('register.pass')}</label>
                  <input type="password" className="input" />
                </div>
                <button onClick={() => role === 'indiv' ? setStep(3) : handleFinish()} className="w-full btn-primary text-lg mt-4 py-4">
                  {role === 'indiv' ? t('registerFlow.next') : t('registerFlow.finish')}
                </button>
              </div>
            </div>
          )}

          {step === 3 && role === 'indiv' && (
            <div className="animate-in slide-in-from-right-4">
              <button onClick={() => setStep(2)} className="text-textMuted hover:text-primary flex items-center mb-6 text-sm font-bold"><ChevronLeft className="w-4 h-4 mr-1" /> {t('registerFlow.back')}</button>
              <h2 className="text-2xl font-black text-textMain mb-8 flex items-center"><AlertTriangle className="w-6 h-6 text-[#f59e0b] mr-3" /> {t('registerFlow.step3')}</h2>

              <div className="space-y-8">
                <div>
                  <h4 className="text-textMain font-bold mb-4">{t('registerFlow.q1')}</h4>
                  <div className="flex gap-4">
                    <button onClick={() => setAnswers({ ...answers, q1: 'a1_1' })} className={`flex-1 py-3 px-4 rounded-xl border font-bold text-sm transition-colors ${answers.q1 === 'a1_1' ? 'bg-primary/10 border-primary text-primary' : 'bg-background border-borderBase text-textMuted'}`}>{t('registerFlow.a1_1')}</button>
                    <button onClick={() => setAnswers({ ...answers, q1: 'a1_2' })} className={`flex-1 py-3 px-4 rounded-xl border font-bold text-sm transition-colors ${answers.q1 === 'a1_2' ? 'bg-primary/10 border-primary text-primary' : 'bg-background border-borderBase text-textMuted'}`}>{t('registerFlow.a1_2')}</button>
                  </div>
                </div>

                <div>
                  <h4 className="text-textMain font-bold mb-4">{t('registerFlow.q2')}</h4>
                  <div className="flex flex-col gap-3">
                    <button onClick={() => setAnswers({ ...answers, q2: 'a2_1' })} className={`py-3 px-4 rounded-xl border font-bold text-sm text-left transition-colors ${answers.q2 === 'a2_1' ? 'bg-primary/10 border-primary text-primary' : 'bg-background border-borderBase text-textMuted'}`}>{t('registerFlow.a2_1')}</button>
                    <button onClick={() => setAnswers({ ...answers, q2: 'a2_2' })} className={`py-3 px-4 rounded-xl border font-bold text-sm text-left transition-colors ${answers.q2 === 'a2_2' ? 'bg-primary/10 border-primary text-primary' : 'bg-background border-borderBase text-textMuted'}`}>{t('registerFlow.a2_2')}</button>
                    <button onClick={() => setAnswers({ ...answers, q2: 'a2_3' })} className={`py-3 px-4 rounded-xl border font-bold text-sm text-left transition-colors ${answers.q2 === 'a2_3' ? 'bg-primary/10 border-primary text-primary' : 'bg-background border-borderBase text-textMuted'}`}>{t('registerFlow.a2_3')}</button>
                  </div>
                </div>

                <div>
                  <h4 className="text-textMain font-bold mb-4">{t('registerFlow.q3')}</h4>
                  <div className="flex gap-4">
                    <button onClick={() => setAnswers({ ...answers, q3: 'a3_1' })} className={`flex-1 py-3 px-4 rounded-xl border font-bold text-sm transition-colors ${answers.q3 === 'a3_1' ? 'bg-primary/10 border-primary text-primary' : 'bg-background border-borderBase text-textMuted'}`}>{t('registerFlow.a3_1')}</button>
                    <button onClick={() => setAnswers({ ...answers, q3: 'a3_2' })} className={`flex-1 py-3 px-4 rounded-xl border font-bold text-sm transition-colors ${answers.q3 === 'a3_2' ? 'bg-primary/10 border-primary text-primary' : 'bg-background border-borderBase text-textMuted'}`}>{t('registerFlow.a3_2')}</button>
                  </div>
                </div>

                <button
                  disabled={!answers.q1 || !answers.q2 || !answers.q3}
                  onClick={handleFinish}
                  className="w-full btn-primary text-lg mt-8 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {t('registerFlow.finish')}
                </button>
              </div>
            </div>
          )}
          </>
          )}
        </div>
      </div>
    );
  };

  /* ── DASHBOARD TAB ── */
  const DashboardTab = () => {
    if (!userProfile) return null;

    let badgeText, title, AccentIcon, isCorpOrNgo;

    if (userProfile === 'micro') {
      badgeText = t('dashboard.microBadge'); title = t('dashboard.titleIndiv'); AccentIcon = User; isCorpOrNgo = false;
    } else if (userProfile === 'macro') {
      badgeText = t('dashboard.macroBadge'); title = t('dashboard.titleIndiv'); AccentIcon = TrendingUp; isCorpOrNgo = false;
    } else if (userProfile === 'corp') {
      badgeText = t('dashboard.corpBadge'); title = t('dashboard.titleCorp'); AccentIcon = Briefcase; isCorpOrNgo = true;
    } else {
      badgeText = t('dashboard.ngoBadge'); title = t('dashboard.titleNgo'); AccentIcon = Heart; isCorpOrNgo = true;
    }

    return (
      <div className="container py-16 animate-in fade-in duration-500">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 bg-surface p-8 rounded-2xl border border-borderBase shadow-md">
          <div>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-accent/10 text-accent mb-4 border border-accent/20">
              <AccentIcon className="w-4 h-4 mr-1" /> {badgeText}
            </span>
            <h2 className="fluid-h2 font-black text-textMain">{title}</h2>
            <p className="text-textMuted mt-2">{t('dashboard.welcome')}, Kullanıcı!</p>
          </div>
          {isCorpOrNgo && (
            <button className="btn-primary mt-4 md:mt-0">
              <Megaphone className="w-5 h-5 mr-2" /> {t('dashboard.createCampaign')}
            </button>
          )}
        </div>

        {!isCorpOrNgo ? (
          <div>
            <h3 className="text-2xl font-black text-textMain mb-6 flex items-center">
              <Activity className="w-6 h-6 mr-3 text-primary" /> {t('dashboard.recommendations')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userProfile === 'micro' ? (
                <div className="card border-l-4 border-l-[#10b981] bg-surface">
                  <h4 className="font-bold text-textMain text-lg mb-2">Filistin Çocukları Eğitim Çadırları</h4>
                  <p className="text-textMuted text-sm mb-4">Risk: Çok Düşük | Minimum: $10</p>
                  <button onClick={() => setActiveTab('charity')} className="w-full btn-ghost text-sm py-2 text-[#10b981] border-[#10b981]">İncele</button>
                </div>
              ) : (
                <div className="card border-l-4 border-l-accent bg-surface">
                  <h4 className="font-bold text-textMain text-lg mb-2">GazaTech Mobil Sağlık</h4>
                  <p className="text-textMuted text-sm mb-4">Risk: C (Tohum) | Beklenen Getiri: %35</p>
                  <button onClick={() => setActiveTab('equity')} className="w-full btn-ghost text-sm py-2 text-accent border-accent">İncele</button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="card bg-surface">
                <h3 className="text-xl font-bold text-textMain mb-6 flex items-center border-b border-borderBase pb-4">
                  <LayoutDashboard className="w-5 h-5 mr-3 text-primary" /> {t('dashboard.campaigns')}
                </h3>
                <div className="p-8 text-center text-textMuted border border-dashed border-borderBase rounded-xl bg-background">
                  {t('dashboard.noCampaigns')}
                </div>
              </div>
            </div>
            <div className="space-y-8">
              <div className="card bg-surface">
                <h3 className="text-xl font-bold text-textMain mb-6 flex items-center border-b border-borderBase pb-4">
                  <BarChart3 className="w-5 h-5 mr-3 text-primary" /> {t('dashboard.marketing')}
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-center text-textMain font-medium p-3 hover:bg-background rounded-lg transition-colors cursor-pointer border border-transparent hover:border-borderBase"><TrendingUp className="w-4 h-4 text-primary mr-3" /> SEO & Ads Yönetimi</li>
                  <li className="flex items-center text-textMain font-medium p-3 hover:bg-background rounded-lg transition-colors cursor-pointer border border-transparent hover:border-borderBase"><Users className="w-4 h-4 text-primary mr-3" /> Yatırımcı E-posta Bülteni</li>
                  <li className="flex items-center text-textMain font-medium p-3 hover:bg-background rounded-lg transition-colors cursor-pointer border border-transparent hover:border-borderBase"><Activity className="w-4 h-4 text-primary mr-3" /> {t('dashboard.analytics')}</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  /* ── DEBT TAB ── */
  const DebtTab = () => {
    const projects = [
      { id: 1, company: "LogiSpeed A.Ş.", title: "Körfez Lojistik Filo Büyümesi", desc: "Genişleyen operasyonlar için yeni ticari araç alımı finansmanı.", returnRate: 14.5, risk: "A-", raised: 125000, target: 150000, type: "İcara Sukuk", image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1470" },
      { id: 2, company: "GreenEnergy Ltd.", title: "Güneş Paneli Ekipman Alımı", desc: "Yenilenebilir enerji santrali kurulumu için hammadde alımı.", returnRate: 16.0, risk: "B+", raised: 45000, target: 100000, type: "Emtia Murabaha", image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1472" },
      { id: 3, company: "El-Amel İnşaat", title: "Gazze Acil Prefabrik Konut Üretimi", desc: "Gazze'deki evsiz kalan siviller için prefabrik yaşam alanları üretiminde hammadde alım finansmanı.", returnRate: 11.5, risk: "B", raised: 85000, target: 200000, type: "Murabaha", image: "https://images.unsplash.com/photo-1541888086925-920a0b672727?q=80&w=1470" },
      { id: 4, company: "Gaza Altyapı A.Ş.", title: "Güneş Enerjili Mobil Su Arıtma", desc: "Tahrip olan su şebekesine alternatif taşınabilir güneş enerjili su arıtma tesisleri.", returnRate: 13.0, risk: "B-", raised: 120000, target: 150000, type: "İstisna Sukuk", image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=1472" }
    ];

    return (
      <div className="container py-16">
        <div className="mb-16 text-center max-w-3xl mx-auto animate-on-scroll">
          <h2 className="fluid-h2 font-black text-textMain mb-4">{t('nav.debt')}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {projects.map((p, i) => (
            <div key={p.id} className={`card p-0 overflow-hidden flex flex-col animate-on-scroll stagger-${(i % 4) + 1} group`}>
              <div className="relative h-64 overflow-hidden">
                <div className="absolute inset-0 bg-background/20 group-hover:bg-transparent transition-colors z-10"></div>
                <img src={p.image} alt={p.title} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-4 left-4 bg-background/80 backdrop-blur-md text-primary border border-primary/30 px-4 py-1.5 rounded-lg font-bold text-sm shadow-lg z-20">
                  {p.type}
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col bg-surface">
                <span className="text-xs font-bold uppercase tracking-widest text-textMuted mb-2 block">{p.company}</span>
                <h3 className="text-2xl font-black text-textMain leading-tight mb-4">{p.title}</h3>
                <p className="text-textMuted mb-8 flex-1 leading-relaxed">{p.desc}</p>
                <div className="mb-8 mt-auto">
                  <div className="flex justify-between text-xs font-bold text-textMain mb-2">
                    <span>${p.raised.toLocaleString()}</span>
                    <span className="text-primary">Hedef: ${p.target.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-background rounded-full h-2 overflow-hidden border border-borderBase">
                    <div className="bg-primary h-full rounded-full shadow-[0_0_10px_rgba(56,189,248,0.5)]" style={{ width: `${(p.raised / p.target) * 100}%` }} />
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setActiveProject({ ...p, isKarz: false })} className="flex-1 btn-ghost">
                    {t('common.invest')}
                  </button>
                  <button onClick={() => setActiveProject({ ...p, isKarz: true })} className="flex-1 btn-ghost border-primary text-primary hover:bg-primary/10">
                    Karz-ı Hasen Yap
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  /* ── EQUITY TAB ── */
  const EquityTab = () => {
    const projects = [
      { id: 1, company: "Seri A", title: "PayTech İslami Cüzdan", desc: "Z kuşağı için sıfır faizli akıllı harcama uygulaması.", valuation: 5000000, risk: "C+", raised: 820000, target: 1062500, type: "FinTech / Z Kuşağı", image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1370", isEquity: true, sharePrice: 50, chartPath: "M0,30 Q25,25 40,20 T75,10 T100,0", multiplier: "3.5x" },
      { id: 2, company: "Tohum Yatırımı", title: "GazaTech Mobil Sağlık", desc: "Gazze'deki doktorların dünya çapındaki uzmanlarla çalışmasını sağlayan tele-tıp platformu.", valuation: 2000000, risk: "C", raised: 150000, target: 500000, type: "HealthTech / Gazze", image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1470", isEquity: true, sharePrice: 15, chartPath: "M0,30 C30,20 40,28 60,15 S80,5 100,0", multiplier: "5.0x" },
      { id: 3, company: "Seri A", title: "Bina-AI Hasar Tespit Drone Ağı", desc: "Gazze'deki yıkılan binaların yeniden inşası için 3D haritalama ve hasar tespiti yapan otonom drone filosu.", valuation: 8000000, risk: "C+", raised: 420000, target: 600000, type: "PropTech / AI", image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?q=80&w=1470", isEquity: true, sharePrice: 25, chartPath: "M0,30 Q15,30 30,25 T60,15 T100,0", multiplier: "2.8x" }
    ];

    return (
      <div className="container py-16">
        <div className="mb-16 text-center max-w-3xl mx-auto animate-on-scroll">
          <h2 className="fluid-h2 font-black text-textMain mb-4">{t('nav.equity')}</h2>
        </div>
        <div className="max-w-5xl mx-auto flex flex-col gap-8">
          {projects.map((project, i) => (
            <div key={project.id} className={`card p-0 overflow-hidden flex flex-col md:flex-row group animate-on-scroll stagger-${(i % 3) + 1}`}>
              <div className="md:w-5/12 relative h-72 md:h-auto overflow-hidden">
                <div className="absolute inset-0 bg-background/20 group-hover:bg-transparent transition-colors z-10"></div>
                <img src={project.image} alt={project.title} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-4 left-4 bg-background/80 backdrop-blur-md text-accent border border-accent/30 px-4 py-1.5 rounded-lg font-bold text-sm shadow-lg z-20">
                  {project.type}
                </div>
              </div>
              <div className="p-8 md:p-12 md:w-7/12 flex flex-col justify-center bg-surface">
                <span className="text-xs font-bold uppercase tracking-widest text-primary mb-2 block">{project.company}</span>
                <h3 className="fluid-h3 font-black text-textMain mb-4 leading-tight">{project.title}</h3>
                <p className="text-textMuted text-base mb-6 leading-relaxed">{project.desc}</p>

                {/* Illustrative Graphic (Mini Chart) */}
                <div className="mb-8 bg-background rounded-xl border border-borderBase p-4 flex items-center gap-4">
                  <div className="flex-1">
                    <span className="text-xs font-bold text-textMuted uppercase mb-2 block">Büyüme Projeksiyonu (5 Yıl)</span>
                    <svg className="w-full h-12 overflow-visible" viewBox="0 0 100 30" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id={`grad-eq-${project.id}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#f472b6" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#f472b6" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path d={project.chartPath} fill="none" stroke="#f472b6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d={`${project.chartPath} L100,30 L0,30 Z`} fill={`url(#grad-eq-${project.id})`} stroke="none" />
                    </svg>
                  </div>
                  <div className="text-right flex flex-col justify-center pl-4 border-l border-borderBase">
                    <span className="text-[10px] text-textMuted font-bold uppercase tracking-wider mb-1">Hedef Çarpan</span>
                    <span className="text-2xl font-black text-accent">{project.multiplier}</span>
                  </div>
                </div>

                <div className="mb-8">
                  <div className="flex justify-between text-xs font-bold text-textMain mb-2">
                    <span>${project.raised.toLocaleString()}</span>
                    <span className="text-accent">Hedef: ${project.target.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-background rounded-full h-2 overflow-hidden border border-borderBase">
                    <div className="bg-accent h-full rounded-full shadow-[0_0_10px_rgba(244,114,182,0.5)]" style={{ width: `${(project.raised / project.target) * 100}%` }} />
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setActiveProject({ ...project, isKarz: false })} className="flex-1 btn-primary">
                    {t('common.invest')}
                  </button>
                  <button onClick={() => setActiveProject({ ...project, isKarz: true })} className="flex-1 btn-ghost border-primary text-primary hover:bg-primary/10">
                    Karz-ı Hasen Yap
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  /* ── CHARITY TAB ── */
  const CharityTab = () => (
    <div className="container py-16">
      <div className="mb-16 text-center max-w-3xl mx-auto animate-on-scroll">
        <h2 className="fluid-h2 font-black text-textMain mb-4">{t('nav.charity')}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <div className="card p-0 overflow-hidden flex flex-col group animate-on-scroll stagger-1">
          <div className="relative h-64 overflow-hidden">
            <img src="https://images.unsplash.com/photo-1508847154043-be5407fcaa5a?q=80&w=1374" alt="Su Kuyusu" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute top-4 left-4 bg-background/80 backdrop-blur-md text-[#10b981] border border-[#10b981]/30 px-4 py-1.5 rounded-lg font-bold text-sm shadow-lg z-20 flex items-center">
              <Heart className="w-4 h-4 mr-2" /> Sadaka-i Cariye
            </div>
          </div>
          <div className="p-8 flex-1 flex flex-col bg-surface">
            <span className="text-xs font-bold uppercase tracking-widest text-textMuted mb-2 block">Gazze Umut Güneşi Derneği</span>
            <h3 className="text-2xl font-black text-textMain leading-tight mb-4">Gazze Temiz Su Arıtma Projesi</h3>
            <p className="text-textMuted mb-8 flex-1 leading-relaxed">Yıkılan altyapı sonrası kamplardaki sivillere sürdürülebilir ve güneş enerjisi ile çalışan mobil su arıtma tesislerinin kurulması.</p>
            <button onClick={() => setActiveProject({ id: 'c1', company: 'Gazze Umut Güneşi Derneği', title: 'Gazze Temiz Su Arıtma Projesi', desc: 'Yıkılan altyapı sonrası kamplardaki sivillere sürdürülebilir ve güneş enerjisi ile çalışan mobil su arıtma tesislerinin kurulması.', isCharity: true })} className="w-full btn-ghost border-[#10b981] text-[#10b981] hover:bg-[#10b981]/10 mt-auto">
              <HeartHandshake className="w-5 h-5 mr-2" /> {t('common.donate')}
            </button>
          </div>
        </div>

        <div className="card p-0 overflow-hidden flex flex-col group animate-on-scroll stagger-2">
          <div className="relative h-64 overflow-hidden">
            <img src="https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?q=80&w=1470" alt="Gıda Yardımı" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute top-4 left-4 bg-background/80 backdrop-blur-md text-[#f59e0b] border border-[#f59e0b]/30 px-4 py-1.5 rounded-lg font-bold text-sm shadow-lg z-20 flex items-center">
              <Heart className="w-4 h-4 mr-2" /> Zekata Uygun
            </div>
          </div>
          <div className="p-8 flex-1 flex flex-col bg-surface">
            <span className="text-xs font-bold uppercase tracking-widest text-textMuted mb-2 block">Kudüs İmar ve Eğitim Kooperatifi</span>
            <h3 className="text-2xl font-black text-textMain leading-tight mb-4">Filistin Çocukları Eğitim Çadırları</h3>
            <p className="text-textMuted mb-8 flex-1 leading-relaxed">Okulları yıkılan bölgelerde çocukların eğitimine devam edebilmesi için tam donanımlı teknolojik eğitim çadırları ve materyal desteği.</p>
            <button onClick={() => setActiveProject({ id: 'c2', company: 'Kudüs İmar ve Eğitim Kooperatifi', title: 'Filistin Çocukları Eğitim Çadırları', desc: 'Okulları yıkılan bölgelerde çocukların eğitimine devam edebilmesi için tam donanımlı teknolojik eğitim çadırları ve materyal desteği.', isCharity: true })} className="w-full btn-ghost border-[#f59e0b] text-[#f59e0b] hover:bg-[#f59e0b]/10 mt-auto">
              <HeartHandshake className="w-5 h-5 mr-2" /> {t('common.donate')}
            </button>
          </div>
        </div>

        <div className="card p-0 overflow-hidden flex flex-col group animate-on-scroll stagger-3">
          <div className="relative h-64 overflow-hidden">
            <img src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1453" alt="Hastane Onarımı" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute top-4 left-4 bg-background/80 backdrop-blur-md text-[#38bdf8] border border-[#38bdf8]/30 px-4 py-1.5 rounded-lg font-bold text-sm shadow-lg z-20 flex items-center">
              <Heart className="w-4 h-4 mr-2" /> Sağlık Yardımı
            </div>
          </div>
          <div className="p-8 flex-1 flex flex-col bg-surface">
            <span className="text-xs font-bold uppercase tracking-widest text-textMuted mb-2 block">Filistin Bağımsız Sağlıkçılar Derneği</span>
            <h3 className="text-2xl font-black text-textMain leading-tight mb-4">Konteyner Poliklinik Ağı</h3>
            <p className="text-textMuted mb-8 flex-1 leading-relaxed">Sağlık altyapısı çökmüş bölgelerde, acil müdahale ve birinci basamak sağlık hizmeti verecek mobil konteyner kliniklerin faaliyete geçirilmesi.</p>
            <button onClick={() => setActiveProject({ id: 'c3', company: 'Filistin Bağımsız Sağlıkçılar Derneği', title: 'Konteyner Poliklinik Ağı', desc: 'Sağlık altyapısı çökmüş bölgelerde, acil müdahale ve birinci basamak sağlık hizmeti verecek mobil konteyner kliniklerin faaliyete geçirilmesi.', isCharity: true })} className="w-full btn-ghost border-[#38bdf8] text-[#38bdf8] hover:bg-[#38bdf8]/10 mt-auto">
              <HeartHandshake className="w-5 h-5 mr-2" /> {t('common.donate')}
            </button>
          </div>
        </div>

        <div className="card p-0 overflow-hidden flex flex-col group animate-on-scroll stagger-4">
          <div className="relative h-64 overflow-hidden">
            <img src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1470" alt="Eğitim Çadırı" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute top-4 left-4 bg-background/80 backdrop-blur-md text-[#a855f7] border border-[#a855f7]/30 px-4 py-1.5 rounded-lg font-bold text-sm shadow-lg z-20 flex items-center">
              <Heart className="w-4 h-4 mr-2" /> Eğitim Fonu
            </div>
          </div>
          <div className="p-8 flex-1 flex flex-col bg-surface">
            <span className="text-xs font-bold uppercase tracking-widest text-textMuted mb-2 block">Gazze Yetim Dayanışma Vakfı</span>
            <h3 className="text-2xl font-black text-textMain leading-tight mb-4">Çocuklar İçin Psikososyal Destek Merkezi</h3>
            <p className="text-textMuted mb-8 flex-1 leading-relaxed">Savaş mağduru yetim çocuklara uzun vadeli travma sonrası psikolojik rehabilitasyon ve sanat terapisi sağlanması.</p>
            <button onClick={() => setActiveProject({ id: 'c4', company: 'Gazze Yetim Dayanışma Vakfı', title: 'Çocuklar İçin Psikososyal Destek Merkezi', desc: 'Savaş mağduru yetim çocuklara uzun vadeli travma sonrası psikolojik rehabilitasyon ve sanat terapisi sağlanması.', isCharity: true })} className="w-full btn-ghost border-[#a855f7] text-[#a855f7] hover:bg-[#a855f7]/10 mt-auto">
              <HeartHandshake className="w-5 h-5 mr-2" /> {t('common.donate')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  /* ── RISK TAB ── */
  const RiskTab = () => {
    return (
      <div className="container py-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <ShieldCheck className="w-16 h-16 text-primary mx-auto mb-6" />
          <h2 className="fluid-h2 font-black text-textMain mb-4">Risk Sınıflandırması</h2>
          <p className="text-textMuted text-lg leading-relaxed">
            FundNova platformunda listelenen tüm projeler, uluslararası bağımsız denetim standartlarına göre incelenir ve yatırımcılara şeffaf bir risk profili sunmak için A, B ve C olmak üzere üç ana kategoride sınıflandırılır.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* A Sınıfı */}
          <div className="card bg-surface flex flex-col relative overflow-hidden border border-borderBase group hover:border-[#10b981] transition-colors">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#10b981]/20 to-transparent blur-3xl -z-10 group-hover:from-[#10b981]/40 transition-all"></div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-[#10b981]/10 flex items-center justify-center text-3xl font-black text-[#10b981] border border-[#10b981]/20">A</div>
              <div>
                <h3 className="text-xl font-bold text-textMain">Düşük Risk</h3>
                <span className="text-sm text-textMuted">Düzenli Getiri, Yüksek Güven</span>
              </div>
            </div>
            <p className="text-textMuted mb-6 leading-relaxed flex-1">
              Güçlü bilançoya sahip, köklü firmaların ihraç ettiği veya fiziki varlık (gayrimenkul, ekipman vb.) teminatlı projelerdir.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start text-sm text-textMain"><CheckCircle className="w-5 h-5 text-[#10b981] mr-3 shrink-0" /> Anapara kaybı ihtimali çok düşüktür.</li>
              <li className="flex items-start text-sm text-textMain"><CheckCircle className="w-5 h-5 text-[#10b981] mr-3 shrink-0" /> Sabit ve öngörülebilir getiri sağlar (İcara, Murabaha).</li>
              <li className="flex items-start text-sm text-textMain"><CheckCircle className="w-5 h-5 text-[#10b981] mr-3 shrink-0" /> Enflasyon üstü, istikrarlı getiri hedeflenir.</li>
            </ul>
            <div className="mt-auto flex gap-2">
              <span className="px-3 py-1 bg-background border border-borderBase rounded-lg text-xs font-bold text-textMuted">A+</span>
              <span className="px-3 py-1 bg-background border border-borderBase rounded-lg text-xs font-bold text-textMuted">A</span>
              <span className="px-3 py-1 bg-background border border-borderBase rounded-lg text-xs font-bold text-textMuted">A-</span>
            </div>
          </div>

          {/* B Sınıfı */}
          <div className="card bg-surface flex flex-col relative overflow-hidden border border-borderBase group hover:border-[#f59e0b] transition-colors">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#f59e0b]/20 to-transparent blur-3xl -z-10 group-hover:from-[#f59e0b]/40 transition-all"></div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-[#f59e0b]/10 flex items-center justify-center text-3xl font-black text-[#f59e0b] border border-[#f59e0b]/20">B</div>
              <div>
                <h3 className="text-xl font-bold text-textMain">Orta Risk</h3>
                <span className="text-sm text-textMuted">Dengeli Risk & Getiri</span>
              </div>
            </div>
            <p className="text-textMuted mb-6 leading-relaxed flex-1">
              Büyüme aşamasındaki (scale-up) firmalar veya kısmi teminatlı projelerdir. A sınıfına kıyasla daha yüksek getiri oranı sunar.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start text-sm text-textMain"><CheckCircle className="w-5 h-5 text-[#f59e0b] mr-3 shrink-0" /> Temerrüt riski A sınıfına göre nispeten yüksektir.</li>
              <li className="flex items-start text-sm text-textMain"><CheckCircle className="w-5 h-5 text-[#f59e0b] mr-3 shrink-0" /> Dinamik pazarlarda faaliyet gösteren projelerdir.</li>
              <li className="flex items-start text-sm text-textMain"><CheckCircle className="w-5 h-5 text-[#f59e0b] mr-3 shrink-0" /> Sepet (Portföy) yatırımında dengeleyici rol oynar.</li>
            </ul>
            <div className="mt-auto flex gap-2">
              <span className="px-3 py-1 bg-background border border-borderBase rounded-lg text-xs font-bold text-textMuted">B+</span>
              <span className="px-3 py-1 bg-background border border-borderBase rounded-lg text-xs font-bold text-textMuted">B</span>
              <span className="px-3 py-1 bg-background border border-borderBase rounded-lg text-xs font-bold text-textMuted">B-</span>
            </div>
          </div>

          {/* C Sınıfı */}
          <div className="card bg-surface flex flex-col relative overflow-hidden border border-borderBase group hover:border-[#ef4444] transition-colors">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#ef4444]/20 to-transparent blur-3xl -z-10 group-hover:from-[#ef4444]/40 transition-all"></div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-[#ef4444]/10 flex items-center justify-center text-3xl font-black text-[#ef4444] border border-[#ef4444]/20">C</div>
              <div>
                <h3 className="text-xl font-bold text-textMain">Yüksek Risk</h3>
                <span className="text-sm text-textMuted">Yüksek Kazanç Çarpanı</span>
              </div>
            </div>
            <p className="text-textMuted mb-6 leading-relaxed flex-1">
              Erken aşama girişim sermayesi (Venture Capital), hisse bazlı kitle fonlama veya tohum yatırımlarıdır. Teminat zayıftır.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start text-sm text-textMain"><AlertTriangle className="w-5 h-5 text-[#ef4444] mr-3 shrink-0" /> Anaparanın tamamını veya bir kısmını kaybetme riski vardır.</li>
              <li className="flex items-start text-sm text-textMain"><TrendingUp className="w-5 h-5 text-[#ef4444] mr-3 shrink-0" /> Başarı durumunda anaparanın 3x, 5x veya daha fazla çarpanıyla çıkış hedeflenir.</li>
              <li className="flex items-start text-sm text-textMain"><Info className="w-5 h-5 text-[#ef4444] mr-3 shrink-0" /> Portföyün sadece küçük bir kısmı ile girilmesi önerilir.</li>
            </ul>
            <div className="mt-auto flex gap-2">
              <span className="px-3 py-1 bg-background border border-borderBase rounded-lg text-xs font-bold text-textMuted">C+</span>
              <span className="px-3 py-1 bg-background border border-borderBase rounded-lg text-xs font-bold text-textMuted">C</span>
              <span className="px-3 py-1 bg-background border border-borderBase rounded-lg text-xs font-bold text-textMuted">C-</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  /* ── EXCHANGE TAB ── */
  const ExchangeTab = () => {
    const assets = [
      { id: 'sukuk1', type: 'debt', name: 'GL-SKK (Körfez Lojistik)', price: 1000.00 },
      { id: 'sukuk2', type: 'debt', name: 'GZ-SUK (Gazze Mobil Su Arıtma)', price: 250.00 },
      { id: 'murabaha', type: 'debt', name: 'AG-MRB (Anadolu Agro)', price: 500.00 },
      { id: 'equity1', type: 'equity', name: 'PT-HSS (PayTech Hisse)', price: 50.00 },
      { id: 'equity2', type: 'equity', name: 'GZH-HSS (GazaTech Sağlık)', price: 15.00 },
      { id: 'equity3', type: 'equity', name: 'BAI-HSS (Bina-AI Drone)', price: 25.00 }
    ];

    const currentAsset = assets.find(a => a.id === exchangeAssetId) || assets.find(a => a.id === 'equity1');
    const totalPrice = (exchangeLotAmount * currentAsset.price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    const candleDataMap = {
      'equity1': [
        { open: 30, close: 45, high: 55, low: 20 },
        { open: 45, close: 60, high: 75, low: 40 },
        { open: 60, close: 50, high: 65, low: 35 },
        { open: 50, close: 80, high: 90, low: 45 },
        { open: 80, close: 100, high: 110, low: 70 },
        { open: 100, close: 115, high: 130, low: 95 },
        { open: 115, close: 105, high: 125, low: 90 },
        { open: 105, close: 140, high: 155, low: 100 },
        { open: 140, close: 160, high: 175, low: 130 },
        { open: 160, close: 150, high: 165, low: 140 },
        { open: 150, close: 180, high: 195, low: 145 },
        { open: 180, close: 200, high: 215, low: 170 },
        { open: 200, close: 220, high: 230, low: 190 }
      ],
      'equity2': [
        { open: 150, close: 110, high: 170, low: 90 },
        { open: 110, close: 140, high: 160, low: 100 },
        { open: 140, close: 90, high: 150, low: 80 },
        { open: 90, close: 160, high: 180, low: 70 },
        { open: 160, close: 120, high: 170, low: 110 },
        { open: 120, close: 80, high: 130, low: 60 },
        { open: 80, close: 130, high: 150, low: 70 },
        { open: 130, close: 150, high: 170, low: 120 },
        { open: 150, close: 100, high: 160, low: 90 },
        { open: 100, close: 120, high: 140, low: 80 },
        { open: 120, close: 170, high: 190, low: 110 },
        { open: 170, close: 130, high: 180, low: 120 },
        { open: 130, close: 145, high: 160, low: 110 }
      ],
      'equity3': [
        { open: 190, close: 160, high: 200, low: 150 },
        { open: 160, close: 130, high: 170, low: 120 },
        { open: 130, close: 100, high: 140, low: 90 },
        { open: 100, close: 70, high: 110, low: 60 },
        { open: 70, close: 40, high: 80, low: 30 },
        { open: 40, close: 20, high: 50, low: 10 },
        { open: 20, close: 35, high: 45, low: 15 },
        { open: 35, close: 30, high: 50, low: 25 },
        { open: 30, close: 80, high: 90, low: 20 },
        { open: 80, close: 130, high: 140, low: 70 },
        { open: 130, close: 120, high: 145, low: 110 },
        { open: 120, close: 180, high: 195, low: 110 },
        { open: 180, close: 210, high: 220, low: 170 }
      ]
    };

    const candleData = candleDataMap[currentAsset.id] || candleDataMap['equity1'];

    return (
      <div className="container py-16">
        <div className="mb-10 pb-6 flex items-center justify-between border-b border-borderBase animate-on-scroll">
          <h2 className="fluid-h2 font-black text-textMain">{t('nav.exchange')}</h2>
          <div className="flex items-center text-primary bg-primary/10 border border-primary/20 px-4 py-2 rounded-lg font-bold text-sm shadow-sm">
            <ShieldCheck className="w-5 h-5 mr-2" /> {t('common.spot')}
          </div>
        </div>

        <div className="grid-asymmetric">
          {/* Emir Paneli */}
          <div className="card h-max flex flex-col relative z-10 animate-on-scroll stagger-1">
            <h3 className="text-2xl font-bold text-textMain mb-8 flex items-center">
              <ArrowRightLeft className="w-6 h-6 text-primary mr-3" /> Emir Paneli
            </h3>

            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-textMuted uppercase tracking-wider mb-2">Varlık Seçimi</label>
                <select
                  className="input font-bold"
                  value={exchangeAssetId}
                  onChange={(e) => setExchangeAssetId(e.target.value)}
                >
                  {assets.map(a => (
                    <option key={a.id} value={a.id}>{a.name} - ${a.price}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-textMuted uppercase tracking-wider mb-2">{t('common.amount')} (Lot)</label>
                <input
                  type="number"
                  min="1"
                  value={exchangeLotAmount}
                  onChange={(e) => setExchangeLotAmount(Math.max(1, parseInt(e.target.value) || 1))}
                  className="input font-mono font-bold"
                />
              </div>

              <div className="bg-background rounded-xl p-4 border border-borderBase flex justify-between items-center">
                <span className="text-textMuted font-bold">{t('common.total')}:</span>
                <span className="text-2xl font-black text-primary font-mono">${totalPrice}</span>
              </div>

              <div className="flex gap-4 pt-4">
                <button className="flex-1 btn-primary py-4 text-lg">
                  {t('common.buy')}
                </button>
                <button className="flex-1 btn-ghost border-[#ef4444] text-[#ef4444] hover:bg-[#ef4444]/10 py-4 text-lg">
                  {t('common.sell')}
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            {/* Gerçekçi Mum Grafiği - Sadece Hisse (Equity) için göster */}
            {currentAsset.type === 'equity' ? (
              <div className="card flex flex-col relative z-10 animate-on-scroll stagger-2 border border-borderBase overflow-hidden pb-4">
                <h3 className="text-xl font-bold text-textMain mb-6 flex items-center px-2">
                  <TrendingUp className="w-5 h-5 text-primary mr-2" /> {t('exchangeTab.chart')} - {currentAsset.name}
                </h3>

                <div className="relative h-64 border-b border-borderBase flex items-end gap-[6px] overflow-hidden px-4 pl-12 pb-4">
                  {/* Y Eksen Grid ve Etiketler */}
                  <div className="absolute left-0 inset-y-0 w-10 border-r border-borderBase flex flex-col justify-between py-4 text-[10px] text-textMuted font-mono">
                    <span>250</span>
                    <span>187</span>
                    <span>125</span>
                    <span>62</span>
                  </div>

                  {/* X Eksen Grid Çizgileri */}
                  <div className="absolute inset-0 pl-12 flex flex-col justify-between pointer-events-none opacity-5 py-4">
                    {[...Array(4)].map((_, i) => <div key={i} className="w-full border-b border-white border-dashed"></div>)}
                  </div>

                  {/* Mumlar */}
                  {candleData.map((candle, i) => {
                    const isUp = candle.close >= candle.open;
                    const bTop = Math.max(candle.open, candle.close);
                    const bBot = Math.min(candle.open, candle.close);
                    const maxY = 250;

                    return (
                      <div key={i} className="relative flex-1 flex justify-center group h-full items-end">
                        <div
                          className={`absolute w-[2px] rounded-full ${isUp ? 'bg-[#10b981]' : 'bg-[#ef4444]'}`}
                          style={{ bottom: `${(candle.low / maxY) * 100}%`, height: `${((candle.high - candle.low) / maxY) * 100}%` }}
                        ></div>
                        <div
                          className={`absolute w-full max-w-[14px] z-10 rounded-[2px] shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:z-20 cursor-crosshair min-h-[2px]
                          ${isUp ? 'bg-[#10b981] shadow-[0_0_12px_rgba(16,185,129,0.4)]' : 'bg-[#ef4444] shadow-[0_0_12px_rgba(239,68,68,0.4)]'}`}
                          style={{ bottom: `${(bBot / maxY) * 100}%`, height: `${((bTop - bBot) / maxY) * 100}%` }}
                        ></div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="card flex flex-col justify-center items-center relative z-10 animate-on-scroll stagger-2 border border-borderBase py-16 text-center bg-surface">
                <ShieldCheck className="w-16 h-16 text-primary mb-6" />
                <h3 className="text-2xl font-bold text-textMain mb-3">{currentAsset.name}</h3>
                <p className="text-textMuted max-w-md leading-relaxed">
                  Borca dayalı (Sukuk / Murabaha) enstrümanlarda fiyat sabittir ve ikincil piyasada dalgalanma göstermez.
                  Bu nedenle varlığa ait fiyat grafiği bulunmamaktadır.
                </p>
              </div>
            )}

            {/* Emir Defteri */}
            <div className="card h-max flex flex-col relative z-10 animate-on-scroll stagger-3">
              <h3 className="text-xl font-bold text-textMain mb-6">{t('common.orderBook')}</h3>
              <div className="bg-background rounded-xl overflow-hidden border border-borderBase">
                <table className="w-full text-sm text-left">
                  <thead className="bg-surface/50 text-xs text-textMuted uppercase border-b border-borderBase">
                    <tr>
                      <th className="px-4 py-3">{t('common.price')}</th>
                      <th className="px-4 py-3">{t('common.amount')}</th>
                      <th className="px-4 py-3">{t('common.total')}</th>
                    </tr>
                  </thead>
                  <tbody className="font-mono">
                    <tr className="border-b border-borderBase/50 hover:bg-surface/30">
                      <td className="px-4 py-3 text-[#ef4444]">${(currentAsset.price * 1.02).toFixed(2)}</td>
                      <td className="px-4 py-3 text-textMain">15</td>
                      <td className="px-4 py-3 text-textMuted">${(currentAsset.price * 1.02 * 15).toFixed(2)}</td>
                    </tr>
                    <tr className="border-b border-borderBase/50 hover:bg-surface/30">
                      <td className="px-4 py-3 text-[#ef4444]">${(currentAsset.price * 1.01).toFixed(2)}</td>
                      <td className="px-4 py-3 text-textMain">8</td>
                      <td className="px-4 py-3 text-textMuted">${(currentAsset.price * 1.01 * 8).toFixed(2)}</td>
                    </tr>
                    <tr className="border-y-2 border-borderBase bg-surface/50">
                      <td className="px-4 py-2 text-textMain font-bold" colSpan={3}>Spread: ${(currentAsset.price * 0.01).toFixed(2)}</td>
                    </tr>
                    <tr className="border-b border-borderBase/50 hover:bg-surface/30">
                      <td className="px-4 py-3 text-[#10b981]">${(currentAsset.price * 0.99).toFixed(2)}</td>
                      <td className="px-4 py-3 text-textMain">12</td>
                      <td className="px-4 py-3 text-textMuted">${(currentAsset.price * 0.99 * 12).toFixed(2)}</td>
                    </tr>
                    <tr className="hover:bg-surface/30">
                      <td className="px-4 py-3 text-[#10b981]">${(currentAsset.price * 0.98).toFixed(2)}</td>
                      <td className="px-4 py-3 text-textMain">25</td>
                      <td className="px-4 py-3 text-textMuted">${(currentAsset.price * 0.98 * 25).toFixed(2)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen font-body bg-background text-textMain flex flex-col">
      <Header />
      <main className="flex-grow flex flex-col pt-20">
        {activeTab === 'home' && <HomeTab />}
        {activeTab === 'debt' && <DebtTab />}
        {activeTab === 'equity' && <EquityTab />}
        {activeTab === 'charity' && <CharityTab />}
        {activeTab === 'exchange' && <ExchangeTab />}
        {activeTab === 'risk' && <RiskTab />}
        {activeTab === 'about' && <AboutTab />}
        {activeTab === 'register' && <RegisterTab />}
        {activeTab === 'dashboard' && <DashboardTab />}
      </main>

      {activeProject && (
        <ProjectModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
          onProceedToPayment={(proj, amount, isRecurring) => {
            setActiveProject(null);
            setPaymentData({ project: proj, amount: amount, isRecurring: isRecurring });
            setShowPaymentModal(true);
          }}
        />
      )}

      {showPaymentModal && paymentData && (
        <PaymentModal
          data={paymentData}
          onClose={() => setShowPaymentModal(false)}
        />
      )}
    </div>
  );
}

/* ── PAYMENT MODAL ── */
const PaymentModal = ({ data, onClose }) => {
  const { t } = useTranslation();
  const [tab, setTab] = useState('card');
  const [cryptoNetwork, setCryptoNetwork] = useState('usdt_trc20');
  const [copied, setCopied] = useState(false);

  const amount = Number(data.amount) || 0;

  const [isMonthlyOrder, setIsMonthlyOrder] = useState(data.isRecurring || false);
  const [monthlyAmount, setMonthlyAmount] = useState(amount);

  const rates = {
    usdt_trc20: { price: 1, symbol: 'USDT', address: 'TEkxiTehnzSm9LEzEGx...' },
    eth: { price: 3500, symbol: 'ETH', address: '0x71C7656EC7ab88b098...' },
    btc: { price: 65000, symbol: 'BTC', address: 'bc1qxy2kgdygjrsqtzq2n...' }
  };

  const selectedCrypto = rates[cryptoNetwork];
  const cryptoAmount = (amount / selectedCrypto.price).toFixed(6);

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedCrypto.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-background/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-surface border border-borderBase rounded-[24px] w-full max-w-2xl shadow-2xl flex flex-col my-auto max-h-[90vh]">
        <div className="border-b border-borderBase px-8 py-6 flex justify-between items-center bg-surface/95 backdrop-blur rounded-t-[24px]">
          <div>
            <h3 className="text-2xl font-black text-textMain">{data.isRecurring ? 'Düzenli Bağışı Tamamla' : (data.project.isCharity ? 'Bağışı Tamamla' : 'Yatırımı Tamamla')}</h3>
            <span className="text-sm text-textMuted mt-1 block">{data.project.title} projesine {data.isRecurring ? 'her ay düzenli ' : ''}fon sağlanıyor</span>
          </div>
          <button onClick={onClose} className="p-2 bg-transparent border border-borderBase rounded-full hover:bg-background transition-colors text-textMain">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-8 overflow-y-auto">
          {!data.isRecurring && (
            <div className="flex bg-background rounded-xl p-1 mb-8 border border-borderBase overflow-x-auto">
              <button
                onClick={() => setTab('card')}
                className={`flex-1 min-w-[120px] py-3 px-2 rounded-lg font-bold text-xs sm:text-sm transition-all flex items-center justify-center ${tab === 'card' ? 'bg-surface shadow-sm text-primary border border-borderBase' : 'text-textMuted hover:text-textMain'}`}
              >
                <CreditCard className="w-4 h-4 mr-2" /> Kredi Kartı
              </button>
              <button
                onClick={() => setTab('fiat')}
                className={`flex-1 min-w-[120px] py-3 px-2 rounded-lg font-bold text-xs sm:text-sm transition-all flex items-center justify-center ${tab === 'fiat' ? 'bg-surface shadow-sm text-primary border border-borderBase' : 'text-textMuted hover:text-textMain'}`}
              >
                <Building2 className="w-4 h-4 mr-2" /> Havale/EFT
              </button>
              <button
                onClick={() => setTab('crypto')}
                className={`flex-1 min-w-[120px] py-3 px-2 rounded-lg font-bold text-xs sm:text-sm transition-all flex items-center justify-center ${tab === 'crypto' ? 'bg-surface shadow-sm text-primary border border-borderBase' : 'text-textMuted hover:text-textMain'}`}
              >
                <Bitcoin className="w-4 h-4 mr-2" /> Kripto
              </button>
            </div>
          )}

          <div className="bg-background border border-borderBase rounded-2xl p-6 mb-8 text-center">
            <span className="text-sm font-bold text-textMuted uppercase tracking-wider block mb-2">
              {isMonthlyOrder ? 'Aylık Çekilecek Tutar' : 'Ödenecek Toplam Tutar'}
            </span>
            <span className="text-4xl font-black text-textMain font-mono">${isMonthlyOrder ? Number(monthlyAmount).toLocaleString() : amount.toLocaleString()}</span>
          </div>

          {tab === 'card' ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 space-y-6">
              {isMonthlyOrder && (
                <div className="bg-[#10b981]/10 border border-[#10b981]/20 p-4 rounded-xl flex items-start">
                  <HeartHandshake className="w-5 h-5 text-[#10b981] mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h5 className="text-sm font-bold text-[#10b981] mb-1">Düzenli Çekim Talimatı</h5>
                    <p className="text-xs text-[#10b981]/80 leading-relaxed">
                      Kredi kartınızdan her ayın bugünü ({new Date().getDate()}. gün) otomatik olarak tahsilat yapılacaktır. İşlemi onaylayarak tekrarlayan tahsilata izin vermiş olursunuz. Panelinizden istediğiniz zaman iptal edebilirsiniz.
                    </p>
                  </div>
                </div>
              )}
              <div className="bg-surface border border-borderBase rounded-2xl p-6">
                <h4 className="font-bold text-textMain mb-6 flex items-center"><CreditCard className="w-5 h-5 mr-2 text-primary" /> Kart Bilgileri</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-textMuted uppercase tracking-wider mb-2">Kart Numarası</label>
                    <input type="text" placeholder="0000 0000 0000 0000" className="input font-mono" maxLength="19" />
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="block text-xs font-bold text-textMuted uppercase tracking-wider mb-2">Son Kullanma</label>
                      <input type="text" placeholder="AA/YY" className="input font-mono" maxLength="5" />
                    </div>
                    <div className="flex-1">
                      <label className="block text-xs font-bold text-textMuted uppercase tracking-wider mb-2">CVV</label>
                      <input type="password" placeholder="***" className="input font-mono" maxLength="3" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-textMuted uppercase tracking-wider mb-2">Kart Üzerindeki İsim</label>
                    <input type="text" placeholder="AD SOYAD" className="input" />
                  </div>
                </div>
              </div>

              {!data.isRecurring && (
                <div className="bg-surface border border-borderBase rounded-2xl p-6">
                  <label className="flex items-center cursor-pointer mb-2">
                    <input type="checkbox" checked={isMonthlyOrder} onChange={(e) => setIsMonthlyOrder(e.target.checked)} className="mr-3 w-5 h-5 rounded border-borderBase text-primary focus:ring-primary" />
                    <span className="font-bold text-textMain">Otomatik Çekim Emri Ver (Aylık)</span>
                  </label>
                  {isMonthlyOrder && (
                    <div className="mt-4 animate-in fade-in slide-in-from-top-2">
                      <label className="block text-xs font-bold text-textMuted uppercase tracking-wider mb-2">Aylık Çekilecek Tutar ($)</label>
                      <input type="number" min="1" value={monthlyAmount} onChange={(e) => setMonthlyAmount(e.target.value)} className="input font-mono" placeholder="Aylık çekilecek miktar" />
                      <p className="text-xs text-textMuted mt-2">
                        Kredi kartınızdan her ayın bugünü ({new Date().getDate()}. gün) <strong>${Number(monthlyAmount).toLocaleString()}</strong> otomatik olarak çekilecektir.
                      </p>
                    </div>
                  )}
                </div>
              )}

              <button className="w-full btn-primary py-4 text-lg" onClick={() => { alert(isMonthlyOrder ? 'Düzenli ödeme talimatınız başarıyla alındı!' : 'Ödeme başarıyla alındı!'); onClose(); }}>
                <CheckCircle className="w-5 h-5 mr-2" /> {isMonthlyOrder ? `Aylık Düzenli Ödeme Başlat ($${Number(monthlyAmount).toLocaleString()})` : `Güvenli Ödeme Yap ($${amount.toLocaleString()})`}
              </button>
            </div>
          ) : tab === 'fiat' ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 space-y-6">
              <div className="bg-gradient-to-br from-surface to-background border border-borderBase rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute -right-10 -bottom-10 opacity-5">
                  <CreditCard className="w-48 h-48" />
                </div>
                <h4 className="font-bold text-textMain mb-4">Banka Havalesi / EFT</h4>
                <div className="space-y-3 relative z-10">
                  <div className="flex justify-between items-center p-3 bg-surface rounded-lg border border-borderBase">
                    <span className="text-xs text-textMuted font-bold uppercase">Alıcı</span>
                    <span className="text-sm font-bold text-textMain">FundNova Teknoloji A.Ş.</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-surface rounded-lg border border-borderBase">
                    <span className="text-xs text-textMuted font-bold uppercase">IBAN</span>
                    <span className="text-sm font-bold text-textMain font-mono">TR12 0000 0000 0000 0000 0000 00</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-surface rounded-lg border border-borderBase">
                    <span className="text-xs text-textMuted font-bold uppercase">Açıklama (Zorunlu)</span>
                    <span className="text-sm font-bold text-primary font-mono">FN-{Math.floor(Math.random() * 100000)}</span>
                  </div>
                </div>
              </div>
              <button className="w-full btn-primary py-4 text-lg" onClick={() => { alert('Ödeme Onay Bekliyor statüsüne alındı!'); onClose(); }}>
                <CheckCircle className="w-5 h-5 mr-2" /> Ödemeyi Gönderdim
              </button>
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-bottom-4 space-y-6">
              <div>
                <label className="block text-xs font-bold text-textMuted uppercase tracking-wider mb-2">Ağ ve Coin Seçin</label>
                <div className="grid grid-cols-3 gap-3">
                  <button onClick={() => setCryptoNetwork('usdt_trc20')} className={`p-3 rounded-xl border flex flex-col items-center justify-center transition-colors ${cryptoNetwork === 'usdt_trc20' ? 'bg-primary/10 border-primary text-primary' : 'bg-background border-borderBase text-textMuted hover:border-primary/50'}`}>
                    <Wallet className="w-6 h-6 mb-2" />
                    <span className="font-bold text-xs">USDT (TRC20)</span>
                  </button>
                  <button onClick={() => setCryptoNetwork('btc')} className={`p-3 rounded-xl border flex flex-col items-center justify-center transition-colors ${cryptoNetwork === 'btc' ? 'bg-[#f7931a]/10 border-[#f7931a] text-[#f7931a]' : 'bg-background border-borderBase text-textMuted hover:border-[#f7931a]/50'}`}>
                    <Bitcoin className="w-6 h-6 mb-2" />
                    <span className="font-bold text-xs">Bitcoin (BTC)</span>
                  </button>
                  <button onClick={() => setCryptoNetwork('eth')} className={`p-3 rounded-xl border flex flex-col items-center justify-center transition-colors ${cryptoNetwork === 'eth' ? 'bg-[#627eea]/10 border-[#627eea] text-[#627eea]' : 'bg-background border-borderBase text-textMuted hover:border-[#627eea]/50'}`}>
                    <Wallet className="w-6 h-6 mb-2" />
                    <span className="font-bold text-xs">Ethereum (ERC20)</span>
                  </button>
                </div>
              </div>

              <div className="bg-surface border border-borderBase rounded-2xl p-6 flex flex-col items-center text-center">
                <div className="w-40 h-40 bg-white p-2 rounded-xl mb-6 shadow-md flex items-center justify-center">
                  <QrCode className="w-32 h-32 text-black" />
                </div>

                <span className="text-xs font-bold text-textMuted uppercase tracking-wider mb-1">Gönderilecek Tutar</span>
                <span className="text-2xl font-black text-textMain font-mono mb-6">{cryptoAmount} {selectedCrypto.symbol}</span>

                <div className="w-full">
                  <span className="text-xs font-bold text-textMuted uppercase tracking-wider mb-2 block">Cüzdan Adresi</span>
                  <div className="flex items-center bg-background border border-borderBase rounded-lg p-1">
                    <span className="flex-1 text-xs font-mono text-textMain px-3 truncate">{selectedCrypto.address}</span>
                    <button onClick={handleCopy} className="p-2 bg-surface hover:bg-borderBase rounded-md transition-colors text-textMuted">
                      {copied ? <CheckCircle className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-[#f59e0b]/10 border border-[#f59e0b]/20 p-4 rounded-xl flex items-start">
                <AlertTriangle className="w-5 h-5 text-[#f59e0b] mr-3 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-[#f59e0b] font-medium leading-relaxed">
                  Lütfen sadece <strong>{selectedCrypto.symbol}</strong> ağını kullanarak gönderim yapın. Farklı bir ağ veya coin gönderimi fon kaybına neden olabilir.
                </p>
              </div>

              <button className="w-full btn-primary py-4 text-lg" onClick={() => { alert('Blok zinciri doğrulama işlemi başlatıldı...'); onClose(); }}>
                <CheckCircle className="w-5 h-5 mr-2" /> İşlemi Doğrula
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
