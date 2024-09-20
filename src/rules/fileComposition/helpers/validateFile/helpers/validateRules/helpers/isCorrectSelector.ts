import { Selector } from "rules/fileComposition/fileComposition.types";

interface IsCorrectSelectorProps {
  ruleSelector: Selector | Selector[];
  selector: Selector;
}

export const isCorrectSelector = ({
  ruleSelector,
  selector,
}: IsCorrectSelectorProps): boolean =>
  (Array.isArray(ruleSelector) && ruleSelector.includes(selector)) ||
  (typeof ruleSelector === "string" && ruleSelector === selector);
