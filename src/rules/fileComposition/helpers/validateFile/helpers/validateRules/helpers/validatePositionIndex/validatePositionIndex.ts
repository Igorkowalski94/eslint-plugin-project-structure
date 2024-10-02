import { TSESTree } from "@typescript-eslint/utils";

import {
  Context,
  Node,
  SelectorType,
} from "rules/fileComposition/fileComposition.types";
import { getProgramFromNode } from "rules/fileComposition/helpers/validateFile/helpers/getProgramFromNode";
import { getConvertedPositionIndex } from "rules/fileComposition/helpers/validateFile/helpers/validateRules/helpers/validatePositionIndex/helpers/getConvertedPositionIndex";
import { getNodePosition } from "rules/fileComposition/helpers/validateFile/helpers/validateRules/helpers/validatePositionIndex/helpers/getNodePosition";

interface ValidatePositionIndexProps {
  node: Node;
  positionIndex?: number;
  selectorType: SelectorType;
  context: Context;
}

export const validatePositionIndex = ({
  node,
  positionIndex,
  selectorType,
  context: { report, sourceCode },
}: ValidatePositionIndexProps): void => {
  if (positionIndex === undefined) return;

  const program = getProgramFromNode(node);
  const bodyWithoutImports = program.body.filter(
    ({ type }) => type !== TSESTree.AST_NODE_TYPES.ImportDeclaration,
  );

  const nodePosition = getNodePosition({ bodyWithoutImports, node });

  const convertedPositionIndex = getConvertedPositionIndex({
    positionIndex,
    bodyWithoutImportsLength: bodyWithoutImports.length,
  });

  if (nodePosition === convertedPositionIndex) return;

  const nodeToReplace = bodyWithoutImports[convertedPositionIndex];
  const currentNodePosition = bodyWithoutImports[nodePosition];

  report({
    messageId: "invalidPosition",
    node,
    data: {
      selectorType,
      currentPosition: nodePosition,
      positionIndex: convertedPositionIndex,
    },
    fix: (fixer) => [
      fixer.replaceText(nodeToReplace, sourceCode.getText(currentNodePosition)),
      fixer.replaceText(currentNodePosition, sourceCode.getText(nodeToReplace)),
    ],
  });
};
