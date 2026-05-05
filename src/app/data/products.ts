export interface Product {
  id: number
  name: string
  subtitle: string
  price: number
  category: string
  description: string
  imageUrl: string
  badge?: string
  details?: string
}

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Forma',
    subtitle: 'Lounge Chair',
    price: 2840,
    category: 'Seating',
    description: 'Mid-century silhouette with handstitched boucle and brass hardware.',
    details: 'The Forma Lounge Chair distills decades of craft into a single, resolved form. Its solid walnut frame is mortise-and-tenon jointed by hand, while the cushion is filled with slow-recovered HR foam wrapped in natural down. Five material finishes available — each dyed or treated in-house.',
    imageUrl: 'https://images.unsplash.com/photo-1777583802329-655a321d952f?w=800&q=80&fit=crop',
    badge: 'New',
  },
  {
    id: 2,
    name: 'Strata',
    subtitle: 'Three-Seater Sofa',
    price: 6200,
    category: 'Seating',
    description: 'Deep-seated modular sofa with a tailored charcoal finish.',
    details: 'Strata is built for rooms that demand presence. Three fully independent cushion modules rest on a solid ash plinth — each can be reupholstered independently over the life of the piece. The low, wide silhouette draws from mid-century Italian design without quoting it directly.',
    imageUrl: 'https://images.unsplash.com/photo-1759722668087-efcc63c91ed2?w=800&q=80&fit=crop',
  },
  {
    id: 3,
    name: 'Meridian',
    subtitle: 'Coffee Table',
    price: 1480,
    category: 'Tables',
    description: 'Hand-selected marble slab set on a powder-coated steel frame.',
    details: 'Each Meridian table begins with a single slab of Calacatta Viola marble, hand-selected for its veining pattern at the quarry. The steel frame is powder-coated in a custom warm-black finish and welded, not bolted, for longevity.',
    imageUrl: 'https://images.unsplash.com/photo-1649011327045-624a1bd2c3e7?w=800&q=80&fit=crop',
    badge: 'Bestseller',
  },
  {
    id: 4,
    name: 'Nest',
    subtitle: 'Armchair',
    price: 2180,
    category: 'Seating',
    description: 'Full-grain leather with a cocoon silhouette and solid oak base.',
    details: 'The Nest Armchair wraps around the body using a single sheet of full-grain saddle leather, stitched with waxed linen thread. The base is turned from a single piece of solid European white oak — no veneers, no composites. Develops a rich patina with age.',
    imageUrl: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&q=80&fit=crop',
  },
  {
    id: 5,
    name: 'Aria',
    subtitle: 'Floor Lamp',
    price: 890,
    category: 'Lighting',
    description: 'Architectural stem in blackened steel with ambient linen shade.',
    details: 'Aria\'s stem is hand-forged from solid mild steel, then oil-blackened using a traditional Japanese technique. The shade is made from hand-loomed Belgian linen over a powder-coated steel armature. Fitted with a dimmer and an E27 socket for standard LED bulbs.',
    imageUrl: 'https://images.unsplash.com/photo-1771219491795-3b4dafc1cdf3?w=800&q=80&fit=crop',
  },
  {
    id: 6,
    name: 'Plinth',
    subtitle: 'Side Table',
    price: 740,
    category: 'Tables',
    description: 'Single-block Carrara marble with a hand-honed matte finish.',
    details: 'A single block of Carrara marble, quarried in Massa-Carrara and honed to a matte finish that reveals the stone\'s natural crystalline structure. No legs, no frame — the form is the material. Infinitely repairable: surface scratches can be re-honed on-site.',
    imageUrl: 'https://images.unsplash.com/photo-1520366791646-c582459250a7?w=800&q=80&fit=crop',
    badge: 'New',
  },
]

export const COLLECTIONS = [
  {
    id: 1,
    title: 'The Living Room',
    subtitle: 'Spaces for gathering',
    description: 'Every great living room begins with one considered piece. Build outward from there.',
    imageUrl: 'https://images.unsplash.com/photo-1772797583328-f83bc3f94f80?w=1080&q=80&fit=crop',
    categories: ['Seating', 'Tables', 'Lighting'],
  },
  {
    id: 2,
    title: 'Home Office',
    subtitle: 'Work with intention',
    description: 'Spaces that help you think more clearly and work more deliberately.',
    imageUrl: 'https://images.unsplash.com/photo-1771888703723-01d85da1dae1?w=1080&q=80&fit=crop',
    categories: ['Tables', 'Lighting', 'Seating'],
  },
  {
    id: 3,
    title: 'Open Spaces',
    subtitle: 'Interior meets exterior',
    description: 'Pieces that belong at the threshold — indoors or out, equally at home.',
    imageUrl: 'https://images.unsplash.com/photo-1776362355123-ca966d36e29c?w=1080&q=80&fit=crop',
    categories: ['Seating', 'Tables'],
  },
]
