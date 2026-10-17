import { sitemapIndex } from '@/lib/sitemap';

/* public/robots.txt verweist auf genau diese Adresse. */
export const dynamic = 'force-static';

export function GET() {
  return new Response(sitemapIndex(), {
    headers: { 'Content-Type': 'application/xml' },
  });
}
