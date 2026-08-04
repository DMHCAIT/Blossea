import type { Product, CategoryInfo, CollectionInfo } from '@/types';

const img = (id: number, w = 940, h = 1300) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}&h=${h}&fit=crop`;

export const categories: CategoryInfo[] = [
  {
    slug: 'shirts',
    name: 'Shirts',
    tagline: 'Crisp tailoring, refined drape',
    image: img(7764013),
  },
  {
    slug: 't-shirts',
    name: 'T-Shirts',
    tagline: 'Elevated essentials',
    image: img(9775825),
  },
  {
    slug: 'pants',
    name: 'Pants',
    tagline: 'Modern silhouettes',
    image: img(11046623),
  },
  {
    slug: 'trousers',
    name: 'Trousers',
    tagline: 'Sharp, structured, timeless',
    image: img(6207132),
  },
];

export const collections: CollectionInfo[] = [
  {
    slug: 'daily-wear',
    name: 'Daily Wear',
    tagline: 'The everyday uniform',
    description:
      'Considered basics that move from desk to dinner without missing a beat.',
    image: img(9775674),
    season: 'all',
  },
  {
    slug: 'party-wear',
    name: 'Party Wear',
    tagline: 'After-dark elegance',
    description:
      'Statement pieces engineered for the room you walk into and the ones you leave behind.',
    image: img(29641627),
    season: 'all',
  },
  {
    slug: 'luxury-collection',
    name: 'Luxury Collection',
    tagline: 'The pinnacle of the house',
    description:
      'Limited editions cut from the finest natural fibres, finished entirely by hand.',
    image: img(31840917),
    season: 'all',
  },
  {
    slug: 'summer-collection',
    name: 'Summer Collection',
    tagline: 'Breathable, sun-washed, light',
    description:
      'Linen, organic cotton and open weaves designed for warm evenings and longer days.',
    image: img(18031037),
    season: 'summer',
  },
  {
    slug: 'winter-collection',
    name: 'Winter Collection',
    tagline: 'Layered, warm, considered',
    description:
      'Heavyweight knits, brushed wools and structured outerwear for the cold months.',
    image: img(15137845),
    season: 'winter',
  },
  {
    slug: 'festive-collection',
    name: 'Festive Collection',
    tagline: 'Celebration, reimagined',
    description:
      'Rich textures and deep tones crafted for the season of gathering.',
    image: img(38769940),
    season: 'festive',
  },
];

export const fabrics = [
  'Egyptian Cotton',
  'Japanese Selvedge Denim',
  'Belgian Linen',
  'Merino Wool',
  'Cashmere Blend',
  'Silk-Cotton',
  'Organic Cotton',
  'Tencel',
];

export const colorSwatches = [
  { name: 'Onyx', hex: '#0B0B0B' },
  { name: 'Ivory', hex: '#F1EDE6' },
  { name: 'Gold', hex: '#B68A35' },
  { name: 'Charcoal', hex: '#2B2B2B' },
  { name: 'Sand', hex: '#D9CFBE' },
  { name: 'Olive', hex: '#5A5A3C' },
  { name: 'Navy', hex: '#1B2A41' },
  { name: 'Burgundy', hex: '#5A2333' },
  { name: 'Slate', hex: '#6B7280' },
  { name: 'Rust', hex: '#8B4513' },
];

export const products: Product[] = [
  {
    id: 'p01',
    slug: 'noir-tailored-oxford-shirt',
    name: 'Noir Tailored Oxford Shirt',
    category: 'shirts',
    collections: ['daily-wear', 'luxury-collection'],
    price: 15687,
    compareAt: 19920,
    currency: 'INR',
    colors: [
      { name: 'Onyx', hex: '#0B0B0B' },
      { name: 'Ivory', hex: '#F1EDE6' },
      { name: 'Navy', hex: '#1B2A41' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    fabric: 'Egyptian Cotton',
    fabricDetails:
      'Woven from 120s two-ply Egyptian cotton with a refined Oxford weave and mother-of-pearl buttons.',
    description:
      'A precision-tailored oxford cut for the modern silhouette. Slim through the chest with a softly rounded hem designed to be worn tucked or loose.',
    washInstructions: 'Cold machine wash. Hang to dry. Iron on medium while damp.',
    shippingInfo: 'Complimentary express shipping. Delivered in 2–4 business days.',
    rating: 4.9,
    reviewsCount: 214,
    badge: 'Bestseller',
    bestSeller: true,
    trending: true,
    images: [img(7764013), img(9775674), img(37591114)],
    hoverImage: img(9775674),
  },
  {
    id: 'p02',
    slug: 'blossea-linen-relaxed-shirt',
    name: 'Blossea Linen Relaxed Shirt',
    category: 'shirts',
    collections: ['summer-collection', 'daily-wear'],
    price: 13695,
    currency: 'INR',
    colors: [
      { name: 'Sand', hex: '#D9CFBE' },
      { name: 'Ivory', hex: '#F1EDE6' },
      { name: 'Olive', hex: '#5A5A3C' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    fabric: 'Belgian Linen',
    fabricDetails:
      '100% Belgian linen, garment-washed for a lived-in hand and a fluid, breathable drape.',
    description:
      'An easy-fitting linen shirt with an open collar and a deliberately relaxed body. Built for warm evenings.',
    washInstructions: 'Gentle cold wash. Hang dry. Embraces natural wrinkling.',
    shippingInfo: 'Complimentary express shipping. Delivered in 2–4 business days.',
    rating: 4.8,
    reviewsCount: 132,
    badge: 'New',
    newArrival: true,
    images: [img(18031036), img(18031037), img(5149729)],
    hoverImage: img(18031037),
  },
  {
    id: 'p03',
    slug: 'midnight-silk-blend-evening-shirt',
    name: 'Midnight Silk-Blend Evening Shirt',
    category: 'shirts',
    collections: ['party-wear', 'luxury-collection'],
    price: 20335,
    currency: 'INR',
    colors: [
      { name: 'Onyx', hex: '#0B0B0B' },
      { name: 'Burgundy', hex: '#5A2333' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    fabric: 'Silk-Cotton',
    fabricDetails: 'A 60/40 silk-cotton blend with a subtle lustrous finish and a fluid hand.',
    description:
      'A deep-toned evening shirt with a covered placket and a refined sheen. Cut for the after-hours.',
    washInstructions: 'Dry clean only.',
    shippingInfo: 'Complimentary express shipping. Delivered in 2–4 business days.',
    rating: 4.7,
    reviewsCount: 88,
    trending: true,
    images: [img(31840919), img(32478277), img(20131881)],
    hoverImage: img(32478277),
  },
  {
    id: 'p04',
    slug: 'festival-velvet-bandhgala-shirt',
    name: 'Festival Velvet Bandhgala Shirt',
    category: 'shirts',
    collections: ['festive-collection', 'luxury-collection'],
    price: 22825,
    compareAt: 26560,
    currency: 'INR',
    colors: [
      { name: 'Burgundy', hex: '#5A2333' },
      { name: 'Onyx', hex: '#0B0B0B' },
      { name: 'Gold', hex: '#B68A35' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    fabric: 'Cashmere Blend',
    fabricDetails: 'A plush cashmere-velvet blend with a deep pile and a structured shoulder.',
    description:
      'A regal bandhgala-neck shirt in deep festive tones. Tailored close and finished with hand-stitched seams.',
    washInstructions: 'Dry clean only. Store hung.',
    shippingInfo: 'Complimentary express shipping. Delivered in 2–4 business days.',
    rating: 4.9,
    reviewsCount: 56,
    badge: 'Limited',
    trending: true,
    images: [img(29641627), img(38769940), img(30947677)],
    hoverImage: img(38769940),
  },
  {
    id: 'p05',
    slug: 'monochrome-heavyweight-tee',
    name: 'Monochrome Heavyweight Tee',
    category: 't-shirts',
    collections: ['daily-wear'],
    price: 7387,
    currency: 'INR',
    colors: [
      { name: 'Onyx', hex: '#0B0B0B' },
      { name: 'Ivory', hex: '#F1EDE6' },
      { name: 'Charcoal', hex: '#2B2B2B' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    fabric: 'Organic Cotton',
    fabricDetails: '280gsm organic cotton jersey, pre-shrunk and garment-dyed.',
    description:
      'A boxy, heavyweight tee with a structured shoulder and a clean, cropped hem. The everyday foundation.',
    washInstructions: 'Cold wash inside out. Tumble dry low.',
    shippingInfo: 'Complimentary express shipping. Delivered in 2–4 business days.',
    rating: 4.8,
    reviewsCount: 412,
    badge: 'Bestseller',
    bestSeller: true,
    images: [img(9558581), img(13651809), img(8187670)],
    hoverImage: img(13651809),
  },
  {
    id: 'p06',
    slug: 'sculpted-pocket-tee',
    name: 'Sculpted Pocket Tee',
    category: 't-shirts',
    collections: ['daily-wear', 'summer-collection'],
    price: 7885,
    currency: 'INR',
    colors: [
      { name: 'Sand', hex: '#D9CFBE' },
      { name: 'Olive', hex: '#5A5A3C' },
      { name: 'Ivory', hex: '#F1EDE6' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    fabric: 'Organic Cotton',
    fabricDetails: '240gsm organic cotton with a soft brushed finish.',
    description:
      'A clean pocket tee with a slightly elongated body and a softened crew neck.',
    washInstructions: 'Cold wash inside out. Hang dry.',
    shippingInfo: 'Complimentary express shipping. Delivered in 2–4 business days.',
    rating: 4.7,
    reviewsCount: 198,
    newArrival: true,
    images: [img(9775825), img(22441317), img(18425197)],
    hoverImage: img(22441317),
  },
  {
    id: 'p07',
    slug: 'eclipse-long-sleeve-tee',
    name: 'Eclipse Long-Sleeve Tee',
    category: 't-shirts',
    collections: ['winter-collection', 'daily-wear'],
    price: 9130,
    currency: 'INR',
    colors: [
      { name: 'Onyx', hex: '#0B0B0B' },
      { name: 'Charcoal', hex: '#2B2B2B' },
      { name: 'Slate', hex: '#6B7280' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    fabric: 'Merino Wool',
    fabricDetails: 'Fine-gauge merino wool with a smooth face and a naturally temperature-regulating hand.',
    description:
      'A refined long-sleeve merino tee. Soft enough for the skin, structured enough to layer.',
    washInstructions: 'Hand wash cold. Reshape and dry flat.',
    shippingInfo: 'Complimentary express shipping. Delivered in 2–4 business days.',
    rating: 4.9,
    reviewsCount: 76,
    trending: true,
    images: [img(32321512), img(7697958), img(8187670)],
    hoverImage: img(7697958),
  },
  {
    id: 'p08',
    slug: 'ivory-studio-tee',
    name: 'Ivory Studio Tee',
    category: 't-shirts',
    collections: ['daily-wear', 'party-wear'],
    price: 6557,
    compareAt: 7885,
    currency: 'INR',
    colors: [
      { name: 'Ivory', hex: '#F1EDE6' },
      { name: 'Onyx', hex: '#0B0B0B' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    fabric: 'Organic Cotton',
    fabricDetails: '220gsm organic cotton with a relaxed, lived-in finish.',
    description: 'A relaxed studio tee with a soft drape and a dropped shoulder.',
    washInstructions: 'Cold wash. Hang dry.',
    shippingInfo: 'Complimentary express shipping. Delivered in 2–4 business days.',
    rating: 4.6,
    reviewsCount: 156,
    images: [img(9775824), img(9558761), img(14941588)],
    hoverImage: img(9558761),
  },
  {
    id: 'p09',
    slug: 'noir-selvedge-straight-pant',
    name: 'Noir Selvedge Straight Pant',
    category: 'pants',
    collections: ['daily-wear', 'luxury-collection'],
    price: 18260,
    currency: 'INR',
    colors: [
      { name: 'Onyx', hex: '#0B0B0B' },
      { name: 'Navy', hex: '#1B2A41' },
    ],
    sizes: ['28', '30', '32', '34', '36', '38'],
    fabric: 'Japanese Selvedge Denim',
    fabricDetails: '14oz Japanese selvedge denim, sanforized with a clean, structured break.',
    description:
      'A straight-leg pant in heavyweight selvedge. Built to age beautifully with wear.',
    washInstructions: 'Wash sparingly. Cold water inside out. Hang dry.',
    shippingInfo: 'Complimentary express shipping. Delivered in 2–4 business days.',
    rating: 4.8,
    reviewsCount: 233,
    badge: 'Bestseller',
    bestSeller: true,
    trending: true,
    images: [img(2897533), img(38818880), img(6207132)],
    hoverImage: img(38818880),
  },
  {
    id: 'p10',
    slug: 'pleated-wool-trouser',
    name: 'Pleated Wool Trouser',
    category: 'trousers',
    collections: ['daily-wear', 'luxury-collection'],
    price: 19505,
    compareAt: 24070,
    currency: 'INR',
    colors: [
      { name: 'Charcoal', hex: '#2B2B2B' },
      { name: 'Onyx', hex: '#0B0B0B' },
      { name: 'Slate', hex: '#6B7280' },
    ],
    sizes: ['28', '30', '32', '34', '36', '38'],
    fabric: 'Merino Wool',
    fabricDetails: 'Tropical-weight merino wool with a single front pleat and a clean tapered leg.',
    description:
      'A tailored trouser with a deep pleat and a sharp break. The foundation of a considered wardrobe.',
    washInstructions: 'Dry clean recommended.',
    shippingInfo: 'Complimentary express shipping. Delivered in 2–4 business days.',
    rating: 4.9,
    reviewsCount: 147,
    bestSeller: true,
    images: [img(6207132), img(9464625), img(2897533)],
    hoverImage: img(9464625),
  },
  {
    id: 'p11',
    slug: 'linen-summer-trouser',
    name: 'Linen Summer Trouser',
    category: 'trousers',
    collections: ['summer-collection', 'daily-wear'],
    price: 14525,
    currency: 'INR',
    colors: [
      { name: 'Sand', hex: '#D9CFBE' },
      { name: 'Ivory', hex: '#F1EDE6' },
      { name: 'Olive', hex: '#5A5A3C' },
    ],
    sizes: ['28', '30', '32', '34', '36'],
    fabric: 'Belgian Linen',
    fabricDetails: 'Lightweight Belgian linen with a relaxed leg and a clean finish.',
    description:
      'A breezy summer trouser with a relaxed leg. Effortless with a tee, sharp with a shirt.',
    washInstructions: 'Cold wash. Hang dry.',
    shippingInfo: 'Complimentary express shipping. Delivered in 2–4 business days.',
    rating: 4.7,
    reviewsCount: 109,
    newArrival: true,
    images: [img(18075374), img(17806235), img(5145182)],
    hoverImage: img(17806235),
  },
  {
    id: 'p12',
    slug: 'cashmere-winter-trouser',
    name: 'Cashmere Winter Trouser',
    category: 'trousers',
    collections: ['winter-collection', 'luxury-collection'],
    price: 24485,
    currency: 'INR',
    colors: [
      { name: 'Charcoal', hex: '#2B2B2B' },
      { name: 'Onyx', hex: '#0B0B0B' },
    ],
    sizes: ['30', '32', '34', '36', '38'],
    fabric: 'Cashmere Blend',
    fabricDetails: 'A cashmere-wool blend with a brushed hand and a warm, structured drape.',
    description:
      'A cold-weather trouser cut from a cashmere blend. Soft, warm, and beautifully structured.',
    washInstructions: 'Dry clean only.',
    shippingInfo: 'Complimentary express shipping. Delivered in 2–4 business days.',
    rating: 4.9,
    reviewsCount: 64,
    trending: true,
    images: [img(15137845), img(27454778), img(35070984)],
    hoverImage: img(27454778),
  },
  {
    id: 'p13',
    slug: 'cargo-field-pant',
    name: 'Cargo Field Pant',
    category: 'pants',
    collections: ['daily-wear', 'winter-collection'],
    price: 16185,
    currency: 'INR',
    colors: [
      { name: 'Olive', hex: '#5A5A3C' },
      { name: 'Onyx', hex: '#0B0B0B' },
      { name: 'Sand', hex: '#D9CFBE' },
    ],
    sizes: ['28', '30', '32', '34', '36', '38'],
    fabric: 'Tencel',
    fabricDetails: 'A durable Tencel-cotton blend with reinforced bartacks and a clean utility silhouette.',
    description:
      'A modern cargo with a refined leg and considered pocket placement. Utility, distilled.',
    washInstructions: 'Cold wash. Tumble dry low.',
    shippingInfo: 'Complimentary express shipping. Delivered in 2–4 business days.',
    rating: 4.6,
    reviewsCount: 187,
    newArrival: true,
    images: [img(11046623), img(38288476), img(37897870)],
    hoverImage: img(38288476),
  },
  {
    id: 'p14',
    slug: 'festive-silk-trouser',
    name: 'Festive Silk Trouser',
    category: 'trousers',
    collections: ['festive-collection', 'party-wear'],
    price: 21995,
    currency: 'INR',
    colors: [
      { name: 'Burgundy', hex: '#5A2333' },
      { name: 'Onyx', hex: '#0B0B0B' },
      { name: 'Gold', hex: '#B68A35' },
    ],
    sizes: ['28', '30', '32', '34', '36'],
    fabric: 'Silk-Cotton',
    fabricDetails: 'A silk-cotton blend with a soft lustre and a clean tapered leg.',
    description:
      'A festive trouser with a subtle sheen. Pairs effortlessly with the velvet bandhgala.',
    washInstructions: 'Dry clean only.',
    shippingInfo: 'Complimentary express shipping. Delivered in 2–4 business days.',
    rating: 4.8,
    reviewsCount: 41,
    trending: true,
    images: [img(37897870), img(30947677), img(16325767)],
    hoverImage: img(30947677),
  },
  {
    id: 'p15',
    slug: 'studio-relaxed-pant',
    name: 'Studio Relaxed Pant',
    category: 'pants',
    collections: ['daily-wear', 'summer-collection'],
    price: 12865,
    compareAt: 15355,
    currency: 'INR',
    colors: [
      { name: 'Charcoal', hex: '#2B2B2B' },
      { name: 'Ivory', hex: '#F1EDE6' },
      { name: 'Slate', hex: '#6B7280' },
    ],
    sizes: ['28', '30', '32', '34', '36'],
    fabric: 'Tencel',
    fabricDetails: 'A fluid Tencel twill with a relaxed leg and a soft, broken-in hand.',
    description:
      'An easy studio pant with a fluid drape and a clean drawcord waist. Comfort, refined.',
    washInstructions: 'Cold wash. Hang dry.',
    shippingInfo: 'Complimentary express shipping. Delivered in 2–4 business days.',
    rating: 4.7,
    reviewsCount: 122,
    images: [img(3754209), img(13958659), img(32601595)],
    hoverImage: img(13958659),
  },
  {
    id: 'p16',
    slug: 'ivory-ceremony-shirt',
    name: 'Ivory Ceremony Shirt',
    category: 'shirts',
    collections: ['festive-collection', 'luxury-collection'],
    price: 17845,
    currency: 'INR',
    colors: [
      { name: 'Ivory', hex: '#F1EDE6' },
      { name: 'Gold', hex: '#B68A35' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    fabric: 'Silk-Cotton',
    fabricDetails: 'A fine silk-cotton with a subtle sheen and embroidered placket detailing.',
    description:
      'A ceremonial shirt in soft ivory with gold-thread placket detail. Quietly spectacular.',
    washInstructions: 'Dry clean only.',
    shippingInfo: 'Complimentary express shipping. Delivered in 2–4 business days.',
    rating: 4.9,
    reviewsCount: 38,
    badge: 'New',
    newArrival: true,
    images: [img(38769940), img(18738681), img(30947677)],
    hoverImage: img(18738681),
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

export function getProductsByCollection(collection: string): Product[] {
  return products.filter((p) => p.collections.includes(collection as never));
}

export function getBestSellers(): Product[] {
  return products.filter((p) => p.bestSeller);
}

export function getNewArrivals(): Product[] {
  return products.filter((p) => p.newArrival);
}

export function getTrending(): Product[] {
  return products.filter((p) => p.trending);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter(
      (p) =>
        p.id !== product.id &&
        (p.category === product.category ||
          p.collections.some((c) => product.collections.includes(c))),
    )
    .slice(0, limit);
}

export const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Shop', href: '/shop' },
  { label: 'Collections', href: '/collections', mega: true },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export const testimonials = [
  {
    quote:
      'Blossea has completely redefined what I expect from menswear. The fit is immaculate and the fabrics feel like they belong on a runway.',
    author: 'Aarav Mehta',
    role: 'Creative Director, Mumbai',
  },
  {
    quote:
      'I have worn these shirts through eighteen-hour days and they still look as crisp as the moment I put them on. That is luxury.',
    author: 'Daniel Okonkwo',
    role: 'Architect, London',
  },
  {
    quote:
      'The packaging alone made me feel like I had bought something rare. The pieces lived up to every bit of that promise.',
    author: 'Kenji Tanaka',
    role: 'Photographer, Tokyo',
  },
];

export const instagramImages = [
  img(7764013, 600, 600),
  img(18031036, 600, 800),
  img(11046623, 600, 600),
  img(9558581, 600, 800),
  img(31840919, 600, 600),
  img(6207132, 600, 800),
  img(29641627, 600, 600),
  img(18075374, 600, 600),
];
