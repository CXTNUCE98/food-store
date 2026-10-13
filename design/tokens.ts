/**
 * Design tokens — the single source of truth for the "Gen Z sticker" look.
 * Tailwind maps its utilities onto these values (tailwind.config.ts) and the
 * order-image canvas renderer reads them directly, so both stay in sync.
 */
export const COLORS = {
  ink: '#17120E',
  paper: '#FFF6E6',
  white: '#FFFFFF',
  'ink-soft': '#3D332B',
  muted: '#5E5247',
  line: '#D9CBB6',
  eyebrow: '#E2361A',

  lime: '#C6F432',
  chili: '#FF4D2E',
  mango: '#FFC83D',
  orange: '#FF9F5A',
  pink: '#FF8FC7',
} as const

/**
 * Category accents now come from the admin (category.color). These are the
 * fallbacks for the original four categories, plus the combo accent.
 */
export const CATEGORY_COLORS: Record<string, string> = {
  chua: COLORS.mango,
  lac: COLORS.lime,
  say: COLORS.orange,
  banhtrang: COLORS.pink,
  combo: COLORS.chili,
}

export const FONTS = {
  display: "'Bricolage Grotesque', 'Be Vietnam Pro', system-ui, sans-serif",
  body: "'Be Vietnam Pro', system-ui, -apple-system, 'Segoe UI', sans-serif",
} as const
