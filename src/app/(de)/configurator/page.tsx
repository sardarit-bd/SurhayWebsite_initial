import { altPaths } from '@/i18n/utils';
import Base from '@/layouts/Base';
import Configurator from '@/components/Configurator';
import { astroPathname } from '@/lib/props';

export default function Page() {
  const lang = 'de' as const;
  return (
    <Base
      title="Website-Konfigurator — Surhay Design"
      description="Stellen Sie sich Ihre Wunsch-Website zusammen: Typ, Extras und Wartung wählen, sofort eine ehrliche Preisschätzung sehen und ein Angebot anfragen."
      alternates={altPaths('configurator')}
      lang={lang}
      pathname={astroPathname('/configurator')}
    >
      <Configurator lang={lang} />
    </Base>
  );
}
