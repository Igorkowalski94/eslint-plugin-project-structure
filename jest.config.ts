/* eslint-disable no-restricted-exports */
import type { JestConfigWithTsJest } from "ts-jest";

const jestConfig: JestConfigWithTsJest = {
  maxWorkers: "90%",
  testEnvironment: "node",
  transform: {
    "^.+\\.tsx?$": ["ts-jest", {}],
  },
  moduleDirectories: ["node_modules", "src"],
  cacheDirectory: "<rootDir>/jestCache",
  collectCoverage: false,
  collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  coverageReporters: ["text", "lcov"],
  coverageThreshold: {
    global: {
      branches: 100,
    },
  },
};

// ts-prune-ignore-next
export default jestConfig;
