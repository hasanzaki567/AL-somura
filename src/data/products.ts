import { Product } from '../types';

export const LOGO_IMAGE = "https://lh3.googleusercontent.com/aida-public/AB6AXuCU_sXGvK1YTi9vOdA7pXAWKvSkORzK_FtM3MkCLvtH1dT1CX1uZWzu4R-S06GFG01a3T14_03m11KA6_ZACI4Yoarp__igkWMwym1RzDA2zWXj0xW_Gdm39d1cuesOvnTlTArNbFwCpRVI2P8g0FFKAf2_HR__lCwuQDJXtByEqqNKiO_VfYSq9UO__FNeNScSrG_DZijuhp42TCasWbDqRI_lwCq2SM_i4gPihgnBQOGBzeHpw-CfYA";

export const HERO_SLIDES = [
  {
    id: 1,
    title: 'Elite Craftsmanship, Timeless Style.',
    subtitle: 'MAISON DE CUIR • SINCE 1984',
    description: 'Each Al Sumora creation is individually hand-cut, saddle-stitched, and burnished in our European ateliers using full-grain Tuscan leather.',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=1600',
    tag: 'Luxury Leather Jackets',
  },
  {
    id: 2,
    title: 'Master Hand-Welted Footwear.',
    subtitle: 'SARTORIAL FOOTWEAR ATELIER',
    description: 'Crafted with Goodyear welted construction, hand-dyed patina finish, and full-grain calfskin for generational longevity and supreme comfort.',
    image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&q=80&w=1600',
    tag: 'Fine Leather Footwear',
  },
  {
    id: 3,
    title: 'Architectural Executive Briefcases.',
    subtitle: 'BUSINESS & ATTACHÉ COLLECTION',
    description: 'Engineered with solid antique brass hardware, suede lining, and dedicated padded compartments for the modern professional.',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=1600',
    tag: 'Executive Briefcases',
  },
  {
    id: 4,
    title: 'The Art of Grand Travel.',
    subtitle: 'HERITAGE VOYAGER Duffels',
    description: 'Spacious weekenders forged from thick vegetable-tanned hides that acquire a majestic patina through decades of global travel.',
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=1600',
    tag: 'Travel Duffels & Bags',
  },
];

export const CUSTOMIZATION_IMAGES = {
  goldFoil: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=1000",
  measuring: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=1000"
};

export const HERITAGE_IMAGES = {
  stitching: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=1000",
  artisan: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&q=80&w=1000",
  tools: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&q=80&w=1000"
};

export const PRODUCTS: Product[] = [
  // LEATHER JACKETS
  {
    id: 'sovereign-cafe-racer',
    name: 'The Sovereign Cafe Racer Jacket',
    price: 1850,
    category: 'Jackets',
    isFeatured: true,
    customizable: true,
    description: 'Precision-tailored in full-grain Italian Nappa leather. Features heavy-gauge antiqued brass zippers, silk-satin diamond quilted lining, and an ergonomic band collar.',
    details: [
      '100% full-grain Italian Nappa calfskin leather',
      'Quilted silk-satin inner thermal lining',
      'Solid antiqued brass YKK zippers with leather pulls',
      'Two interior welt pockets & zippered sleeve cuffs',
      'Interactive canvas custom drawing & text box engraving available'
    ],
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&q=80&w=1200'
    ],
    colors: [
      { name: 'Obsidian Black', hex: '#111111', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=1200' },
      { name: 'Espresso Brown', hex: '#2c1810', image: 'https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?auto=format&fit=crop&q=80&w=1200' }
    ],
    boutiques: ['paris', 'milan', 'london']
  },
  {
    id: 'atelier-suede-bomber',
    name: 'The Atelier Suede Bomber Jacket',
    price: 1650,
    category: 'Jackets',
    isFeatured: true,
    customizable: false,
    description: 'Crafted from velvety Spanish goat suede with hand-knit ribbed waist and collar. Designed for effortlessly elevated casual outerwear.',
    details: [
      'Ultra-soft Spanish goat suede',
      'Merino wool rib-knit cuffs, collar, and hem',
      'Horn button front flap pockets',
      'Breathable Bemberg cupro lining'
    ],
    images: [
      'https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=1200'
    ],
    colors: [
      { name: 'Cognac Suede', hex: '#8c5e3c', image: 'https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?auto=format&fit=crop&q=80&w=1200' },
      { name: 'Olive Suede', hex: '#4e5540', image: 'https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&q=80&w=1200' }
    ],
    boutiques: ['paris', 'milan']
  },
  {
    id: 'grandmaster-overcoat',
    name: 'The Grandmaster Leather Overcoat',
    price: 2200,
    category: 'Jackets',
    isFeatured: false,
    customizable: true,
    description: 'Commanding double-breasted coat in supple oiled steerhide. Features hand-stitched lapels, horn buttons, and deep fleece-lined storm pockets.',
    details: [
      'Oiled full-grain steerhide with weather-resistant coat finish',
      'Double-breasted front with real horn buttons',
      'Detachable shearling fur collar insert',
      'Saddle-stitched belt and back vent'
    ],
    images: [
      'https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?auto=format&fit=crop&q=80&w=1200'
    ],
    colors: [
      { name: 'Antique Walnut', hex: '#3d2314', image: 'https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&q=80&w=1200' }
    ],
    boutiques: ['london', 'paris']
  },

  // LEATHER SHOES
  {
    id: 'handwelted-oxford-shoes',
    name: 'The Sovereign Hand-Welted Oxfords',
    price: 890,
    category: 'Shoes',
    isFeatured: true,
    customizable: false,
    description: 'Sartorial dress shoes built using traditional Goodyear welted construction. Hand-patinated French calfskin leather with channeled oak-bark tanned leather soles.',
    details: [
      'Hand-selected full-grain French calfskin',
      'Goodyear welted single leather sole with brass nail heel reinforcement',
      'Hand-burnished museum patina finish',
      'Includes custom cedar shoe trees and velvet dust bags'
    ],
    images: [
      'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=1200'
    ],
    colors: [
      { name: 'Espresso Patina', hex: '#2c1810', image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&q=80&w=1200' },
      { name: 'Burnished Burgundy', hex: '#4a121a', image: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&q=80&w=1200' }
    ],
    boutiques: ['paris', 'milan', 'london']
  },
  {
    id: 'milanese-monk-strap',
    name: 'The Milanese Double Monk Strap',
    price: 850,
    category: 'Shoes',
    isFeatured: false,
    customizable: true,
    description: 'Sculpted on an elegant almond toe last with hand-polished solid brass buckles and bevelled waist leather soles.',
    details: [
      'Aniline dyed box calf leather',
      'Dual solid brass buckles with elastic flex tabs',
      'Full leather lining with padded arch support',
      'Channeled sole waist'
    ],
    images: [
      'https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=1200'
    ],
    colors: [
      { name: 'Mahogany Brown', hex: '#3d2314', image: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&q=80&w=1200' },
      { name: 'Noir Black', hex: '#111111', image: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&q=80&w=1200' }
    ],
    boutiques: ['milan', 'london']
  },
  {
    id: 'mayfair-chelsea-boots',
    name: 'The Mayfair Leather Chelsea Boots',
    price: 920,
    category: 'Shoes',
    isFeatured: true,
    customizable: false,
    description: 'Cut from a single piece of flawless cognac calfskin leather with elastic side gussets and sturdy storm-welted rubber lug soles.',
    details: [
      'Wholecut calfskin construction',
      'Durable Goodyear storm welted rubber sole',
      'Woven fabric pull tabs',
      'Soft calfskin leather lining'
    ],
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&q=80&w=1200'
    ],
    colors: [
      { name: 'Antique Cognac', hex: '#8c5e3c', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=1200' }
    ],
    boutiques: ['london', 'paris']
  },

  // LEATHER BRIEFCASE & ATTACHE
  {
    id: 'executive-briefcase',
    name: 'The Executive Attache Briefcase',
    price: 1450,
    category: 'Briefcases',
    isFeatured: true,
    customizable: true,
    description: 'Handcrafted in Italy using heavy full-grain Tuscan leather and solid brass key lock hardware. Engineered for laptops up to 16" with luxury suede lining.',
    details: [
      'Full-grain vegetable-tanned Tuscan harness leather',
      'Solid antique brass key-lock hardware',
      'Padded shockproof compartment for 16" laptops',
      'Hand-painted finished edges & waxed thread saddle stitching',
      'Interactive custom canvas engraving and drawing options'
    ],
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=1200'
    ],
    colors: [
      { name: 'Tuscan Saddle Tan', hex: '#8c5e3c', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=1200' },
      { name: 'Onyx Black', hex: '#111111', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=1200' }
    ],
    boutiques: ['paris', 'milan', 'london']
  },
  {
    id: 'diplomat-double-zip',
    name: 'The Diplomat Double-Zip Briefcase',
    price: 1580,
    category: 'Briefcases',
    isFeatured: false,
    customizable: false,
    description: 'Dual compartment portfolio briefcase with trolley strap, interior pen organizers, and padded tablet sleeve in rich dark espresso leather.',
    details: [
      'Thick full-grain steerhide leather',
      'Dual smooth YKK metallic zippers',
      'Smart trolley pass-through sleeve for luggage handles',
      'Removable ergonomic shoulder strap'
    ],
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=1200'
    ],
    colors: [
      { name: 'Dark Espresso', hex: '#2c1810', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=1200' }
    ],
    boutiques: ['paris', 'milan']
  },

  // LEATHER WALLETS
  {
    id: 'sovereign-bifold-wallet',
    name: 'The Sovereign Bifold Wallet',
    price: 320,
    category: 'Wallets',
    isFeatured: true,
    customizable: true,
    description: 'Slim bifold wallet in matte black full-grain leather. Eight card slots, dual full-length note compartments, and gold debossed emblem.',
    details: [
      'Tonal stitching and wax edge coating',
      '8 precision cut card slots + 2 hidden receipt slots',
      '2 bill compartments lined in silk jacquard',
      'RFID blocking internal protection shield'
    ],
    images: [
      'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=1200'
    ],
    colors: [
      { name: 'Matte Onyx', hex: '#111111', image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=1200' }
    ],
    boutiques: ['paris', 'milan', 'london']
  },
  {
    id: 'atelier-slim-cardholder',
    name: 'The Atelier Slim Cardholder',
    price: 195,
    category: 'Wallets',
    isFeatured: false,
    customizable: false,
    description: 'Ultra-slim leather card sleeve with five pockets for essential cards and folded cash notes.',
    details: [
      'Fine Italian calf leather',
      '4 card slots + 1 central cash pocket',
      'Gold foil debossed Al Sumora insignia',
      'Ultra-thin profile for jacket or shirt pockets'
    ],
    images: [
      'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=1200'
    ],
    colors: [
      { name: 'Cognac Leather', hex: '#8c5e3c', image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&q=80&w=1200' }
    ],
    boutiques: ['paris', 'london']
  },

  // LEATHER BAGS
  {
    id: 'voyager-heritage-duffel',
    name: 'The Voyager Heritage Duffel',
    price: 1650,
    category: 'Bags',
    isFeatured: true,
    customizable: true,
    description: 'Generous mahogany leather weekender duffel bag with robust rolled handles, detachable padded shoulder strap, and brass lock zippers.',
    details: [
      'Rich deep mahogany hand-waxed leather',
      'Heavy-duty brass two-way zippers with keylock',
      'Spacious main interior lined in water-resistant canvas',
      'Exterior passport pocket & reinforced brass feet'
    ],
    images: [
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=1200'
    ],
    colors: [
      { name: 'Mahogany Brown', hex: '#3d2314', image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=1200' }
    ],
    boutiques: ['paris', 'milan', 'london']
  },
  {
    id: 'master-structured-tote',
    name: 'The Master Structured Leather Tote',
    price: 1280,
    category: 'Bags',
    isFeatured: false,
    customizable: false,
    description: 'Clean architectural tote bag crafted from rich cognac calfskin leather with reinforced shoulder straps and internal zip pouch.',
    details: [
      'Supple full-grain calfskin leather',
      'Reinforced base panel with protective brass feet',
      'Spacious main compartment with magnetic lock',
      'Matching zipped leather clutch pouch included'
    ],
    images: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=1200'
    ],
    colors: [
      { name: 'Warm Cognac', hex: '#8c5e3c', image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=1200' }
    ],
    boutiques: ['paris', 'milan']
  },

  // LEATHER ACCESSORIES
  {
    id: 'royal-bridle-belt',
    name: 'The Royal Bridle Leather Belt',
    price: 260,
    category: 'Accessories',
    isFeatured: false,
    customizable: false,
    description: 'Burnished tan dress belt crafted from heavy-gauge bridle leather with solid hand-cast brass roller buckle.',
    details: [
      'Solid brass roller buckle with subtle antique sheen',
      '35mm belt width suitable for trousers or denim',
      'Hand-beveled and burnished wax edges',
      'Standard sizing options'
    ],
    images: [
      'https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&q=80&w=1200'
    ],
    colors: [
      { name: 'Burnished Tan', hex: '#8c5e3c', image: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&q=80&w=1200' },
      { name: 'Dark Mahogany', hex: '#3d2314', image: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&q=80&w=1200' }
    ],
    boutiques: ['milan', 'london']
  }
];
