import { ESLINT_ERRORS } from "rules/fileComposition/fileComposition.consts";
import {
  Context,
  Rule,
  Node,
  SelectorType,
  Scope,
  FileRules,
} from "rules/fileComposition/fileComposition.types";
import { isCorrectSelector } from "rules/fileComposition/helpers/validateFile/helpers/isCorrectSelector";
import { getCustomError } from "rules/fileComposition/helpers/validateFile/helpers/isSelectorAllowed/helpers/getCustomError";

interface IsSelectorAllowedProps {
  rules: Rule[];
  allowOnlySpecifiedSelectors?: FileRules["allowOnlySpecifiedSelectors"];
  scope: Scope;
  report: Context["report"];
  node: Node;
  errorMessageId: keyof typeof ESLINT_ERRORS;
  selectorType: SelectorType;
  expressionName?: string;
}

export const isSelectorAllowed = ({
  rules,
  report,
  node,
  errorMessageId,
  selectorType,
  expressionName,
  scope,
  allowOnlySpecifiedSelectors,
}: IsSelectorAllowedProps): boolean => {
  const isAllowed = rules
    .map(({ selector }) => selector)
    .flat()
    .some((selector) =>
      isCorrectSelector({ selector, selectorType, expressionName }),
    );

  if (
    isAllowed ||
    !allowOnlySpecifiedSelectors ||
    (typeof allowOnlySpecifiedSelectors === "object" &&
      allowOnlySpecifiedSelectors[scope] === false)
  )
    return true;

  report({
    messageId: errorMessageId,
    data: {
      selectorType,
      error: getCustomError({
        selectorType,
        scope,
        allowOnlySpecifiedSelectors,
      }),
    },
    node,
  });

  return false;
};
