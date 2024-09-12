import { TSESTree } from "@typescript-eslint/utils";

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

  try {
    validateFolderStructure({ filename, cwd, config });
    cleanUpErrorFromCache({ cwd, filename });
  } catch (error) {
    if (!finalErrorGuard(error)) throw error;

    if (
      isErrorInCache({
        cwd,
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
