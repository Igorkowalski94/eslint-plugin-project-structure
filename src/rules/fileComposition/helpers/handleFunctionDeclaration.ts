import { TSESTree } from "@typescript-eslint/utils";

import { Context } from "rules/fileComposition/fileComposition.types";
import { validateFile } from "rules/fileComposition/helpers/validateFile/validateFile";

interface HandleFunctionDeclarationProps {
  node: TSESTree.FunctionDeclaration;
  context: Context;
}

export const handleFunctionDeclaration = ({
  node,
  context,
}: HandleFunctionDeclarationProps): void => {
  if (!node.id?.name) return;

  validateFile({
    node,
    context,
    name: node.id.name,
    nodeType: "FunctionDeclaration",
  });
};
