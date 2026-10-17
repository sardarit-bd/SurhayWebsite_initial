import ProcessPage from '@/components/pages/ProcessPage';
import { astroPathname } from '@/lib/props';

/* ProcessPage — Sprachfassung de. Inhalt in der geteilten Seitenkomponente. */
export default function Page() {
  return <ProcessPage lang="de" pathname={astroPathname('/process')} />;
}
