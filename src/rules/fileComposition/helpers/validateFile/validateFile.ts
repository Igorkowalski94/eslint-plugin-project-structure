import path from "path";

import {
  Context,
  FileCompositionConfig,
  FileRules,
  Node,
  NodeType,
} from "rules/fileComposition/fileComposition.types";
import { isExportedName } from "rules/fileComposition/helpers/validateFile/helpers/isExportedName/isExportedName";
import { isNameFromFileRoot } from "rules/fileComposition/helpers/validateFile/helpers/isNameFromFileRoot";
import { validateRules } from "rules/fileComposition/helpers/validateFile/helpers/validateRules/validateRules";

export interface ValidateFileProps {
  name: string;
  expressionName?: string;
  context: Context;
  node: Node;
  nodeType: NodeType;
  config: FileCompositionConfig;
  fileConfig?: FileRules;
}

export const validateFile = ({
  name,
  expressionName,
  context: { report, cwd, filename },
  node,
  nodeType,
  fileConfig,
  config,
}: ValidateFileProps): void => {
  if (!fileConfig) return;

  const { isExportName, currentName, currentNode } = isExportedName({
    nodeType,
    node,
    name,
  });

  const filenamePath = path.relative(cwd, filename);
  const regexParameters = config.regexParameters;
  const {
    fileExportRules: fileExportRules,
    fileRootRules,
    fileRules,
  } = fileConfig;

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
      expressionName,
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
      expressionName,
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
      expressionName,
    });
  }
};
