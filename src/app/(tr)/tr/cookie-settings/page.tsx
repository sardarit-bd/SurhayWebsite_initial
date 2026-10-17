import { altPaths, path, useTranslations } from '@/i18n/utils';
import { SITE } from '@/config';
import Legal from '@/layouts/Legal';
import { astroPathname } from '@/lib/props';

/**
 * Cookie-Seite (TR) — Uebersetzung der deutschen Fassung.
 *
 * Verbindlich bleibt src/pages/cookie-einstellungen.astro. Wird dort die
 * Bestandsaufnahme geaendert, muss diese Datei und en/cookie-settings.astro
 * mitgezogen werden.
 */
export default function Page() {
  const lang = 'tr' as const;
  const t = useTranslations(lang);

  return (
    <Legal title={t('legal.cookies.title')} description={t('legal.cookies.desc')} kind="cookies" alternates={altPaths('cookies')}  lang={lang}
      pathname={astroPathname('/tr/cookie-settings')}
    >
      <p>
        Kısacası: Bu web sitesi çerez yerleştirmez ve cihazınızda hiçbir şey saklamaz. Bu nedenle burada ayarlanacak bir
        şey yoktur — ve ilk ziyaretinizde bir onay penceresi de görmezsiniz. Bu sayfada bunun teknik olarak ne anlama
        geldiğini ve durum değişirse ne olacağını açıklıyoruz.
      </p>

      <h2>Neden burada çerez bandı yok</h2>
      <p>
        Bu web sitesi cihazınıza çerez yerleştirmez, local storage ve session storage kullanmaz. Analiz, erişim ölçümü
        veya pazarlama araçları kullanılmamaktadır. Böylece § 25 TDDDG uyarınca onay gerektiren bir saklama işlemi
        yoktur — onay gerektiren bir saklama olmadan bir bant, sebepsiz yere kapatmanız gereken bir tıklamadan ibaret
        olurdu.
      </p>

      <h2>Bu web sitesinin cihazınızda sakladıkları</h2>
      <p>Aşağıdaki döküm eksiksizdir. Bir niyeti değil, sitenin teknik durumunu yansıtır.</p>

      <div className="table-scroll" role="region" aria-labelledby="saklama-tablosu" tabIndex={0}>
        <table>
          <caption id="saklama-tablosu">Saklama ve veri aktarımına genel bakış</caption>
          <thead>
            <tr>
              <th scope="col">Alan</th>
              <th scope="col">Cihazınızda saklanan</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Çerezler</th>
              <td>
                <strong>Yok.</strong> Ne kendi çerezlerimiz ne üçüncü tarafların çerezleri — teknik olarak gerekli olanlar
                dahil.
              </td>
            </tr>
            <tr>
              <th scope="row">Local storage, session storage</th>
              <td><strong>Hiçbir şey.</strong> Site bu iki depoya hiçbir yerde yazmaz.</td>
            </tr>
            <tr>
              <th scope="row">Dil seçimi</th>
              <td>
                <strong>Hiçbir şey.</strong> Seçilen dil sayfa adresinde yer alır (<code>/</code>, <code>/tr/</code>,{' '}
                <code>/en/</code>), bu yüzden saklanması gerekmez.
              </td>
            </tr>
            <tr>
              <th scope="row">Yazı tipleri</th>
              <td>
                <strong>Yalnızca olağan tarayıcı önbelleği.</strong> Inter ve Bricolage Grotesque kendi sunucumuzda
                barındırılır. Google Fonts veya başka bir sağlayıcıyla bağlantı kurulmaz.
              </td>
            </tr>
            <tr>
              <th scope="row">Analiz, istatistik, reklam</th>
              <td>
                <strong>Hiçbir şey.</strong> Hiçbir analiz veya izleme aracı, piksel ya da reklam ağı gömülü değildir.
              </td>
            </tr>
            <tr>
              <th scope="row">Gömülü içerikler</th>
              <td>
                <strong>Hiçbir şey.</strong> Üçüncü taraf sunuculardan harita, video, sosyal medya düğmesi veya benzeri
                bir içerik gömülü değildir.
              </td>
            </tr>
            <tr>
              <th scope="row">Randevu</th>
              <td>
                <strong>Hiçbir şey.</strong> Cal.com'a sıradan bir bağlantı gider. Ancak bağlantıya tıkladığınızda bu
                siteden ayrılırsınız; öncesinde sağlayıcıya hiçbir veri aktarılmaz.
              </td>
            </tr>
            <tr>
              <th scope="row">Talep formu ve yapılandırıcı</th>
              <td>
                <strong>Hiçbir şey.</strong> Girdileriniz yalnızca formun içinde bulunur; göndermeden sayfadan
                ayrılırsanız kaybolur.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Buna rağmen işlenenler</h2>
      <p>
        Cihazınızda saklama olmaması, hiçbir işleme yapılmadığı anlamına gelmez: Her site ziyaretinde tarayıcınız teknik
        olarak gerekli bilgileri sunucuya iletir ve bize yazdığınızda girdiklerinizi işleriz. Her ikisi de — sunucu
        günlük dosyaları ve talep formu — amaç, hukuki dayanak ve saklama süresiyle birlikte{' '}
        <a href={path('tr', 'privacy')}>gizlilik metninde</a> açıklanmıştır.
      </p>

      <h2>Bu durum değişirse</h2>
      <p>
        İleride onay gerektiren bir şey gömersek, bu web sitesi önce ilgili kaynağı siz onay verene kadar engelleyen bir
        onay penceresi alır — ve alt bilgideki „Çerez ayarları“ bağlantısı o zaman bu pencereyi açar, böylece kararınızı
        istediğiniz zaman değiştirebilirsiniz. O zamana kadar yukarıda yazanlar geçerlidir.
      </p>
      <p>
        Sorularınızı memnuniyetle yanıtlarız: <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
      </p>
    </Legal>
  );
}
