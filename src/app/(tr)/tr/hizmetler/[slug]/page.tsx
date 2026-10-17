import ServiceDetailPage from '@/components/pages/ServiceDetailPage';
import { services } from '@/data/services';
import { astroPathname } from '@/lib/props';

/* Leistungs-Detailseiten (tr) — Slugs kommen aus src/data/services.ts. */
export function generateStaticParams() {
  return services.map((service) => ({ slug: service.tr.slug }));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = services.find((s) => s.tr.slug === slug)!;
  return (
    <ServiceDetailPage
      service={service}
      lang="tr"
      pathname={astroPathname(`/tr/hizmetler/${slug}`)}
    />
  );
}
