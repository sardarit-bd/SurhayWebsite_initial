import PricingPage from '@/components/pages/PricingPage';
import { astroPathname } from '@/lib/props';

/* PricingPage — Sprachfassung en. Inhalt in der geteilten Seitenkomponente. */
export default function Page() {
  return <PricingPage lang="en" pathname={astroPathname('/en/pricing')} />;
}
