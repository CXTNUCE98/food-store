/**
 * Design tokens — the single source of truth for the "candy snack shop" look:
 * warm cream paper, chocolate-brown outlines, glossy orange lettering, mango
 * and leaf accents. Tailwind maps its utilities onto these values
 * (tailwind.config.ts) and the order-image canvas renderer reads them
 * directly, so both stay in sync.
 */
export const COLORS = {
  /** Chocolate brown: text, outlines and the 3D drop under stickers. */
  ink: '#4A2511',
  paper: '#FFF5E1',
  cream: '#FFE8BE',
  white: '#FFFFFF',
  'ink-soft': '#6E4428',
  muted: '#8C6748',
  line: '#EED7AE',
  /** Red-orange for small text on paper (tagline, errors) — AA on cream. */
  eyebrow: '#D3330F',

  /** Brand orange and its deep end — the glossy title gradient runs between them. */
  orange: '#FF7A1A',
  'orange-deep': '#E5461A',
  'orange-light': '#FFB443',
  chili: '#E5461A',
  mango: '#FFC63A',
  'mango-soft': '#FFEFC2',
  peach: '#FFD9A6',
  'peach-soft': '#FFE0C2',
  wood: '#E8B26A',
  leaf: '#5EA83A',
  matcha: '#B5DE7A',
  'matcha-soft': '#E9F5D6',
  pink: '#FF9FB0',
} as const

/**
 * Category accents now come from the admin (category.color). These are the
 * fallbacks for the original four categories, plus the combo accent.
 */
export const CATEGORY_COLORS: Record<string, string> = {
  chua: COLORS.mango,
  lac: COLORS.matcha,
  say: COLORS.peach,
  banhtrang: COLORS.pink,
  combo: COLORS['orange-light'],
}

export const FONTS = {
  display: "'Baloo 2', 'Nunito', system-ui, sans-serif",
  body: "'Nunito', system-ui, -apple-system, 'Segoe UI', sans-serif",
} as const
