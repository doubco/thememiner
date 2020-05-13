import { World } from "world-i18n";

export const world = new World({
  locale: "en",
  defaultLocale: "en",
  translations: {
    en: {
      hello: "Hello World",
      "hello-description": "Welcome to the ThemeMiner demo for Next.js",
    },
  },
});
