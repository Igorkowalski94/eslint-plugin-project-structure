import { ESLINT_ERRORS } from "rules/fileComposition/fileComposition.consts";
import {
  Context,
  FileRule,
  FileRuleObject,
  Node,
  NodeType,
} from "rules/fileComposition/fileComposition.types";
import { getCustomError } from "rules/fileComposition/helpers/validateFile/helpers/validateRules/helpers/isSelectorAllowed/helpers/getCustomError";
import { SELECTORS } from "rules/fileComposition/helpers/validateFile/helpers/validateRules/validateRules.consts";

interface IsSelectorAllowedProps {
  fileRule: FileRule[] | FileRuleObject;
  nodeType: NodeType;
  report: Context["report"];
  node: Node;
  errorMessageId: keyof typeof ESLINT_ERRORS;
}

export const isSelectorAllowed = ({
  fileRule,
  nodeType,
  report,
  node,
  errorMessageId,
}: IsSelectorAllowedProps): boolean => {
  const nodeTypeConverted = SELECTORS[nodeType];

  if (
    !Array.isArray(fileRule) &&
    fileRule.allowOnlySpecifiedSelectors &&
    !fileRule.rules
      .map(({ selector }) => selector)
      .flat()
      .includes(nodeTypeConverted)
  ) {
    report({
      messageId: errorMessageId,
      data: {
        selector: nodeTypeConverted,
        error: getCustomError({
          selector: nodeTypeConverted,
          errors: fileRule.errors,
        }),
      },
      node,
    });
    return false;
  }

  return true;
};
