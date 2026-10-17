import HomePage from '@/components/home/HomePage';

/** Tuerkische Startseite — identische Sektionsfolge, siehe src/app/(de)/page.tsx. */
export default function Page() {
  const lang = 'tr' as const;

  return (
    <HomePage lang={lang} />
  );
}
