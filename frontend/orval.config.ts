import { defineConfig } from "orval";

export default defineConfig({
  "umbraco-delivery": {
    input: {
      target: "https://localhost:44378/umbraco/swagger/delivery/swagger.json",
    },
    output: {
      mode: "tags-split",
      target: "./lib/umbraco/services",
      schemas: "./lib/umbraco/models",
      client: "fetch",
      override: {
        mutator: {
          path: "./lib/umbraco-fetch.ts",
          name: "umbracoFetch",
        },
      },
    },
  },
});
