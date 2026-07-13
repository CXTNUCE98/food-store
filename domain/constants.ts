import type { Category, SiteConfig, ThemeId, ThemeOption } from './types'

/** Brand + contact info. Change these in one place to rebrand the whole site. */
export const SITE: SiteConfig = {
  brandLead: 'TÓP',
  brandTail: 'TÉP',
  tagline:
    'Đồ ăn vặt chua ngọt, làm mới mỗi ngày. Chọn món, chụp màn hình, nhắn tin — tụi mình lo phần còn lại.',
  messengerUrl: 'https://www.facebook.com/messages/t/722454310958839',
  instagramUrl: '#',
}

/** Ordered category list driving the filter chips. */
export const CATEGORIES: Category[] = [
  { id: 'chua', label: 'Chua ngọt' },
  { id: 'lac', label: 'Trái cây lắc' },
  { id: 'say', label: 'Sấy khô' },
  { id: 'banhtrang', label: 'Bánh tráng' },
]

/** Available themes. First entry is the default. */
export const DEFAULT_THEME: ThemeId = 'warm'
export const THEMES: ThemeOption[] = [
  { id: 'warm', label: 'Sáng' },
  { id: 'dark', label: 'Tối' },
]

/** Cookie key used to persist the visitor's theme choice. */
export const THEME_COOKIE = 'top-tep-theme'
