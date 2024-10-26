import path from "path";

import { TSESTree } from "@typescript-eslint/utils";
import { PROJECT_STRUCTURE_CACHE_FILE_NAME } from "consts";

import { finalErrorGuard } from "errors/finalErrorGuard";

import { cleanUpErrorFromCache } from "helpers/cleanUpErrorFromCache";
import { isErrorInCache } from "helpers/isErrorInCache";
import { readConfigFile } from "helpers/readConfigFile/readConfigFile";

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
    options: options[0],
  });
  const structureRoot = path.resolve(cwd, config.structureRoot ?? ".");
  const projectRoot = path.resolve(cwd, config.projectRoot ?? ".");

  if (
    !filename.includes(structureRoot) ||
    filename.includes(PROJECT_STRUCTURE_CACHE_FILE_NAME)
  )
    return;

  try {
    validateFolderStructure({ filename, cwd: structureRoot, config });
    cleanUpErrorFromCache({ cwd: projectRoot, filename });
  } catch (error) {
    if (!finalErrorGuard(error)) throw error;

    if (
      isErrorInCache({
        cwd: projectRoot,
        errorCache: {
          filename,
          errorMessage: error.message,
        },
      })
    )
      return;

    report({
      node,
      messageId: "error",
      data: { error: error.message },
    });
  }
};
