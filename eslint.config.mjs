/* eslint-disable no-restricted-exports */
// @ts-check

import { dirname } from "path";
import { fileURLToPath } from "url";

import { fixupPluginRules } from "@eslint/compat";
import eslint from "@eslint/js";
import importPlugin from "eslint-plugin-import";
import pluginPrettier from "eslint-plugin-prettier";
import { projectStructurePlugin } from "eslint-plugin-project-structure";
import globals from "globals";
import tseslint from "typescript-eslint";

import { folderStructureConfig } from "./folderStructure.mjs";
import { independentModulesConfig } from "./independentModules.mjs";
import { namingRulesConfig } from "./namingRules.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));

// ts-prune-ignore-next
export default tseslint.config(
  /**
   * Global ignores
   */
  {
    ignores: [
      "coverage",
      "dist",
      "jestCache",
      "node_modules",
      ".yarn",
      "./parser.js",
    ],
  },

  /**
   * Global rules
   */
  {
    extends: [
      ...tseslint.configs.recommendedTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
      ...tseslint.configs.strictTypeChecked,
    ],
    files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.mjs", "**/*.jsx"],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.es2021,
        ...globals.jest,
        ...globals.browser,
      },
      parserOptions: {
        projectService: true,
        tsconfigRootDir: __dirname,
      },
    },
    plugins: {
      "project-structure": projectStructurePlugin,
      prettier: pluginPrettier,
      import: fixupPluginRules(importPlugin),
    },
    rules: {
      ...eslint.configs.recommended.rules,

      "no-console": "error",
      "object-shorthand": ["error", "always"],
      "no-extra-boolean-cast": "error",
      "no-duplicate-imports": "error",
      "arrow-body-style": ["error", "as-needed"],
      "no-nested-ternary": "error",
      "default-param-last": "error",
      "max-params": ["error", 2],
      complexity: ["error", 15],
      "no-unused-vars": "off",
      "no-restricted-exports": [
        "error",
        {
          restrictDefaultExports: {
            direct: true,
            named: true,
            defaultFrom: true,
            namedFrom: true,
            namespaceFrom: true,
          },
        },
      ],

      "@typescript-eslint/no-confusing-void-expression": "off",
      "@typescript-eslint/explicit-function-return-type": "error",
      "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          args: "all",
          vars: "all",
          varsIgnorePattern: "^_",
          argsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],

      "project-structure/folder-structure": ["error", folderStructureConfig],
      "project-structure/independent-modules": [
        "error",
        independentModulesConfig,
      ],
      "project-structure/naming-rules": ["error", namingRulesConfig],

      "prettier/prettier": [
        "error",
        {
          endOfLine: "auto",
        },
      ],

      "import/first": "error",
      "import/newline-after-import": "error",
      "import/order": [
        "error",
        {
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
          groups: ["builtin", "external", "internal", "unknown"],
          pathGroupsExcludedImportTypes: ["builtin"],
          pathGroups: [
            {
              pattern: "(parser|consts).ts",
              group: "internal",
              position: "after",
            },
            {
              pattern: "errors/**",
              group: "internal",
              position: "after",
            },
            {
              pattern: "helpers/**",
              group: "internal",
              position: "after",
            },

            {
              pattern: "rules/**",
              group: "internal",
              position: "after",
            },
          ],
        },
      ],
    },
  },
);
