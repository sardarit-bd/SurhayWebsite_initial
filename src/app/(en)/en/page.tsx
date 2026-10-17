import HomePage from '@/components/home/HomePage';

/** Englische Startseite — identische Sektionsfolge, siehe src/app/(de)/page.tsx. */
export default function Page() {
  const lang = 'en' as const;

  return (
    <HomePage lang={lang} />
  );
}
