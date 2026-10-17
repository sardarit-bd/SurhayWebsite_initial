import ServicesPage from '@/components/pages/ServicesPage';
import { astroPathname } from '@/lib/props';

/* ServicesPage — Sprachfassung tr. Inhalt in der geteilten Seitenkomponente. */
export default function Page() {
  return <ServicesPage lang="tr" pathname={astroPathname('/tr/hizmetler')} />;
}
