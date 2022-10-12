import json from "@rollup/plugin-json";
import pkg from "./package.json";
import { terser } from "rollup-plugin-terser";

export default {
  input: "src/index.js",
  output: [
    {
      file: `dist/${pkg.version}/heex.js`,
      format: "umd",
      name: "Heex",
      sourcemap: true,
    },
    {
      file: `dist/${pkg.version}/heex.min.js`,
      format: "umd",
      plugins: [terser()],
      name: "Heex",
      sourcemap: true,
    },
    {
      file: "dist/heex@latest.js",
      format: "umd",
      name: "Heex",
      sourcemap: true,
    },
    {
      file: "dist/heex@latest.min.js",
      format: "umd",
      plugins: [terser()],
      name: "Heex",
      sourcemap: true,
    },
  ],
  plugins: [json()],
};
