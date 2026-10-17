import type { ReactNode } from 'react';
import Document from '@/layouts/Document';

/* Wurzel-Layout der tr-Fassung. Setzt <html lang> und laedt Schriften und
   Stylesheets. Die Route Group (tr) aendert die URL nicht — sie sorgt nur
   dafuer, dass diese Sprache ihr eigenes Wurzel-Layout bekommt, denn <html lang>
   darf nicht fuer alle drei gleich sein. */
export default function Layout({ children }: { children: ReactNode }) {
  return <Document lang="tr">{children}</Document>;
}
