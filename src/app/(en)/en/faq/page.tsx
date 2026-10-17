import FaqPage from '@/components/pages/FaqPage';
import { astroPathname } from '@/lib/props';

/* FaqPage — Sprachfassung en. Inhalt in der geteilten Seitenkomponente. */
export default function Page() {
  return <FaqPage lang="en" pathname={astroPathname('/en/faq')} />;
}
