import WorkIndexPage from '@/components/pages/WorkIndexPage';
import { astroPathname } from '@/lib/props';

/* WorkIndexPage — Sprachfassung tr. Inhalt in der geteilten Seitenkomponente. */
export default function Page() {
  return <WorkIndexPage lang="tr" pathname={astroPathname('/tr/work')} />;
}
