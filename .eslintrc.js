module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
        jest: true,
    },
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: 12,
        sourceType: "module",
    },
    plugins: ["@typescript-eslint", "import", "prettier"],
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:import/typescript",
        "plugin:import/warnings",
        "prettier",
    ],
    ignorePatterns: ["dist/**/*"],
    rules: {
        "prettier/prettier": ["error"],
        "no-console": "warn",
        "object-shorthand": ["error", "always"],
        "no-extra-boolean-cast": "error",
        "no-duplicate-imports": "error",
        "arrow-body-style": ["error", "as-needed"],
        "no-nested-ternary": "error",
        "default-param-last": "error",
        "max-params": ["error", 4],
        complexity: ["error", 15],

        "@typescript-eslint/explicit-function-return-type": "error",
        "@typescript-eslint/consistent-type-definitions": [
            "error",
            "interface",
        ],
        "@typescript-eslint/no-unused-vars": [
            "warn",
            {
                args: "all",
                vars: "all",
                varsIgnorePattern: "^_",
                argsIgnorePattern: "^_",
                ignoreRestSiblings: true,
            },
        ],

        "import/first": "error",
        "import/newline-after-import": "error",
        "import/no-default-export": "error",
        "import/no-duplicates": ["error", { "prefer-inline": true }],
        "import/order": [
            "error",
            {
                "newlines-between": "always",
                alphabetize: { order: "asc", caseInsensitive: true },
                groups: [
                    "builtin",
                    "external",
                    "internal",
                    "unknown",
                    ["parent", "sibling", "index"],
                ],
                pathGroupsExcludedImportTypes: ["builtin"],
            },
        ],
    },
    overrides: [
        {
            files: ["jest.config.ts"],
            rules: {
                "import/no-default-export": "off",
            },
        },
    ],
};
