import ContactPage from '@/components/pages/ContactPage';
import { astroPathname } from '@/lib/props';

/* ContactPage — Sprachfassung tr. Inhalt in der geteilten Seitenkomponente. */
export default function Page() {
  return <ContactPage lang="tr" pathname={astroPathname('/tr/contact')} />;
}
