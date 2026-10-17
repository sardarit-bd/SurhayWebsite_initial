import PricingPage from '@/components/pages/PricingPage';
import { astroPathname } from '@/lib/props';

/* PricingPage — Sprachfassung de. Inhalt in der geteilten Seitenkomponente. */
export default function Page() {
  return <PricingPage lang="de" pathname={astroPathname('/pricing')} />;
}
