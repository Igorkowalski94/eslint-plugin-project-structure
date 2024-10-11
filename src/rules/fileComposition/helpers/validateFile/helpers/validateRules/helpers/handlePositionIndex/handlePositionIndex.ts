import { RegexParameters } from "types";

import {
  Context,
  Node,
  Rule,
  SelectorType,
} from "rules/fileComposition/fileComposition.types";
import { getBodyWithoutImports } from "rules/fileComposition/helpers/validateFile/helpers/validateRules/helpers/handlePositionIndex/helpers/getBodyWithoutImports";
import { getPositionIndex } from "rules/fileComposition/helpers/validateFile/helpers/validateRules/helpers/handlePositionIndex/helpers/getPositionIndex";
import { getPositionIndexRules } from "rules/fileComposition/helpers/validateFile/helpers/validateRules/helpers/handlePositionIndex/helpers/getPositionIndexRules";
import { validatePositionIndex } from "rules/fileComposition/helpers/validateFile/helpers/validateRules/helpers/handlePositionIndex/helpers/validatePositionIndex/validatePositionIndex";

interface HandlePositionIndexProps {
  node: Node;
  filenamePath: string;
  rules: Rule[];
  regexParameters?: RegexParameters;
  context: Context;
  selectorType: SelectorType;
}

export const handlePositionIndex = ({
  filenamePath,
  node,
  rules,
  regexParameters,
  context,
  selectorType,
}: HandlePositionIndexProps): void => {
  const positionIndexRules = getPositionIndexRules({
    filenamePath,
    rules,
    regexParameters,
  });
  const bodyWithoutImports = getBodyWithoutImports(node);
  const newPositionIndex = getPositionIndex({
    bodyWithoutImports,
    positionIndexRules,
    nodeRange: JSON.stringify(node.range),
  });

  validatePositionIndex({
    node,
    positionIndex: newPositionIndex,
    selectorType,
    context,
    bodyWithoutImports,
  });
};
