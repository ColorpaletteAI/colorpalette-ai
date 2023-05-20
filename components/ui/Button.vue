<template>
  <button :class="button({ size, variant, width })" :disabled="disabled">
    <slot />
  </button>
</template>

<script setup lang="ts">
import { cva, type VariantProps } from "class-variance-authority";

const button = cva(
  "w-fit text-center items-center rounded-lg transition ease-out whitespace-nowrap duration-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-foreground/60 flex gap-1 justify-center",
  {
    variants: {
      variant: {
        default: "bg-primary text-white hover:bg-primary/95",
        neutral: "bg-black text-white hover:bg-black/80 focus:ring-black",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border-black border-2 text-black hover:bg-black hover:text-white focus:ring-black",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-black/10",
        link: "underline-offset-4 hover:underline text-primary",
      },
      size: {
        xs: "text-sm px-2 py-0.5 font-medium",
        sm: "px-3 py-1.5 font-medium",
        default: "px-4 py-2 font-medium",
        md: "px-5 py-2.5 font-semibold",
        lg: "px-6 py-3.5 font-semibold",
        xl: "px-7 py-4 font-semibold",
      },
      width: {
        default: "w-fit",
        full: "w-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      width: "default",
    },
  }
);

type ButtonProps = Required<VariantProps<typeof button>>;
defineProps<{
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
  width?: ButtonProps["width"];
  disabled?: boolean;
}>();
</script>
