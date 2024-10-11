import { TSESTree } from "@typescript-eslint/utils";

import {
  Context,
  Node,
  SelectorType,
} from "rules/fileComposition/fileComposition.types";
import { getNodePosition } from "rules/fileComposition/helpers/validateFile/helpers/validateRules/helpers/handlePositionIndex/helpers/validatePositionIndex/helpers/getNodePosition";

interface ValidatePositionIndexProps {
  node: Node;
  positionIndex: number;
  selectorType: SelectorType;
  context: Context;
  bodyWithoutImports: TSESTree.ProgramStatement[];
}

export const validatePositionIndex = ({
  node,
  selectorType,
  context: { report, sourceCode },
  positionIndex,
  bodyWithoutImports,
}: ValidatePositionIndexProps): void => {
  const nodePosition = getNodePosition({ bodyWithoutImports, node });

  if (nodePosition === positionIndex) return;

  const nodeToReplace = bodyWithoutImports[positionIndex];
  const currentNodePosition = bodyWithoutImports[nodePosition];

  report({
    messageId: "invalidPosition",
    node,
    data: {
      selectorType,
      currentLine: currentNodePosition.loc.start.line,
      correctLine: nodeToReplace.loc.start.line,
    },
    fix: (fixer) => [
      fixer.replaceText(nodeToReplace, sourceCode.getText(currentNodePosition)),
      fixer.replaceText(currentNodePosition, sourceCode.getText(nodeToReplace)),
    ],
  });
};
