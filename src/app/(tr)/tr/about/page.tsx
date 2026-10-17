import AboutPage from '@/components/pages/AboutPage';
import { astroPathname } from '@/lib/props';

/* AboutPage — Sprachfassung tr. Inhalt in der geteilten Seitenkomponente. */
export default function Page() {
  return <AboutPage lang="tr" pathname={astroPathname('/tr/about')} />;
}
