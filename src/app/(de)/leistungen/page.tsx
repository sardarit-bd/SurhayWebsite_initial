import ServicesPage from '@/components/pages/ServicesPage';
import { astroPathname } from '@/lib/props';

/* ServicesPage — Sprachfassung de. Inhalt in der geteilten Seitenkomponente. */
export default function Page() {
  return <ServicesPage lang="de" pathname={astroPathname('/leistungen')} />;
}
