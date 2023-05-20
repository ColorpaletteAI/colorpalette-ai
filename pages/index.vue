<template>
  <div class="flex flex-col gap-8">
    <section class="mt">
      <h1
        class="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-4xl max-w-xl"
      >
        Generate beautiful color palettes with
        <span
          class="bg-gradient-to-r from-[#AD31F2] via-[#B22781] to-[#F49E07] bg-clip-text text-transparent"
        >
          ColorPaletteAI.
        </span>
      </h1>
    </section>
    <section class="flex flex-col gap-2">
      <div>
        <p class="font-semibold">Describe your website:</p>
        <textarea
          class="mt-1 border border-black/40 w-full rounded-lg outline-none p-2 md:w-2/3"
          placeholder="A website that generates color palettes with AI based on a website description, modern colors, target audience is designers and developers."
          rows="3"
          @change="(ev) => description = (ev.target as HTMLTextAreaElement).value"
        ></textarea>
      </div>
      <div>
        <button
          class="flex items-center gap-2"
          @click="advancedOptionsOpen = !advancedOptionsOpen"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            :class="`w-5 h-5 transition ease-in-out duration-100 ${
              advancedOptionsOpen ? 'transform rotate-90' : ''
            }`"
            viewBox="0 0 512 512"
          >
            <path
              d="M0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM241 377c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l87-87-87-87c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L345 239c9.4 9.4 9.4 24.6 0 33.9L241 377z"
            />
          </svg>
          <p class="font-semibold">Advanced options</p>
        </button>
        <div
          v-if="advancedOptionsOpen"
          class="mt-4 flex flex-col md:flex-row gap-8"
        >
          <div class="w-full md:w-1/2">
            <p class="font-semibold">Choose colors to generate:</p>
            <div class="mt-1 flex flex-col gap-2 md:w-fit">
              <button
                v-for="color in colors"
                :key="color"
                class="border px-2 py-1 rounded-lg flex gap-2 items-center"
                @click="toggleColor(color)"
              >
                <fa
                  v-if="checkColor(color)"
                  icon="fa-regular fa-square-check"
                ></fa>
                <fa v-else icon="fa-regular fa-square"></fa>
                <p>{{ color }}</p>
              </button>
              <div class="flex gap-2">
                <input
                  type="text"
                  class="border rounded-lg px-2 py-1 w-full"
                  placeholder="Color"
                  @change="(ev) => colorInput = (ev.target as HTMLInputElement).value"
                />
                <UiButton
                  variant="neutral"
                  size="sm"
                  @click="handleAddColor"
                  >Add</UiButton
                >
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-4 flex flex-col gap-2">
        <UiButton
          variant="neutral"
          @click="handleGenerate()"
          data-umami-event="Generate Button Click"
        >
          <fa
            v-if="isGenerating"
            icon="fa-solid fa-spinner"
            class="mr-2 animate-spin cursor-not-allowed"
          />
          {{ isGenerating ? "Generating..." : "Generate" }}
        </UiButton>
        <p v-if="error && error.length > 0" class="font-semibold text-red-500">{{ error }}</p>
      </div>
    </section>
    <section v-if="palette" class="flex flex-col gap-6">
      <div v-for="color in palette.colors" class="flex gap-3">
        <div
          class="w-[100px] min-w-[100px] max-w-[100px] rounded-lg border"
          :style="{ backgroundColor: color.hex }"
        ></div>
        <div class="flex flex-col">
          <div class="flex items-center gap-2">
            <p class="text-center font-bold">{{ color.name }}</p>
            <p class="mt-1 font-bold">({{ color.hex }})</p>
          </div>
          <div class="flex flex-col gap-2">
            <div>
              <p class="font-semibold">Explanation:</p>
              <p>{{ color.description }}</p>
            </div>
            <div>
              <p class="font-semibold">Usages:</p>
              <p v-for="usage in color.usages">- {{ usage.usage }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { DEFAULT_COLORS } from "@/lib/utils";
import { TRPCClientError } from "@trpc/client";
import { GeneratePalette } from "~/lib/types";
const { $client } = useNuxtApp();
const advancedOptionsOpen = useState("advanced_options_open", () => false);
const description = useState("description", () => "");
const colors = useState("colors", () => [...DEFAULT_COLORS]);
const selectedColors = useState("selected_colors", () => DEFAULT_COLORS);
const colorInput = useState("color_input", () => "");
const isGenerating = useState("is_generating", () => false);
const error = useState("error", () => "");
const palette = useState<GeneratePalette | null>("palette", () => null);

const handleGenerate = async () => {
  if (isGenerating.value) {
    return;
  }
  isGenerating.value = true;
  try {
    palette.value = await $client.generate.generatePalette.mutate({
      description: description.value,
      colors: selectedColors.value,
    });
  } catch (err) {
    console.error(err);
   if (err instanceof TRPCClientError) {
      const errors = JSON.parse(err.message);
      error.value = errors[0].message;
   }
  } finally {
    isGenerating.value = false;
  }
};

const handleAddColor = () => {
  if (colorInput.value) {
    colors.value = [...colors.value, colorInput.value];
    colorInput.value = "";
  }
};

const toggleColor = (color: string) => {
  if (selectedColors.value.includes(color)) {
    selectedColors.value = selectedColors.value.filter((c) => c !== color);
  } else {
    selectedColors.value = [...selectedColors.value, color];
  }
};

const checkColor = (color: string) => {
  return selectedColors.value.includes(color);
};
</script>
