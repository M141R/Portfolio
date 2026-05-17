import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";
import markdoc from "@astrojs/markdoc";
import keystatic from "@keystatic/astro";

import netlify from "@astrojs/netlify";

export default defineConfig({
  site: "https://itsmihir.me/",
  integrations: [sitemap(), react(), markdoc(), keystatic()],

  redirects: {
    "/sitemap": "/sitemap-index.xml",
  },

  adapter: netlify(),
});