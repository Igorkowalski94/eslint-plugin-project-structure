import { TSESTree } from "@typescript-eslint/utils";
import { RegexParameters } from "types";

import {
  Context,
  RootSelectorLimit,
} from "rules/fileComposition/fileComposition.types";
import { getFilenameWithoutParts } from "rules/fileComposition/helpers/getFilenameWithoutParts/getFilenameWithoutParts";
import { isNameValid } from "rules/fileComposition/helpers/isNameValid";
import { prepareFormat } from "rules/fileComposition/helpers/prepareFormat/prepareFormat";
import { getSelectorsCount } from "rules/fileComposition/helpers/validateRootSelectorsLimits/helpers/getSelectorsCount";

interface ValidateRootSelectorsLimitsProps {
  node: TSESTree.Program;
  rootSelectorsLimits?: RootSelectorLimit[];
  report: Context["report"];
  filenamePath?: string;
  regexParameters?: RegexParameters;
}

export const validateRootSelectorsLimits = ({
  node,
  rootSelectorsLimits,
  report,
  filenamePath = "",
  regexParameters,
}: ValidateRootSelectorsLimitsProps): void => {
  if (!rootSelectorsLimits) return;

  const selectorsCount = getSelectorsCount(node.body);

  const error = rootSelectorsLimits.reduce(
    (acc, { selector, limit, format }) => {
      const selectorArray =
        typeof selector === "string" ? [selector] : selector;
      const currentSelectorsCount = format
        ? getSelectorsCount(node.body, (name) =>
            isNameValid({
              name,
              formatWithoutReferences: prepareFormat({
                format,
                filenameWithoutParts: getFilenameWithoutParts({
                  filenamePartsToRemove: undefined,
                  filenamePath,
                }),
                regexParameters,
              }).formatWithoutReferences,
            }),
          )
        : selectorsCount;
      const occurrences = selectorArray.reduce(
        (acc, selectorType) =>
          (acc += currentSelectorsCount[selectorType] ?? 0),
        0,
      );
      const selectorInfo = `${selectorArray.map((s) => `'${s}'`).join(", ")}${
        format
          ? `, format = ${[format]
              .flat()
              .map((f) => `'${f}'`)
              .join(", ")}`
          : ""
      }`;

      if (typeof limit === "number") {
        if (occurrences > limit)
          return (acc += `\nSelector: ${selectorInfo}, limit = ${String(limit)}, occurrences = ${String(occurrences)}.`);
      }

      if (typeof limit === "object") {
        const { min, max } = limit;

        if (
          typeof min === "number" &&
          typeof max === "number" &&
          (occurrences < min || occurrences > max)
        )
          return (acc += `\nSelector: ${selectorInfo}, min = ${String(min)}, max = ${String(max)}, occurrences = ${String(occurrences)}.`);

        if (typeof max === "number" && occurrences > max)
          return (acc += `\nSelector: ${selectorInfo}, max = ${String(max)}, occurrences = ${String(occurrences)}.`);

        if (typeof min === "number" && occurrences < min)
          return (acc += `\nSelector: ${selectorInfo}, min = ${String(min)}, occurrences = ${String(occurrences)}.`);
      }

      return acc;
    },
    "",
  );

  if (!error) return;

  report({
    node,
    messageId: "rootSelectorsLimits",
    data: { error },
  });
};
