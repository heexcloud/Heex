import json from "@rollup/plugin-json";
import { terser } from "rollup-plugin-terser";
import { babel } from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import nodePolyfills from "rollup-plugin-polyfill-node";
import scss from "rollup-plugin-scss";
import bundleSize from "rollup-plugin-bundle-size";
import { visualizer } from "rollup-plugin-visualizer";

export default {
  input: "src/index.js",
  output: [
    {
      file: "dist/heex.js",
      format: "umd",
      name: "Heex",
      sourcemap: true,
    },
    {
      file: "dist/heex.min.js",
      format: "umd",
      plugins: [terser()],
      name: "Heex",
      sourcemap: true,
    },
  ],
  plugins: [
    json(),
    scss({
      sourceMap: true,
      outputStyle: "compressed",
    }),
    nodeResolve({
      extensions: [".js", ".jsx"],
      browser: true,
    }),
    babel({ babelHelpers: "bundled", include: ["**/*.js", "**/*.jsx"] }),
    commonjs(),
    nodePolyfills({ sourceMap: true }),
    bundleSize(),
    visualizer(),
  ],
};
