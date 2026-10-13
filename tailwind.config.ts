import type { Config } from 'tailwindcss'
import { COLORS, FONTS } from './design/tokens'

const INK = COLORS.ink

/**
 * Tailwind maps its utility names onto the sticker design tokens in
 * design/tokens.ts. The bare `border` utility is the house border (2.5px ink),
 * and the `shadow-hard*` scale is the hard, blur-free offset shadow.
 */
export default <Partial<Config>>{
  theme: {
    extend: {
      colors: COLORS,
      fontFamily: {
        sans: FONTS.body,
        display: FONTS.display,
      },
      borderWidth: {
        DEFAULT: '2.5px',
      },
      borderColor: {
        DEFAULT: INK,
      },
      borderRadius: {
        card: '24px',
        hero: '28px',
      },
      boxShadow: {
        'hard-sm': `2px 2px 0 ${INK}`,
        hard: `5px 5px 0 ${INK}`,
        'hard-lg': `8px 8px 0 ${INK}`,
        'hard-chili': `4px 4px 0 ${COLORS.chili}`,
      },
      maxWidth: {
        wrap: '1200px',
      },
      keyframes: {
        pop: {
          from: { transform: 'scale(0.96)', opacity: '0' },
          to: { transform: 'scale(1)', opacity: '1' },
        },
        // Above-the-fold entrance: fade + slide up, staggered via delays.
        rise: {
          from: { opacity: '0', transform: 'translateY(26px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        // Gentle bob for the hero stickers; keeps each sticker's own tilt (--r).
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(var(--r, 0deg))' },
          '50%': { transform: 'translateY(-10px) rotate(var(--r, 0deg))' },
        },
        // The taste strip scrolls one copy of its content, then loops.
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        pop: 'pop 0.22s ease',
        rise: 'rise 0.7s cubic-bezier(0.22, 1, 0.36, 1) both',
        float: 'float 5s ease-in-out infinite',
        marquee: 'marquee 28s linear infinite',
      },
    },
  },
}
