import path from "path";

import micromatch from "micromatch";

import { readConfigFile } from "helpers/readConfigFile";
import { validateConfig } from "helpers/validateConfig";

import { isExportedName } from "rules/namingRules/helpers/validateName/helpers/isExportedName/isExportedName";
import { isNameFromFileRoot } from "rules/namingRules/helpers/validateName/helpers/isNameFromFileRoot";
import { validateRules } from "rules/namingRules/helpers/validateName/helpers/validateRules/validateRules";
import { NAMING_RULES_SCHEMA } from "rules/namingRules/helpers/validateName/validateName.consts";
import {
  Context,
  NamingRulesConfig,
  Node,
  NodeType,
} from "rules/namingRules/namingRules.types";

export interface ValidateNameProps {
  name: string;
  context: Context;
  node: Node;
  nodeType: NodeType;
}

export const validateName = ({
  name,
  context: { filename, report, options, cwd, settings },
  node,
  nodeType,
}: ValidateNameProps): void => {
  const config = readConfigFile<NamingRulesConfig>({
    cwd,
    key: "project-structure/naming-rules-config-path",
    settings,
    options: options[0],
  });

  validateConfig({ config, schema: NAMING_RULES_SCHEMA });

  const filenamePath = path.relative(cwd, filename);
  const fileConfig = config.filesRules.find(({ filePattern }) =>
    micromatch.every(filenamePath, filePattern),
  );
  const regexParameters = config.regexParameters;

  if (!fileConfig) return;

  const { fileExportsRules, fileRootRules, fileRules } = fileConfig;

  const { isExportName, currentName, currentNode } = isExportedName({
    nodeType,
    node,
    name,
  });

  if (fileExportsRules && isExportName) {
    return validateRules({
      namingRule: fileExportsRules,
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
      namingRule: fileRootRules,
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
      namingRule: fileRules,
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
