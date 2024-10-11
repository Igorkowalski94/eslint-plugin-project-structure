// @ts-check

import { createFileComposition } from "eslint-plugin-project-structure";

export const fileCompositionConfig = createFileComposition({
  filesRules: [
    { filePattern: "**/(index|parser|tsup.config|jest.config).(ts|js)" },

    {
      filePattern: "**/*consts.ts",
      allowOnlySpecifiedSelectors: true,
      rules: [
        {
          selector: ["variable", "variableExpression"],
          format: "{SNAKE_CASE}",
        },
      ],
    },

    {
      filePattern: "**/*types.ts",
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

    {
      filePattern: "src/rules/*/*.ts",
      allowOnlySpecifiedSelectors: {
        nestedSelectors: false,
      },
      rules: [
        {
          selector: { type: "variableExpression", limitTo: "ESLintUtils" },
          scope: "fileExport",
          format: "{fileName}",
        },
      ],
    },

    {
      filePattern: "**/*.ts",
      allowOnlySpecifiedSelectors: true,
      rootSelectorsLimits: [{ selector: ["arrowFunction", "class"], limit: 1 }],
      rules: [
        {
          selector: ["interface", "type"],
          positionIndex: 0,
          scope: ["fileExport", "fileRoot"],
          format: "{FileName}Props",
        },
        {
          selector: ["interface", "type"],
          positionIndex: 1,
          scope: ["fileExport", "fileRoot"],
          format: "{FileName}Return",
        },
        {
          selector: "class",
          positionIndex: 2,
          scope: "fileExport",
          format: "{FileName}",
        },
        {
          selector: "arrowFunction",
          positionIndex: 2,
          scope: "fileExport",
          format: "{fileName}",
        },
        {
          selector: [
            "arrowFunction",
            "function",
            "variable",
            "variableExpression",
          ],
          scope: "nestedSelectors",
          format: "{camelCase}",
        },
      ],
    },
  ],
});
