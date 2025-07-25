import { TSESTree } from "@typescript-eslint/utils";

import {
  Context,
  RootSelectorLimit,
} from "rules/fileComposition/fileComposition.types";
import { getSelectorsCount } from "rules/fileComposition/helpers/validateRootSelectorsLimits/helpers/getSelectorsCount";

interface ValidateRootSelectorsLimitsProps {
  node: TSESTree.Program;
  rootSelectorsLimits?: RootSelectorLimit[];
  report: Context["report"];
}

export const validateRootSelectorsLimits = ({
  node,
  rootSelectorsLimits,
  report,
}: ValidateRootSelectorsLimitsProps): void => {
  if (!rootSelectorsLimits) return;

  const selectorsCount = getSelectorsCount(node.body);

  const error = rootSelectorsLimits.reduce((acc, { selector, limit }) => {
    const selectorArray = typeof selector === "string" ? [selector] : selector;
    const occurrences = selectorArray.reduce(
      (acc, selectorType) => (acc += selectorsCount[selectorType] ?? 0),
      0,
    );

    if (typeof limit === "number") {
      if (occurrences > limit)
        return (acc += `\nSelector: ${selectorArray.map((s) => `'${s}'`).join(", ")}, limit = ${String(limit)}, occurrences = ${String(occurrences)}.`);
    } else if (typeof limit === "object") {
      const { min, max } = limit;
      if (
        typeof min === "number" &&
        typeof max === "number" &&
        (occurrences < min || occurrences > max)
      ) {
        return (acc += `\nSelector: ${selectorArray.map((s) => `'${s}'`).join(", ")}, min = ${String(min)}, max = ${String(max)}, occurrences = ${String(occurrences)}.`);
      } else if (typeof max === "number" && occurrences > max) {
        return (acc += `\nSelector: ${selectorArray.map((s) => `'${s}'`).join(", ")}, max = ${String(max)}, occurrences = ${String(occurrences)}.`);
      } else if (typeof min === "number" && occurrences < min) {
        return (acc += `\nSelector: ${selectorArray.map((s) => `'${s}'`).join(", ")}, min = ${String(min)}, occurrences = ${String(occurrences)}.`);
      }
    }
    return acc;
  }, "");

  if (!error) return;

  report({
    node,
    messageId: "rootSelectorsLimits",
    data: { error },
  });
};
