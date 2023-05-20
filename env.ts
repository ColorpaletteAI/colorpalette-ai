import { createEnv } from "@t3-oss/env-nuxt";
import { z } from "zod";

export const env = createEnv({
  server: {
    GOOGLE_CLIENT_ID: z.string().min(1),
    GOOGLE_CLIENT_SECRET: z.string().min(1),
    GITHUB_CLIENT_ID: z.string().min(1),
    GITHUB_CLIENT_SECRET: z.string().min(1),
    AUTH_SECRET: z.string().min(1),
    OPENAI_API_KEY: z.string().min(1),
    STRIPE_SECRET_KEY: z.string().min(1),
    STRIPE_PRICE_PRO_PLAN: z.string().min(1),
    STRIPE_ENDPOINT_SECRET: z.string().min(1),
  },
  client: {
    NUXT_PUBLIC_DOMAIN: z.string().min(1),
  },
});
