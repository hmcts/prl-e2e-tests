import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "node",
  testTimeout: 30000,
  testMatch: ["**/__tests__/**/*.test.ts"],
};

export default config;
