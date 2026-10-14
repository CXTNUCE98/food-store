import type { Config } from 'tailwindcss'
import { COLORS, FONTS } from './design/tokens'

const INK = COLORS.ink

/**
 * Tailwind maps its utility names onto the candy design tokens in
 * design/tokens.ts. The bare `border` utility is the house border (2.5px
 * chocolate), and the `shadow-hard*` scale is the straight-down 3D drop the
 * banner lettering uses — no blur.
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
        card: '28px',
        hero: '36px',
      },
      boxShadow: {
        'hard-sm': `0 3px 0 ${INK}`,
        hard: `0 5px 0 ${INK}`,
        'hard-lg': `0 8px 0 ${INK}`,
        'hard-orange': `0 5px 0 ${COLORS['orange-deep']}`,
        soft: '0 22px 40px -22px rgba(122, 62, 20, 0.55)',
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
        // Doodle stars pulse in place.
        twinkle: {
          '0%, 100%': { transform: 'scale(1) rotate(0deg)', opacity: '1' },
          '50%': { transform: 'scale(0.82) rotate(12deg)', opacity: '0.7' },
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
        twinkle: 'twinkle 3.2s ease-in-out infinite',
        marquee: 'marquee 28s linear infinite',
      },
    },
  },
}
