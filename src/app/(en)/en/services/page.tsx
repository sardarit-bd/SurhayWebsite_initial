import ServicesPage from '@/components/pages/ServicesPage';
import { astroPathname } from '@/lib/props';

/* ServicesPage — Sprachfassung en. Inhalt in der geteilten Seitenkomponente. */
export default function Page() {
  return <ServicesPage lang="en" pathname={astroPathname('/en/services')} />;
}
