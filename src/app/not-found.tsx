import Link from 'next/link';

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/sections/Footer';
import { SpotlightCard } from '@/components/ui/SpotlightCard';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[var(--bg-color)] text-[var(--text-primary)]">
      <Navbar />

      <main className="mx-auto flex max-w-3xl flex-col items-center justify-center px-4 pt-40 pb-28 text-center sm:px-6">
        <SpotlightCard className="flex flex-col items-center gap-6 p-8 sm:p-12">
          <span className="font-mono text-xs font-semibold tracking-widest text-[var(--accent-orange)] uppercase">
            {'// Error 404'}
          </span>

          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl">
            Page Not Found
          </h1>

          <p className="max-w-md text-sm leading-relaxed text-neutral-400 sm:text-base">
            The page you are looking for doesn&apos;t exist, was moved, or the link may have been
            mistyped.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--accent-orange)] px-6 py-3 font-mono text-xs font-semibold tracking-wider text-white uppercase transition-all hover:bg-orange-600 hover:shadow-lg"
            >
              <span>← Return Home</span>
            </Link>

            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-6 py-3 font-mono text-xs font-semibold tracking-wider text-neutral-300 uppercase transition-colors hover:border-white/20 hover:text-white"
            >
              <span>Explore Projects →</span>
            </Link>
          </div>
        </SpotlightCard>
      </main>

      <Footer />
    </div>
  );
}
