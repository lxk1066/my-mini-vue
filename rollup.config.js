import typescript from "@rollup/plugin-typescript";
import sourceMaps from "rollup-plugin-sourcemaps";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

export default {
  input:"./packages/vue/src/index.ts",
  plugins: [
    resolve(),
    commonjs(),
    typescript(),
    sourceMaps(),
  ],
  output: [
    {
      format: "cjs",
      file: "./packages/vue/dist/mini-vue.cjs.js",
      sourcemap: true,
    },
    {
      name: "vue",
      format: "es",
      file: "./packages/vue/dist/mini-vue.esm-bundler.js",
      sourcemap: true,
    },
  ],
  onwarn: (msg, warn) => {
    // 忽略 Circular 的错误
    console.log('warn msg: ', msg, 'warn: ', warn)
  },
};
