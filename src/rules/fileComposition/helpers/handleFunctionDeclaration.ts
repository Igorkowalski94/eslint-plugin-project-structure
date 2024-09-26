import { TSESTree } from "@typescript-eslint/utils";

import {
  Context,
  FileCompositionConfig,
  FileRules,
} from "rules/fileComposition/fileComposition.types";
import { validateFile } from "rules/fileComposition/helpers/validateFile/validateFile";

interface HandleFunctionDeclarationProps {
  node: TSESTree.FunctionDeclaration;
  context: Context;
  config: FileCompositionConfig;
  fileConfig?: FileRules;
}

export const handleFunctionDeclaration = ({
  node,
  context,
  config,
  fileConfig,
}: HandleFunctionDeclarationProps): void => {
  if (!node.id?.name) return;

  validateFile({
    node,
    context,
    name: node.id.name,
    nodeType: "FunctionDeclaration",
    config,
    fileConfig,
  });
};
