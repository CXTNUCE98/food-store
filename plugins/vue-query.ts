import { QueryClient, VueQueryPlugin, dehydrate, hydrate, type DehydratedState } from '@tanstack/vue-query'

/**
 * TanStack Query for every API call. Queries fetched during SSR/ISR are
 * dehydrated into the Nuxt payload and hydrated on the client, so the first
 * render reuses the server's data instead of fetching it again.
 * Runs before the other plugins (cart.client reads the catalogue query).
 */
export default defineNuxtPlugin({
  name: 'vue-query',
  enforce: 'pre',
  setup(nuxtApp) {
    const state = useState<DehydratedState | null>('vue-query', () => null)
    const queryClient = new QueryClient({
      defaultOptions: { queries: { staleTime: 30_000 } },
    })
    nuxtApp.vueApp.use(VueQueryPlugin, { queryClient })

    if (import.meta.server) {
      nuxtApp.hooks.hook('app:rendered', () => {
        state.value = dehydrate(queryClient)
      })
    }
    if (import.meta.client && state.value) hydrate(queryClient, state.value)

    // Usable where Vue's inject() isn't (plugins, async callbacks).
    return { provide: { queryClient } }
  },
})
