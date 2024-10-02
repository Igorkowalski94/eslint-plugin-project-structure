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
  context,
  context: { cwd, filename },
  node,
  nodeType,
  fileConfig,
  config,
}: ValidateFileProps): void => {
  if (!fileConfig) return;

  const { rules, allowOnlySpecifiedSelectors } = fileConfig;
  const fileExportRules = rules?.filter(({ scope }) => scope === "fileExport");
  const fileRootRules = rules?.filter(({ scope }) => scope === "fileRoot");
  const fileRules = rules?.filter(({ scope }) => scope === "file" || !scope);
  const filenamePath = path.relative(cwd, filename);
  const regexParameters = config.regexParameters;

  const { isExportName, currentName, currentNode } = isExportedName({
    nodeType,
    node,
    name,
  });

  if (fileExportRules?.length && isExportName) {
    return validateRules({
      rules: fileExportRules,
      name: currentName,
      nodeType,
      node: currentNode,
      nodeNotExported: node,
      context,
      filenamePath,
      errorMessageId: "prohibitedSelectorExport",
      regexParameters,
      expressionName,
      allowOnlySpecifiedSelectors,
      scope: "fileExport",
    });
  }

  const isFileRootName = isNameFromFileRoot({
    nodeType,
    node,
  });

  if (fileRootRules?.length && isFileRootName) {
    return validateRules({
      rules: fileRootRules,
      name,
      nodeType,
      node,
      context,
      filenamePath,
      errorMessageId: "prohibitedSelectorRoot",
      regexParameters,
      expressionName,
      allowOnlySpecifiedSelectors,
      scope: "fileRoot",
    });
  }

  if (fileRules?.length) {
    return validateRules({
      rules: fileRules,
      name,
      nodeType,
      node,
      filenamePath,
      errorMessageId: "prohibitedSelector",
      regexParameters,
      expressionName,
      allowOnlySpecifiedSelectors,
      scope: "file",
      context,
    });
  }
};
