import { TSESTree } from "@typescript-eslint/utils";

import { validateImport } from "rules/independentModules/helpers/validateImport/validateImport";
import {
  Context,
  IndependentModulesConfig,
} from "rules/independentModules/independentModules.types";

interface HandleExportNamedDeclarationProps {
  node: TSESTree.ExportNamedDeclaration;
  context: Context;
  config: IndependentModulesConfig;
}

export const handleExportNamedDeclaration = ({
  config,
  context,
  node,
}: HandleExportNamedDeclarationProps): void => {
  const importPath = node.source?.value;

  if (!importPath) return;

  validateImport({ importPath, context, node, config });
};
