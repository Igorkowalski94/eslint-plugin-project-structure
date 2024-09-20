import { TSESTree } from "@typescript-eslint/utils";

import { Context } from "rules/fileComposition/fileComposition.types";
import { validateFile } from "rules/fileComposition/helpers/validateFile/validateFile";

interface HandleClassDeclarationProps {
  node: TSESTree.ClassDeclaration;
  context: Context;
}

export const handleClassDeclaration = ({
  node,
  context,
}: HandleClassDeclarationProps): void => {
  if (!node.id?.name) return;

  validateFile({
    node,
    context,
    name: node.id.name,
    nodeType: "ClassDeclaration",
  });
};
