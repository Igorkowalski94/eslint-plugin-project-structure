// @ts-check

import { createNamingRules } from "eslint-plugin-project-structure";

export const namingRulesConfig = createNamingRules([
  {
    filePattern: "**/*consts.ts",
    rules: [
      {
        nameType: "VariableDeclarator",
        allowNames: ["{SNAKE_CASE}"],
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
        allowNamesFileRoot: ["{PascalCase}"],
      },
    ],
  },
  {
    filePattern: "**/*.ts",
    rules: [
      {
        nameType: ["ArrowFunctionExpression", "FunctionDeclaration"],
        allowNamesFileRoot: ["{filename_camelCase}"],
        allowNames: ["{camelCase}"],
      },
      {
        nameType: ["TSInterfaceDeclaration", "TSTypeAliasDeclaration"],
        allowNamesFileRoot: [
          "{filename_PascalCase}Props",
          "{filename_PascalCase}Return",
        ],
      },
      {
        nameType: "VariableDeclarator",
        allowNames: ["{camelCase}"],
      },
    ],
  },
]);
