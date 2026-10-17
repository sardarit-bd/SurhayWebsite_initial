import { altPaths } from '@/i18n/utils';
import Base from '@/layouts/Base';
import Configurator from '@/components/Configurator';
import { astroPathname } from '@/lib/props';

export default function Page() {
  const lang = 'en' as const;
  return (
    <Base
      title="Website Configurator — Surhay Design"
      description="Configure your ideal website: choose type, extras and maintenance, see an instant honest price estimate and request an offer."
      alternates={altPaths('configurator')}
      lang={lang}
      pathname={astroPathname('/en/configurator')}
    >
      <Configurator lang={lang} />
    </Base>
  );
}
