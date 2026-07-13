import type { CategoryId, Product } from '~/domain/types'

/**
 * Product catalogue (sample data from the original mock-up).
 * This is the single source of truth for the menu — replace with a real API
 * call later by swapping the implementation of `getProducts()` only.
 */
const PRODUCTS: Product[] = [
  {
    id: 'chum-ruot-chanh-muoi',
    name: 'Chùm ruột chanh muối',
    category: 'chua',
    price: 35000,
    unit: 'hũ',
    summary: 'Chùm ruột giòn ngâm chanh muối, chua ngọt đậm đà.',
    description:
      'Chùm ruột giòn ngâm chanh muối, chua ngọt đậm đà — mồi ăn vặt kinh điển.',
    taste: 'Chua ngọt',
    thumbnail_url: 'https://picsum.photos/seed/chum-ruot/800/600',
    video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    images: [
      'https://picsum.photos/seed/chum-ruot-1/800/600',
      'https://picsum.photos/seed/chum-ruot-2/800/600',
      'https://picsum.photos/seed/chum-ruot-3/800/600',
    ],
    featured: true,
  },
  {
    id: 'xoai-lac-muoi-ot',
    name: 'Xoài lắc muối ớt',
    category: 'lac',
    price: 40000,
    unit: 'phần',
    summary: 'Xoài xanh giòn lắc muối ớt cay the.',
    description: 'Xoài xanh giòn, lắc đều muối ớt cay the — chua giòn kích thích.',
    taste: 'Cay · Chua',
    thumbnail_url: 'https://picsum.photos/seed/xoai-lac/800/600',
    images: [
      'https://picsum.photos/seed/xoai-lac-1/800/600',
      'https://picsum.photos/seed/xoai-lac-2/800/600',
    ],
  },
  {
    id: 'coc-non-lac',
    name: 'Cóc non lắc',
    category: 'lac',
    price: 35000,
    unit: 'phần',
    summary: 'Cóc non giòn rụm lắc muối tôm.',
    description: 'Cóc non giòn rụm lắc muối tôm, chấm chút chua cay là ghiền.',
    taste: 'Giòn · Chua cay',
    thumbnail_url: 'https://picsum.photos/seed/coc-non/800/600',
    images: ['https://picsum.photos/seed/coc-non-1/800/600'],
  },
  {
    id: 'me-ngao-duong',
    name: 'Me ngào đường',
    category: 'chua',
    price: 30000,
    unit: 'hũ',
    summary: 'Me chín dẻo ngào đường, chua ngọt sánh mịn.',
    description: 'Me chín dẻo ngào đường thắng, chua ngọt sánh mịn, cay nhẹ.',
    taste: 'Chua ngọt',
    thumbnail_url: 'https://picsum.photos/seed/me-ngao/800/600',
    images: ['https://picsum.photos/seed/me-ngao-1/800/600'],
  },
  {
    id: 'tac-xi-muoi',
    name: 'Tắc xí muội',
    category: 'chua',
    price: 30000,
    unit: 'hũ',
    summary: 'Tắc ngâm xí muội, chua mặn ngọt hài hoà.',
    description: 'Tắc ngâm xí muội, vị chua mặn ngọt hài hoà, thơm the.',
    taste: 'Chua mặn',
    thumbnail_url: 'https://picsum.photos/seed/tac-xi-muoi/800/600',
    images: ['https://picsum.photos/seed/tac-xi-muoi-1/800/600'],
  },
  {
    id: 'oi-lac-muoi-ot',
    name: 'Ổi lắc muối ớt',
    category: 'lac',
    price: 35000,
    unit: 'phần',
    summary: 'Ổi giòn lắc muối ớt Tây Ninh.',
    description: 'Ổi giòn lắc muối ớt Tây Ninh, cay mặn đậm đà.',
    taste: 'Giòn · Cay mặn',
    thumbnail_url: 'https://picsum.photos/seed/oi-lac/800/600',
    images: ['https://picsum.photos/seed/oi-lac-1/800/600'],
  },
  {
    id: 'kho-ga-la-chanh',
    name: 'Khô gà lá chanh',
    category: 'say',
    price: 55000,
    unit: 'hộp',
    summary: 'Khô gà xé sợi rim sả ớt, rắc lá chanh.',
    description: 'Khô gà xé sợi rim sả ớt, rắc lá chanh thơm — cay ngọt hết ý.',
    taste: 'Cay ngọt',
    thumbnail_url: 'https://picsum.photos/seed/kho-ga/800/600',
    images: [
      'https://picsum.photos/seed/kho-ga-1/800/600',
      'https://picsum.photos/seed/kho-ga-2/800/600',
    ],
  },
  {
    id: 'xoai-say-deo',
    name: 'Xoài sấy dẻo',
    category: 'say',
    price: 45000,
    unit: 'gói',
    summary: 'Xoài sấy dẻo tự nhiên, ngọt thanh.',
    description: 'Xoài sấy dẻo tự nhiên, ngọt thanh, không phẩm màu.',
    taste: 'Ngọt dịu',
    thumbnail_url: 'https://picsum.photos/seed/xoai-say/800/600',
    images: ['https://picsum.photos/seed/xoai-say-1/800/600'],
  },
  {
    id: 'banh-trang-tron',
    name: 'Bánh tráng trộn',
    category: 'banhtrang',
    price: 25000,
    unit: 'bịch',
    summary: 'Khô bò, xoài, rau răm, trứng cút — đủ topping.',
    description: 'Bánh tráng trộn khô bò, xoài, rau răm, trứng cút — topping đầy đủ.',
    taste: 'Mặn · Chua cay',
    thumbnail_url: 'https://picsum.photos/seed/btt/800/600',
    images: [
      'https://picsum.photos/seed/btt-1/800/600',
      'https://picsum.photos/seed/btt-2/800/600',
    ],
  },
  {
    id: 'banh-trang-muoi-tom-cuon',
    name: 'Bánh tráng muối tôm cuốn',
    category: 'banhtrang',
    price: 20000,
    unit: 'cuốn',
    summary: 'Cuốn muối tôm, khô bò, mỡ hành, sốt me.',
    description: 'Bánh tráng cuốn muối tôm, khô bò, mỡ hành, sốt me chua ngọt.',
    taste: 'Mặn ngọt',
    thumbnail_url: 'https://picsum.photos/seed/btm-cuon/800/600',
    images: ['https://picsum.photos/seed/btm-cuon-1/800/600'],
  },
]

/** Returns the full catalogue. Swap this body for a real fetch when ready. */
export function getProducts(): Product[] {
  return PRODUCTS
}

/** Returns the featured (best-seller) product, if any. */
export function getFeaturedProduct(): Product | undefined {
  return PRODUCTS.find((p) => p.featured)
}

/** Groups products by category id — handy for category-first layouts. */
export function getProductsByCategory(category: CategoryId): Product[] {
  return PRODUCTS.filter((p) => p.category === category)
}
