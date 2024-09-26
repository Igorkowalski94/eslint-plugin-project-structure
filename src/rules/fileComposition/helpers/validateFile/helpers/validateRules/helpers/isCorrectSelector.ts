import {
  Selector,
  SelectorType,
} from "rules/fileComposition/fileComposition.types";

interface IsCorrectSelectorProps {
  selector: Selector | Selector[];
  selectorKey: SelectorType;
  expressionName?: string;
}

export const isCorrectSelector = ({
  selector,
  selectorKey,
  expressionName,
}: IsCorrectSelectorProps): boolean => {
  if (typeof selector === "string") return selector === selectorKey;

  if (!Array.isArray(selector)) {
    if (!expressionName) return false;

    return (
      selector.type === selectorKey && selector.limitTo.includes(expressionName)
    );
  }

  return selector.some((sel) =>
    isCorrectSelector({ selector: sel, selectorKey, expressionName }),
  );
};
