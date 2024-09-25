import {
  Selector,
  SelectorType,
} from "rules/fileComposition/fileComposition.types";

interface IsCorrectSelectorProps {
  selector: Selector | Selector[];
  selectorKey: SelectorType;
}

export const isCorrectSelector = ({
  selector,
  selectorKey,
}: IsCorrectSelectorProps): boolean =>
  selector === selectorKey ||
  (!Array.isArray(selector) &&
    typeof selector === "object" &&
    selector.type === selectorKey) ||
  (Array.isArray(selector) &&
    selector.some(
      (sel) =>
        (typeof sel !== "string" && sel.type === selectorKey) ||
        sel === selectorKey,
    ));
