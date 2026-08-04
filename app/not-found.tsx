import Link from 'next/link';
import { Reveal } from '@/components/ui/reveal';
import { AnimatedText } from '@/components/ui/animated-text';

export default function NotFound() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-ink-900 text-center text-cream-100 noise-overlay">
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 left-1/2 -translate-x-1/2 select-none whitespace-nowrap font-serif text-[40vw] leading-none text-cream-100/[0.04]"
      >
        404
      </div>
      <div className="relative z-10 px-5">
        <AnimatedText
          as="h1"
          text="Lost the thread."
          className="font-serif text-5xl font-medium md:text-8xl"
        />
        <Reveal direction="up" delay={0.2}>
          <p className="mx-auto mt-5 max-w-md text-sm text-cream-100/60 md:text-base">
            The page you&apos;re looking for has moved or no longer exists. Let&apos;s get you back
            to something worth your time.
          </p>
        </Reveal>
        <Reveal direction="up" delay={0.3}>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link href="/" className="btn-luxe bg-cream-100 text-ink-900 hover:bg-gold-400">
              Back to Home
            </Link>
            <Link
              href="/shop"
              className="btn-luxe border border-cream-100/40 text-cream-100 hover:bg-cream-100 hover:text-ink-900"
            >
              Explore the Shop
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
