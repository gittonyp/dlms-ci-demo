import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["src/**/*.test.js"],
    reporters: ["default", "junit"],
    outputFile: {
      junit: "reports/junit.xml"
    },
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "lcov", "cobertura", "json-summary"],
      reportsDirectory: "coverage",
      include: ["src/loginValidation.js", "src/bookValidation.js"]
    }
  }
});
