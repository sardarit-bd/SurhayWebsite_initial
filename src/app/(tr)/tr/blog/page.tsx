import BlogIndex from '@/layouts/BlogIndex';
import { getCollection } from '@/lib/content';
import type { BlogData } from '@/content.config';
import { splitId } from '@/i18n/utils';
import { astroPathname } from '@/lib/props';

export default async function Page() {
  const posts = (await getCollection<BlogData>('blog', ({ id }) => splitId(id).lang === 'tr')).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
  );
  return <BlogIndex posts={posts} lang="tr" pathname={astroPathname('/tr/blog')} />;
}
