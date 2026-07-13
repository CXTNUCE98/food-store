// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: true },

  modules: ['@nuxtjs/tailwindcss'],

  // Global stylesheet: theme tokens + Tailwind layers + a few shared helpers.
  css: ['~/assets/css/main.css'],

  tailwindcss: {
    // We import Tailwind ourselves inside main.css so the CSS-variable theme
    // tokens load first; disable the module's own injected stylesheet.
    cssPath: false,
    viewer: false,
  },

  runtimeConfig: {
    public: {
      // Absolute site origin used for canonical URLs, Open Graph and sitemap.
      // Override in production via NUXT_PUBLIC_SITE_URL.
      siteUrl: 'https://toptep.vercel.app/',
    },
  },

  app: {
    head: {
      htmlAttrs: { lang: 'vi' },
      title: 'TÓP TÉP — Menu đồ ăn vặt',
      titleTemplate: '%s · TÓP TÉP',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#f2994a' },
        { name: 'format-detection', content: 'telephone=no' },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400..700;1,400..700&family=Quicksand:wght@500..700&display=swap',
        },
      ],
    },
  },

  // Component names come purely from the file name so folder nesting stays
  // an organizational concern, not part of the component identity.
  components: [{ path: '~/components', pathPrefix: false }],

  // Pre-render the landing page + SEO files to static HTML at build time:
  // fastest possible first byte and fully-formed markup for crawlers.
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/robots.txt', '/sitemap.xml'],
    },
  },

  typescript: {
    strict: true,
    typeCheck: false,
  },
})
