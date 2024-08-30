// @ts-check

import { createNamingRules } from "eslint-plugin-project-structure";

export const namingRulesConfig = createNamingRules([
  { filePattern: "**/(index|parser|tsup.config|jest.config).(ts|js)" },
  {
    filePattern: "**/*consts.ts",
    fileRootRules: {
      allowOnlySpecifiedSelectors: true,
      rules: [
        {
          selector: "variable",
          format: ["{SNAKE_CASE}"],
        },
      ],
    },
  },

  {
    filePattern: "**/*.types.ts",
    fileRootRules: {
      allowOnlySpecifiedSelectors: true,
      rules: [
        {
          selector: ["interface", "type"],
          format: ["{PascalCase}"],
        },
        {
          selector: "enum",
          format: ["{SNAKE_CASE}"],
        },
      ],
    },
  },

  {
    filePattern: ["src/rules/*/*.ts"],
    fileRootRules: {
      allowOnlySpecifiedSelectors: true,
      rules: [
        {
          selector: "variable",
          format: ["{filename_camelCase}"],
        },
      ],
    },
  },

  {
    filePattern: "**/*.ts",
    fileRootRules: {
      allowOnlySpecifiedSelectors: true,
      rules: [
        {
          selector: "class",
          format: ["{filename_PascalCase}"],
        },
        {
          selector: "arrowFunction",
          format: ["{filename_camelCase}"],
        },
        {
          selector: ["interface", "type"],
          format: ["{filename_PascalCase}Props", "{filename_PascalCase}Return"],
        },
      ],
    },
    fileRules: {
      allowOnlySpecifiedSelectors: true,
      rules: [
        {
          selector: "arrowFunction",
          format: ["{camelCase}"],
        },

        {
          selector: ["variable"],
          format: ["{camelCase}"],
        },
      ],
    },
  },
]);
