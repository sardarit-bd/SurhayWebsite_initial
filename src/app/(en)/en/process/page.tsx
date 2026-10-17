import ProcessPage from '@/components/pages/ProcessPage';
import { astroPathname } from '@/lib/props';

/* ProcessPage — Sprachfassung en. Inhalt in der geteilten Seitenkomponente. */
export default function Page() {
  return <ProcessPage lang="en" pathname={astroPathname('/en/process')} />;
}
