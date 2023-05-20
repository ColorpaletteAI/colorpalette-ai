export default defineNuxtConfig({
  extends: ["nuxt-seo-kit"],

  css: ["@fortawesome/fontawesome-svg-core/styles.css"],

  modules: [
    "@sidebase/nuxt-auth",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/google-fonts",
  ],

  runtimeConfig: {
    public: {
      siteUrl: "https://colorpalette-ai.com",
      siteName: "ColorpaletteAI",
      siteDescription:
        "Generate stunning color palettes from website descriptions with AI.",
      language: "en",
    },
  },

  build: {
    transpile: ["trpc-nuxt"],
  },

  typescript: {
    shim: false,
  },

  googleFonts: {
    families: {
      Poppins: [400, 500, 600, 700],
    },
  },

  devtools: {
    enabled: true,
  },
});
