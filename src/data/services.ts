import type { Lang } from '../i18n/ui';

/**
 * Leistungskatalog — Quelle fuer die Uebersichtsseite, die vier Detailseiten,
 * die Navigation, den Footer und die Startseiten-Teaser.
 *
 * Pro Sprache ein vollstaendiger Textsatz statt einzelner Uebersetzungs-Keys:
 * Eine Leistungsseite ist Verkaufstext, kein Interface. Sie liest sich nur
 * dann, wenn Formulierung und Reihenfolge pro Sprache frei waehlbar sind.
 *
 * Der Slug unterscheidet sich je Sprache (deutsche URLs fuer DE, englische
 * fuer EN) — `altPaths()` in i18n/utils.ts baut daraus die hreflang-Paare.
 */

export interface ServiceCopy {
  slug: string;
  title: string;
  /** Eine Zeile fuer Karten, Navigation und Teaser. */
  tagline: string;
  /** Zwei bis drei Saetze als Lead der Detailseite. */
  intro: string;
  metaTitle: string;
  metaDescription: string;
  /** Rahmen statt Festpreis — der Festpreis kommt nach dem Erstgespraech. */
  priceHint: string;
  duration: string;
  /** Was konkret geliefert wird. */
  deliverables: { title: string; desc: string }[];
  /** Wie gearbeitet wird — drei bis vier Schritte. */
  steps: { title: string; desc: string }[];
  /** Werkzeuge und Technik, offen benannt. Derzeit ohne Renderer: die
   *  Detailseite zeigt seit der Technologie-Sektion keine Werkzeugliste
   *  mehr. Der Datensatz bleibt, damit er nicht neu geschrieben werden
   *  muss, falls die Liste zurueckkehrt. */
  stack: string[];
  /** Fuer wen die Leistung gedacht ist. Ebenfalls derzeit ohne Renderer. */
  audience: string[];
  /** Fragen, die genau zu dieser Leistung immer wieder kommen. */
  faq: { q: string; a: string }[];
}

/**
 * Die vier Leistungen. Der Bezeichner ist zugleich der Schluessel des
 * Leistungs-Icons (siehe `serviceIcons` unten) — eine Leistung, ein Zeichen,
 * kein zweiter Namensraum aus Motiven, der auseinanderlaufen koennte.
 */
export type ServiceId = 'webdesign' | 'webentwicklung' | 'seo-performance' | 'wartung';

export interface Service {
  id: ServiceId;
  index: string;
  de: ServiceCopy;
  tr: ServiceCopy;
  en: ServiceCopy;
}

export const services: Service[] = [
  {
    id: 'webdesign',
    index: '01',
    de: {
      slug: 'webdesign',
      title: 'Webdesign',
      tagline: 'Individuelles, conversion-orientiertes Design — kein Template, kein Baukasten.',
      intro:
        'Design ist hier keine Dekoration, sondern die Entscheidung darüber, was ein Besucher zuerst sieht, was er versteht und was er anschließend tut. Wir entwerfen Ihre Website als Argumentationskette: von der ersten Zeile bis zum Kontaktweg.',
      metaTitle: 'Webdesign aus Berlin — individuell statt Baukasten | Surhay Design',
      metaDescription:
        'Individuelles Webdesign für KMU, Selbstständige und Startups: Struktur, Typografie und Conversion-Logik statt Template. Klickbarer Entwurf vor der ersten Zeile Code.',
      priceHint: 'ab 2.900 € im Projekt',
      duration: '1–2 Wochen bis zum freigegebenen Entwurf',
      deliverables: [
        {
          title: 'Struktur & Seitenplan',
          desc: 'Welche Seiten es gibt, in welcher Reihenfolge sie argumentieren und wo der Kontaktweg liegt — schriftlich, bevor gestaltet wird.',
        },
        {
          title: 'Klickbarer Entwurf',
          desc: 'Ihre Startseite und die wichtigsten Unterseiten als bedienbarer Prototyp in Desktop- und Mobilbreite. Sie klicken sich durch, bevor Code entsteht.',
        },
        {
          title: 'Designsystem',
          desc: 'Farben mit geprüften Kontrastwerten, eine Typo-Skala, Abstände, Schaltflächen und Formularfelder. Alles einmal entschieden, überall gleich.',
        },
        {
          title: 'Textgerüst',
          desc: 'Überschriften, Zwischenüberschriften und Handlungsaufforderungen im Entwurf ausformuliert — kein Blindtext, an dem sich nichts beurteilen lässt.',
        },
        {
          title: 'Responsives Verhalten',
          desc: 'Wie sich jede Sektion zwischen 320 und 2560 Pixeln verhält, ist Teil des Entwurfs — nicht etwas, das später beim Bauen herauskommt.',
        },
        {
          title: 'Barrierefreiheit ab Entwurf',
          desc: 'Kontraste, Fokuszustände, Schriftgrößen und Bedienreihenfolge werden im Design festgelegt, nicht nachträglich repariert.',
        },
      ],
      steps: [
        {
          title: 'Verstehen',
          desc: 'Wer soll auf der Seite etwas tun, und was hält ihn heute davon ab? Wir sehen uns Ihr Angebot, Ihren Markt und die Websites an, gegen die Sie antreten.',
        },
        {
          title: 'Struktur',
          desc: 'Zuerst der Seitenplan und die Reihenfolge der Argumente. Diese Entscheidung kostet in der Struktur Minuten und im fertigen Design Tage.',
        },
        {
          title: 'Entwurf',
          desc: 'Ein vollständig gestalteter, klickbarer Entwurf. Sie geben Feedback in zwei Runden — danach ist der Entwurf freigegeben und der Umfang fix.',
        },
        {
          title: 'Übergabe',
          desc: 'Der freigegebene Entwurf geht in die Entwicklung. Was dort entsteht, sieht aus wie das, was Sie freigegeben haben.',
        },
      ],
      stack: ['Figma', 'Designsystem in CSS-Variablen', 'WCAG-2.2-Kontrastprüfung', 'Variable Fonts', 'Responsives Raster'],
      audience: [
        'Unternehmen mit einer Website, die niemand mehr ernst nimmt',
        'Selbstständige, die bisher aus einem Baukasten heraus arbeiten',
        'Startups, die vor der ersten Finanzierungsrunde seriös wirken müssen',
      ],
      faq: [
        {
          q: 'Bekomme ich mehrere Design-Vorschläge zur Auswahl?',
          a: 'Nein — einen, und den begründet. Drei Vorschläge bedeuten, dass zwei davon ohne Überzeugung entstanden sind. Stattdessen gibt es zwei Korrekturrunden am einen Entwurf, in denen wir gemeinsam nachschärfen.',
        },
        {
          q: 'Kann ich meine Marke, Logo und Farben behalten?',
          a: 'Ja. Wenn ein Corporate Design vorliegt, arbeiten wir darin. Fehlt es, entsteht ein schlankes Designsystem aus Farbe, Schrift und Abständen, das sich später zu einer Marke ausbauen lässt.',
        },
        {
          q: 'Was, wenn mir der Entwurf nicht gefällt?',
          a: 'Dann gibt es die zwei Korrekturrunden. Tragen die nicht, endet das Projekt nach der Designphase — Sie bezahlen die geleistete Arbeit und behalten den Entwurf. Ein Design, das Sie nicht überzeugt, überzeugt Ihre Kunden auch nicht.',
        },
      ],
    },
    tr: {
      slug: 'web-tasarim',
      title: 'Web tasarım',
      tagline: 'Özel, dönüşüme odaklı tasarım — şablon yok, hazır kurgu yok.',
      intro:
        'Burada tasarım süs değildir; bir ziyaretçinin önce neyi göreceğine, neyi anlayacağına ve ardından ne yapacağına dair bir karardır. Sitenizi bir argüman zinciri olarak tasarlarız: ilk satırdan iletişim yoluna kadar.',
      metaTitle: 'Berlin’den web tasarım — hazır kurgu değil, özel tasarım | Surhay Design',
      metaDescription:
        'KOBİ’ler, serbest çalışanlar ve girişimler için özel web tasarım: şablon yerine yapı, tipografi ve dönüşüm mantığı. İlk satır koddan önce tıklanabilir taslak.',
      priceHint: 'projede 2.900 €’dan başlar',
      duration: 'onaylı taslağa kadar 1–2 hafta',
      deliverables: [
        {
          title: 'Yapı & sayfa planı',
          desc: 'Hangi sayfaların olacağı, hangi sırayla argüman kuracakları ve iletişim yolunun nerede duracağı — tasarıma başlamadan önce, yazılı olarak.',
        },
        {
          title: 'Tıklanabilir taslak',
          desc: 'Ana sayfanız ve en önemli alt sayfalarınız, masaüstü ve mobil genişlikte kullanılabilir bir prototip olarak. Kod yazılmadan önce içinde gezinirsiniz.',
        },
        {
          title: 'Tasarım sistemi',
          desc: 'Kontrast değerleri ölçülmüş renkler, bir tipografi skalası, boşluklar, butonlar ve form alanları. Bir kez kararlaştırılır, her yerde aynı kalır.',
        },
        {
          title: 'Metin iskeleti',
          desc: 'Başlıklar, ara başlıklar ve eylem çağrıları taslakta gerçek metinlerle yazılır — üzerinde hiçbir şey değerlendirilemeyen dolgu metni değil.',
        },
        {
          title: 'Duyarlı davranış',
          desc: 'Her bölümün 320 ile 2560 piksel arasında nasıl davrandığı taslağın parçasıdır — sonradan uygulamada ortaya çıkan bir şey değil.',
        },
        {
          title: 'Baştan erişilebilirlik',
          desc: 'Kontrastlar, odak durumları, yazı boyutları ve kullanım sırası tasarımda belirlenir, sonradan tamir edilmez.',
        },
      ],
      steps: [
        {
          title: 'Anlamak',
          desc: 'Sayfada kimin ne yapmasını istiyorsunuz ve bugün onu ne engelliyor? Teklifinize, pazarınıza ve karşınızdaki sitelere bakarız.',
        },
        {
          title: 'Yapı',
          desc: 'Önce sayfa planı ve argümanların sırası. Bu karar yapıda dakikalar, bitmiş tasarımda günler maliyetlidir.',
        },
        {
          title: 'Taslak',
          desc: 'Tamamen tasarlanmış, tıklanabilir bir taslak. İki turda geri bildirim verirsiniz — sonrasında taslak onaylıdır ve kapsam sabittir.',
        },
        {
          title: 'Devir',
          desc: 'Onaylanan taslak geliştirmeye gider. Orada ortaya çıkan şey, onayladığınız şeye benzer.',
        },
      ],
      stack: ['Figma', 'CSS değişkenleriyle tasarım sistemi', 'WCAG 2.2 kontrast ölçümü', 'Variable Fonts', 'Duyarlı ızgara'],
      audience: [
        'Sitesini kimsenin ciddiye almadığı şirketler',
        'Şimdiye kadar hazır kurgu üzerinden çalışan serbest çalışanlar',
        'İlk yatırım turundan önce ciddi görünmesi gereken girişimler',
      ],
      faq: [
        {
          q: 'Seçmem için birden fazla tasarım önerisi alır mıyım?',
          a: 'Hayır — bir tane, gerekçesiyle birlikte. Üç öneri, ikisinin inanılmadan yapıldığı anlamına gelir. Bunun yerine tek taslak üzerinde, birlikte keskinleştirdiğimiz iki revizyon turu vardır.',
        },
        {
          q: 'Markamı, logomu ve renklerimi koruyabilir miyim?',
          a: 'Evet. Bir kurumsal kimlik varsa onun içinde çalışırız. Yoksa renk, yazı ve boşluklardan oluşan, sonradan bir markaya büyütülebilecek yalın bir tasarım sistemi kurarız.',
        },
        {
          q: 'Taslağı beğenmezsem ne olur?',
          a: 'İki revizyon turu vardır. Onlar da yetmezse proje tasarım aşamasının sonunda biter — yapılan işi ödersiniz ve taslak sizde kalır. Sizi ikna etmeyen bir tasarım, müşterilerinizi de ikna etmez.',
        },
      ],
    },
    en: {
      slug: 'web-design',
      title: 'Web Design',
      tagline: 'Custom, conversion-driven design — no template, no site builder.',
      intro:
        'Design here is not decoration. It decides what a visitor sees first, what they understand, and what they do next. We design your website as a chain of arguments — from the first line to the point of contact.',
      metaTitle: 'Web design from Berlin — custom, not templated | Surhay Design',
      metaDescription:
        'Custom web design for SMEs, freelancers and startups: structure, typography and conversion logic instead of a template. A clickable draft before the first line of code.',
      priceHint: 'from €2,900 per project',
      duration: '1–2 weeks to an approved draft',
      deliverables: [
        {
          title: 'Structure & site plan',
          desc: 'Which pages exist, in what order they argue, and where the contact path sits — written down before anything is designed.',
        },
        {
          title: 'Clickable draft',
          desc: 'Your homepage and key subpages as a working prototype at desktop and mobile widths. You click through it before any code exists.',
        },
        {
          title: 'Design system',
          desc: 'Colours with measured contrast ratios, a type scale, spacing, buttons and form fields. Decided once, applied everywhere.',
        },
        {
          title: 'Copy scaffold',
          desc: 'Headlines, subheadings and calls to action written out in the draft — no lorem ipsum you cannot judge anything by.',
        },
        {
          title: 'Responsive behaviour',
          desc: 'How every section behaves between 320 and 2560 pixels is part of the draft, not something discovered during the build.',
        },
        {
          title: 'Accessibility from the draft on',
          desc: 'Contrast, focus states, type sizes and operating order are settled in design, not patched in afterwards.',
        },
      ],
      steps: [
        {
          title: 'Understand',
          desc: 'Who should act on this site, and what stops them today? We look at your offer, your market and the websites you compete against.',
        },
        {
          title: 'Structure',
          desc: 'The site plan and the order of arguments come first. That decision costs minutes in a structure and days in a finished design.',
        },
        {
          title: 'Draft',
          desc: 'One fully designed, clickable draft. You give feedback in two rounds — after that the draft is approved and the scope is fixed.',
        },
        {
          title: 'Handover',
          desc: 'The approved draft goes into development. What comes out looks like what you signed off.',
        },
      ],
      stack: ['Figma', 'Design system in CSS variables', 'WCAG 2.2 contrast checks', 'Variable fonts', 'Responsive grid'],
      audience: [
        'Companies whose website no longer earns any trust',
        'Freelancers currently running on a site builder',
        'Startups that need to look credible before a first funding round',
      ],
      faq: [
        {
          q: 'Do I get several design options to choose from?',
          a: 'No — one, and a reasoned one. Three options means two of them were made without conviction. Instead you get two revision rounds on that single draft.',
        },
        {
          q: 'Can I keep my brand, logo and colours?',
          a: 'Yes. If a corporate design exists, we work inside it. If not, a lean design system of colour, type and spacing emerges that can grow into a brand later.',
        },
        {
          q: 'What if I do not like the draft?',
          a: 'That is what the two revision rounds are for. If they do not land, the project ends after the design phase — you pay for the work done and keep the draft. A design that does not convince you will not convince your customers either.',
        },
      ],
    },
  },
  {
    id: 'webentwicklung',
    index: '02',
    de: {
      slug: 'webentwicklung',
      title: 'Webentwicklung',
      tagline: 'Handgeschriebener Code statt Plugin-Stapel — schnell, wartbar, ohne Altlasten.',
      intro:
        'Der freigegebene Entwurf wird zu einer Website, die in unter einer Sekunde steht, auf jedem Gerät funktioniert und die Sie ohne uns pflegen können. Kein Theme, kein Seitenbaukasten, keine dreißig Plugins, die sich gegenseitig blockieren.',
      metaTitle: 'Webentwicklung Berlin — Astro, sauberer Code, eigenes CMS | Surhay Design',
      metaDescription:
        'Performante Webentwicklung ohne Baukasten: statisch generierte Seiten, CMS zur eigenen Pflege, Zweisprachigkeit, Barrierefreiheit und Ladezeiten unter einer Sekunde.',
      priceHint: 'im Projektpreis enthalten',
      duration: '2–4 Wochen',
      deliverables: [
        {
          title: 'Statisch generierte Website',
          desc: 'Vorgerenderte HTML-Seiten statt Datenbankabfragen bei jedem Aufruf. Nichts, was zur Laufzeit kaputtgehen kann, und nichts, was gehackt werden könnte.',
        },
        {
          title: 'CMS zur eigenen Pflege',
          desc: 'Ein Redaktionsbereich, in dem Sie Texte, Bilder, Blogbeiträge und Referenzen selbst ändern — ohne uns und ohne HTML-Kenntnisse.',
        },
        {
          title: 'Zweisprachigkeit',
          desc: 'Deutsch und Englisch als gleichwertige Seitenbäume mit eigenen URLs, hreflang-Auszeichnung und Sprachumschalter — nicht als Übersetzungs-Plugin.',
        },
        {
          title: 'Formulare & Anbindungen',
          desc: 'Kontakt- und Anfrageformulare mit Spamschutz, auf Wunsch angebunden an Ihr CRM, Ihren Kalender oder Ihren Newsletter.',
        },
        {
          title: 'Barrierefreiheit',
          desc: 'Semantisches HTML, Tastaturbedienung, sichtbarer Fokus, korrekte Überschriftenhierarchie und Alternativtexte. Geprüft, nicht behauptet.',
        },
        {
          title: 'Übergabe & Dokumentation',
          desc: 'Quellcode, Zugänge und eine kurze Anleitung gehören Ihnen. Auch wenn die Zusammenarbeit endet, bleibt die Website Ihre.',
        },
      ],
      steps: [
        {
          title: 'Aufbau',
          desc: 'Projektgerüst, Designsystem in Code, Komponenten. Am Ende dieses Schritts steht die Website als leeres, aber vollständiges Skelett.',
        },
        {
          title: 'Umsetzung',
          desc: 'Seite für Seite aus dem freigegebenen Entwurf. Sie bekommen eine Vorschau-URL und sehen den Fortschritt jeden Tag statt einmal am Ende.',
        },
        {
          title: 'Inhalte & CMS',
          desc: 'Ihre echten Texte und Bilder wandern hinein, das CMS wird eingerichtet, und Sie bekommen eine Einweisung von etwa 30 Minuten.',
        },
        {
          title: 'Test & Launch',
          desc: 'Prüfung auf Geräten und Browsern, Lighthouse-Messung, Weiterleitungen von alten URLs, dann der Umzug auf Ihre Domain.',
        },
      ],
      stack: ['Astro', 'TypeScript', 'Tailwind CSS', 'Git-basiertes CMS', 'Automatisierter Deploy', 'Hostinger / Netlify / eigener Server'],
      audience: [
        'Unternehmen, deren WordPress-Installation zur Dauerbaustelle geworden ist',
        'Selbstständige, die Inhalte selbst pflegen wollen, aber kein Backend-Studium dafür',
        'Startups mit Anbindungsbedarf an CRM, Buchungssystem oder Produktdaten',
      ],
      faq: [
        {
          q: 'Bekomme ich WordPress?',
          a: 'In der Regel nicht. Für eine Unternehmenswebsite mit 5 bis 15 Seiten ist WordPress überdimensioniert und wird zur Wartungslast. Wenn Ihr Team es aber bereits sicher bedient oder Sie einen Shop brauchen, sagen wir das im Erstgespräch offen.',
        },
        {
          q: 'Kann ich Inhalte wirklich selbst ändern?',
          a: 'Ja. Texte, Bilder, Blogbeiträge, Referenzen und FAQ-Einträge laufen über einen Redaktionsbereich mit Formularfeldern und Vorschau. Nach dem Speichern baut sich die Seite von selbst neu — das dauert ein bis zwei Minuten.',
        },
        {
          q: 'Wem gehört der Code?',
          a: 'Ihnen. Nach der Schlussrechnung erhalten Sie das vollständige Repository und alle Zugänge. Es gibt keine Lizenz, die Sie an uns bindet.',
        },
        {
          q: 'Was ist mit meiner bestehenden Domain und den E-Mail-Adressen?',
          a: 'Die Domain ziehen wir um, ohne dass Ihre E-Mails ausfallen — die Postfächer bleiben unberührt. Alte URLs bekommen 301-Weiterleitungen, damit weder Suchmaschinen noch verlinkte Partner ins Leere laufen.',
        },
      ],
    },
    tr: {
      slug: 'web-gelistirme',
      title: 'Web geliştirme',
      tagline: 'Eklenti yığını değil, elle yazılmış kod — hızlı, sürdürülebilir, mirassız.',
      intro:
        'Onaylanan taslak; bir saniyenin altında açılan, her cihazda çalışan ve bizsiz de yönetebileceğiniz bir web sitesine dönüşür. Tema yok, sayfa kurucu yok, birbirini engelleyen otuz eklenti yok.',
      metaTitle: 'Berlin’de web geliştirme — Astro, temiz kod, kendi içerik sisteminiz | Surhay Design',
      metaDescription:
        'Hazır kurgusuz, performanslı web geliştirme: statik üretilen sayfalar, kendi yönetiminiz için içerik sistemi, çok dillilik, erişilebilirlik ve bir saniyenin altında yüklenme.',
      priceHint: 'proje fiyatına dahil',
      duration: '2–4 hafta',
      deliverables: [
        {
          title: 'Statik üretilen web sitesi',
          desc: 'Her çağrıda veritabanı sorgusu yerine önceden üretilmiş HTML sayfaları. Çalışma anında bozulabilecek bir şey yok, ele geçirilebilecek bir şey de yok.',
        },
        {
          title: 'Kendi yönetiminiz için içerik sistemi',
          desc: 'Metinleri, görselleri, blog yazılarını ve referansları kendiniz değiştirdiğiniz bir yönetim alanı — bize sormadan, HTML bilmeden.',
        },
        {
          title: 'Çok dillilik',
          desc: 'Kendi adresleri, hreflang işaretlemesi ve dil değiştiricisi olan eşdeğer sayfa ağaçları — bir çeviri eklentisi değil.',
        },
        {
          title: 'Formlar & entegrasyonlar',
          desc: 'Spam korumalı iletişim ve talep formları, istenirse CRM’inize, takviminize veya bülteninize bağlanır.',
        },
        {
          title: 'Erişilebilirlik',
          desc: 'Anlamsal HTML, klavyeyle kullanım, görünür odak, doğru başlık hiyerarşisi ve alternatif metinler. İddia edilmez, ölçülür.',
        },
        {
          title: 'Devir & belgeler',
          desc: 'Kaynak kod, erişimler ve kısa bir kılavuz size aittir. İş birliği bitse de site sizin kalır.',
        },
      ],
      steps: [
        {
          title: 'Kurulum',
          desc: 'Proje iskeleti, kod içinde tasarım sistemi, bileşenler. Bu adımın sonunda site boş ama eksiksiz bir iskelet olarak durur.',
        },
        {
          title: 'Uygulama',
          desc: 'Onaylı taslaktan sayfa sayfa. Bir önizleme adresi alır ve ilerlemeyi sonunda bir kez değil, her gün görürsünüz.',
        },
        {
          title: 'İçerik & yönetim sistemi',
          desc: 'Gerçek metin ve görselleriniz içeri girer, içerik sistemi kurulur ve yaklaşık 30 dakikalık bir devir eğitimi alırsınız.',
        },
        {
          title: 'Test & yayın',
          desc: 'Cihaz ve tarayıcı testleri, Lighthouse ölçümü, eski adreslerden yönlendirmeler, ardından kendi alan adınıza taşıma.',
        },
      ],
      stack: ['Astro', 'TypeScript', 'Tailwind CSS', 'Git tabanlı içerik sistemi', 'Otomatik yayınlama', 'Hostinger / Netlify / kendi sunucunuz'],
      audience: [
        'WordPress kurulumu bitmeyen bir şantiyeye dönmüş şirketler',
        'İçeriği kendisi yönetmek isteyen ama bunun için arka uç öğrenmek istemeyen serbest çalışanlar',
        'CRM, rezervasyon sistemi veya ürün verisiyle entegrasyon gereken girişimler',
      ],
      faq: [
        {
          q: 'WordPress mi alacağım?',
          a: 'Genelde hayır. 5 ila 15 sayfalık bir şirket sitesi için WordPress fazla ağırdır ve bakım yüküne dönüşür. Ancak ekibiniz onu zaten güvenle kullanıyorsa ya da bir mağazaya ihtiyacınız varsa bunu ön görüşmede açıkça söyleriz.',
        },
        {
          q: 'İçerikleri gerçekten kendim değiştirebilir miyim?',
          a: 'Evet. Metinler, görseller, blog yazıları, referanslar ve SSS kayıtları; form alanları ve önizlemesi olan bir yönetim alanından geçer. Kaydettikten sonra site kendini yeniden kurar — bu bir iki dakika sürer.',
        },
        {
          q: 'Kod kime ait?',
          a: 'Size. Son faturadan sonra tüm depoyu ve erişimleri alırsınız. Sizi bize bağlayan hiçbir lisans yoktur.',
        },
        {
          q: 'Mevcut alan adım ve e-posta adreslerim ne olacak?',
          a: 'Alan adını e-postalarınız kesintiye uğramadan taşırız — kutular olduğu gibi kalır. Eski adresler 301 yönlendirmesi alır, böylece ne arama motorları ne de bağlantı veren iş ortakları boşa düşer.',
        },
      ],
    },
    en: {
      slug: 'web-development',
      title: 'Web Development',
      tagline: 'Hand-written code instead of a plugin stack — fast, maintainable, no legacy.',
      intro:
        'The approved draft becomes a website that renders in under a second, works on every device, and that you can maintain without us. No theme, no page builder, no thirty plugins blocking each other.',
      metaTitle: 'Web development Berlin — Astro, clean code, your own CMS | Surhay Design',
      metaDescription:
        'High-performance web development without a site builder: statically generated pages, a CMS you maintain yourself, bilingual routing, accessibility and sub-second load times.',
      priceHint: 'included in the project price',
      duration: '2–4 weeks',
      deliverables: [
        {
          title: 'Statically generated site',
          desc: 'Pre-rendered HTML instead of a database query per visit. Nothing that can break at runtime, and nothing that can be hacked.',
        },
        {
          title: 'A CMS you maintain yourself',
          desc: 'An editing area where you change copy, images, blog posts and case studies yourself — without us and without HTML.',
        },
        {
          title: 'Bilingual by construction',
          desc: 'German and English as equal page trees with their own URLs, hreflang markup and a language switch — not a translation plugin.',
        },
        {
          title: 'Forms & integrations',
          desc: 'Contact and enquiry forms with spam protection, optionally wired into your CRM, calendar or newsletter.',
        },
        {
          title: 'Accessibility',
          desc: 'Semantic HTML, keyboard operation, visible focus, a correct heading hierarchy and alt text. Verified, not claimed.',
        },
        {
          title: 'Handover & documentation',
          desc: 'Source code, credentials and a short guide are yours. Even if the collaboration ends, the website stays yours.',
        },
      ],
      steps: [
        {
          title: 'Set-up',
          desc: 'Project scaffold, design system in code, components. At the end of this step the site exists as an empty but complete skeleton.',
        },
        {
          title: 'Build',
          desc: 'Page by page from the approved draft. You get a preview URL and see progress every day instead of once at the end.',
        },
        {
          title: 'Content & CMS',
          desc: 'Your real copy and images move in, the CMS is configured, and you get a walkthrough of roughly 30 minutes.',
        },
        {
          title: 'Test & launch',
          desc: 'Device and browser checks, a Lighthouse run, redirects from old URLs, then the move to your domain.',
        },
      ],
      stack: ['Astro', 'TypeScript', 'Tailwind CSS', 'Git-based CMS', 'Automated deploys', 'Hostinger / Netlify / your own server'],
      audience: [
        'Companies whose WordPress install has become a permanent building site',
        'Freelancers who want to edit content themselves without studying a backend',
        'Startups that need to connect a CRM, booking system or product data',
      ],
      faq: [
        {
          q: 'Do I get WordPress?',
          a: 'Usually not. For a company site of 5 to 15 pages WordPress is oversized and turns into a maintenance burden. If your team already operates it confidently, or you need a shop, we say so openly in the first call.',
        },
        {
          q: 'Can I really edit content myself?',
          a: 'Yes. Copy, images, blog posts, case studies and FAQ entries run through an editing area with form fields and a preview. After saving, the site rebuilds itself in a minute or two.',
        },
        {
          q: 'Who owns the code?',
          a: 'You do. After the final invoice you receive the full repository and all credentials. There is no licence tying you to us.',
        },
        {
          q: 'What happens to my existing domain and email addresses?',
          a: 'We move the domain without your email going down — mailboxes stay untouched. Old URLs get 301 redirects so neither search engines nor partners who linked to you hit a dead end.',
        },
      ],
    },
  },
  {
    id: 'seo-performance',
    index: '03',
    de: {
      slug: 'seo-performance',
      title: 'SEO & Performance',
      tagline: 'Gefunden werden und schnell sein — technisch belegt, nicht versprochen.',
      intro:
        'Eine Website, die niemand findet, ist eine Visitenkarte in der Schublade. Wir bauen die technische Grundlage so, dass Suchmaschinen Ihre Seiten verstehen, und messen Ladezeit und Core Web Vitals, statt darüber zu reden.',
      metaTitle: 'SEO & Performance — technische Optimierung aus Berlin | Surhay Design',
      metaDescription:
        'Technisches SEO und Ladezeit-Optimierung: Core Web Vitals im grünen Bereich, saubere strukturierte Daten, Keyword-Struktur und messbare Sichtbarkeit statt Versprechen.',
      priceHint: 'Grundsetup im Projekt · Betreuung ab 190 €/Monat',
      duration: 'Setup im Projekt · Wirkung nach 3–6 Monaten',
      deliverables: [
        {
          title: 'Technisches Fundament',
          desc: 'Sitemap, robots.txt, saubere URLs, kanonische Adressen, hreflang, 301-Weiterleitungen und indexierbare Rechtstexte. Die Basis, an der die meisten Seiten scheitern.',
        },
        {
          title: 'Core Web Vitals',
          desc: 'LCP, CLS und INP werden gemessen und optimiert — nicht geschätzt. Zielwert: grüner Bereich auf Mobilgeräten, nicht nur im Desktop-Test.',
        },
        {
          title: 'Strukturierte Daten',
          desc: 'Auszeichnung als Unternehmen, Leistungen, Artikel, FAQ und Breadcrumb im schema.org-Format. Damit Google Ihre Seite versteht statt sie nur zu lesen.',
        },
        {
          title: 'Keyword- und Seitenstruktur',
          desc: 'Welche Seite auf welchen Suchbegriff antwortet, wird vor dem Schreiben entschieden. Eine Seite pro Absicht — keine zwei Seiten, die sich gegenseitig verdrängen.',
        },
        {
          title: 'Lokale Sichtbarkeit',
          desc: 'Einrichtung und Pflege des Google-Unternehmensprofils, konsistente Firmendaten und lokale Landingpages, wenn Ihre Kunden aus der Region kommen.',
        },
        {
          title: 'Messung, die Sie lesen können',
          desc: 'Search Console und eine datenschutzfreundliche Statistik ohne Cookie-Banner. Auf Wunsch monatlich ein Bericht in zwei Absätzen statt 40 Seiten PDF.',
        },
      ],
      steps: [
        {
          title: 'Bestandsaufnahme',
          desc: 'Wo stehen Sie heute? Indexierung, Rankings, Ladezeiten, technische Fehler — als Liste mit Prioritäten, nicht als Werkzeug-Export.',
        },
        {
          title: 'Technik zuerst',
          desc: 'Erst wird repariert, was Suchmaschinen aktiv behindert. Inhalte auf einer technisch kaputten Seite zu optimieren ist verlorene Arbeit.',
        },
        {
          title: 'Inhalte nach Absicht',
          desc: 'Jede Seite bekommt eine klare Suchabsicht, eine passende Überschriftenstruktur und einen Text, der die Frage tatsächlich beantwortet.',
        },
        {
          title: 'Nachmessen',
          desc: 'Nach vier, zwölf und vierundzwanzig Wochen. Was nicht wirkt, wird geändert — nicht schöngerechnet.',
        },
      ],
      stack: ['Google Search Console', 'Lighthouse / PageSpeed Insights', 'schema.org (JSON-LD)', 'Plausible oder Matomo', 'Screaming Frog'],
      audience: [
        'Unternehmen, die für ihren eigenen Namen ranken, aber für ihre Leistung nicht',
        'Websites, die nach einem Relaunch Sichtbarkeit verloren haben',
        'Regionale Anbieter, die im lokalen Suchergebnis nicht auftauchen',
      ],
      faq: [
        {
          q: 'Garantieren Sie Platz 1 bei Google?',
          a: 'Nein, und niemand kann das seriös. Was wir zusichern: eine technisch einwandfreie Seite, eine begründete Keyword-Struktur und messbare Werte. Wer Ihnen Platz 1 garantiert, verkauft Ihnen ein Ranking auf einen Begriff, den ohnehin niemand sucht.',
        },
        {
          q: 'Wie lange dauert es, bis SEO wirkt?',
          a: 'Technische Verbesserungen greifen in Tagen bis Wochen. Inhaltliche Sichtbarkeit auf umkämpfte Begriffe braucht drei bis sechs Monate, oft länger. Wer Ihnen etwas anderes sagt, plant Ihr Budget für seinen Umsatz.',
        },
        {
          q: 'Brauche ich ein Cookie-Banner für die Statistik?',
          a: 'Bei einer cookiefreien Lösung wie Plausible oder einer entsprechend konfigurierten Matomo-Installation nicht. Das ist rechtlich sauberer und kostet Sie keine Besucher, die das Banner wegklicken.',
        },
      ],
    },
    tr: {
      slug: 'seo-performans',
      title: 'SEO & performans',
      tagline: 'Bulunmak ve hızlı olmak — vaat edilmez, teknik olarak belgelenir.',
      intro:
        'Kimsenin bulamadığı bir web sitesi, çekmecede duran bir kartvizittir. Teknik temeli, arama motorları sayfalarınızı anlayacak biçimde kurar; yüklenme süresi ve Core Web Vitals üzerine konuşmak yerine onları ölçeriz.',
      metaTitle: 'SEO & performans — Berlin’den teknik optimizasyon | Surhay Design',
      metaDescription:
        'Teknik SEO ve yüklenme süresi optimizasyonu: yeşil bölgede Core Web Vitals, temiz yapılandırılmış veri, anahtar kelime yapısı ve vaat değil ölçülebilir görünürlük.',
      priceHint: 'temel kurulum projede · destek aylık 190 €’dan başlar',
      duration: 'kurulum projede · etkisi 3–6 ay sonra',
      deliverables: [
        {
          title: 'Teknik temel',
          desc: 'Site haritası, robots.txt, temiz adresler, kanonik adresler, hreflang, 301 yönlendirmeleri ve indekslenebilir hukuki metinler. Çoğu sitenin takıldığı temel.',
        },
        {
          title: 'Core Web Vitals',
          desc: 'LCP, CLS ve INP tahmin edilmez, ölçülür ve iyileştirilir. Hedef: yalnızca masaüstü testinde değil, mobil cihazlarda yeşil bölge.',
        },
        {
          title: 'Yapılandırılmış veri',
          desc: 'Şirket, hizmetler, makale, SSS ve içerik yolu schema.org biçiminde işaretlenir. Google sayfanızı yalnızca okumasın, anlasın diye.',
        },
        {
          title: 'Anahtar kelime ve sayfa yapısı',
          desc: 'Hangi sayfanın hangi arama terimine yanıt vereceği, yazmaya başlamadan kararlaştırılır. Her niyet için bir sayfa — birbirini bastıran iki sayfa değil.',
        },
        {
          title: 'Yerel görünürlük',
          desc: 'Google işletme profilinin kurulması ve bakımı, tutarlı firma bilgileri ve müşterileriniz bölgedense yerel açılış sayfaları.',
        },
        {
          title: 'Okuyabileceğiniz ölçüm',
          desc: 'Search Console ve çerez uyarısı gerektirmeyen, gizliliğe saygılı bir istatistik. İsterseniz 40 sayfalık PDF yerine ayda iki paragraflık bir rapor.',
        },
      ],
      steps: [
        {
          title: 'Durum tespiti',
          desc: 'Bugün neredesiniz? İndeksleme, sıralamalar, yüklenme süreleri, teknik hatalar — araç çıktısı olarak değil, öncelikli bir liste olarak.',
        },
        {
          title: 'Önce teknik',
          desc: 'Önce arama motorlarını aktif olarak engelleyen şeyler onarılır. Teknik olarak bozuk bir sitede içerik iyileştirmek boşa emektir.',
        },
        {
          title: 'Niyete göre içerik',
          desc: 'Her sayfa net bir arama niyeti, uygun bir başlık yapısı ve soruyu gerçekten yanıtlayan bir metin alır.',
        },
        {
          title: 'Yeniden ölçüm',
          desc: 'Dört, on iki ve yirmi dört hafta sonra. İşe yaramayan değiştirilir — rakamlarla güzelleştirilmez.',
        },
      ],
      stack: ['Google Search Console', 'Lighthouse / PageSpeed Insights', 'schema.org (JSON-LD)', 'Plausible veya Matomo', 'Screaming Frog'],
      audience: [
        'Kendi adıyla sıralanan ama hizmetiyle sıralanmayan şirketler',
        'Bir yenilemeden sonra görünürlük kaybetmiş siteler',
        'Yerel arama sonuçlarında görünmeyen bölgesel sağlayıcılar',
      ],
      faq: [
        {
          q: 'Google’da birinci sırayı garanti ediyor musunuz?',
          a: 'Hayır, ve bunu ciddi biçimde kimse garanti edemez. Taahhüt ettiğimiz şey: teknik olarak kusursuz bir site, gerekçeli bir anahtar kelime yapısı ve ölçülebilir değerler. Size birinciliği garanti eden, zaten kimsenin aramadığı bir terimde sıralama satıyordur.',
        },
        {
          q: 'SEO’nun etkisi ne kadar sürede görülür?',
          a: 'Teknik iyileştirmeler günler ya da haftalar içinde etki eder. Rekabetli terimlerde içerik görünürlüğü üç ila altı ay, çoğu zaman daha uzun sürer. Size başka bir şey söyleyen, kendi cirosu için sizin bütçenizi planlıyordur.',
        },
        {
          q: 'İstatistik için çerez uyarısına ihtiyacım var mı?',
          a: 'Plausible gibi çerezsiz bir çözümde ya da uygun yapılandırılmış bir Matomo kurulumunda hayır. Bu hukuken daha temizdir ve uyarıyı kapatıp giden ziyaretçilere mal olmaz.',
        },
      ],
    },
    en: {
      slug: 'seo-performance',
      title: 'SEO & Performance',
      tagline: 'Get found and be fast — technically evidenced, not promised.',
      intro:
        'A website nobody finds is a business card in a drawer. We build the technical groundwork so search engines understand your pages, and we measure load time and Core Web Vitals instead of talking about them.',
      metaTitle: 'SEO & performance — technical optimisation from Berlin | Surhay Design',
      metaDescription:
        'Technical SEO and load-time optimisation: Core Web Vitals in the green, clean structured data, a deliberate keyword structure and measurable visibility instead of promises.',
      priceHint: 'base setup included · ongoing from €190/month',
      duration: 'Setup within the project · effect after 3–6 months',
      deliverables: [
        {
          title: 'Technical foundation',
          desc: 'Sitemap, robots.txt, clean URLs, canonicals, hreflang, 301 redirects and indexable legal pages. The basics most sites fail on.',
        },
        {
          title: 'Core Web Vitals',
          desc: 'LCP, CLS and INP are measured and optimised — not estimated. Target: green on mobile, not only in a desktop test.',
        },
        {
          title: 'Structured data',
          desc: 'Markup for organisation, services, articles, FAQ and breadcrumbs in schema.org format. So Google understands your page rather than merely reading it.',
        },
        {
          title: 'Keyword and page structure',
          desc: 'Which page answers which search intent is decided before writing. One page per intent — never two competing with each other.',
        },
        {
          title: 'Local visibility',
          desc: 'Setting up and maintaining the Google Business Profile, consistent company data and local landing pages when your customers come from the region.',
        },
        {
          title: 'Reporting you can actually read',
          desc: 'Search Console and privacy-friendly analytics without a cookie banner. On request, a monthly two-paragraph report instead of a 40-page PDF.',
        },
      ],
      steps: [
        {
          title: 'Baseline',
          desc: 'Where do you stand today? Indexing, rankings, load times, technical errors — as a prioritised list, not a tool export.',
        },
        {
          title: 'Technology first',
          desc: 'We fix what actively blocks search engines first. Optimising content on a technically broken site is wasted work.',
        },
        {
          title: 'Content by intent',
          desc: 'Every page gets one clear search intent, a matching heading structure and copy that actually answers the question.',
        },
        {
          title: 'Re-measure',
          desc: 'After four, twelve and twenty-four weeks. What does not work gets changed — not massaged into a nicer chart.',
        },
      ],
      stack: ['Google Search Console', 'Lighthouse / PageSpeed Insights', 'schema.org (JSON-LD)', 'Plausible or Matomo', 'Screaming Frog'],
      audience: [
        'Companies that rank for their own name but not for what they do',
        'Websites that lost visibility after a relaunch',
        'Regional providers who do not appear in local results',
      ],
      faq: [
        {
          q: 'Do you guarantee position 1 on Google?',
          a: 'No, and nobody can do so credibly. What we do commit to: a technically sound site, a reasoned keyword structure and measurable numbers. Anyone guaranteeing you position 1 is selling you a ranking for a term nobody searches for.',
        },
        {
          q: 'How long until SEO works?',
          a: 'Technical improvements take days to weeks. Content visibility on competitive terms takes three to six months, often longer. Anyone telling you otherwise is planning your budget around their revenue.',
        },
        {
          q: 'Do I need a cookie banner for analytics?',
          a: 'Not with a cookie-free setup such as Plausible or a correspondingly configured Matomo install. It is legally cleaner and costs you none of the visitors who click banners away.',
        },
      ],
    },
  },
  {
    id: 'wartung',
    index: '04',
    de: {
      slug: 'wartung-support',
      title: 'Wartung & Support',
      tagline: 'Updates, Sicherheit, Backups und ein Ansprechpartner — monatlich kündbar.',
      intro:
        'Eine Website ist kein Möbelstück, das man einmal aufstellt. Software altert, Zertifikate laufen ab, Inhalte veralten. Wir halten Ihre Seite aktuell, sicher und schnell — und Sie haben jemanden, den Sie anrufen können.',
      metaTitle: 'Website-Wartung & Support aus Berlin — monatlich kündbar | Surhay Design',
      metaDescription:
        'Wartungspakete für Ihre Website: Updates, Sicherheits-Monitoring, tägliche Backups, Verfügbarkeitsprüfung, Inhaltspflege und fester Ansprechpartner. Monatlich kündbar.',
      priceHint: 'ab 49 €/Monat',
      duration: 'fortlaufend, monatlich kündbar',
      deliverables: [
        {
          title: 'Updates & Abhängigkeiten',
          desc: 'Alle eingesetzten Bibliotheken werden aktuell gehalten und nach dem Update geprüft — nicht blind eingespielt und gehofft.',
        },
        {
          title: 'Sicherheit & Monitoring',
          desc: 'Bekannte Schwachstellen werden automatisiert gemeldet und bewertet. Sicherheitskritische Lücken schließen wir ohne Rückfrage und informieren Sie danach.',
        },
        {
          title: 'Backups',
          desc: 'Tägliche Sicherung mit 30 Tagen Historie und einem Wiederherstellungstest pro Quartal. Ein Backup, das nie zurückgespielt wurde, ist kein Backup.',
        },
        {
          title: 'Verfügbarkeitsprüfung',
          desc: 'Prüfung im Minutentakt. Fällt die Seite aus, erfahren wir es vor Ihnen — und Sie bekommen eine Nachricht, keine Überraschung vom Kunden.',
        },
        {
          title: 'Inhaltspflege',
          desc: 'Je nach Paket ein Kontingent an Textänderungen, neuen Bildern oder einer zusätzlichen Unterseite pro Monat. Sie schreiben eine E-Mail, wir machen es.',
        },
        {
          title: 'Fester Ansprechpartner',
          desc: 'Keine Ticketnummer, keine Warteschleife. Antwort innerhalb eines Werktags, bei Ausfall der Seite sofort.',
        },
      ],
      steps: [
        {
          title: 'Übernahme',
          desc: 'Zugänge, Bestandsaufnahme, Einrichtung von Backups und Monitoring. Bei fremden Websites zusätzlich ein Sicherheits- und Ladezeit-Check.',
        },
        {
          title: 'Laufender Betrieb',
          desc: 'Updates, Prüfungen und Änderungswünsche laufen im vereinbarten Takt. Sie merken davon idealerweise nichts.',
        },
        {
          title: 'Quartalsblick',
          desc: 'Alle drei Monate ein kurzer Bericht: Was wurde gemacht, was ist aufgefallen, was empfehlen wir als Nächstes.',
        },
      ],
      stack: ['Automatisierte Abhängigkeits-Updates', 'Uptime-Monitoring', 'Tägliche Backups', 'Lighthouse-Messung im Monatsrhythmus', 'SSL-Überwachung'],
      audience: [
        'Kunden nach dem Launch, die sich nicht selbst um Updates kümmern wollen',
        'Unternehmen mit einer bestehenden Website, deren Dienstleister nicht mehr erreichbar ist',
        'Alle, für die ein Website-Ausfall direkt Umsatz kostet',
      ],
      faq: [
        {
          q: 'Übernehmen Sie auch Websites, die Sie nicht gebaut haben?',
          a: 'Ja, nach einer Bestandsaufnahme. Sie kostet einmalig 290 € und zeigt, was der Betrieb realistisch kostet. Ist die Seite in einem Zustand, in dem wir sie nicht verantworten können, sagen wir das — und rechnen nur die Bestandsaufnahme ab.',
        },
        {
          q: 'Bin ich an eine Laufzeit gebunden?',
          a: 'Nein. Alle Pakete sind zum Monatsende kündbar. Eine Mindestlaufzeit wäre eine Wette darauf, dass Sie irgendwann gehen wollen — dann stimmt etwas anderes nicht.',
        },
        {
          q: 'Was passiert, wenn meine Seite nachts ausfällt?',
          a: 'Das Monitoring meldet den Ausfall sofort. Werktags reagieren wir innerhalb weniger Stunden, außerhalb der Geschäftszeiten am nächsten Morgen. Wer echte Rund-um-die-Uhr-Bereitschaft braucht, bekommt von uns eine ehrliche Empfehlung statt eines Versprechens, das wir allein nicht halten können.',
        },
      ],
    },
    tr: {
      slug: 'bakim-destek',
      title: 'Bakım & destek',
      tagline: 'Güncellemeler, güvenlik, yedekler ve bir muhatap — aylık iptal edilebilir.',
      intro:
        'Web sitesi bir kez yerleştirilip unutulan bir mobilya değildir. Yazılım eskir, sertifikalar dolar, içerik güncelliğini yitirir. Sitenizi güncel, güvenli ve hızlı tutarız — ve arayabileceğiniz biri olur.',
      metaTitle: 'Berlin’den web sitesi bakımı & desteği — aylık iptal edilebilir | Surhay Design',
      metaDescription:
        'Siteniz için bakım paketleri: güncellemeler, güvenlik izleme, günlük yedekler, erişilebilirlik kontrolü, içerik bakımı ve sabit bir muhatap. Aylık iptal edilebilir.',
      priceHint: 'aylık 49 €’dan başlar',
      duration: 'süregelen, aylık iptal edilebilir',
      deliverables: [
        {
          title: 'Güncellemeler & bağımlılıklar',
          desc: 'Kullanılan tüm kütüphaneler güncel tutulur ve güncellemeden sonra kontrol edilir — körlemesine kurulup en iyisi umulmaz.',
        },
        {
          title: 'Güvenlik & izleme',
          desc: 'Bilinen açıklar otomatik olarak bildirilir ve değerlendirilir. Güvenlik açısından kritik olanları sormadan kapatır, sonrasında size haber veririz.',
        },
        {
          title: 'Yedekler',
          desc: '30 günlük geçmişle günlük yedek ve üç ayda bir geri yükleme testi. Hiç geri yüklenmemiş bir yedek, yedek değildir.',
        },
        {
          title: 'Erişilebilirlik kontrolü',
          desc: 'Dakikalık kontrol. Site düşerse bunu sizden önce biz öğreniriz — ve müşteriden gelen bir sürpriz yerine bizden bir mesaj alırsınız.',
        },
        {
          title: 'İçerik bakımı',
          desc: 'Pakete göre aylık bir kontenjan: metin değişiklikleri, yeni görseller ya da ek bir alt sayfa. Siz bir e-posta yazarsınız, biz yaparız.',
        },
        {
          title: 'Sabit muhatap',
          desc: 'Bilet numarası yok, bekleme sırası yok. Bir iş günü içinde yanıt, site kesintisinde hemen.',
        },
      ],
      steps: [
        {
          title: 'Devralma',
          desc: 'Erişimler, durum tespiti, yedek ve izleme kurulumu. Bize ait olmayan sitelerde ayrıca bir güvenlik ve yüklenme süresi kontrolü.',
        },
        {
          title: 'Süregelen işletme',
          desc: 'Güncellemeler, kontroller ve değişiklik istekleri kararlaştırılan ritimde ilerler. İdeal olarak bunları hiç fark etmezsiniz.',
        },
        {
          title: 'Üç aylık bakış',
          desc: 'Her üç ayda kısa bir rapor: ne yapıldı, ne dikkat çekti, sırada ne öneriyoruz.',
        },
      ],
      stack: ['Otomatik bağımlılık güncellemeleri', 'Erişilebilirlik izleme', 'Günlük yedekler', 'Aylık Lighthouse ölçümü', 'SSL izleme'],
      audience: [
        'Yayından sonra güncellemelerle uğraşmak istemeyen müşteriler',
        'Mevcut sitesi olan ama hizmet sağlayıcısına ulaşamayan şirketler',
        'Site kesintisi doğrudan ciro kaybettiren herkes',
      ],
      faq: [
        {
          q: 'Sizin yapmadığınız siteleri de devralıyor musunuz?',
          a: 'Evet, bir durum tespitinden sonra. Tek seferlik 290 € tutar ve işletmenin gerçekçi maliyetini gösterir. Site sorumluluğunu alamayacağımız bir hâldeyse bunu söyler, yalnızca durum tespitini faturalarız.',
        },
        {
          q: 'Taahhüt süresine bağlı mıyım?',
          a: 'Hayır. Tüm paketler ay sonunda iptal edilebilir. Asgari süre, bir gün gitmek isteyeceğinize oynanan bir bahis olurdu — o zaman zaten başka bir şey yolunda değildir.',
        },
        {
          q: 'Sitem gece çökerse ne olur?',
          a: 'İzleme kesintiyi anında bildirir. Hafta içi birkaç saat içinde, mesai dışında ertesi sabah müdahale ederiz. Gerçek 7/24 nöbet gerekiyorsa, tek başımıza tutamayacağımız bir söz yerine dürüst bir tavsiye alırsınız.',
        },
      ],
    },
    en: {
      slug: 'care-support',
      title: 'Care & Support',
      tagline: 'Updates, security, backups and one person to call — cancel monthly.',
      intro:
        'A website is not a piece of furniture you put up once. Software ages, certificates expire, content goes stale. We keep your site current, secure and fast — and you have someone to call.',
      metaTitle: 'Website care & support from Berlin — cancel monthly | Surhay Design',
      metaDescription:
        'Care plans for your website: updates, security monitoring, daily backups, uptime checks, content edits and a named contact. Cancel monthly.',
      priceHint: 'from €49/month',
      duration: 'ongoing, cancel monthly',
      deliverables: [
        {
          title: 'Updates & dependencies',
          desc: 'Every library in use is kept current and checked after the update — not applied blindly and hoped for.',
        },
        {
          title: 'Security & monitoring',
          desc: 'Known vulnerabilities are reported automatically and assessed. Security-critical holes we close without asking first and tell you afterwards.',
        },
        {
          title: 'Backups',
          desc: 'Daily backups with 30 days of history and a restore test every quarter. A backup never restored is not a backup.',
        },
        {
          title: 'Uptime checks',
          desc: 'Checked every minute. If the site goes down we know before you do — and you get a message rather than a surprise from a customer.',
        },
        {
          title: 'Content edits',
          desc: 'Depending on the plan, an allowance of copy changes, new images or one extra subpage per month. You send an email, we do it.',
        },
        {
          title: 'A named contact',
          desc: 'No ticket number, no hold music. A reply within one working day, and immediately if the site is down.',
        },
      ],
      steps: [
        {
          title: 'Takeover',
          desc: 'Credentials, an inventory, backup and monitoring setup. For sites we did not build, additionally a security and load-time check.',
        },
        {
          title: 'Running operation',
          desc: 'Updates, checks and change requests run on the agreed cadence. Ideally you notice none of it.',
        },
        {
          title: 'Quarterly review',
          desc: 'Every three months a short report: what was done, what stood out, what we recommend next.',
        },
      ],
      stack: ['Automated dependency updates', 'Uptime monitoring', 'Daily backups', 'Monthly Lighthouse runs', 'SSL monitoring'],
      audience: [
        'Clients after launch who would rather not handle updates themselves',
        'Companies with an existing site whose previous provider has gone quiet',
        'Anyone for whom downtime costs revenue directly',
      ],
      faq: [
        {
          q: 'Do you take over websites you did not build?',
          a: 'Yes, after an inventory. It costs €290 once and shows what running the site realistically costs. If the site is in a state we cannot take responsibility for, we say so — and bill only the inventory.',
        },
        {
          q: 'Am I tied into a term?',
          a: 'No. All plans can be cancelled at the end of any month. A minimum term would be a bet that you will eventually want to leave — in which case something else is wrong.',
        },
        {
          q: 'What if my site goes down at night?',
          a: 'Monitoring reports it immediately. On working days we react within a few hours, outside business hours the next morning. If you genuinely need 24/7 standby, you get an honest recommendation from us rather than a promise we cannot keep alone.',
        },
      ],
    },
  },
];

/** Ein Service anhand seiner ID. */
export function getService(id: string): Service | undefined {
  return services.find((s) => s.id === id);
}

/** Slug-Paar für die hreflang-Alternates einer Leistungs-Detailseite. */
export function serviceSlugs(service: Service): Record<Lang, string> {
  return { de: service.de.slug, tr: service.tr.slug, en: service.en.slug };
}

/**
 * Leistungs-Icons — ein Zeichen je Leistung.
 *
 * QUELLE
 * Lucide (https://lucide.dev), ISC-Lizenz, kommerziell frei und ohne
 * Namensnennung nutzbar. Vorher waren die vier Symbole im Projekt selbst
 * gezeichnet: uneinheitliche Bogen, unterschiedliche Eckenradien, kein
 * gemeinsames Raster. Eine Bibliothek statt vier Handzeichnungen ist der
 * Unterschied, den auch Laien sofort sehen.
 *
 * Wie bei den Branchen-Symbolen (src/assets/branchen-icons.ts) liegt hier nur
 * der Inhalt des <svg>-Elements; das Paket wird bewusst NICHT als Dependency
 * installiert. Rahmen, Groesse, Strichstaerke und aria-hidden setzt
 * ServiceIcon.astro — dadurch gibt es genau eine Stelle, an der der
 * Zeichenstil festgelegt ist.
 *
 * MOTIVWAHL
 *   webdesign        triangle-right  Geodreieck statt Stift. Der Stift ist das
 *                                    generischste Design-Icon ueberhaupt; ein
 *                                    Winkel sagt "Mass, Struktur, Handwerk" —
 *                                    genau das Versprechen der Sektion.
 *   webentwicklung   code-xml        Verstaendlichkeit vor Originalitaet.
 *   seo-performance  gauge           Tempo und Messbarkeit in einem Zeichen.
 *                                    Bewusst ohne Lupe daneben: zwei Ideen in
 *                                    einem 24-px-Icon werden unleserlich.
 *   wartung          wrench          Werkzeug statt Schild. Die Leistung heisst
 *                                    "Wartung & Support", nicht "Sicherheit".
 *
 * Aendert sich ein Motiv, aendert sich nur der Wert — der Schluessel bleibt die
 * Leistung. Deshalb kann kein Aufrufer auf ein Motiv verweisen, das es nicht
 * mehr gibt.
 */
export const serviceIcons: Record<ServiceId, string> = {
  webdesign: '<path d="M22 18a2 2 0 0 1-2 2H3c-1.1 0-1.3-.6-.4-1.3L20.4 4.3c.9-.7 1.6-.4 1.6.7Z"/>',
  webentwicklung: '<path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/>',
  'seo-performance': '<path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/>',
  wartung:
    '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.106-3.105c.32-.322.863-.22.983.218a6 6 0 0 1-8.259 7.057l-7.91 7.91a1 1 0 0 1-2.999-3l7.91-7.91a6 6 0 0 1 7.057-8.259c.438.12.54.662.219.984z"/>',
};
