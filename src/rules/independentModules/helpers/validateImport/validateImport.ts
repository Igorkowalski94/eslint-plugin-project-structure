import { TSESTree } from "@typescript-eslint/utils";

import { finalErrorGuard } from "errors/finalErrorGuard";

import { readConfigFile } from "helpers/readConfigFile/readConfigFile";

import { getPathAliases } from "rules/independentModules/helpers/validateImport/helpers/getPathAliases";
import { validateAll } from "rules/independentModules/helpers/validateImport/helpers/validateAll/validateAll";
import {
  Context,
  IndependentModulesConfig,
} from "rules/independentModules/independentModules.types";

export interface ValidateImportProps {
  importPath: string;
  context: Context;
  node:
    | TSESTree.ImportDeclaration
    | TSESTree.ExportNamedDeclaration
    | TSESTree.ExportAllDeclaration
    | TSESTree.CallExpression
    | TSESTree.ImportExpression;
}

export const validateImport = ({
  importPath,
  context: { cwd, filename, report, settings, options },
  node,
}: ValidateImportProps): void => {
  const config = readConfigFile<IndependentModulesConfig>({
    cwd,
    key: "project-structure/independent-modules-config-path",
    settings,
    options: options[0],
  });

  const pathAliases = getPathAliases({ cwd, config });

  try {
    validateAll({
      filename,
      importPath,
      cwd,
      config: { ...config, pathAliases },
    });
  } catch (error) {
    if (!finalErrorGuard(error)) throw error;

    report({
      node,
      messageId: "error",
      data: { error: error.message },
    });
  }
};
