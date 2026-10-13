import type { Category, SiteConfig } from './types'

/** Brand + contact info. Change these in one place to rebrand the whole site. */
export const SITE: SiteConfig = {
  brandLead: 'TÓP',
  brandTail: 'TÉP',
  tagline:
    'Đồ ăn vặt chua ngọt, làm mới mỗi ngày. Chọn món, tạo ảnh đơn, nhắn tin — tụi mình lo phần còn lại.',
  messengerUrl: 'https://www.facebook.com/messages/t/722454310958839',
  instagramUrl: '#',
  openingHours: '9:00 – 21:00',
  deliveryArea: 'nội thành, freeship < 3km',
}

/** Ordered category list driving the filter chips. */
export const CATEGORIES: Category[] = [
  { id: 'chua', label: 'Chua ngọt' },
  { id: 'lac', label: 'Trái cây lắc' },
  { id: 'say', label: 'Sấy khô' },
  { id: 'banhtrang', label: 'Bánh tráng' },
]

/** Cart is persisted in localStorage under this key. */
export const CART_STORAGE_KEY = 'top-tep-cart'

/** Upper bound per item so a stuck "+" can't produce a silly order. */
export const MAX_CART_QTY = 99
