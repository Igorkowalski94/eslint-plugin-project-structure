import { getCustomError } from "rules/namingRules/helpers/validateName/helpers/validateRules/helpers/isSelectorAllowed/helpers/getCustomError";
import { SELECTORS } from "rules/namingRules/helpers/validateName/helpers/validateRules/validateRules.consts";
import { ESLINT_ERRORS } from "rules/namingRules/namingRules.consts";
import {
  Context,
  NamingRule,
  NamingRuleObject,
  Node,
  NodeType,
} from "rules/namingRules/namingRules.types";

interface IsSelectorAllowedProps {
  namingRule: NamingRule[] | NamingRuleObject;
  nodeType: NodeType;
  report: Context["report"];
  node: Node;
  errorMessageId: keyof typeof ESLINT_ERRORS;
}

export const isSelectorAllowed = ({
  namingRule,
  nodeType,
  report,
  node,
  errorMessageId,
}: IsSelectorAllowedProps): boolean => {
  const nodeTypeConverted = SELECTORS[nodeType];

  if (
    !Array.isArray(namingRule) &&
    namingRule.allowOnlySpecifiedSelectors &&
    !namingRule.rules
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
          errors: namingRule.errors,
        }),
      },
      node,
    });
    return false;
  }

  return true;
};
