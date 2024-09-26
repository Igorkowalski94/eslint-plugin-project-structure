import { TSESTree } from "@typescript-eslint/utils";

import {
  Context,
  FileCompositionConfig,
  FileRules,
} from "rules/fileComposition/fileComposition.types";
import { validateFile } from "rules/fileComposition/helpers/validateFile/validateFile";

interface HandleMethodDefinitionProps {
  node: TSESTree.MethodDefinition;
  context: Context;
  config: FileCompositionConfig;
  fileConfig?: FileRules;
}

export const handleMethodDefinition = ({
  context,
  node,
  config,
  fileConfig,
}: HandleMethodDefinitionProps): void => {
  if (node.key.type !== TSESTree.AST_NODE_TYPES.Identifier) return;

  validateFile({
    node,
    context,
    name: node.key.name,
    nodeType: "FunctionDeclaration",
    config,
    fileConfig,
  });
};
