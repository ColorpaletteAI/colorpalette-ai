<template>
  <div class="flex flex-col min-h-screen">
    <LayoutNavbar />
    <div class="flex-1 my-4 container mx-auto">
      <slot />
    </div>
    <LayoutFooter />
  </div>
</template>
