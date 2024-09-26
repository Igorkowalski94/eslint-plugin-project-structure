import { AST_NODE_TYPES, TSESTree } from "@typescript-eslint/utils";

import { validateImport } from "rules/independentModules/helpers/validateImport/validateImport";
import {
  Context,
  IndependentModulesConfig,
} from "rules/independentModules/independentModules.types";

interface HandleImportExpressionProps {
  node: TSESTree.ImportExpression;
  context: Context;
  config: IndependentModulesConfig;
}

export const handleImportExpression = ({
  config,
  context,
  node,
}: HandleImportExpressionProps): void => {
  if (
    node.source.type !== AST_NODE_TYPES.Literal ||
    typeof node.source.value !== "string"
  )
    return;

  const importPath = node.source.value;

  validateImport({ importPath, context, node, config });
};
