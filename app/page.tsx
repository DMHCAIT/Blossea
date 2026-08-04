import { HeroSection } from '@/sections/home/hero';
import { MarqueeBanner } from '@/sections/home/marquee-banner';
import { FeaturedCategories } from '@/sections/home/featured-categories';
import { TrendingCollections } from '@/sections/home/trending-collections';
import { BestSellers, NewArrivals } from '@/sections/home/product-rails';
import { SeasonalCollections } from '@/sections/home/seasonal-collections';
import { BrandStory } from '@/sections/home/brand-story';
import { WhyChooseUs } from '@/sections/home/why-choose-us';
import { Testimonials } from '@/sections/home/testimonials';
import { InstagramGallery } from '@/sections/home/instagram-gallery';
import { Newsletter } from '@/sections/home/newsletter';

export default function Home() {
  return (
    <>
      <HeroSection />
      <MarqueeBanner />
      <FeaturedCategories />
      <TrendingCollections />
      <BestSellers />
      <NewArrivals />
      <SeasonalCollections />
      <BrandStory />
      <WhyChooseUs />
      <Testimonials />
      <InstagramGallery />
      <Newsletter />
    </>
  );
}
