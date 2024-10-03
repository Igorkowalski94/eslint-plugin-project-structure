import { TSESTree } from "@typescript-eslint/utils";

import { Node } from "rules/fileComposition/fileComposition.types";
import { getProgramFromNode } from "rules/fileComposition/helpers/validateFile/helpers/getProgramFromNode";

export const getBodyWithoutImports = (
  node: Node,
): TSESTree.ProgramStatement[] => {
  const program = getProgramFromNode(node);

  return program.body.filter(
    ({ type }) => type !== TSESTree.AST_NODE_TYPES.ImportDeclaration,
  );
};
