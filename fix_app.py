import codecs

app_path = r'src/App.jsx'

with codecs.open(app_path, 'r', 'utf-8') as f:
    content = f.read()

replacements = [
    # DebtTab
    ('title: "Güneş Enerjili Mobil Su Arıtma"', 'title: t("proj.solar_title", "Güneş Enerjili Mobil Su Arıtma")'),
    ('desc: "Gazze\'de tahrip olan su şebekesine alternatif olarak geliştirilen, yüksek kapasiteli ve tamamen güneş enerjisi ile çalışan mobil su arıtma tesislerinin bölgeye kurulumu ve entegrasyonu."', 'desc: t("proj.solar_desc", "Gazze\'de tahrip olan su şebekesine alternatif olarak geliştirilen, yüksek kapasiteli ve tamamen güneş enerjisi ile çalışan mobil su arıtma tesislerinin bölgeye kurulumu ve entegrasyonu.")'),
    ('type: "İstisna Sukuk"', 'type: t("type.istisna", "İstisna Sukuk")'),
    ('company: "Gaza Altyapı A.Ş."', 'company: t("company.gaza", "Gaza Altyapı A.Ş.")'),
    
    ('title: "Körfez Lojistik Filo Büyümesi"', 'title: t("proj.logi_title", "Körfez Lojistik Filo Büyümesi")'),
    ('desc: "Körfez bölgesinde hızla genişleyen e-ticaret lojistiği operasyonlarını desteklemek amacıyla, çevre dostu hibrit motora sahip 50 adet yeni nesil ticari araç alımının İcara Sukuk yöntemiyle finansmanı."', 'desc: t("proj.logi_desc", "Körfez bölgesinde hızla genişleyen e-ticaret lojistiği operasyonlarını desteklemek amacıyla, çevre dostu hibrit motora sahip 50 adet yeni nesil ticari araç alımının İcara Sukuk yöntemiyle finansmanı.")'),
    ('type: "İcara Sukuk"', 'type: t("type.icara", "İcara Sukuk")'),
    ('company: "LogiSpeed A.Ş."', 'company: t("company.logi", "LogiSpeed A.Ş.")'),
    
    ('title: "Güneş Paneli Ekipman Alımı"', 'title: t("proj.green_title", "Güneş Paneli Ekipman Alımı")'),
    ('desc: "Kuzey Afrika\'da inşa edilecek 50 MW kapasiteli yeni nesil güneş enerjisi santrali projesinde kullanılacak, yüksek verimliliğe sahip monokristal güneş panelleri ve invertör ekipmanlarının tedarik finansmanı."', 'desc: t("proj.green_desc", "Kuzey Afrika\'da inşa edilecek 50 MW kapasiteli yeni nesil güneş enerjisi santrali projesinde kullanılacak, yüksek verimliliğe sahip monokristal güneş panelleri ve invertör ekipmanlarının tedarik finansmanı.")'),
    ('type: "Emtia Murabaha"', 'type: t("type.emtia", "Emtia Murabaha")'),
    ('company: "GreenEnergy Ltd."', 'company: t("company.green", "GreenEnergy Ltd.")'),

    ('title: "Gazze Acil Prefabrik Konut Üretimi"', 'title: t("proj.elamel_title", "Gazze Acil Prefabrik Konut Üretimi")'),
    ('desc: "Gazze\'de evsiz kalan sivillerin acil barınma ihtiyacını karşılamak üzere, zorlu iklim koşullarına dayanıklı, ısı yalıtımlı modüler prefabrik yaşam alanlarının hızlı üretimi için gerekli temel hammadde ve inşaat malzemesi alımı."', 'desc: t("proj.elamel_desc", "Gazze\'de evsiz kalan sivillerin acil barınma ihtiyacını karşılamak üzere, zorlu iklim koşullarına dayanıklı, ısı yalıtımlı modüler prefabrik yaşam alanlarının hızlı üretimi için gerekli temel hammadde ve inşaat malzemesi alımı.")'),
    ('type: "Murabaha"', 'type: t("type.murabaha", "Murabaha")'),
    ('company: "El-Amel İnşaat"', 'company: t("company.elamel", "El-Amel İnşaat")'),

    # EquityTab
    ('title: "Bina-AI Hasar Tespit Drone Ağı"', 'title: t("proj.bina_title", "Bina-AI Hasar Tespit Drone Ağı")'),
    ('desc: "Afet ve savaş bölgelerinde yıkılan binaların yeniden inşasını hızlandırmak amacıyla, yapay zeka destekli 3D haritalama, yapısal hasar tespiti ve enkaz analizi yapabilen tam otonom insansız hava aracı (drone) filosunun geliştirilmesi ve sahaya sürülmesi."', 'desc: t("proj.bina_desc", "Afet ve savaş bölgelerinde yıkılan binaların yeniden inşasını hızlandırmak amacıyla, yapay zeka destekli 3D haritalama, yapısal hasar tespiti ve enkaz analizi yapabilen tam otonom insansız hava aracı (drone) filosunun geliştirilmesi ve sahaya sürülmesi.")'),
    ('type: "PropTech / AI"', 'type: t("type.proptech", "PropTech / AI")'),
    ('company: "Seri A"', 'company: t("company.seria", "Seri A")'),

    ('title: "PayTech İslami Cüzdan"', 'title: t("proj.paytech_title", "PayTech İslami Cüzdan")'),
    ('desc: "Z kuşağının finansal ihtiyaçlarına yönelik, blokzincir altyapısı ile desteklenen, sıfır faizli, etik yatırım algoritmaları barındıran ve global ödeme sistemleriyle tam entegre çalışan yenilikçi akıllı harcama ve dijital cüzdan uygulamasının küresel lansmanı."', 'desc: t("proj.paytech_desc", "Z kuşağının finansal ihtiyaçlarına yönelik, blokzincir altyapısı ile desteklenen, sıfır faizli, etik yatırım algoritmaları barındıran ve global ödeme sistemleriyle tam entegre çalışan yenilikçi akıllı harcama ve dijital cüzdan uygulamasının küresel lansmanı.")'),
    ('type: "FinTech / Z Kuşağı"', 'type: t("type.fintech", "FinTech / Z Kuşağı")'),

    ('title: "GazaTech Mobil Sağlık"', 'title: t("proj.gazatech_title", "GazaTech Mobil Sağlık")'),
    ('desc: "Kriz bölgelerindeki yerel sağlık personeli ile dünya çapındaki uzman doktorları eş zamanlı olarak bir araya getiren, düşük internet bant genişliğinde dahi yüksek çözünürlüklü görüntü aktarımı yapabilen ve medikal AI teşhis asistanı barındıran uçtan uca şifreli tele-tıp platformu."', 'desc: t("proj.gazatech_desc", "Kriz bölgelerindeki yerel sağlık personeli ile dünya çapındaki uzman doktorları eş zamanlı olarak bir araya getiren, düşük internet bant genişliğinde dahi yüksek çözünürlüklü görüntü aktarımı yapabilen ve medikal AI teşhis asistanı barındıran uçtan uca şifreli tele-tıp platformu.")'),
    ('type: "HealthTech / Gazze"', 'type: t("type.healthtech", "HealthTech / Gazze")'),
    ('company: "Tohum Yatırımı"', 'company: t("company.tohum", "Tohum Yatırımı")'),

    # Labels
    ('>Hedef: $<', '>{t("explore.target_label", "Hedef: ")}$<'),
    ('>Karz-ı Hasen Yap<', '>{t("explore.karz_btn", "Karz-ı Hasen Yap")}<'),
    ('Büyüme Projeksiyonu (5 Yıl)', '{t("chart.growth", "Büyüme Projeksiyonu (5 Yıl)")}'),
    ('>Hedef Çarpan<', '>{t("chart.target_multiplier", "Hedef Çarpan")}<'),

    # CharityTab
    ('>Sadaka-i Cariye<', '>{t("badge.sadaka", "Sadaka-i Cariye")}<'),
    ('>Gazze Umut Güneşi Derneği<', '>{t("company.umut", "Gazze Umut Güneşi Derneği")}<'),
    ('>Gazze Temiz Su Arıtma Projesi<', '>{t("proj.water_title", "Gazze Temiz Su Arıtma Projesi")}<'),
    ('Savaş nedeniyle içme suyu altyapısı tamamen çöken Gazze\'deki mülteci kamplarında, günlük 10.000 kişinin temiz su ihtiyacını karşılayacak, bakımı kolay ve %100 güneş enerjisiyle çalışan entegre mobil su arıtma ünitelerinin acil kurulumu ve 1 yıllık işletme maliyetinin karşılanması.', '{t("proj.water_desc", "Savaş nedeniyle içme suyu altyapısı tamamen çöken Gazze\'deki mülteci kamplarında, günlük 10.000 kişinin temiz su ihtiyacını karşılayacak, bakımı kolay ve %100 güneş enerjisiyle çalışan entegre mobil su arıtma ünitelerinin acil kurulumu ve 1 yıllık işletme maliyetinin karşılanması.")}'),

    ('>Zekata Uygun<', '>{t("badge.zekat", "Zekata Uygun")}<'),
    ('>Kudüs İmar ve Eğitim Kooperatifi<', '>{t("company.kudus", "Kudüs İmar ve Eğitim Kooperatifi")}<'),
    ('>Filistin Çocukları Eğitim Çadırları<', '>{t("proj.edu_title", "Filistin Çocukları Eğitim Çadırları")}<'),
    ('Saldırılar sonucu okulları yıkılan bölgelerde çocukların eğitimden geri kalmaması amacıyla, zorlu hava koşullarına dayanıklı, güneş panelleriyle aydınlatılan, temel kırtasiye ve dijital eğitim materyalleriyle donatılmış 50 adet tam kapasiteli eğitim çadırının kurulması ve öğretmen destek fonunun sağlanması.', '{t("proj.edu_desc", "Saldırılar sonucu okulları yıkılan bölgelerde çocukların eğitimden geri kalmaması amacıyla, zorlu hava koşullarına dayanıklı, güneş panelleriyle aydınlatılan, temel kırtasiye ve dijital eğitim materyalleriyle donatılmış 50 adet tam kapasiteli eğitim çadırının kurulması ve öğretmen destek fonunun sağlanması.")}'),

    ('>Sağlık Yardımı<', '>{t("badge.health", "Sağlık Yardımı")}<'),
    ('>Filistin Bağımsız Sağlıkçılar Derneği<', '>{t("company.filistin", "Filistin Bağımsız Sağlıkçılar Derneği")}<'),
    ('>Konteyner Poliklinik Ağı<', '>{t("proj.health_title", "Konteyner Poliklinik Ağı")}<'),
    ('Mevcut hastanelerin kullanılamaz hale geldiği çatışma bölgelerinde, temel cerrahi müdahalelerin yapılabildiği, jeneratörlü ve sterilizasyon üniteli tam donanımlı 10 adet mobil konteyner polikliniğin stratejik noktalara yerleştirilmesi ve acil tıbbi sarf malzemelerinin temini.', '{t("proj.health_desc", "Mevcut hastanelerin kullanılamaz hale geldiği çatışma bölgelerinde, temel cerrahi müdahalelerin yapılabildiği, jeneratörlü ve sterilizasyon üniteli tam donanımlı 10 adet mobil konteyner polikliniğin stratejik noktalara yerleştirilmesi ve acil tıbbi sarf malzemelerinin temini.")}'),

    ('>Eğitim Fonu<', '>{t("badge.edu", "Eğitim Fonu")}<'),
    ('>Gazze Yetim Dayanışma Vakfı<', '>{t("company.yetim", "Gazze Yetim Dayanışma Vakfı")}<'),
    ('>Çocuklar İçin Psikososyal Destek Merkezi<', '>{t("proj.psy_title", "Çocuklar İçin Psikososyal Destek Merkezi")}<'),
    ('Savaşın yıkıcı etkilerine maruz kalmış binlerce yetim çocuğa yönelik, uzman çocuk psikiyatristleri ve pedagoglar eşliğinde uzun vadeli travma sonrası stres bozukluğu tedavisi, sanatla terapi atölyeleri ve güvenli oyun alanları sunacak kalıcı bir psikososyal destek merkezinin inşa edilmesi ve işletilmesi.', '{t("proj.psy_desc", "Savaşın yıkıcı etkilerine maruz kalmış binlerce yetim çocuğa yönelik, uzman çocuk psikiyatristleri ve pedagoglar eşliğinde uzun vadeli travma sonrası stres bozukluğu tedavisi, sanatla terapi atölyeleri ve güvenli oyun alanları sunacak kalıcı bir psikososyal destek merkezinin inşa edilmesi ve işletilmesi.")}'),

    # RiskTab
    ('>Risk Sınıflandırması<', '>{t("risk.title", "Risk Sınıflandırması")}<'),
    ('FundNova platformunda listelenen tüm projeler, uluslararası bağımsız denetim standartlarına göre incelenir ve yatırımcılara şeffaf bir risk profili sunmak için A, B ve C olmak üzere üç ana kategoride sınıflandırılır.', '{t("risk.desc", "FundNova platformunda listelenen tüm projeler, uluslararası bağımsız denetim standartlarına göre incelenir ve yatırımcılara şeffaf bir risk profili sunmak için A, B ve C olmak üzere üç ana kategoride sınıflandırılır.")}'),
    ('>Düşük Risk<', '>{t("risk.a_title", "Düşük Risk")}<'),
    ('>Düzenli Getiri, Yüksek Güven<', '>{t("risk.a_subtitle", "Düzenli Getiri, Yüksek Güven")}<'),
    ('Güçlü bilançoya sahip, köklü firmaların ihraç ettiği veya fiziki varlık (gayrimenkul, ekipman vb.) teminatlı projelerdir.', '{t("risk.a_desc", "Güçlü bilançoya sahip, köklü firmaların ihraç ettiği veya fiziki varlık (gayrimenkul, ekipman vb.) teminatlı projelerdir.")}'),
    ('>Orta Risk<', '>{t("risk.b_title", "Orta Risk")}<'),
    ('>Dengeli Büyüme ve Temettü<', '>{t("risk.b_subtitle", "Dengeli Büyüme ve Temettü")}<'),
    ('Büyüme aşamasındaki şirketlerin veya belirli bir pazar payına ulaşmış girişimlerin genişleme finansmanlarıdır.', '{t("risk.b_desc", "Büyüme aşamasındaki şirketlerin veya belirli bir pazar payına ulaşmış girişimlerin genişleme finansmanlarıdır.")}'),
    ('>Yüksek Risk<', '>{t("risk.c_title", "Yüksek Risk")}<'),
    ('>Maksimum Büyüme Potansiyeli<', '>{t("risk.c_subtitle", "Maksimum Büyüme Potansiyeli")}<'),
    ('Tohum veya Seri A aşamasındaki teknoloji girişimlerini, yüksek potansiyelli ancak ürün-pazar uyumu yeni kanıtlanan projeleri içerir.', '{t("risk.c_desc", "Tohum veya Seri A aşamasındaki teknoloji girişimlerini, yüksek potansiyelli ancak ürün-pazar uyumu yeni kanıtlanan projeleri içerir.")}'),
]

for old, new in replacements:
    content = content.replace(old, new)

with codecs.open(app_path, 'w', 'utf-8') as f:
    f.write(content)

print("Replaced in App.jsx")
