import ContactPage from '@/components/pages/ContactPage';
import { astroPathname } from '@/lib/props';

/* ContactPage — Sprachfassung en. Inhalt in der geteilten Seitenkomponente. */
export default function Page() {
  return <ContactPage lang="en" pathname={astroPathname('/en/contact')} />;
}
