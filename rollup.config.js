import json from "@rollup/plugin-json";
import { terser } from "rollup-plugin-terser";
import { babel } from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import nodePolyfills from "rollup-plugin-polyfill-node";
import bundleSize from "rollup-plugin-bundle-size";
import { visualizer } from "rollup-plugin-visualizer";
import replace from "@rollup/plugin-replace";

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
        },
    ],
    plugins: [
        json(),
        replace({
            values: {
                "process.env.NODE_ENV": '"production"',
            },
            preventAssignment: true,
        }),
        nodeResolve({
            extensions: [".js", ".jsx"],
            browser: true,
        }),
        commonjs({
            include: /node_modules/,
        }),
        babel({
            babelHelpers: "bundled",
            include: ["**/*.js", "**/*.jsx"],
            compact: true,
        }),
        nodePolyfills({ sourceMap: true }),
        bundleSize(),
        visualizer(),
    ],
    onwarn(warning, warn) {
        if (warning.code === "THIS_IS_UNDEFINED") return;
        warn(warning);
    },
};
