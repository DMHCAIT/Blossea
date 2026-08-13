import dynamic from 'next/dynamic';
import { MarqueeBanner } from '@/sections/home/marquee-banner';
import { FeaturedCategories } from '@/sections/home/featured-categories';
import { BestSellers, NewArrivals } from '@/sections/home/product-rails';
import { WhyChooseUs } from '@/sections/home/why-choose-us';
import { Testimonials } from '@/sections/home/testimonials';
import { Newsletter } from '@/sections/home/newsletter';

// Dynamically import scroll-based components with SSR disabled
const HeroSection = dynamic(() => import('@/sections/home/hero').then(m => ({ default: m.HeroSection })), { ssr: false });
const TrendingCollections = dynamic(() => import('@/sections/home/trending-collections').then(m => ({ default: m.TrendingCollections })), { ssr: false });
const SeasonalCollections = dynamic(() => import('@/sections/home/seasonal-collections').then(m => ({ default: m.SeasonalCollections })), { ssr: false });
const BrandStory = dynamic(() => import('@/sections/home/brand-story').then(m => ({ default: m.BrandStory })), { ssr: false });
const InstagramGallery = dynamic(() => import('@/sections/home/instagram-gallery').then(m => ({ default: m.InstagramGallery })), { ssr: false });

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
