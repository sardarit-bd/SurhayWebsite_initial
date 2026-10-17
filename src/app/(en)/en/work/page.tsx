import WorkIndexPage from '@/components/pages/WorkIndexPage';
import { astroPathname } from '@/lib/props';

/* WorkIndexPage — Sprachfassung en. Inhalt in der geteilten Seitenkomponente. */
export default function Page() {
  return <WorkIndexPage lang="en" pathname={astroPathname('/en/work')} />;
}
