import { TSESTree } from "@typescript-eslint/utils";

import { Node } from "rules/fileComposition/fileComposition.types";

interface GetNodePositionProps {
  bodyWithoutImports: TSESTree.ProgramStatement[];
  node: Node;
}

export const getNodePosition = ({
  bodyWithoutImports,
  node,
}: GetNodePositionProps): number =>
  bodyWithoutImports.findIndex(
    (bodyNode) =>
      (bodyNode.range[0] === node.range[0] &&
        bodyNode.range[1] === node.range[1]) ||
      (bodyNode.range[0] === node.parent.range[0] &&
        bodyNode.range[1] === node.parent.range[1]) ||
      (bodyNode.range[0] === node.parent.parent?.range[0] &&
        bodyNode.range[1] === node.parent.parent.range[1]),
  );
