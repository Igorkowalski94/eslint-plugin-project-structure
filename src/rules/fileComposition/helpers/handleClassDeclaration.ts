import { TSESTree } from "@typescript-eslint/utils";

import {
  Context,
  FileCompositionConfig,
  FileRules,
} from "rules/fileComposition/fileComposition.types";
import { validateFile } from "rules/fileComposition/helpers/validateFile/validateFile";

interface HandleClassDeclarationProps {
  node: TSESTree.ClassDeclaration;
  context: Context;
  config: FileCompositionConfig;
  fileConfig?: FileRules;
}

export const handleClassDeclaration = ({
  node,
  context,
  config,
  fileConfig,
}: HandleClassDeclarationProps): void => {
  if (!node.id?.name) return;

  validateFile({
    node,
    context,
    name: node.id.name,
    nodeType: "ClassDeclaration",
    config,
    fileConfig,
  });
};
