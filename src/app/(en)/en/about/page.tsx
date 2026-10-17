import AboutPage from '@/components/pages/AboutPage';
import { astroPathname } from '@/lib/props';

/* AboutPage — Sprachfassung en. Inhalt in der geteilten Seitenkomponente. */
export default function Page() {
  return <AboutPage lang="en" pathname={astroPathname('/en/about')} />;
}
