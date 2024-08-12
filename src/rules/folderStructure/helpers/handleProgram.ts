import { TSESTree } from "@typescript-eslint/utils";
import { ReportDescriptor } from "@typescript-eslint/utils/dist/ts-eslint/Rule";

import { finalErrorGuard } from "errors/finalErrorGuard";

import { readConfigFile } from "helpers/readConfigFile";

import {
  Context,
  FolderStructureConfig,
} from "rules/folderStructure/folderStructure.types";
import { validateFolderStructure } from "rules/folderStructure/helpers/validateFolderStructure/validateFolderStructure";

export interface HandleProgramProps {
  context: Context;
  node: TSESTree.Program;
}

export const handleProgram = ({
  context: { cwd, settings, filename, options, report },
  node,
}: HandleProgramProps): void => {
  const config = readConfigFile<FolderStructureConfig>({
    cwd,
    key: "project-structure/folder-structure-config-path",
    settings,
    options,
  });

  try {
    validateFolderStructure({ filename, cwd, config });
  } catch (error) {
    if (!finalErrorGuard(error)) throw error;

    report({
      node,
      message: error.message,
    } as unknown as ReportDescriptor<"error">);
  }
};
