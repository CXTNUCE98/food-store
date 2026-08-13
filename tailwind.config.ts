import type { Config } from 'tailwindcss'

/**
 * Tailwind maps its utility names onto the CSS-variable theme tokens defined
 * in assets/css/themes.css. Because the values are `var(--token)`, every
 * utility (bg-accent, text-fg, border-border…) automatically follows the
 * active [data-theme] — a single set of classes serves both themes.
 */
export default <Partial<Config>>{
  // Map Tailwind's `dark:` variant onto our own theme attribute so utilities
  // can target the dark theme without a separate media query.
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        'bg-2': 'var(--bg-2)',
        surface: 'var(--surface)',
        'surface-2': 'var(--surface-2)',
        fg: 'var(--fg)',
        muted: 'var(--muted)',
        faint: 'var(--faint)',
        border: 'var(--border)',
        accent: 'var(--accent)',
        'accent-hover': 'var(--accent-hover)',
        'accent-ink': 'var(--accent-ink)',
        hot: 'var(--hot)',
        'hot-ink': 'var(--hot-ink)',
        fresh: 'var(--fresh)',
      },
      fontFamily: {
        sans: 'var(--font-sans)',
        display: 'var(--font-display)',
      },
      borderRadius: {
        card: 'var(--radius)',
      },
      boxShadow: {
        soft: 'var(--shadow)',
        'soft-sm': 'var(--shadow-sm)',
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
        // Slow vertical drift for the hero's decorative blobs.
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      animation: {
        pop: 'pop 0.22s ease',
        rise: 'rise 0.7s cubic-bezier(0.22, 1, 0.36, 1) both',
        float: 'float 7s ease-in-out infinite',
      },
    },
  },
}
