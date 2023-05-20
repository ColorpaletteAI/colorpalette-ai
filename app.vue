<template>
  <div>
    <SeoKit />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <!-- Google tag (gtag.js) -->
  </div>
</template>

<script setup>
useSeoMeta({
  ogImage: "/logo.svg",
});

useHead({
  script: [
    {
      src: "https://analytics.umami.is/script.js",
      "data-website-id": "01093f26-7ce3-4a66-a2fc-d1b860f9fbbd",
      defer: true,
    },
    {
      src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9604089991570546",
      crossorigin: "anonymous",
    }
  ],
  link: [
    {
      sizes: "180x180",
      href: "/favicon/apple-touch-icon.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      href: "/favicon/favicon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      href: "/favicon/favicon-16x16.png",
    },
    {
      rel: "manifest",
      href: "/favicon/site.webmanifest",
    },
    {
      rel: "mask-icon",
      href: "/favicon/safari-pinned-tab.svg",
      color: "#5bbad5",
    },
    {
      rel: "shortcut icon",
      href: "/favicon/favicon.ico",
    },
    {
      name: "msapplication-TileColor",
      content: "/favicon/browserconfig.xml",
    },
    {
      name: "theme-color",
      content: "#ffffff",
    },
  ],
});

onMounted(() => {
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag("js", new Date());
  gtag("config", "AW-401054931");
});
</script>
