// @ts-check

import { createFileComposition } from "eslint-plugin-project-structure";

export const fileCompositionConfig = createFileComposition({
  filesRules: [
    { filePattern: "**/(index|parser|tsup.config|jest.config).(ts|js)" },
    {
      filePattern: "**/*consts.ts",
      fileRootRules: {
        allowOnlySpecifiedSelectors: true,
        rules: [
          {
            selector: ["variable", "variableExpression"],
            format: "{SNAKE_CASE}",
          },
        ],
      },
    },

    {
      filePattern: "**/*types.ts",
      fileRootRules: {
        allowOnlySpecifiedSelectors: true,
        rules: [
          {
            selector: ["interface", "type"],
            format: "{PascalCase}",
          },
          {
            selector: "enum",
            format: "{SNAKE_CASE}",
          },
        ],
      },
    },

    {
      filePattern: "src/rules/*/*.ts",
      fileRootRules: {
        allowOnlySpecifiedSelectors: true,
        rules: [
          {
            selector: { type: "variableExpression", limitTo: "ESLintUtils" },
            format: "{fileName}",
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
            format: "{FileName}",
          },
          {
            selector: "arrowFunction",
            format: "{fileName}",
          },
          {
            selector: ["interface", "type"],
            format: ["{FileName}Props", "{FileName}Return"],
          },
        ],
      },
      fileRules: {
        allowOnlySpecifiedSelectors: true,
        rules: [
          {
            selector: [
              "arrowFunction",
              "function",
              "variable",
              "variableExpression",
            ],
            format: "{camelCase}",
          },
        ],
      },
    },
  ],
});
