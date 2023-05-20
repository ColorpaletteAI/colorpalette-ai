<template>
  <nav class="navbar bg-base-100">
    <div class="navbar-start">
      <NuxtLink
        to="/"
        class="flex gap-2 items-center justify-center outline-none focus:ring-2 focus:ring-black rounded-lg p-1"
      >
        <img src="/logo.svg" class="w-6 h-6" />
        <p class="font-bold hidden sm:block">ColorpaletteAI</p>
      </NuxtLink>
    </div>
  </nav>
</template>

<script setup lang="ts">
const { $client } = useNuxtApp();

const user = useUser();
</script>
