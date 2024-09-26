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

    if (occurrences > limit)
      return (acc += `\nSelector: ${selectorArray.map((s) => `'${s}'`).join(", ")}, limit = ${String(limit)}, occurrences = ${String(occurrences)}.`);

    return acc;
  }, "");

  if (!error) return;

  report({
    node,
    messageId: "rootSelectorsLimits",
    data: { error },
  });
};
