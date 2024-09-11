import { TSESTree } from "@typescript-eslint/utils";

import { validateName } from "rules/namingRules/helpers/validateName/validateName";
import { Context } from "rules/namingRules/namingRules.types";

interface HandleMethodDefinitionProps {
  node: TSESTree.MethodDefinition;
  context: Context;
}

export const handleMethodDefinition = ({
  context,
  node,
}: HandleMethodDefinitionProps): void => {
  if (node.key.type !== TSESTree.AST_NODE_TYPES.Identifier) return;

  validateName({
    node,
    context,
    name: node.key.name,
    nodeType: "FunctionDeclaration",
  });
};
