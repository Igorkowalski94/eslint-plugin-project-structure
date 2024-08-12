import { ESLintUtils } from "@typescript-eslint/utils";

import { FolderStructureConfig } from "rules/folderStructure/folderStructure.types";
import { handleProgram } from "rules/folderStructure/helpers/handleProgram";

export const folderStructure = ESLintUtils.RuleCreator(
  () =>
    "https://github.com/Igorkowalski94/eslint-plugin-project-structure/blob/main/documentation/project-structure-folder-structure.md",
)<[FolderStructureConfig] | [], "error">({
  name: "project-structure-folder-structure",
  meta: {
    docs: {
      url: "https://github.com/Igorkowalski94/eslint-plugin-project-structure/blob/main/documentation/project-structure-folder-structure.md",
      description:
        "Enforce rules on folder structure to keep your repository consistent, orderly and well thought out.",
    },
    type: "problem",
    schema: [{ type: "object", additionalProperties: true }],
    messages: {
      error: "error",
    },
  },
  defaultOptions: [],
  create(context) {
    return {
      Program(node): void {
        handleProgram({ context, node });
      },
    };
  },
});
