import { ESLintUtils } from "@typescript-eslint/utils";
import { ESLINT_ERRORS } from "consts";

import { FolderStructureConfig } from "rules/folderStructure/folderStructure.types";
import { handleProgram } from "rules/folderStructure/helpers/handleProgram";

export const folderStructure = ESLintUtils.RuleCreator(
  () =>
    "https://github.com/Igorkowalski94/eslint-plugin-project-structure/blob/main/documentation/project-structure-folder-structure.md#project-structurefolder-structure",
)<[FolderStructureConfig] | [], keyof typeof ESLINT_ERRORS>({
  name: "project-structure-folder-structure",
  meta: {
    docs: {
      url: "https://github.com/Igorkowalski94/eslint-plugin-project-structure/blob/main/documentation/project-structure-folder-structure.md#project-structurefolder-structure",
      description:
        "Enforce rules on folder structure to keep your repository consistent, orderly and well thought out.",
    },
    type: "problem",
    schema: [{ type: "object", additionalProperties: true }],
    messages: ESLINT_ERRORS,
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
