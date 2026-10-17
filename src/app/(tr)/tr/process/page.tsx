import ProcessPage from '@/components/pages/ProcessPage';
import { astroPathname } from '@/lib/props';

/* ProcessPage — Sprachfassung tr. Inhalt in der geteilten Seitenkomponente. */
export default function Page() {
  return <ProcessPage lang="tr" pathname={astroPathname('/tr/process')} />;
}
