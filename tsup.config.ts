import { defineConfig } from "tsup";

const isProduction = process.env.NODE_ENV === "production";

export default defineConfig({
  clean: true,
  dts: true,
  entry: {
    app: "src/app/index.ts",
    index: "src/index.ts",
  },
  format: ["cjs", "esm"],
  minify: isProduction,
  sourcemap: isProduction,
});
