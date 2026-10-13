import type { Category, SiteConfig } from './types'

/**
 * Brand + contact info. The live values come from the admin (GET /settings/public);
 * these are the fallback when the API can't be reached.
 */
export const SITE: SiteConfig = {
  brandLead: 'TÓP',
  brandTail: 'TÉP',
  tagline:
    'Đồ ăn vặt chua ngọt, làm mới mỗi ngày. Chọn món, đặt trên web hoặc gửi ảnh đơn — tụi mình lo phần còn lại.',
  messengerUrl: 'https://www.facebook.com/messages/t/722454310958839',
  instagramUrl: '#',
  openingHours: '9:00 – 21:00',
  deliveryArea: 'nội thành',
  shippingNote: 'Phí ship khách thanh toán trực tiếp cho shipper.',
}

/** Fallback category list (the live one comes from the API with its colours). */
export const CATEGORIES: Category[] = [
  { id: 'chua', label: 'Chua ngọt', color: '#FFC83D' },
  { id: 'lac', label: 'Trái cây lắc', color: '#C6F432' },
  { id: 'say', label: 'Sấy khô', color: '#FF9F5A' },
  { id: 'banhtrang', label: 'Bánh tráng', color: '#FF8FC7' },
]

/** Cart is persisted in localStorage under this key. */
export const CART_STORAGE_KEY = 'top-tep-cart'

/** Orders placed from this browser (code + tracking token), newest first. */
export const ORDERS_STORAGE_KEY = 'top-tep-orders'

/** Upper bound per item so a stuck "+" can't produce a silly order. */
export const MAX_CART_QTY = 99
