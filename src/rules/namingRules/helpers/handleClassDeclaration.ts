import { TSESTree } from "@typescript-eslint/utils";

import { validateName } from "rules/namingRules/helpers/validateName/validateName";
import { Context } from "rules/namingRules/namingRules.types";

interface HandleClassDeclarationProps {
  node: TSESTree.ClassDeclaration;
  context: Context;
}

export const handleClassDeclaration = ({
  node,
  context,
}: HandleClassDeclarationProps): void => {
  if (!node.id?.name) return;

  validateName({
    node,
    context,
    name: node.id.name,
    nodeType: "ClassDeclaration",
  });
};
