import type { JestConfigWithTsJest } from "ts-jest";

const jestConfig: JestConfigWithTsJest = {
    maxWorkers: "90%",
    testEnvironment: "node",
    transform: {
        "^.+\\.tsx?$": [
            "ts-jest",
            {
                isolatedModules: true,
            },
        ],
    },
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

export default jestConfig;
