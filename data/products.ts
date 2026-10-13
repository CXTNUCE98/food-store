import type { MenuData, Product } from '~/domain/types'
import { CATEGORIES } from '~/domain/constants'

/**
 * Offline fallback catalogue. The live menu comes from the API
 * (composables/useCatalog.ts → GET /catalog/menu); this list is only rendered
 * when the API can't be reached, so the page never ships empty.
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
  },
]

/** Menu shape used when the API is down: no combos, no flash sales, ordering via image only. */
export const FALLBACK_MENU: MenuData = {
  categories: CATEGORIES.map((c) => ({ ...c, count: PRODUCTS.filter((p) => p.category === c.id).length })),
  products: PRODUCTS.map((p) => ({ ...p, inStock: true, available: 99, flashSale: null })),
  combos: [],
  flashSales: { running: [], upcoming: [] },
}
