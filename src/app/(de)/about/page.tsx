import AboutPage from '@/components/pages/AboutPage';
import { astroPathname } from '@/lib/props';

/* AboutPage — Sprachfassung de. Inhalt in der geteilten Seitenkomponente. */
export default function Page() {
  return <AboutPage lang="de" pathname={astroPathname('/about')} />;
}
