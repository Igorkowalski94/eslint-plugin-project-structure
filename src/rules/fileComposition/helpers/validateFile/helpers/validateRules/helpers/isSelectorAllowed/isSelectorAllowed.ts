import { ESLINT_ERRORS } from "rules/fileComposition/fileComposition.consts";
import {
  Context,
  FileRule,
  FileRuleObject,
  Node,
  SelectorType,
} from "rules/fileComposition/fileComposition.types";
import { isCorrectSelector } from "rules/fileComposition/helpers/validateFile/helpers/validateRules/helpers/isCorrectSelector";
import { getCustomError } from "rules/fileComposition/helpers/validateFile/helpers/validateRules/helpers/isSelectorAllowed/helpers/getCustomError";

interface IsSelectorAllowedProps {
  fileRule: FileRule[] | FileRuleObject;
  report: Context["report"];
  node: Node;
  errorMessageId: keyof typeof ESLINT_ERRORS;
  selectorType: SelectorType;
  expressionName?: string;
}

export const isSelectorAllowed = ({
  fileRule,
  report,
  node,
  errorMessageId,
  selectorType,
  expressionName,
}: IsSelectorAllowedProps): boolean => {
  if (
    !Array.isArray(fileRule) &&
    fileRule.allowOnlySpecifiedSelectors &&
    !fileRule.rules
      .map(({ selector }) => selector)
      .flat()
      .some((selector) =>
        isCorrectSelector({ selector, selectorType, expressionName }),
      )
  ) {
    report({
      messageId: errorMessageId,
      data: {
        selectorType,
        error: getCustomError({
          selectorType,
          errors: fileRule.errors,
        }),
      },
      node,
    });
    return false;
  }

  return true;
};
