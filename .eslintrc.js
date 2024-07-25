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
            "folderStructure.json",
        "project-structure/independent-modules-config-path":
            "independentModules.json",
    },
    rules: {
        "project-structure/independent-modules": "error",
        "project-structure/folder-structure": "error",
        "project-structure/naming-rules": [
            2,
            {
                filePattern: "**/*consts.ts",
                rules: [
                    {
                        nameType: "VariableDeclarator",
                        allowNames: ["/^{SNAKE_CASE}$/"],
                    },
                ],
            },
            {
                filePattern: "**/*.types.ts",
                rules: [
                    {
                        nameType: [
                            "TSInterfaceDeclaration",
                            "TSTypeAliasDeclaration",
                            "TSEnumDeclaration",
                        ],
                        allowNamesFileRoot: ["/^{PascalCase}$/"],
                    },
                ],
            },
            {
                filePattern: "**/*.ts",
                rules: [
                    {
                        nameType: [
                            "ArrowFunctionExpression",
                            "FunctionDeclaration",
                        ],
                        allowNamesFileRoot: ["/^{filename_camelCase}$/"],
                        allowNames: ["/^{camelCase}$/"],
                    },
                    {
                        nameType: [
                            "TSInterfaceDeclaration",
                            "TSTypeAliasDeclaration",
                        ],
                        allowNamesFileRoot: [
                            "/^{filename_PascalCase}Props$/",
                            "/^{filename_PascalCase}Return$/",
                        ],
                    },
                    {
                        nameType: "VariableDeclarator",
                        allowNames: ["/^{camelCase}$/"],
                    },
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
