import { ReportDescriptor } from "@typescript-eslint/utils/dist/ts-eslint";
import { sep } from "path";

import { fileStructureNode } from "../helpers/fileStructureNode";
import { readConfigFile } from "../helpers/readConfigFile";
import { ESLintUtils } from "@typescript-eslint/utils";

type MessageIds = "error";

export const fileStructure = ESLintUtils.RuleCreator(
  () =>
    "https://github.com/Igorkowalski94/eslint-plugin-project-structure#readme"
)({
  name: "project-structure",
  meta: {
    docs: {
      description: "Force project structure",
      recommended: "error",
      suggestion: true,
    },
    type: "suggestion",
    schema: [],
    messages: {
      error: `error`,
    },
  },
  defaultOptions: [],
  create(context) {
    return {
      Program: function (node) {
        const configPath = `${context.getCwd()}${sep}${
          context.settings["project-structure/config-path"]
        }`;

        const fileAbsolutePath = context.getPhysicalFilename();
        const filePath = fileAbsolutePath.replace(
          `${context.getCwd()}${sep}`,
          `structure${sep}`
        );

        const config = readConfigFile(configPath);

        if (!config) {
          throw new Error(
            `eslint-plugin-project-structure: Invalid configuration file`
          );
        }

        try {
          fileStructureNode(filePath, config);
        } catch (error) {
          context.report({
            node,
            message: error.message,
          } as unknown as ReportDescriptor<MessageIds>);
        }
      },
    };
  },
});
