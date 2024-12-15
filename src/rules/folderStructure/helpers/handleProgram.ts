import path from "path";

import { TSESTree } from "@typescript-eslint/utils";
import { PROJECT_STRUCTURE_CACHE_FILE_NAME } from "consts";

import { finalErrorGuard } from "errors/finalErrorGuard";

import { cleanUpErrorFromCache } from "helpers/cleanUpErrorFromCache";
import { getProjectRoot } from "helpers/getProjectRoot";
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
  context: { settings, filename, options, report, cwd },
  node,
}: HandleProgramProps): void => {
  const config = readConfigFile<FolderStructureConfig>({
    key: "project-structure/folder-structure-config-path",
    settings,
    options: options[0],
    cwd,
  });

  const cacheFileLocation = settings["project-structure/cache-location"] as
    | string
    | undefined;
  const projectRoot = getProjectRoot({
    cwd,
    projectRootConfig: config.projectRoot,
  });
  const structureRoot = path.resolve(projectRoot, config.structureRoot ?? ".");
  const cacheLocationOrProjectRoot = cacheFileLocation ?? projectRoot;

  if (
    !filename.includes(structureRoot) ||
    filename.includes(PROJECT_STRUCTURE_CACHE_FILE_NAME)
  )
    return;

  try {
    validateFolderStructure({
      filename,
      structureRoot,
      projectRoot,
      config,
    });
    cleanUpErrorFromCache({
      projectRoot: cacheLocationOrProjectRoot,
      filename,
    });
  } catch (error) {
    if (!finalErrorGuard(error)) throw error;

    if (
      isErrorInCache({
        projectRoot: cacheLocationOrProjectRoot,
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
