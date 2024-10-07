import path from "path";

import {
  Context,
  FileCompositionConfig,
  FileRules,
  Node,
  NodeType,
} from "rules/fileComposition/fileComposition.types";
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
  context: { cwd, filename },
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
  const fileRules = rules.filter(({ scope }) =>
    isCorrectScope({ expect: "file", scope }),
  );
  const filenamePath = path.relative(cwd, filename);
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

  if (fileRootRules.length && isFileRootName) {
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

  if (fileRules.length) {
    return validateRules({
      rules: fileRules,
      name,
      node,
      filenamePath,
      errorMessageId: "prohibitedSelector",
      regexParameters,
      expressionName,
      allowOnlySpecifiedSelectors,
      scope: "file",
      context,
      allRules: rules,
      selectorType,
    });
  }

  isSelectorAllowed({
    rules,
    scope: "file",
    allowOnlySpecifiedSelectors,
    node,
    selectorType,
    report: context.report,
    errorMessageId: "prohibitedSelector",
    expressionName,
  });
};
