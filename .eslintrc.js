module.exports = {
    ignorePatterns: ["dist/**/*", "esbuild.config.js", "parser.js"],
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
    plugins: ["@typescript-eslint", "import", "prettier", "project-structure"],
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:import/typescript",
        "plugin:import/warnings",
        "prettier",
    ],
    settings: {
        "project-structure/folder-structure-config-path":
            "folderStructure.jsonc",
        "project-structure/independent-modules-config-path":
            "independentModules.jsonc",
    },
    rules: {
        "project-structure/independent-modules": "error",
        "project-structure/folder-structure": "error",
        "project-structure/export-rules": [
            2,
            {
                filePattern: "**/*consts.ts",
                allowExportNames: ["/^{SNAKE_CASE}$/"],
            },
            {
                filePattern: "**/*.types.ts",
                allowExportNames: ["/^{PascalCase}$/"],
            },
            {
                filePattern: ["**/errors/*.ts"],
                allowExportNames: [
                    "/^{filename_PascalCase}Props$/",
                    "/^{filename_PascalCase}Return$/",
                    "/^{filename_camelCase}$/",
                    "/^{filename_PascalCase}$/",
                ],
            },
            {
                filePattern: ["**/*.ts", "!index.ts"],
                allowExportNames: [
                    "/^{filename_PascalCase}Props$/",
                    "/^{filename_PascalCase}Return$/",
                    "/^{filename_camelCase}$/",
                ],
            },
        ],
        "prettier/prettier": [
            "error",
            {
                endOfLine: "auto",
            },
        ],
        "no-console": "warn",
        "object-shorthand": ["error", "always"],
        "no-extra-boolean-cast": "error",
        "no-duplicate-imports": "error",
        "arrow-body-style": ["error", "as-needed"],
        "no-nested-ternary": "error",
        "default-param-last": "error",
        "max-params": ["error", 2],
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
