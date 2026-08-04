'use client';

import { instagramImages } from '@/data/products';
import { Reveal, Stagger, StaggerItem } from '@/components/ui/reveal';
import { Instagram } from 'lucide-react';

export function InstagramGallery() {
  return (
    <section className="container-luxe py-12 md:py-16">
      <Reveal className="text-center" direction="up">
        <p className="eyebrow">Follow the House</p>
        <h2 className="mt-3 font-serif text-4xl font-medium md:text-6xl">
          @blossea
        </h2>
        <p className="mt-4 text-sm text-warmgray">
          Tag us to be featured. Tagged daily on our story.
        </p>
      </Reveal>

      <Stagger
        className="mt-12 columns-2 gap-3 md:columns-3 lg:columns-4 md:gap-4 [&>*]:mb-3 md:[&>*]:mb-4"
        stagger={0.06}
      >
        {instagramImages.map((src, i) => (
          <StaggerItem key={i}>
            <a
              href="#"
              className="group relative block overflow-hidden rounded-md"
              data-cursor="hover"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={`Instagram post ${i + 1}`}
                className={`w-full object-cover transition-transform duration-700 ease-luxury group-hover:scale-110 ${
                  i % 3 === 1 ? 'aspect-[3/4]' : 'aspect-square'
                }`}
              />
              <div className="absolute inset-0 flex items-center justify-center bg-ink-900/0 opacity-0 transition-all duration-500 group-hover:bg-ink-900/40 group-hover:opacity-100">
                <Instagram className="h-6 w-6 text-cream-100" />
              </div>
            </a>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
