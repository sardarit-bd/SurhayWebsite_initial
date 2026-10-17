import { altPaths, useTranslations } from '@/i18n/utils';
import { SITE, LEGAL, legalAddress } from '@/config';
import Legal from '@/layouts/Legal';
import { astroPathname } from '@/lib/props';

/**
 * Impressum (TR) — Uebersetzung der deutschen Fassung.
 *
 * Verbindlich bleibt src/pages/impressum.astro; der Hinweis darauf steht
 * ueber dem Text und kommt aus Legal.astro. Die Paragrafenverweise bleiben
 * bewusst in ihrer deutschen Originalform (§ 5 DDG, § 19 UStG …) — sie
 * bezeichnen deutsche Normen und werden nicht uebersetzt.
 */
export default function Page() {
  const lang = 'tr' as const;
  const t = useTranslations(lang);
  const address = legalAddress(lang);

  return (
    <Legal title={t('legal.imprint.title')} description={t('legal.imprint.desc')} kind="imprint" alternates={altPaths('imprint')}  lang={lang}
      pathname={astroPathname('/tr/imprint')}
    >
      <h2>§ 5 DDG uyarınca bilgiler</h2>
      <p dangerouslySetInnerHTML={{ __html: address.join('<br />') }} />

      <h2>İletişim</h2>
      <p>
        E-posta: <a href={`mailto:${SITE.email}`}>{SITE.email}</a><br />
        Telefon: {LEGAL.phone}
      </p>

      <h2>Katma değer vergisi</h2>
      {
        LEGAL.kleinunternehmer ? (
          <p>
            Alman KDV Kanunu’nun § 19 UStG hükmü uyarınca katma değer vergisi hesaplanmamakta ve buna bağlı olarak KDV
            kimlik numarası bulundurulmamaktadır (küçük işletme düzenlemesi).
          </p>
        ) : (
          <p>§ 27a UStG uyarınca KDV kimlik numarası: {LEGAL.vatId}</p>
        )
      }

      <h2>§ 18 Abs. 2 MStV uyarınca içerikten sorumlu kişi</h2>
      <p>{LEGAL.owner}, adres yukarıdaki gibidir</p>

      <h2>AB uyuşmazlık çözümü</h2>
      <p>
        Avrupa Komisyonu, çevrimiçi uyuşmazlık çözümü (ODR) için bir platform sunmaktadır:{' '}
        <a href="https://ec.europa.eu/consumers/odr/" rel="noopener noreferrer" target="_blank">https://ec.europa.eu/consumers/odr/<span className="sr-only"> (yeni sekmede açılır)</span></a>.
        E-posta adresimizi künyenin üst kısmında bulabilirsiniz.
      </p>

      <h2>Tüketici uyuşmazlıklarının çözümü</h2>
      <p>
        Bir tüketici hakem heyeti nezdinde yürütülen uyuşmazlık çözüm süreçlerine katılmaya istekli ya da yükümlü
        değiliz.
      </p>

      <h2>İçerik sorumluluğu</h2>
      <p>
        Hizmet sağlayıcı olarak, bu sayfalardaki kendi içeriklerimizden § 7 Abs. 1 DDG ve genel yasalar uyarınca
        sorumluyuz. Ancak §§ 8 ila 10 DDG uyarınca, hizmet sağlayıcı olarak iletilen ya da saklanan üçüncü taraf
        bilgilerini denetlemek veya hukuka aykırı bir faaliyete işaret eden koşulları araştırmakla yükümlü değiliz.
        Genel yasalar uyarınca bilgilerin kaldırılmasına veya kullanımının engellenmesine ilişkin yükümlülükler bundan
        etkilenmez. Bu yöndeki bir sorumluluk ancak somut bir hak ihlalinin öğrenildiği andan itibaren doğar. İlgili
        hak ihlalleri öğrenildiğinde bu içerikleri derhâl kaldırırız.
      </p>

      <h2>Bağlantı sorumluluğu</h2>
      <p>
        Sitemiz, içeriklerine hiçbir etkimizin olmadığı üçüncü taraflara ait harici web sitelerine bağlantılar
        içermektedir. Bu nedenle söz konusu yabancı içerikler için herhangi bir garanti veremeyiz. Bağlantı verilen
        sayfaların içeriğinden her zaman ilgili sağlayıcı veya işletmeci sorumludur. Bağlantı verilen sayfalar,
        bağlantının kurulduğu anda olası hukuka aykırılıklar bakımından incelenmiştir; hukuka aykırı içerik tespit
        edilmemiştir. Hak ihlalleri öğrenildiğinde bu tür bağlantıları derhâl kaldırırız.
      </p>

      <h2>Telif hakkı</h2>
      <p>
        Bu sayfalarda site işletmecileri tarafından oluşturulan içerikler ve eserler Alman telif hakkı hukukuna tabidir.
        Telif hakkı sınırlarının dışındaki çoğaltma, işleme, yayma ve her türlü değerlendirme, ilgili yazarın ya da
        üreticinin yazılı iznini gerektirir. Bu sayfanın indirilmesi ve kopyalanmasına yalnızca özel, ticari olmayan
        kullanım için izin verilir.
      </p>
    </Legal>
  );
}
