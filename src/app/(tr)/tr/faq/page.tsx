import FaqPage from '@/components/pages/FaqPage';
import { astroPathname } from '@/lib/props';

/* FaqPage — Sprachfassung tr. Inhalt in der geteilten Seitenkomponente. */
export default function Page() {
  return <FaqPage lang="tr" pathname={astroPathname('/tr/sss')} />;
}
