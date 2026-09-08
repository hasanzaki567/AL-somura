import { Product } from '../types';

export const LOGO_IMAGE = "/logo.png";

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
    price: 154999,
    category: 'Jackets',
    isFeatured: true,
    isBestSeller: true,
    isLowStock: true,
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
    price: 138000,
    category: 'Jackets',
    isFeatured: true,
    isBestSeller: true,
    isLowStock: false,
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
    price: 185000,
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
  {
    id: 'vanguard-aviator-jacket',
    name: 'The Vanguard Aviator Flight Jacket',
    price: 165000,
    category: 'Jackets',
    isFeatured: false,
    customizable: true,
    description: 'Inspired by military issues, crafted in heavy-grain tumbled steerhide with a plush shearling collar.',
    details: [
      'Thick, heavy-grain tumbled steerhide leather',
      '100% genuine merino shearling detachable collar',
      'Action back panels for extra range of motion',
      'Heavy-duty brass zipper front closures'
    ],
    images: [
      'https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=1200'
    ],
    colors: [
      { name: 'Dark Mahogany', hex: '#3d2314', image: 'https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&q=80&w=1200' }
    ],
    boutiques: ['london', 'paris']
  },
  {
    id: 'artisan-leather-blazer',
    name: 'The Artisan Tailored Blazer',
    price: 145000,
    category: 'Jackets',
    isFeatured: false,
    customizable: false,
    description: 'A sharp, unstructured sports jacket tailored from featherweight glove lambskin for a natural drape.',
    details: [
      'Featherweight Italian glove lambskin',
      'Unstructured shoulders for a relaxed, sharp drape',
      'Two-button front closure with genuine horn buttons',
      'Double back vent for comfort'
    ],
    images: [
      'https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=1200'
    ],
    colors: [
      { name: 'Onyx Black', hex: '#111111', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=1200' }
    ],
    boutiques: ['milan', 'paris']
  },
  {
    id: 'heritage-field-jacket',
    name: 'The Heritage Utility Field Jacket',
    price: 158000,
    category: 'Jackets',
    isFeatured: false,
    customizable: true,
    description: 'Rugged M-65 field jacket layout featuring four front utility pockets and adjustable drawstring waist in distressed calfskin.',
    details: [
      'Distressed and hand-waxed calfskin leather',
      'Four front bellows pockets with snap closures',
      'Packable hood behind collar zipper',
      'Adjustable internal waist drawstring'
    ],
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&q=80&w=1200'
    ],
    colors: [
      { name: 'Saddle Tan', hex: '#8c5e3c', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=1200' }
    ],
    boutiques: ['london', 'milan']
  },
  {
    id: 'shearling-flight-jacket',
    name: 'The Elite Shearling Flight Jacket',
    price: 198000,
    category: 'Jackets',
    isFeatured: true,
    customizable: false,
    description: 'An ultimate winter luxury statement, handcrafted entirely of thick British shearling with crackled leather exterior.',
    details: [
      '100% British shearling lambskin',
      'Hand-crackled and waxed weather-resistant leather face',
      'Double adjustable throat latch buckles',
      'Heavy duty steel zippers'
    ],
    images: [
      'https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?auto=format&fit=crop&q=80&w=1200'
    ],
    colors: [
      { name: 'Warm Chestnut', hex: '#583622', image: 'https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&q=80&w=1200' }
    ],
    boutiques: ['paris', 'london']
  },
  {
    id: 'continental-trench-coat',
    name: 'The Continental Belted Trench Coat',
    price: 175000,
    category: 'Jackets',
    isFeatured: false,
    customizable: true,
    description: 'A striking long-line double-breasted trench coat with shoulder epaulets and a full leather wrap belt.',
    details: [
      'Plush, full-grain lightweight calfskin',
      'Adjustable belt with solid brass hardware buckles',
      'Storm flap over-shoulder closures',
      'Fully lined with silk-cupro pattern fabric'
    ],
    images: [
      'https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=1200'
    ],
    colors: [
      { name: 'Espresso Brown', hex: '#2c1810', image: 'https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?auto=format&fit=crop&q=80&w=1200' }
    ],
    boutiques: ['paris', 'milan']
  },
  {
    id: 'prestige-biker-jacket',
    name: 'The Prestige Asymmetrical Biker Jacket',
    price: 148000,
    category: 'Jackets',
    isFeatured: false,
    customizable: true,
    description: 'An iconic biker jacket built from thick chrome-tanned steerhide with premium hardware.',
    details: [
      'Chrome-tanned heavy steerhide leather',
      'Polished steel asymmetric zippers and buckles',
      'Snap down lapels and collar tabs',
      'Three exterior zippered pockets plus utility ticket pouch'
    ],
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&q=80&w=1200'
    ],
    colors: [
      { name: 'Obsidian Black', hex: '#111111', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=1200' }
    ],
    boutiques: ['paris', 'london']
  },

  // LEATHER SHOES
  {
    id: 'handwelted-oxford-shoes',
    name: 'The Sovereign Hand-Welted Oxfords',
    price: 74500,
    category: 'Shoes',
    isFeatured: true,
    customizable: false,
    description: 'Sartorial dress shoes built using Goodyear welted construction. Hand-patinated French calfskin leather with channeled oak-bark tanned leather soles.',
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
    price: 71200,
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
    price: 77000,
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
  {
    id: 'pebble-grain-derby',
    name: 'The Heritage Pebble Grain Derbies',
    price: 68000,
    category: 'Shoes',
    isFeatured: false,
    customizable: false,
    description: 'A handsome country shoe crafted in textured French pebble grain leather with Dainite rubber soles.',
    details: [
      'Tough pebble-grain French calf leather',
      'Genuine Dainite rubber studded soles',
      'Goodyear storm-welt construction',
      'Hand-waxed flat laces'
    ],
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&q=80&w=1200'
    ],
    colors: [
      { name: 'Chestnut Brown', hex: '#583622', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=1200' }
    ],
    boutiques: ['london', 'milan']
  },
  {
    id: 'artisan-leather-loafers',
    name: 'The Belgian Suede Loafers',
    price: 59000,
    category: 'Shoes',
    isFeatured: false,
    customizable: true,
    description: 'Slim Italian slip-on loafers handcrafted in supple English suede featuring dynamic piping details.',
    details: [
      'Super-soft premium English suede',
      'Unstructured, glove-like barefoot fit',
      'Hand-stitched apron and calfskin piping',
      'Flexible leather sole with stacked heel'
    ],
    images: [
      'https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&q=80&w=1200'
    ],
    colors: [
      { name: 'Dark Taupe Suede', hex: '#776255', image: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&q=80&w=1200' }
    ],
    boutiques: ['paris', 'milan']
  },
  {
    id: 'prestige-wholecut-oxfords',
    name: 'The Prestige Wholecut Oxfords',
    price: 82000,
    category: 'Shoes',
    isFeatured: true,
    customizable: true,
    description: 'Sartorial dress shoes cut from a single continuous piece of premium French calfskin without any seams.',
    details: [
      'Seamless wholecut calfskin design',
      'Channeled Goodyear leather sole',
      'Hand-painted dark espresso mirror gloss finish',
      'Museum-grade wood last'
    ],
    images: [
      'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=1200'
    ],
    colors: [
      { name: 'Onyx Polish', hex: '#111111', image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&q=80&w=1200' }
    ],
    boutiques: ['paris', 'london']
  },
  {
    id: 'executive-wingtip-brogues',
    name: 'The Executive Wingtip Brogues',
    price: 71000,
    category: 'Shoes',
    isFeatured: false,
    customizable: false,
    description: 'Ornate full-brogue dress shoes with classic wingtip perforation patterns and double oak-bark soles.',
    details: [
      'Full grain French calf leather with brogue details',
      'Double leather sole with antique edge finish',
      'Medallion punched toe cap decoration',
      'Cork filled inner solebed'
    ],
    images: [
      'https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=1200'
    ],
    colors: [
      { name: 'Antique Walnut', hex: '#3d2314', image: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&q=80&w=1200' }
    ],
    boutiques: ['milan', 'london']
  },
  {
    id: 'suede-chukka-boots',
    name: 'The Tuscan Suede Chukka Boots',
    price: 64000,
    category: 'Shoes',
    isFeatured: false,
    customizable: false,
    description: 'Classic three-eyelet ankle boots crafted in Italian repello suede with crepe rubber soles.',
    details: [
      'Water-repellent Tuscan split suede',
      'Genuine crepe rubber soles',
      'Three brass eyelet lace setup',
      'Soft glove leather lining'
    ],
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&q=80&w=1200'
    ],
    colors: [
      { name: 'Warm Snuff Suede', hex: '#b08b68', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=1200' }
    ],
    boutiques: ['london', 'paris']
  },
  {
    id: 'master-court-sneakers',
    name: 'The Master Court Leather Sneakers',
    price: 48000,
    category: 'Shoes',
    isFeatured: true,
    customizable: false,
    description: 'Minimalist low-top luxury sneakers built in white calfskin with Margom rubber cup soles.',
    details: [
      'Ultra-white full grain Italian calfskin',
      'Genuine stitched Margom Italian rubber soles',
      'Removable cushioned calfskin footbed',
      'Subtle gold-debossed style code branding'
    ],
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&q=80&w=1200'
    ],
    colors: [
      { name: 'Alabaster White', hex: '#f6f5f3', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=1200' }
    ],
    boutiques: ['paris', 'milan', 'london']
  },
  {
    id: 'riviera-woven-loafers',
    name: 'The Riviera Hand-Woven Loafers',
    price: 52000,
    category: 'Shoes',
    isFeatured: false,
    customizable: false,
    description: 'Intricately hand-woven calfskin slip-ons ideal for high summer resort wear.',
    details: [
      'Hand-woven calfskin leather upper striping',
      'Blake-stitched flexible leather soles',
      'Breathable side weaving panels',
      'Unstructured light heel'
    ],
    images: [
      'https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&q=80&w=1200'
    ],
    colors: [
      { name: 'Tan Woven', hex: '#ab7a4e', image: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&q=80&w=1200' }
    ],
    boutiques: ['milan', 'paris']
  },

  // LEATHER BRIEFCASE & ATTACHE
  {
    id: 'executive-briefcase',
    name: 'The Executive Attache Briefcase',
    price: 121500,
    category: 'Briefcases',
    isFeatured: true,
    customizable: true,
    description: 'Handcrafted in Italy using heavy full-grain Tuscan leather and solid brass key lock hardware. Engineered for laptops up to 16".',
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
    price: 132500,
    category: 'Briefcases',
    isFeatured: false,
    customizable: false,
    description: 'Dual compartment portfolio briefcase with trolley strap, interior pen organizers, and padded tablet sleeve.',
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
  {
    id: 'classic-messenger-bag',
    name: 'The Classic Flap Messenger',
    price: 85000,
    category: 'Briefcases',
    isFeatured: false,
    customizable: false,
    description: 'A handsome, soft-structured satchel messenger featuring quick-release brass tuck buckles.',
    details: [
      'Soft-grain distressed calfskin leather',
      'Quick release hidden brass tuck buckles',
      'Wide adjustable military cotton strap',
      'Rear magazine sleeve pocket'
    ],
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=1200'
    ],
    colors: [
      { name: 'Espresso Brown', hex: '#2c1810', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=1200' }
    ],
    boutiques: ['london', 'paris']
  },
  {
    id: 'slim-document-case',
    name: 'The Atelier Slim Portfolio Case',
    price: 72000,
    category: 'Briefcases',
    isFeatured: false,
    customizable: true,
    description: 'A sleek, flat document folio case tailored for the minimalist professional.',
    details: [
      'Smooth Tuscan calf leather structure',
      'Sleek top retractable handles',
      'Polished brass single zip top closure',
      'Microsuede inner lining with phone slots'
    ],
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=1200'
    ],
    colors: [
      { name: 'Onyx Black', hex: '#111111', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=1200' }
    ],
    boutiques: ['milan', 'paris']
  },
  {
    id: 'vanguard-tech-briefcase',
    name: 'The Vanguard Tech Briefcase',
    price: 95000,
    category: 'Briefcases',
    isFeatured: true,
    customizable: true,
    description: 'A modern laptop bag with dynamic front zipper compartments and internal power bank pockets.',
    details: [
      'Full grain cowhide combined with ballistic nylon',
      'Integrated power bank wire passage portal',
      'Suitcase sleeve strap for travel ease',
      'Dual neoprene water bottle sleeves inside'
    ],
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=1200'
    ],
    colors: [
      { name: 'Obsidian Black', hex: '#111111', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=1200' }
    ],
    boutiques: ['london', 'paris', 'milan']
  },
  {
    id: 'heritage-flapover-briefcase',
    name: 'The Heritage Flapover Briefcase',
    price: 110000,
    category: 'Briefcases',
    isFeatured: false,
    customizable: true,
    description: 'A classic English style brief with three bellows compartments and a solid brass combination lock.',
    details: [
      'Vegetable-tanned thick English bridle leather',
      'Solid brass combination clasp front lock',
      'Three interior compartments with divider panels',
      'Reinforced leather top carrying handle'
    ],
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=1200'
    ],
    colors: [
      { name: 'Chestnut Brown', hex: '#583622', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=1200' }
    ],
    boutiques: ['london', 'paris']
  },
  {
    id: 'elite-attache-hardcase',
    name: 'The Elite Attache Hard Case',
    price: 145000,
    category: 'Briefcases',
    isFeatured: false,
    customizable: false,
    description: 'A rigid box-frame business attache case hand-molded over a wooden structure.',
    details: [
      'Stiff molded box leather structure over birchwood frame',
      'Dual solid brass 3-digit combination locks',
      'Glove-leather expandable folders inside lid',
      'Complimentary matching leather desk pad'
    ],
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=1200'
    ],
    colors: [
      { name: 'Saddle Tan', hex: '#8c5e3c', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=1200' }
    ],
    boutiques: ['milan', 'paris']
  },
  {
    id: 'metropolitan-portfolio',
    name: 'The Metropolitan Zipper Portfolio',
    price: 68000,
    category: 'Briefcases',
    isFeatured: false,
    customizable: true,
    description: 'An elegant underarm folio bag featuring an external zipper pocket.',
    details: [
      'Soft Saffiano cross-grain calf leather',
      'Sturdy steel zip around closure',
      'Internal tablet divider and pen sleeves',
      'Hidden slip-in wristlet loop'
    ],
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=1200'
    ],
    colors: [
      { name: 'Obsidian Black', hex: '#111111', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=1200' }
    ],
    boutiques: ['london', 'paris']
  },
  {
    id: 'courier-leather-satchel',
    name: 'The Courier Leather Satchel',
    price: 78000,
    category: 'Briefcases',
    isFeatured: false,
    customizable: false,
    description: 'Inspired by retro mail bags, handcrafted from heavy oiled leather with double buckle closures.',
    details: [
      'Thick, water-repellent oiled pull-up leather',
      'Hand-hammered solid copper rivets at stress points',
      'Double buckle front closures',
      'Comfortable shoulder pad slip-on sleeve'
    ],
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=1200'
    ],
    colors: [
      { name: 'Dark Mahogany', hex: '#3d2314', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=1200' }
    ],
    boutiques: ['paris', 'milan']
  },

  // LEATHER WALLETS
  {
    id: 'sovereign-bifold-wallet',
    name: 'The Sovereign Bifold Wallet',
    price: 26800,
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
    price: 16500,
    category: 'Wallets',
    isFeatured: false,
    customizable: false,
    description: 'Ultra-slim leather card sleeve with five pockets for essential cards.',
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
  {
    id: 'saffiano-zip-wallet',
    name: 'The Saffiano Zip-Around Wallet',
    price: 34000,
    category: 'Wallets',
    isFeatured: false,
    customizable: false,
    description: 'A zip-around wallet in scratch-resistant Saffiano calfskin, with twelve card slots.',
    details: [
      'Scratch-resistant Saffiano cross-grain leather',
      'Around steel zipper with custom leather puller',
      '12 card pockets, 2 bill slots, 1 zippered coin slot',
      'Polished steel metalware detailing'
    ],
    images: [
      'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&q=80&w=1200'
    ],
    colors: [
      { name: 'Matte Onyx', hex: '#111111', image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=1200' }
    ],
    boutiques: ['milan', 'london']
  },
  {
    id: 'artisan-money-clip',
    name: 'The Artisan Leather Money Clip',
    price: 18500,
    category: 'Wallets',
    isFeatured: false,
    customizable: true,
    description: 'A minimal cardholder wallet featuring a spring-tensioned magnetic brass money clip.',
    details: [
      'Vegetable tanned box calf leather',
      'Sturdy magnetic leather money clip back clasp',
      '4 card slots and middle receipts slit',
      'Hand-bevelled painted card entries'
    ],
    images: [
      'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=1200'
    ],
    colors: [
      { name: 'Saddle Tan', hex: '#8c5e3c', image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&q=80&w=1200' }
    ],
    boutiques: ['paris', 'london']
  },
  {
    id: 'classic-trifold-wallet',
    name: 'The Classic Trifold Organizer',
    price: 29000,
    category: 'Wallets',
    isFeatured: false,
    customizable: false,
    description: 'A classic three-fold wallet design providing maximum capacity with 9 card slots.',
    details: [
      'Supple full-grain calfskin leather',
      'Mesh transparent ID card window panel',
      '9 credit card slots + 3 utility pockets',
      'Dual note compartments lined in luxury viscose'
    ],
    images: [
      'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&q=80&w=1200'
    ],
    colors: [
      { name: 'Espresso Brown', hex: '#2c1810', image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=1200' }
    ],
    boutiques: ['paris', 'milan']
  },
  {
    id: 'passport-organizer-wallet',
    name: 'The Heritage Passport Wallet',
    price: 42000,
    category: 'Wallets',
    isFeatured: true,
    customizable: true,
    description: 'An travel folio that holds two passports, boarding passes, and up to eight cards.',
    details: [
      'Genuine full-grain French calfskin',
      'Left side slip sleeve for boarding passes & tickets',
      'Right side dual passport sleeve slots',
      'RFID protective lining mesh'
    ],
    images: [
      'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=1200'
    ],
    colors: [
      { name: 'Dark Mahogany', hex: '#3d2314', image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&q=80&w=1200' }
    ],
    boutiques: ['paris', 'london', 'milan']
  },
  {
    id: 'prestige-pocket-organizer',
    name: 'The Prestige Pocket Organizer',
    price: 22000,
    category: 'Wallets',
    isFeatured: false,
    customizable: false,
    description: 'A compact folding cardholder organizer with external slip pockets.',
    details: [
      'Fine Saffiano textured calf leather',
      '3 interior V-cut card slots + 2 receipts slots',
      '1 external card slot for easy tap checkouts',
      'Wax burnished clean edge coats'
    ],
    images: [
      'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&q=80&w=1200'
    ],
    colors: [
      { name: 'Onyx Black', hex: '#111111', image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=1200' }
    ],
    boutiques: ['milan', 'london']
  },
  {
    id: 'continental-long-wallet',
    name: 'The Continental Long Wallet',
    price: 38000,
    category: 'Wallets',
    isFeatured: false,
    customizable: true,
    description: 'A slim breast pocket wallet designed to store currency flat without folding.',
    details: [
      'Smooth, natural vegetable tanned leather',
      '16 precision slot card panels',
      'Three full-length cash note compartments',
      'Gold hot stamp logo Al Sumora'
    ],
    images: [
      'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=1200'
    ],
    colors: [
      { name: 'Warm Cognac', hex: '#8c5e3c', image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&q=80&w=1200' }
    ],
    boutiques: ['paris', 'london']
  },
  {
    id: 'minimalist-card-sleeve',
    name: 'The Minimalist Card Sleeve',
    price: 14000,
    category: 'Wallets',
    isFeatured: false,
    customizable: false,
    description: 'An compact three-compartment sleeve case cut in rich Epsom leather.',
    details: [
      'Epsom cross-grained French leather',
      '2 card slots + 1 middle pocket for emergency bills',
      'Extremely light under-clothing pocket profile',
      'Hand sewn saddle stitch finishing'
    ],
    images: [
      'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&q=80&w=1200'
    ],
    colors: [
      { name: 'Matte Onyx', hex: '#111111', image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=1200' }
    ],
    boutiques: ['milan', 'paris']
  },

  // LEATHER BAGS
  {
    id: 'voyager-heritage-duffel',
    name: 'The Voyager Heritage Duffel',
    price: 138000,
    category: 'Bags',
    isFeatured: true,
    customizable: true,
    description: 'Generous mahogany leather weekender duffel bag with robust rolled handles, detachable padded shoulder strap.',
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
    price: 107000,
    category: 'Bags',
    isFeatured: false,
    customizable: false,
    description: 'Clean architectural tote bag crafted from rich cognac calfskin leather with reinforced shoulder straps.',
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
  {
    id: 'nomad-leather-backpack',
    name: 'The Nomad Leather Backpack',
    price: 98000,
    category: 'Bags',
    isFeatured: true,
    customizable: true,
    description: 'An architectural backpack with padded shoulder straps and an external notebook sleeve.',
    details: [
      'Full-grain Italian calfskin body',
      'Fully padded laptop sleeve slot for 15" devices',
      'Quick-draw magnetic latch flap system',
      'Secret lumbar mesh travel card security pocket'
    ],
    images: [
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=1200'
    ],
    colors: [
      { name: 'Espresso Brown', hex: '#2c1810', image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=1200' }
    ],
    boutiques: ['london', 'paris', 'milan']
  },
  {
    id: 'artisan-weekender-duffel',
    name: 'The Artisan Weekender Duffel',
    price: 125000,
    category: 'Bags',
    isFeatured: false,
    customizable: false,
    description: 'A travel duffel handcrafted in heavy olive-dyed suede with rich chestnut bridle leather trim.',
    details: [
      'Rich olive Spanish split suede',
      'Thick chestnut bridle leather structural straps',
      'End snap closures to expand capacity',
      'Heavy copper hardware buttons'
    ],
    images: [
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=1200'
    ],
    colors: [
      { name: 'Olive Suede', hex: '#4e5540', image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=1200' }
    ],
    boutiques: ['paris', 'milan']
  },
  {
    id: 'vanguard-sling-bag',
    name: 'The Vanguard Leather Sling Bag',
    price: 45000,
    category: 'Bags',
    isFeatured: false,
    customizable: true,
    description: 'A compact crossbody body bag worn over the shoulder or chest.',
    details: [
      'Fine tumbled cowhide leather',
      'Adjustable seatbelt-weave strap with metal push buckles',
      'Two front zip slots + back phone pocket',
      'Water resistant internal pack lining'
    ],
    images: [
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=1200'
    ],
    colors: [
      { name: 'Obsidian Black', hex: '#111111', image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=1200' }
    ],
    boutiques: ['paris', 'london']
  },
  {
    id: 'classic-bucket-bag',
    name: 'The Classic Drawstring Bucket Bag',
    price: 68000,
    category: 'Bags',
    isFeatured: false,
    customizable: false,
    description: 'A simple bucket bag with a cinch drawstring closure and long adjustable shoulder strap.',
    details: [
      'Full-grain glove tanned leather body',
      'Cinch leather cord drawstring top with slider lock',
      'Reinforced oval flat bottom panel',
      'Inner zippered safety pouch key ring'
    ],
    images: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=1200'
    ],
    colors: [
      { name: 'Warm Cognac', hex: '#8c5e3c', image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=1200' }
    ],
    boutiques: ['milan', 'london']
  },
  {
    id: 'metropolitan-tote',
    name: 'The Metropolitan Business Tote',
    price: 82000,
    category: 'Bags',
    isFeatured: false,
    customizable: true,
    description: 'A tall unisex tote bag engineered with structured sides for executive use.',
    details: [
      'Heavy structural veg-tanned hide',
      'Tall profile fitting laptops vertically',
      'Padded iPad storage slip pocket',
      'Adjustable drop length handles'
    ],
    images: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=1200'
    ],
    colors: [
      { name: 'Onyx Black', hex: '#111111', image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=1200' }
    ],
    boutiques: ['london', 'paris']
  },
  {
    id: 'roll-top-backpack',
    name: 'The Heritage Roll-Top Backpack',
    price: 105000,
    category: 'Bags',
    isFeatured: true,
    customizable: true,
    description: 'An expandable roll-top rucksack built from rugged waxed canvas and leather details.',
    details: [
      'Water resistant heavy military waxed canvas',
      'Thick oil-tanned harness leather top flaps and straps',
      'Roll top throat with adjustable solid brass G-hook clasp',
      'Quick side-access laptop zip slot'
    ],
    images: [
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=1200'
    ],
    colors: [
      { name: 'Forest Olive', hex: '#3e493a', image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=1200' }
    ],
    boutiques: ['london', 'paris']
  },
  {
    id: 'carry-on-suitcase',
    name: 'The Elite Carry-On Suitcase',
    price: 220000,
    category: 'Bags',
    isFeatured: true,
    customizable: false,
    description: 'A hard cabin-sized suitcase crafted with hand-fitted leather corners and aluminum framing.',
    details: [
      'Cabin size dimensions approved by international carriers',
      'Lightweight aluminum framing structure wrapped in box leather',
      'Multi-stage retractable pull handle & 360 spinner wheels',
      'Hand-stitched leather corners and handles'
    ],
    images: [
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=1200'
    ],
    colors: [
      { name: 'Saddle Tan', hex: '#8c5e3c', image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=1200' }
    ],
    boutiques: ['paris', 'milan', 'london']
  },
  {
    id: 'horizon-crossbody-bag',
    name: 'The Horizon Crossbody Satchel',
    price: 58000,
    category: 'Bags',
    isFeatured: false,
    customizable: false,
    description: 'A small rectangular everyday shoulder bag for essentials.',
    details: [
      'Soft milled glove calfskin',
      'Hidden magnetic clasp front flap',
      'Adjustable leather shoulder strap with brass studs',
      'Two internal slip partitions'
    ],
    images: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=1200'
    ],
    colors: [
      { name: 'Antique Walnut', hex: '#3d2314', image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=1200' }
    ],
    boutiques: ['milan', 'london']
  },

  // LEATHER ACCESSORIES
  {
    id: 'royal-bridle-belt',
    name: 'The Royal Bridle Leather Belt',
    price: 21800,
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
  },
  {
    id: 'classic-dress-belt',
    name: 'The Classic Dress Belt',
    price: 18500,
    category: 'Accessories',
    isFeatured: false,
    customizable: false,
    description: 'A formal calfskin belt with a sleek polished steel buckle closure.',
    details: [
      'Supple French box calfskin',
      'Feathered and padded edge structure',
      'Polished steel frame buckle',
      'Standard 30mm width'
    ],
    images: [
      'https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&q=80&w=1200'
    ],
    colors: [
      { name: 'Noir Black', hex: '#111111', image: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&q=80&w=1200' }
    ],
    boutiques: ['paris', 'london']
  },
  {
    id: 'artisan-watch-strap',
    name: 'The Artisan Alligator Watch Strap',
    price: 12500,
    category: 'Accessories',
    isFeatured: false,
    customizable: true,
    description: 'Watch bands handcrafted in padded alligator leather with a soft nubuck liner.',
    details: [
      'Genuine alligator flank leather outer face',
      'Hypoallergenic soft nubuck leather under layer lining',
      'Hand-stitched with fine French linen thread',
      'Compatible with traditional spring bars'
    ],
    images: [
      'https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&q=80&w=1200'
    ],
    colors: [
      { name: 'Antique Walnut', hex: '#3d2314', image: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&q=80&w=1200' }
    ],
    boutiques: ['paris', 'milan']
  },
  {
    id: 'heritage-key-organizer',
    name: 'The Heritage Key Organizer',
    price: 8500,
    category: 'Accessories',
    isFeatured: false,
    customizable: true,
    description: 'A key wrap organizer that holds up to seven keys silently, preventing pocket scratches.',
    details: [
      'Full grain vegetable tanned bridle leather strip',
      'Stainless steel key locking post',
      'Holds 2-7 standard keys snugly',
      'Integrated D-ring attachment for car keyfobs'
    ],
    images: [
      'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&q=80&w=1200'
    ],
    colors: [
      { name: 'Saddle Tan', hex: '#8c5e3c', image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&q=80&w=1200' }
    ],
    boutiques: ['paris', 'london']
  },
  {
    id: 'prestige-valet-tray',
    name: 'The Prestige Valet Tray',
    price: 14500,
    category: 'Accessories',
    isFeatured: false,
    customizable: false,
    description: 'A valet organizer tray with solid brass corner snaps.',
    details: [
      'Dual-faced thick bridle leather assembly',
      'Four solid brass corner button snaps',
      'Collapsible flat design for easy travel luggage pack',
      'Embossed Al Sumora insignia inside base'
    ],
    images: [
      'https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&q=80&w=1200'
    ],
    colors: [
      { name: 'Dark Mahogany', hex: '#3d2314', image: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&q=80&w=1200' }
    ],
    boutiques: ['milan', 'london']
  },
  {
    id: 'elite-tech-roll',
    name: 'The Elite Tech Travel Roll',
    price: 24000,
    category: 'Accessories',
    isFeatured: true,
    customizable: true,
    description: 'A tri-folding organizer for chargers, cords, and travel tech accessories.',
    details: [
      'Pliable leather wrap body',
      'Four elastic cable loops + 3 structured pockets',
      'Adjustable wrap strap with brass buckle post closure',
      'Soft protective flap covers inside organizer'
    ],
    images: [
      'https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&q=80&w=1200'
    ],
    colors: [
      { name: 'Warm Cognac', hex: '#8c5e3c', image: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&q=80&w=1200' }
    ],
    boutiques: ['paris', 'london', 'milan']
  },
  {
    id: 'master-glasses-case',
    name: 'The Master Structured Glasses Case',
    price: 16000,
    category: 'Accessories',
    isFeatured: false,
    customizable: false,
    description: 'A rigid glasses case with magnetic fold cover and microfiber lining.',
    details: [
      'Hard shell rigid interior protection paneling',
      'Wrapped in supple calfskin leather outer layer',
      'Plush microfiber interior lining to prevent scratches',
      'Secure magnetic tab closures'
    ],
    images: [
      'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&q=80&w=1200'
    ],
    colors: [
      { name: 'Matte Onyx', hex: '#111111', image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&q=80&w=1200' }
    ],
    boutiques: ['milan', 'paris']
  },
  {
    id: 'saddle-leather-coaster-set',
    name: 'The Saddle Leather Coasters Set',
    price: 12000,
    category: 'Accessories',
    isFeatured: false,
    customizable: false,
    description: 'A set of six circular saddle leather coasters stored in a matching case.',
    details: [
      'Six coasters crafted from 4mm thick saddle hide',
      'Water resistant waxed surface coating finish',
      'Includes matching circular leather holder cup',
      'Hand-stamped perimeter stitching grooves'
    ],
    images: [
      'https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&q=80&w=1200'
    ],
    colors: [
      { name: 'Tuscan Saddle Tan', hex: '#8c5e3c', image: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&q=80&w=1200' }
    ],
    boutiques: ['paris', 'london']
  },
  {
    id: 'artisan-desk-mat',
    name: 'The Artisan Leather Desk Pad',
    price: 38000,
    category: 'Accessories',
    isFeatured: true,
    customizable: true,
    description: 'A large leather desktop writing mat lined with non-slip suede.',
    details: [
      'Dimensions: 80cm x 40cm large writing workspace',
      'Full-grain Italian harness leather face layer',
      'Non-slip genuine suede back lining protection',
      'Hand burnished borders with perimeter stitches'
    ],
    images: [
      'https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&q=80&w=1200'
    ],
    colors: [
      { name: 'Dark Mahogany', hex: '#3d2314', image: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&q=80&w=1200' }
    ],
    boutiques: ['london', 'paris', 'milan']
  },
  {
    id: 'elite-travel-shoe-horn',
    name: 'The Elite Leather Shoe Horn',
    price: 9500,
    category: 'Accessories',
    isFeatured: false,
    customizable: false,
    description: 'A pocket shoe horn wrapped in hand-stitched grain leather.',
    details: [
      'Curved stainless steel inner plate structure',
      'Wrapped in hand-stitched pebble grain calfskin',
      'Perfect pocket-sized length of 12cm',
      'Solid brass grommet with split-ring strap'
    ],
    images: [
      'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&q=80&w=1200'
    ],
    colors: [
      { name: 'Obsidian Black', hex: '#111111', image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&q=80&w=1200' }
    ],
    boutiques: ['milan', 'london']
  },
  {
    id: 'prestige-luggage-tag',
    name: 'The Prestige Luggage Tag',
    price: 7500,
    category: 'Accessories',
    isFeatured: false,
    customizable: true,
    description: 'A travel luggage address tag with privacy flap and brass buckle.',
    details: [
      'French box calf leather casing',
      'Privacy overlay flap shielding personal details',
      'Solid brass buckle strap to attach to luggage handles',
      'Gold hot stamped logo detail'
    ],
    images: [
      'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&q=80&w=1200'
    ],
    colors: [
      { name: 'Warm Cognac', hex: '#8c5e3c', image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&q=80&w=1200' }
    ],
    boutiques: ['paris', 'london']
  },
  {
    id: 'heritage-cufflink-case',
    name: 'The Heritage Cufflink Case',
    price: 26000,
    category: 'Accessories',
    isFeatured: false,
    customizable: false,
    description: 'A cylindrical case designed to hold up to four pairs of cufflinks.',
    details: [
      'Molded circular rigid leather shell case',
      'Secure magnetic lid click lock system',
      'Four internal velvet separated ring loops',
      'Soft nubuck velvet internal lining'
    ],
    images: [
      'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&q=80&w=1200'
    ],
    colors: [
      { name: 'Espresso Brown', hex: '#2c1810', image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&q=80&w=1200' }
    ],
    boutiques: ['paris', 'milan']
  },
  {
    id: 'artisan-cardholder-keychain',
    name: 'The Artisan Cardholder Keychain',
    price: 13500,
    category: 'Accessories',
    isFeatured: false,
    customizable: true,
    description: 'A tiny credit card envelope keychain with a brass carabiner.',
    details: [
      'Grainy calfskin leather card flap pouch',
      'Heavy-duty brass carabiner keyring',
      'Holds 1-3 essential cards securely',
      'Snap button envelope closure'
    ],
    images: [
      'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&q=80&w=1200'
    ],
    colors: [
      { name: 'Chestnut Brown', hex: '#583622', image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&q=80&w=1200' }
    ],
    boutiques: ['london', 'paris']
  },
  {
    id: 'prestige-cigar-case',
    name: 'The Prestige 3-Cigar Case',
    price: 32000,
    category: 'Accessories',
    isFeatured: true,
    customizable: false,
    description: 'A rigid cigar holder crafted in hand-molded bridle leather and cedar lining.',
    details: [
      'Spanish cedar wood internal support cylinder tubes',
      'Rigid telescoping leather sleeve slider shell',
      'Holds up to three Corona-sized cigars',
      'Embossed coat of arms insignia'
    ],
    images: [
      'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&q=80&w=1200'
    ],
    colors: [
      { name: 'Dark Mahogany', hex: '#3d2314', image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&q=80&w=1200' }
    ],
    boutiques: ['london', 'paris', 'milan']
  },
  {
    id: 'elite-flas-flask',
    name: 'The Elite Hip Flask',
    price: 18000,
    category: 'Accessories',
    isFeatured: false,
    customizable: true,
    description: 'A hip flask wrapped in saddle stitched vegetable tanned leather.',
    details: [
      'Premium 18/8 food-grade stainless steel flask structure',
      'Wrapped in saddle-stitched water-resistant harness leather',
      'Captive screw top lid hinge assembly',
      'Capacity: 6 fluid ounces (approx 177ml)'
    ],
    images: [
      'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&q=80&w=1200'
    ],
    colors: [
      { name: 'Saddle Tan', hex: '#8c5e3c', image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&q=80&w=1200' }
    ],
    boutiques: ['paris', 'london']
  },
  {
    id: 'artisan-shoe-care-kit',
    name: 'The Artisan Shoe Care Travel Kit',
    price: 45000,
    category: 'Accessories',
    isFeatured: true,
    customizable: false,
    description: 'A circular travel case containing two brushes, shoe cream, and shoehorn.',
    details: [
      'Rigid circular zippered leather case',
      'Two miniature natural horsehair buffing brushes',
      'Two tins of premium beeswax shoe creams',
      'One soft microfibre shine cloth and miniature brass horn'
    ],
    images: [
      'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&q=80&w=1200'
    ],
    colors: [
      { name: 'Espresso Brown', hex: '#2c1810', image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&q=80&w=1200' }
    ],
    boutiques: ['milan', 'london', 'paris']
  },
  {
    id: 'prestige-notebook-cover',
    name: 'The Prestige Refillable Journal Cover',
    price: 24500,
    category: 'Accessories',
    isFeatured: false,
    customizable: true,
    description: 'An A5 size leather binder journal cover complete with gold-edge notebook.',
    details: [
      'Refillable A5 size double slip folder sleeves',
      'Two integrated card sleeves + 1 pen loop inside',
      'Includes one Al Sumora gold-gilt ruled notebook refill',
      'Secure leather wrap strap cord'
    ],
    images: [
      'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&q=80&w=1200'
    ],
    colors: [
      { name: 'Warm Cognac', hex: '#8c5e3c', image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&q=80&w=1200' }
    ],
    boutiques: ['paris', 'london']
  },
  {
    id: 'elite-desk-organizer',
    name: 'The Elite Leather Pen Pot',
    price: 15000,
    category: 'Accessories',
    isFeatured: false,
    customizable: false,
    description: 'A cylindrical pen holder crafted in hand-molded saddle leather with brass base.',
    details: [
      'Weighted solid brass base plate cup',
      'Wrapped in thick vegetable-tanned bridle leather',
      'Soft velvet floor liner inside to protect writing tips',
      'Embossed logo crest detail'
    ],
    images: [
      'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&q=80&w=1200'
    ],
    colors: [
      { name: 'Noir Black', hex: '#111111', image: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&q=80&w=1200' }
    ],
    boutiques: ['paris', 'milan']
  }
];
