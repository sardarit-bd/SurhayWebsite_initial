import PricingPage from '@/components/pages/PricingPage';
import { astroPathname } from '@/lib/props';

/* PricingPage — Sprachfassung tr. Inhalt in der geteilten Seitenkomponente. */
export default function Page() {
  return <PricingPage lang="tr" pathname={astroPathname('/tr/pricing')} />;
}
