import { TSESTree } from "@typescript-eslint/utils";

import { validateImport } from "rules/independentModules/helpers/validateImport";
import { Context } from "rules/independentModules/independentModules.types";

export const handleExportNamedDeclaration = (
  node: TSESTree.ExportNamedDeclaration,
  context: Context,
): void => {
  const importPath = node.source?.value;

  if (!importPath) return;

  validateImport({ importPath, context, node });
};
