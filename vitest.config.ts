import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    typecheck: {
      tsconfig: 'tsconfig.json' // 指定测试用的 tsconfig
    }
  },
  resolve: {
    alias: [],
  },
});
