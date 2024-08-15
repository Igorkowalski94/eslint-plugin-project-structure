// @ts-check

import { createNamingRules } from "eslint-plugin-project-structure";

export const namingRulesConfig = createNamingRules([
  {
    filePattern: "**/*consts.ts",
    rules: [
      {
        nameType: "variable",
        allowNames: ["{SNAKE_CASE}"],
      },
    ],
  },
  {
    filePattern: "**/*.types.ts",
    rules: [
      {
        nameType: ["interface", "type", "enum"],
        allowNamesFileRoot: ["{PascalCase}"],
      },
    ],
  },
  {
    filePattern: "**/*.ts",
    rules: [
      {
        nameType: ["arrowFunction", "function"],
        allowNamesFileRoot: ["{filename_camelCase}"],
        allowNames: ["{camelCase}"],
      },
      {
        nameType: ["interface", "type"],
        allowNamesFileRoot: [
          "{filename_PascalCase}Props",
          "{filename_PascalCase}Return",
        ],
      },
      {
        nameType: "variable",
        allowNames: ["{camelCase}"],
      },
    ],
  },
]);
