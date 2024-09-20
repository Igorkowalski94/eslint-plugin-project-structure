import { TSESTree } from "@typescript-eslint/utils";

import { Context } from "rules/fileComposition/fileComposition.types";
import { validateFile } from "rules/fileComposition/helpers/validateFile/validateFile";

interface HandleMethodDefinitionProps {
  node: TSESTree.MethodDefinition;
  context: Context;
}

export const handleMethodDefinition = ({
  context,
  node,
}: HandleMethodDefinitionProps): void => {
  if (node.key.type !== TSESTree.AST_NODE_TYPES.Identifier) return;

  validateFile({
    node,
    context,
    name: node.key.name,
    nodeType: "FunctionDeclaration",
  });
};
