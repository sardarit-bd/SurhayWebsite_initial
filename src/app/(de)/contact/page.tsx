import ContactPage from '@/components/pages/ContactPage';
import { astroPathname } from '@/lib/props';

/* ContactPage — Sprachfassung de. Inhalt in der geteilten Seitenkomponente. */
export default function Page() {
  return <ContactPage lang="de" pathname={astroPathname('/contact')} />;
}
