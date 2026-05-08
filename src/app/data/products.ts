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
    name: 'Mehran',
    subtitle: 'Carved Armchair',
    price: 118000,
    category: 'Chairs',
    description: 'Solid sheesham armchair with hand-carved frame and durable foam seating.',
    details: 'The Mehran Armchair is built from seasoned sheesham wood and assembled with strong traditional joints for long-term daily use. The seat uses high-density foam and easy-care upholstery suitable for family homes.',
    imageUrl: 'https://images.unsplash.com/photo-1777583802329-655a321d952f?w=800&q=80&fit=crop',
    badge: 'New',
  },
  {
    id: 2,
    name: 'Lahore Classic',
    subtitle: 'Three-Seater Wooden Sofa',
    price: 189000,
    category: 'Sofas',
    description: 'Solid wood sofa frame with supportive cushions for formal and family lounges.',
    details: 'The Lahore Classic sofa uses kiln-dried kikar and sheesham members for frame strength, with reinforced arms and back support. Cushions are removable for cleaning, and upholstery options are available for daily household use.',
    imageUrl: 'https://images.unsplash.com/photo-1759722668087-efcc63c91ed2?w=800&q=80&fit=crop',
  },
  {
    id: 3,
    name: 'Punjab Comfort',
    subtitle: 'King Size Bed',
    price: 236000,
    category: 'Beds',
    description: 'Heavy-duty wooden bed with carved headboard and storage-friendly base.',
    details: 'Punjab Comfort is a full wooden bed crafted for Pakistani bedrooms with a strong central support design and thick side rails. The structure is made for long life, and the polished finish protects the grain while keeping the natural wood look.',
    imageUrl: 'https://images.unsplash.com/photo-1649011327045-624a1bd2c3e7?w=800&q=80&fit=crop',
    badge: 'Bestseller',
  },
  {
    id: 4,
    name: 'Family Feast',
    subtitle: 'Six-Seater Dining Table',
    price: 172000,
    category: 'Tables',
    description: 'Rectangular solid wood dining table built for everyday meals and gatherings.',
    details: 'Family Feast is made from thick sheesham planks with cross-braced support under the top. The edge profile is rounded for comfort, and the surface polish is selected for easy cleaning after daily use.',
    imageUrl: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&q=80&fit=crop',
  },
  {
    id: 5,
    name: 'Nawab',
    subtitle: 'Center Table',
    price: 86000,
    category: 'Tables',
    description: 'Compact wooden center table for lounge areas with lower utility shelf.',
    details: 'Nawab Center Table combines practical storage and strong wood construction in one compact form. It is ideal for TV lounges and drawing rooms where durability, simple maintenance, and classic style are all needed.',
    imageUrl: 'https://images.unsplash.com/photo-1771219491795-3b4dafc1cdf3?w=800&q=80&fit=crop',
  },
  {
    id: 6,
    name: 'Heritage',
    subtitle: 'Three-Door Wardrobe',
    price: 214000,
    category: 'Wardrobes',
    description: 'Spacious wooden wardrobe with hanging section, shelves, and drawer storage.',
    details: 'Heritage Wardrobe is designed for high-capacity storage in Pakistani households, with dedicated sections for clothes, bedding, and accessories. Built with solid wood framing and reinforced hinges for frequent daily opening and closing.',
    imageUrl: 'https://images.unsplash.com/photo-1520366791646-c582459250a7?w=800&q=80&fit=crop',
    badge: 'New',
  },
]

export const COLLECTIONS = [
  {
    id: 1,
    title: 'The Living Room',
    subtitle: 'Daily family comfort',
    description: 'Wooden sofa sets, center tables, and side seating designed for Pakistani lounges.',
    imageUrl: 'https://images.unsplash.com/photo-1772797583328-f83bc3f94f80?w=1080&q=80&fit=crop',
    categories: ['Sofas', 'Tables', 'Chairs'],
  },
  {
    id: 2,
    title: 'The Bedroom',
    subtitle: 'Rest and storage',
    description: 'Solid wood beds, wardrobes, and matching units made for everyday use.',
    imageUrl: 'https://images.unsplash.com/photo-1771888703723-01d85da1dae1?w=1080&q=80&fit=crop',
    categories: ['Beds', 'Wardrobes', 'Tables'],
  },
  {
    id: 3,
    title: 'Dining & Hosting',
    subtitle: 'Built for gatherings',
    description: 'Durable dining tables and supportive chairs for daily meals and guests.',
    imageUrl: 'https://images.unsplash.com/photo-1776362355123-ca966d36e29c?w=1080&q=80&fit=crop',
    categories: ['Tables', 'Chairs'],
  },
]
