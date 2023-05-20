export type GeneratePalette = {
  colors: {
    name: string;
    hex: string;
    description: string;
    usages: {
      usage: string;
    }[];
  }[];
};
