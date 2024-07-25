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
        "^.+\\.[jt]sx?$": "babel-jest",
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
    transformIgnorePatterns: ["/node_modules/(?!strip-json-comments).+\\.js$"],
};

export default jestConfig;
