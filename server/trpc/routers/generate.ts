import { publicProcedure, router } from "../trpc";
import { TRPCError } from "@trpc/server";
import { Configuration, OpenAIApi } from "openai";
import { z } from "zod";
import { env } from "~/env";
import { GeneratePalette } from "~/lib/types";

const promptExample: GeneratePalette = {
  colors: [
    {
      name: "color name",
      hex: "the hex code of the color",
      description:
        "The description of the color. Why did you choose it for this website? What does it convey?",
      usages: [
        {
          usage:
            "Where the color can be used: for example buttons, navbar, etc.",
        },
      ],
    },
  ],
};

const prompt = `
You are ColorPaletteAI, an AI expert in generating color palettes for websites based on website descriptions.
As a designer, create color palettes that complement each other and result in visually appealing websites.

IMPORTANT: Respond with a RFC8259 compliant JSON object ONLY. If the website description is unclear or invalid, return an empty JSON response: {}.
Provide an RFC8259 compliant JSON response in this format:

${JSON.stringify(promptExample)}
`;

const generatePaletteInput = z.object({
  description: z
    .string()
    .min(8, "Description must be at least 8 characters long.")
    .max(540, "Description must be at most 540 characters long."),
  colors: z
    .array(z.string().min(3, "Color names must be at least 3 characters long."))
    .min(1, "You must at least add one color.")
    .max(20, "You can only generate up to 20 colors.")
    .default([]),
  palette: z.enum(["MATERIAL", "TAILWIND", "FLAT", "CUSTOM"]).default("CUSTOM"),
});

export const generateRouter = router({
  generatePalette: publicProcedure
    .input(generatePaletteInput)
    .mutation(async ({ input }) => {
      const gptInput = `
      The description of the website is: ${input.description}.

      Please generate at least the following colors:
      ${input.colors.map((color) => `- ${color}`).join("\n")}

      ${
        input.palette === "MATERIAL"
          ? "I want you to generate colors based on the Material Design color palette."
          : ""
      }
      ${
        input.palette === "TAILWIND"
          ? "I want you to generate colors based on the Tailwind CSS color palette."
          : ""
      }
      ${
        input.palette === "FLAT"
          ? "I want you to generate colors based on the Flat UI color palette."
          : ""
      }
    `;

      // Send prompt to OpenAI
      const completion = await openai().createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: prompt },
          { role: "user", content: gptInput },
        ],
      });

      // Check if response
      if (!completion.data.choices[0]?.message?.content) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Please try a different, more precise description.",
        });
      }

      // Strip possible invalid characters
      const text = completion.data.choices[0].message.content;
      let cleanResponse = text.replaceAll("]}.", "]}").replaceAll("```", "");
      cleanResponse = cleanResponse.substring(
        cleanResponse.indexOf("{"),
        cleanResponse.lastIndexOf("}") + 1
      );
      return JSON.parse(cleanResponse) as GeneratePalette;
    }),
});

function openai() {
  const configuration = new Configuration({
    apiKey: env.OPENAI_API_KEY,
  });
  return new OpenAIApi(configuration);
}
