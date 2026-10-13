// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: true },

  modules: ['@nuxtjs/tailwindcss', 'nuxt-api-party'],

  // Global stylesheet: Tailwind layers + a few shared sticker helpers.
  css: ['~/assets/css/main.css'],

  tailwindcss: {
    // We import Tailwind ourselves inside main.css; disable the module's own
    // injected stylesheet.
    cssPath: false,
    viewer: false,
  },

  runtimeConfig: {
    public: {
      // Absolute site origin used for canonical URLs, Open Graph, sitemap and order links.
      // Override in production via NUXT_PUBLIC_SITE_URL.
      siteUrl: 'https://toptep.vercel.app/',
    },
  },

  // Auto-imported, OpenAPI-typed `$foodStoreApi(path, opts)` / `useFoodStoreApiData()`.
  // Types come from schemas/foodStoreApi.json — refresh it with `pnpm openapi:foodstore`.
  apiParty: {
    endpoints: {
      foodStoreApi: {
        // Build time: FOOD_STORE_API_URL (e.g. http://localhost:4000/api/v1); runtime: NUXT_PUBLIC_API_PARTY_ENDPOINTS_FOOD_STORE_API_URL.
        url: process.env.FOOD_STORE_API_URL || 'https://food-store-be.vercel.app/api/v1',
        schema: './schemas/foodStoreApi.json',
      },
    },
    // Call the API directly (browser and server) instead of through the Nuxt proxy route,
    // so the API still sees the shopper's IP (rate limits) — same as plain $fetch before.
    client: 'always',
    // TanStack Query already caches and hands SSR data to the client.
    experimental: { disableClientPayloadCache: true },
  },

  app: {
    head: {
      htmlAttrs: { lang: 'vi' },
      title: 'TÓP TÉP — Menu đồ ăn vặt',
      titleTemplate: '%s · TÓP TÉP',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#FFF6E6' },
        { name: 'format-detection', content: 'telephone=no' },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700&family=Bricolage+Grotesque:opsz,wght@12..96,800&display=swap',
        },
      ],
    },
  },

  // Component names come purely from the file name so folder nesting stays
  // an organizational concern, not part of the component identity.
  components: [{ path: '~/components', pathPrefix: false }],

  // TanStack Query composables are auto-imported like Nuxt's own.
  imports: {
    presets: [{ from: '@tanstack/vue-query', imports: ['useQuery', 'useMutation', 'useQueryClient'] }],
  },

  // The menu now comes from the API, so the landing page is regenerated in the
  // background (ISR on Vercel) instead of being frozen at build time; the client
  // also refreshes stock/flash prices after load. Order pages are per-customer:
  // rendered client-side only. SEO files stay pre-rendered.
  routeRules: {
    '/': { isr: 60 },
    '/don-hang/**': { ssr: false },
  },
  nitro: {
    prerender: {
      routes: ['/robots.txt', '/sitemap.xml'],
    },
  },

  typescript: {
    strict: true,
    typeCheck: false,
  },
})
