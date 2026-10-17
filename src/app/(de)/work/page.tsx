import WorkIndexPage from '@/components/pages/WorkIndexPage';
import { astroPathname } from '@/lib/props';

/* WorkIndexPage — Sprachfassung de. Inhalt in der geteilten Seitenkomponente. */
export default function Page() {
  return <WorkIndexPage lang="de" pathname={astroPathname('/work')} />;
}
