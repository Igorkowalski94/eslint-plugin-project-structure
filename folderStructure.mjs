// @ts-check

import { createFolderStructure } from "eslint-plugin-project-structure";

export const folderStructureConfig = createFolderStructure({
  structure: [
    { name: ".(husky|github)", children: [] },
    { name: "images", children: [{ name: "*.png" }] },
    {
      name: "src",
      children: [
        { ruleId: "rules_folder" },
        { ruleId: "helpers_folder" },
        { ruleId: "errors_folder" },
        { name: "consts.ts" },
        { name: "types.ts" },
        { name: "index.ts" },
        { name: "parser.ts" },
      ],
    },
    {
      name: "types",
      children: [{ name: "*.d.ts" }],
    },
    { name: "*" },
  ],
  rules: {
    additional_files: { name: "{folderName}(.(types|consts|test)).ts" },

    test_file: { name: "{camelCase}.test.ts" },

    helper_folder: {
      name: "{camelCase}",
      children: [
        { ruleId: "helpers_folder" },
        { ruleId: "additional_files" },
        { name: "{folderName}.ts" },
      ],
    },

    helpers_folder: {
      name: "helpers",
      children: [
        { ruleId: "helper_folder" },
        { name: "{camelCase}.test.ts" },
        { name: "{camelCase}.ts" },
      ],
    },

    rule_folder: {
      name: "{camelCase}",
      children: [
        { ruleId: "helpers_folder" },
        { ruleId: "errors_folder" },
        { ruleId: "additional_files" },
        { name: "{folderName}.ts" },
      ],
    },

    rules_folder: {
      name: "rules",
      children: [{ ruleId: "rule_folder" }],
    },

    errors_folder: {
      name: "errors",
      children: [
        { name: "{camelCase}(.test)?.ts" },
        { name: "{PascalCase}(.test)?.ts" },
      ],
    },
  },
});
