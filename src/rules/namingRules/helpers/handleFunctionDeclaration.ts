import { TSESTree } from "@typescript-eslint/utils";

import { validateName } from "rules/namingRules/helpers/validateName/validateName";
import { Context } from "rules/namingRules/namingRules.types";

interface HandleFunctionDeclarationProps {
  node: TSESTree.FunctionDeclaration;
  context: Context;
}

export const handleFunctionDeclaration = ({
  node,
  context,
}: HandleFunctionDeclarationProps): void => {
  if (!node.id?.name) return;

  validateName({
    node,
    context,
    name: node.id.name,
    nameType: "FunctionDeclaration",
  });
};
