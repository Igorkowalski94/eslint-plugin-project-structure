import path from "path";

import { isCorrectPattern } from "helpers/isCorrectPattern";
import { readConfigFile } from "helpers/readConfigFile/readConfigFile";
import { validateConfig } from "helpers/validateConfig";

import {
  Context,
  FileCompositionConfig,
  Node,
  NodeType,
} from "rules/fileComposition/fileComposition.types";
import { isExportedName } from "rules/fileComposition/helpers/validateFile/helpers/isExportedName/isExportedName";
import { isNameFromFileRoot } from "rules/fileComposition/helpers/validateFile/helpers/isNameFromFileRoot";
import { validateRules } from "rules/fileComposition/helpers/validateFile/helpers/validateRules/validateRules";
import { FILE_COMPOSITION_SCHEMA } from "rules/fileComposition/helpers/validateFile/validateFile.consts";

export interface ValidateFileProps {
  name: string;
  context: Context;
  node: Node;
  nodeType: NodeType;
}

export const validateFile = ({
  name,
  context: { filename, report, options, cwd, settings },
  node,
  nodeType,
}: ValidateFileProps): void => {
  const config = readConfigFile<FileCompositionConfig>({
    cwd,
    key: "project-structure/file-composition-config-path",
    settings,
    options: options[0],
  });

  validateConfig({ config, schema: FILE_COMPOSITION_SCHEMA });

  const filenamePath = path.relative(cwd, filename);
  const fileConfig = config.filesRules.find(({ filePattern }) =>
    isCorrectPattern({ input: filenamePath, pattern: filePattern }),
  );
  const regexParameters = config.regexParameters;

  if (!fileConfig) return;

  const {
    fileExportRules: fileExportRules,
    fileRootRules,
    fileRules,
  } = fileConfig;

  const { isExportName, currentName, currentNode } = isExportedName({
    nodeType,
    node,
    name,
  });

  if (fileExportRules && isExportName) {
    return validateRules({
      fileRule: fileExportRules,
      name: currentName,
      nodeType,
      node: currentNode,
      report,
      filenamePath,
      errorMessageId: "prohibitedSelectorExport",
      regexParameters,
    });
  }

  const isFileRootName = isNameFromFileRoot({
    nodeType,
    node,
  });

  if (fileRootRules && isFileRootName) {
    return validateRules({
      fileRule: fileRootRules,
      name,
      nodeType,
      node,
      report,
      filenamePath,
      errorMessageId: "prohibitedSelectorRoot",
      regexParameters,
    });
  }

  if (fileRules) {
    return validateRules({
      fileRule: fileRules,
      name,
      nodeType,
      node,
      report,
      filenamePath,
      errorMessageId: "prohibitedSelector",
      regexParameters,
    });
  }
};
