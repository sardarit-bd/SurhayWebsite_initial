import { altPaths, useTranslations } from '@/i18n/utils';
import { LEGAL, SITE, legalAddressInline } from '@/config';
import Legal from '@/layouts/Legal';
import { astroPathname } from '@/lib/props';

/**
 * Datenschutzerklaerung (TR) — Uebersetzung der deutschen Fassung.
 *
 * Verbindlich bleibt src/pages/datenschutz.astro. Wird dort ein Abschnitt
 * geaendert — insbesondere Ziffer 4 (Kontaktformular, Empfangsdienst) —,
 * muss diese Datei und en/privacy.astro mitgezogen werden.
 */
export default function Page() {
  const lang = 'tr' as const;
  const t = useTranslations(lang);

  return (
    <Legal title={t('legal.privacy.title')} description={t('legal.privacy.desc')} kind="privacy" alternates={altPaths('privacy')}  lang={lang}
      pathname={astroPathname('/tr/privacy')}
    >
      <p>
        Kişisel verilerinizin korunması bizim için önemlidir. Bu web sitesi statik olarak kurulmuştur: çerez
        yerleştirmez, izleme veya analiz hizmeti gömmez ve reklam ağı kullanmaz. Aşağıda, buna rağmen hangi verilerin
        işlendiğini ve nedenini açıklıyoruz.
      </p>

      <h2>1. Veri sorumlusu</h2>
      <p>
        GDPR anlamında bu web sitesindeki veri işlemeden sorumlu taraf:<br />
        {legalAddressInline('tr')}<br />
        E-posta: <a href={`mailto:${SITE.email}`}>{SITE.email}</a><br />
        Telefon: {LEGAL.phone}
      </p>
      <p>
        Yasal olarak bir veri koruma görevlisi atanmış değildir; veri korumaya ilişkin tüm konularda bize yukarıdaki
        iletişim bilgilerinden ulaşabilirsiniz.
      </p>

      <h2>2. Çerez yok, izleme yok</h2>
      <p>
        Bu web sitesi cihazınıza çerez kaydetmez, Local Storage ya da Session Storage kullanmaz. Hiçbir analiz,
        erişim ölçümü veya pazarlama aracı devrede değildir. Bu yüzden burada bir çerez uyarısı da yoktur: § 25 TDDDG
        uyarınca izin gerektiren bir saklama gerçekleşmez.
      </p>

      <h2>3. Barındırma ve sunucu günlük kayıtları</h2>
      <p>
        Bu web sitesi {LEGAL.host} tarafından barındırılmaktadır. Siteyi açtığınızda tarayıcınız, barındırma
        sağlayıcısının sunucu günlük kayıtlarında sakladığı, teknik olarak gerekli verileri iletir:
      </p>
      <ul>
        <li>talepte bulunan cihazın IP adresi</li>
        <li>erişimin tarihi ve saati</li>
        <li>çağrılan dosyanın adı ve adresi</li>
        <li>aktarılan veri miktarı ve çağrının başarılı olup olmadığı bilgisi</li>
        <li>tarayıcı türü, tarayıcı sürümü ve işletim sistemi</li>
        <li>referrer adresi (daha önce ziyaret edilen sayfa)</li>
      </ul>
      <p>
        Hukuki dayanak Art. 6 Abs. 1 lit. f DSGVO’dur. Meşru menfaatimiz, web sitesinin teknik olarak hatasız
        sunulması, kararlılığı ve güvenliğidir. Bu veriler başka veri kaynaklarıyla birleştirilmez ve pazarlama
        amacıyla değerlendirilmez. Günlük kayıtları en geç 30 gün sonra silinir. Barındırma sağlayıcısıyla Art. 28
        DSGVO uyarınca bir veri işleme sözleşmesi mevcuttur.
      </p>

      {/* Spiegelt Ziffer 4 aus datenschutz.astro — die dortige Livegang-Checkliste gilt auch hier. */}
      <h2>4. İletişim formu</h2>
      <p>
        İletişim sayfasındaki talep formu üzerinden yalnızca oraya kendiniz girdiğiniz bilgileri işleriz:
      </p>
      <ul>
        <li>Zorunlu bilgiler: ad, e-posta adresi, mesajınız ve seçtiğiniz hizmet</li>
        <li>İsteğe bağlı bilgiler: telefon numarası ve şirket</li>
        <li>
          Sayfa açılışına ait teknik bir zaman damgası ve sizin göremediğiniz bir kontrol alanı — her ikisi de yalnızca
          otomatik spam gönderimlerini engellemeye yarar ve başka bir amaçla değerlendirilmez
        </li>
      </ul>
      <p>
        Bu kapsamda IP adresi saklamayız. Aktarım yalnızca HTTPS üzerinden şifreli olarak gerçekleşir. Girdileriniz
        analiz veya pazarlama hizmetlerine aktarılmaz. Spam korumasında bilinçli olarak Google reCAPTCHA’yı ve verileri
        ABD’ye aktaran benzer hiçbir hizmeti kullanmıyoruz.
      </p>
      <p>
        İşlemenin hukuki dayanağı, göndermeden önce açıkça verdiğiniz ve ileriye dönük olarak istediğiniz zaman geri
        alabileceğiniz Art. 6 Abs. 1 lit. a DSGVO uyarınca rızanız ile Art. 6 Abs. 1 lit. b DSGVO’dur (talebiniz
        üzerine sözleşme öncesi tedbirlerin yürütülmesi). Geri alma, o ana kadar gerçekleşen işlemenin hukuka
        uygunluğunu etkilemez.
      </p>
      <p>
        Formun iletilmesi için Formspree, Inc., 1007 N Orange St, Wilmington, DE 19801, ABD tarafından sağlanan
        Formspree hizmetini kullanıyoruz. Formspree mesajı e-posta kutumuza iletir. ABD’ye aktarım, Art. 46 Abs. 2
        lit. c DSGVO uyarınca AB standart sözleşme maddelerine dayanır; ayrıca Formspree, EU-U.S. Data Privacy
        Framework kapsamında sertifikalıdır. ABD’de devlet kurumlarının verilere erişiminin tamamen dışlanamayacağını
        belirtiriz. Hizmet sağlayıcıyla Art. 28 DSGVO uyarınca bir veri işleme sözleşmesi mevcuttur.
      </p>
      <p>
        Talebinizi ve ilgili verileri, saklama amacı ortadan kalkana — yani talebiniz tamamen sonuçlandırılana — kadar,
        en fazla ise yasal saklama süreleri doluncaya kadar saklarız. Alternatif olarak bize istediğiniz zaman{' '}
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a> adresinden serbest biçimde yazabilirsiniz; bu durumda hiçbir
        üçüncü taraf sağlayıcı devreye girmez.
      </p>

      <h2>5. Yapılandırıcı</h2>
      <p>
        Web sitesi yapılandırıcısı tamamen tarayıcınızda çalışır. Seçiminiz ne saklanır ne de bize ya da üçüncü
        taraflara aktarılır. Yalnızca sonunda bilinçli olarak bir talep gönderirseniz 4. maddedeki bilgiler geçerli
        olur.
      </p>

      <h2>6. Randevu alma</h2>
      <p>
        Ön görüşmeler için harici <a href={SITE.calendarUrl} rel="noopener noreferrer" target="_blank">Cal.com<span className="sr-only"> (yeni sekmede açılır)</span></a>{' '}
        hizmetine bağlantı veririz. Bu yalnızca basit bir bağlantıdır — bu web sitesini açtığınızda Cal.com’a hiçbir
        veri aktarılmaz. Ancak bağlantıya tıkladığınızda sitemizden ayrılırsınız; bu andan itibaren sağlayıcının
        gizlilik metni geçerlidir.
      </p>

      <h2>7. Yazı tipleri ve harici içerikler</h2>
      <p>
        Kullanılan tüm yazı tipleri kendi sunucumuzda yereldir. Google Fonts ya da başka bir yazı tipi sağlayıcısıyla
        bağlantı kurulmaz. Aynı şekilde üçüncü taraf sunuculardan harici betik, harita, video veya sosyal medya
        eklentisi yüklenmez. Bu nedenle IP adresiniz hiçbir üçüncü taraf sağlayıcıya iletilmez.
      </p>

      <h2>8. SSL/TLS şifrelemesi</h2>
      <p>
        Bu web sitesi, güvenlik gerekçesiyle ve gizli içeriklerin aktarımını korumak amacıyla SSL/TLS şifrelemesi
        kullanır. Şifreli bir bağlantıyı, tarayıcının adres satırının „http://“ yerine „https://“ göstermesinden
        anlarsınız.
      </p>

      <h2>9. Haklarınız</h2>
      <p>Bize karşı her zaman aşağıdaki haklara sahipsiniz:</p>
      <ul>
        <li>hakkınızda işlenen veriler konusunda bilgi edinme (Art. 15 DSGVO)</li>
        <li>yanlış verilerin düzeltilmesi (Art. 16 DSGVO)</li>
        <li>verilerinizin silinmesi (Art. 17 DSGVO)</li>
        <li>işlemenin kısıtlanması (Art. 18 DSGVO)</li>
        <li>veri taşınabilirliği (Art. 20 DSGVO)</li>
        <li>işlemeye itiraz (Art. 21 DSGVO)</li>
        <li>verilmiş bir rızanın ileriye dönük olarak geri alınması (Art. 7 Abs. 3 DSGVO)</li>
      </ul>
      <p>
        Bu hakları kullanmak için <a href={`mailto:${SITE.email}`}>{SITE.email}</a> adresine serbest biçimde bir mesaj
        göndermeniz yeterlidir.
      </p>

      <h2>10. İtiraz hakkı</h2>
      <p>
        Verileri Art. 6 Abs. 1 lit. f DSGVO uyarınca meşru bir menfaate dayanarak işlediğimiz ölçüde, kendi özel
        durumunuzdan kaynaklanan nedenlerle bu işlemeye istediğiniz zaman itiraz etme hakkına sahipsiniz. Bu durumda
        ilgili verileri artık işlemeyiz; meğer ki menfaatlerinizin, haklarınızın ve özgürlüklerinizin üstünde gelen
        zorlayıcı ve korunmaya değer nedenler ortaya koyabilelim ya da işleme, hukuki taleplerin ileri sürülmesi,
        kullanılması veya savunulmasına hizmet etsin.
      </p>

      <h2>11. Denetim makamına şikâyet hakkı</h2>
      <p>
        Diğer hukuki yollara halel gelmeksizin, bir veri koruma denetim makamına — özellikle ikamet ettiğiniz,
        çalıştığınız ya da iddia edilen ihlalin gerçekleştiği üye devlette — şikâyette bulunma hakkına sahipsiniz.
        Bizim için yetkili makam {LEGAL.authority}’dir ({' '}
        <a href={LEGAL.authorityUrl} rel="noopener noreferrer" target="_blank">{LEGAL.authorityUrl.replace('https://', '')}<span className="sr-only"> (yeni sekmede açılır)</span></a>).
      </p>

      <h2>12. Bu gizlilik metnindeki değişiklikler</h2>
      <p>
        Hukuki durum ya da işleme faaliyetlerimiz değiştiğinde bu gizlilik metnini güncelleriz. Yeniden ziyaretinizde
        her defasında güncel sürüm geçerlidir. Güncelleme tarihini bu sayfanın sonunda bulabilirsiniz.
      </p>
    </Legal>
  );
}
