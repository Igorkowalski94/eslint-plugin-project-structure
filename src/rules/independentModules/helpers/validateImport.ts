import { TSESTree } from "@typescript-eslint/utils";
import { ReportDescriptor } from "@typescript-eslint/utils/dist/ts-eslint/Rule";

import { finalErrorGuard } from "errors/finalErrorGuard";

import { readConfigFile } from "helpers/readConfigFile";

import { getPathAliases } from "rules/independentModules/helpers/getPathAliases";
import { validateAll } from "rules/independentModules/helpers/validateAll";
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
    options,
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
      message: error.message,
    } as unknown as ReportDescriptor<"error">);
  }
};
