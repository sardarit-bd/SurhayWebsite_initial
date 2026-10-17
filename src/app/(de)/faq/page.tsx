import FaqPage from '@/components/pages/FaqPage';
import { astroPathname } from '@/lib/props';

/* FaqPage — Sprachfassung de. Inhalt in der geteilten Seitenkomponente. */
export default function Page() {
  return <FaqPage lang="de" pathname={astroPathname('/faq')} />;
}
