import { AST_NODE_TYPES, TSESTree } from "@typescript-eslint/utils";

import { validateImport } from "rules/independentModules/helpers/validateImport";
import { Context } from "rules/independentModules/independentModules.types";

export const handleImportExpression = (
  node: TSESTree.ImportExpression,
  context: Context,
): void => {
  if (
    node.source.type !== AST_NODE_TYPES.Literal ||
    typeof node.source.value !== "string"
  )
    return;

  const importPath = node.source.value;

  validateImport({ importPath, context, node });
};
