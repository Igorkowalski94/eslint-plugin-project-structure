import { TSESTree } from "@typescript-eslint/utils";

import { finalErrorGuard } from "errors/finalErrorGuard";

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
  config: IndependentModulesConfig;
}

export const validateImport = ({
  importPath,
  context: { filename, report, cwd },
  node,
  config,
}: ValidateImportProps): void => {
  try {
    validateAll({
      filename,
      importPath,
      config,
      cwd,
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
