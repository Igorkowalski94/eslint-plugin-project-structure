import path from "path";

import { getProjectRoot } from "helpers/getProjectRoot";

import {
  Context,
  FileCompositionConfig,
  FileRules,
  Node,
  NodeType,
} from "rules/fileComposition/fileComposition.types";
import { getCurrentScopeData } from "rules/fileComposition/helpers/validateFile/helpers/getCurrentScopeData";
import { isCorrectScope } from "rules/fileComposition/helpers/validateFile/helpers/isCorrectScope";
import { isExportedName } from "rules/fileComposition/helpers/validateFile/helpers/isExportedName/isExportedName";
import { isNameFromFileRoot } from "rules/fileComposition/helpers/validateFile/helpers/isNameFromFileRoot";
import { isSelectorAllowed } from "rules/fileComposition/helpers/validateFile/helpers/isSelectorAllowed/isSelectorAllowed";
import { validateRules } from "rules/fileComposition/helpers/validateFile/helpers/validateRules/validateRules";
import { SELECTORS } from "rules/fileComposition/helpers/validateFile/validateFile.consts";

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
  context: { filename },
  node,
  nodeType,
  fileConfig,
  config,
}: ValidateFileProps): void => {
  if (!fileConfig) return;

  const { rules = [], allowOnlySpecifiedSelectors } = fileConfig;
  const fileExportRules = rules.filter(({ scope }) =>
    isCorrectScope({ expect: "fileExport", scope }),
  );
  const fileRootRules = rules.filter(({ scope }) =>
    isCorrectScope({ expect: "fileRoot", scope }),
  );
  const nestedSelectorsRules = rules.filter(({ scope }) =>
    isCorrectScope({ expect: "nestedSelectors", scope }),
  );
  const filenamePath = path.relative(
    getProjectRoot(config.projectRoot),
    filename,
  );
  const regexParameters = config.regexParameters;
  const selectorType = SELECTORS[nodeType];

  const { isExportName, currentName, currentNode } = isExportedName({
    nodeType,
    node,
    name,
  });

  if (fileExportRules.length && isExportName) {
    return validateRules({
      rules: fileExportRules,
      name: currentName,
      selectorType,
      node: currentNode,
      nodeNotExported: node,
      context,
      filenamePath,
      errorMessageId: "prohibitedSelectorExport",
      regexParameters,
      expressionName,
      allowOnlySpecifiedSelectors,
      scope: "fileExport",
      allRules: rules,
    });
  }

  const isFileRootName = isNameFromFileRoot({
    nodeType,
    node,
  });

  if (fileRootRules.length && isFileRootName && !isExportName) {
    return validateRules({
      rules: fileRootRules,
      name,
      selectorType,
      node,
      context,
      filenamePath,
      errorMessageId: "prohibitedSelectorRoot",
      regexParameters,
      expressionName,
      allowOnlySpecifiedSelectors,
      scope: "fileRoot",
      allRules: rules,
    });
  }

  if (nestedSelectorsRules.length && !isExportName && !isFileRootName) {
    return validateRules({
      rules: nestedSelectorsRules,
      name,
      node,
      filenamePath,
      errorMessageId: "prohibitedSelectorNested",
      regexParameters,
      expressionName,
      allowOnlySpecifiedSelectors,
      scope: "nestedSelectors",
      context,
      allRules: rules,
      selectorType,
    });
  }

  const { scope, errorMessageId } = getCurrentScopeData({
    isFileExport: isExportName,
    isFileRoot: isFileRootName,
  });

  isSelectorAllowed({
    rules: [],
    scope,
    allowOnlySpecifiedSelectors,
    node,
    selectorType,
    report: context.report,
    errorMessageId,
    expressionName,
  });
};
