import type { LangProp } from '@/lib/props';

import Base from '@/layouts/Base';
import Hero from '@/components/sections/Hero';
import TrustBar from '@/components/sections/TrustBar';
import Services from '@/components/sections/Services';
import Work from '@/components/sections/Work';
import Process from '@/components/sections/Process';
import Studio from '@/components/sections/Studio';
import Pricing from '@/components/sections/Pricing';
import Insights from '@/components/sections/Insights';
import Faq from '@/components/sections/Faq';
import ContactCta from '@/components/ContactCta';

import { homePaths } from '@/i18n/utils';
import { astroPathname } from '@/lib/props';

export default function HomePage({ lang }: LangProp) {
  const pathname = astroPathname(lang === 'de' ? '/' : `/${lang}`);

  return (
    <Base alternates={homePaths()} lang={lang} pathname={pathname}>
      <Hero lang={lang} />
      <TrustBar lang={lang} />
      <Services lang={lang} />
      <Work lang={lang} />
      <Process lang={lang} />
      <Studio lang={lang} />
      <Pricing lang={lang} />
      <Insights lang={lang} />
      <Faq lang={lang} />
      <ContactCta lang={lang} />
    </Base>
  );
}