import { altPaths } from '@/i18n/utils';
import Base from '@/layouts/Base';
import Configurator from '@/components/Configurator';
import { astroPathname } from '@/lib/props';

export default function Page() {
  const lang = 'tr' as const;
  return (
    <Base
      title="Web sitesi yapılandırıcısı — Surhay Design"
      description="Hayalinizdeki web sitesini oluşturun: tipi, ekstraları ve bakımı seçin, anında dürüst bir fiyat tahmini görün ve teklif isteyin."
      alternates={altPaths('configurator')}
      lang={lang}
      pathname={astroPathname('/tr/configurator')}
    >
      <Configurator lang={lang} />
    </Base>
  );
}
