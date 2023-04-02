/// <reference types="vitest" />

import { defineConfig } from "vitest/config";
import { resolve } from "node:path";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "~": resolve(__dirname, "src"),
    },
  },
  test: {
    deps: {
      inline: ["minifaker"],
    },
    typecheck: {
      include: ["src/**/*.test.{js,ts,jsx,tsx}"],
    },
  },
});
