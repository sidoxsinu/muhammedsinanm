import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/sections/Footer';
import { Button } from '@/components/ui/Button';
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
            <Button
              href="/"
              variant="primary"
              className="bg-[var(--accent-orange)] font-mono text-xs tracking-wider uppercase hover:bg-orange-600"
            >
              <span>← Return Home</span>
            </Button>

            <Button
              href="/projects"
              variant="secondary"
              className="font-mono text-xs tracking-wider uppercase"
            >
              <span>Explore Projects →</span>
            </Button>
          </div>
        </SpotlightCard>
      </main>

      <Footer />
    </div>
  );
}
