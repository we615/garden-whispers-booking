import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    globals: true,
    setupFiles: ["./test/setup.ts"],
    include: ["test/**/*.{test,spec}.ts"],
    testTimeout: 30000,
    hookTimeout: 60000,
    // A single mongodb-memory-server instance is shared across all test files (see test/setup.ts) —
    // isolate:false keeps them in one worker so the module-level singleton actually persists.
    fileParallelism: false,
    isolate: false,
  },
});
