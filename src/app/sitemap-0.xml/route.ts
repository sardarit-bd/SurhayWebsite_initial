import { sitemapUrlset } from '@/lib/sitemap';

/* Statisch exportiert, damit die Datei im Artefakt liegt — dieselbe Adresse
   wie unter Astro. */
export const dynamic = 'force-static';

export async function GET() {
  return new Response(await sitemapUrlset(), {
    headers: { 'Content-Type': 'application/xml' },
  });
}
