import type { ThemeId } from '~/domain/types'
import { DEFAULT_THEME, THEME_COOKIE, THEMES } from '~/domain/constants'

/**
 * Theme controller.
 *
 * - Persists the choice in a cookie so it survives reloads and is available
 *   during SSR (no flash of the wrong theme).
 * - Reflects the active theme onto <html data-theme="..."> which is what the
 *   token sets in themes.css key off of.
 *
 * Call once high in the tree (app.vue) to bootstrap, then anywhere to read or
 * toggle — `useState` keeps every caller in sync.
 */
export function useTheme() {
  const cookie = useCookie<ThemeId>(THEME_COOKIE, {
    default: () => DEFAULT_THEME,
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
  })

  const theme = useState<ThemeId>('theme', () => cookie.value ?? DEFAULT_THEME)

  // Apply the attribute on the server (SSR markup) and keep it synced on the
  // client whenever the value changes.
  useHead({
    htmlAttrs: {
      'data-theme': theme,
    },
  })

  function setTheme(next: ThemeId) {
    theme.value = next
    cookie.value = next
  }

  function toggleTheme() {
    setTheme(theme.value === 'warm' ? 'dark' : 'warm')
  }

  const isDark = computed(() => theme.value === 'dark')

  return { theme, themes: THEMES, isDark, setTheme, toggleTheme }
}
