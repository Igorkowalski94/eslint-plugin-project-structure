import { TSESTree } from "@typescript-eslint/utils";

import {
  Context,
  FileCompositionConfig,
  FileRules,
  NodeType,
} from "rules/fileComposition/fileComposition.types";
import { validateFile } from "rules/fileComposition/helpers/validateFile/validateFile";

interface HandlePropertyDefinitionProps {
  node: TSESTree.PropertyDefinition;
  context: Context;
  config: FileCompositionConfig;
  fileConfig?: FileRules;
}

export const handlePropertyDefinition = ({
  context,
  node,
  config,
  fileConfig,
}: HandlePropertyDefinitionProps): void => {
  if (node.key.type !== TSESTree.AST_NODE_TYPES.Identifier) return;

  const nodeType: NodeType =
    node.value?.type === TSESTree.AST_NODE_TYPES.ArrowFunctionExpression
      ? "ArrowFunctionExpression"
      : "VariableDeclarator";

  validateFile({
    node,
    context,
    name: node.key.name,
    nodeType,
    config,
    fileConfig,
  });
};
