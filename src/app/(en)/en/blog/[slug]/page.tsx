import BlogPost from '@/layouts/BlogPost';
import { getCollection } from '@/lib/content';
import type { BlogData } from '@/content.config';
import { splitId } from '@/i18n/utils';
import { astroPathname } from '@/lib/props';

export async function generateStaticParams() {
  const posts = await getCollection<BlogData>('blog', ({ id }) => splitId(id).lang === 'en');
  return posts.map((entry) => ({ slug: splitId(entry.id).slug }));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const posts = await getCollection<BlogData>('blog', ({ id }) => splitId(id).lang === 'en');
  const entry = posts.find((p) => splitId(p.id).slug === slug)!;
  return <BlogPost entry={entry} lang="en" pathname={astroPathname(`/en/blog/${slug}`)} />;
}
