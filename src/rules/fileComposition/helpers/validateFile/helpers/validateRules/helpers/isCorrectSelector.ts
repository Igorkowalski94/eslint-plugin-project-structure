import { WILDCARD_REGEX } from "consts";

import { getInvalidRegexError } from "errors/getInvalidRegexError";

import { isRegexInvalid } from "helpers/isRegexInvalid";

import {
  Selector,
  SelectorType,
} from "rules/fileComposition/fileComposition.types";

interface IsCorrectSelectorProps {
  selector: Selector | Selector[];
  selectorType: SelectorType;
  expressionName?: string;
}

export const isCorrectSelector = ({
  selector,
  selectorType,
  expressionName,
}: IsCorrectSelectorProps): boolean => {
  if (typeof selector === "string") return selector === selectorType;

  if (!Array.isArray(selector)) {
    if (!expressionName) return false;

    if (typeof selector.limitTo === "string") {
      const regexImproved = selector.limitTo
        .replaceAll("*", WILDCARD_REGEX)
        .replaceAll(`${WILDCARD_REGEX}${WILDCARD_REGEX}`, "*");

      if (isRegexInvalid(regexImproved))
        throw getInvalidRegexError(regexImproved);

      const finalRegex = new RegExp(`^${regexImproved}$`, "g");

      return selector.type === selectorType && finalRegex.test(expressionName);
    }

    return selector.limitTo.some((limitTo) =>
      isCorrectSelector({
        selector: { type: "variableExpression", limitTo },
        selectorType,
        expressionName,
      }),
    );
  }

  return selector.some((sel) =>
    isCorrectSelector({ selector: sel, selectorType, expressionName }),
  );
};
