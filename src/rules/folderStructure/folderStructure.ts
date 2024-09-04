import { ESLintUtils } from "@typescript-eslint/utils";
import { ESLINT_ERRORS } from "consts";

import { FolderStructureConfig } from "rules/folderStructure/folderStructure.types";
import { handleProgram } from "rules/folderStructure/helpers/handleProgram";

export const folderStructure = ESLintUtils.RuleCreator(
  () =>
    "https://github.com/Igorkowalski94/eslint-plugin-project-structure/wiki/project%E2%80%91structure-%E2%80%8Bfolder%E2%80%91structure#root",
)<[FolderStructureConfig] | [], keyof typeof ESLINT_ERRORS>({
  name: "folder-structure",
  meta: {
    docs: {
      url: "https://github.com/Igorkowalski94/eslint-plugin-project-structure/wiki/project%E2%80%91structure-%E2%80%8Bfolder%E2%80%91structure#root",
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
