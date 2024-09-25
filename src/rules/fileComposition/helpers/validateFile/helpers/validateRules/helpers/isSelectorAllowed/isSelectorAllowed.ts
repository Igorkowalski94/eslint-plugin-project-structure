import { ESLINT_ERRORS } from "rules/fileComposition/fileComposition.consts";
import {
  Context,
  FileRule,
  FileRuleObject,
  Node,
  SelectorType,
} from "rules/fileComposition/fileComposition.types";
import { getCustomError } from "rules/fileComposition/helpers/validateFile/helpers/validateRules/helpers/isSelectorAllowed/helpers/getCustomError";

interface IsSelectorAllowedProps {
  fileRule: FileRule[] | FileRuleObject;
  report: Context["report"];
  node: Node;
  errorMessageId: keyof typeof ESLINT_ERRORS;
  selectorKey: SelectorType;
  expressionName?: string;
}

export const isSelectorAllowed = ({
  fileRule,
  report,
  node,
  errorMessageId,
  selectorKey,
  expressionName,
}: IsSelectorAllowedProps): boolean => {
  if (
    !Array.isArray(fileRule) &&
    fileRule.allowOnlySpecifiedSelectors &&
    !fileRule.rules
      .map(({ selector }) => selector)
      .flat()
      .some(
        (selector) =>
          selector === selectorKey ||
          (typeof selector !== "string" &&
            selector.type === selectorKey &&
            expressionName &&
            selector.limitTo.includes(expressionName)),
      )
  ) {
    report({
      messageId: errorMessageId,
      data: {
        selectorKey,
        error: getCustomError({
          selectorKey,
          errors: fileRule.errors,
        }),
      },
      node,
    });
    return false;
  }

  return true;
};
