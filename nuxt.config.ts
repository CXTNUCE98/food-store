// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: true },

  // Global stylesheet: base reset + theme tokens
  css: ['~/assets/css/main.css'],

  app: {
    head: {
      htmlAttrs: { lang: 'vi' },
      title: 'TÓP TÉP — Menu đồ ăn vặt',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'TÓP TÉP — đồ ăn vặt chua ngọt. Chọn món, chụp màn hình, nhắn tin là chốt đơn.',
        },
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

  typescript: {
    strict: true,
    typeCheck: false,
  },
})
