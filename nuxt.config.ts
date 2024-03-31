export default defineNuxtConfig({
  devtools: { enabled: true },
  pages: true,
  modules: ['@nuxtjs/supabase', '@pinia/nuxt', '@pinia-plugin-persistedstate/nuxt',],
  supabase: {
    redirectOptions: {
      login: '/afterLogin',
      callback: '/afterCallback',
      exclude: ['/*'],
      include: undefined,
      cookieRedirect: false,
    },
  },
})
