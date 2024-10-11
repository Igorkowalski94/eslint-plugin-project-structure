import { TSESTree } from "@typescript-eslint/utils";

import { PositionIndex } from "rules/fileComposition/fileComposition.types";
import { isCorrectSelector } from "rules/fileComposition/helpers/validateFile/helpers/isCorrectSelector";
import { PositionIndexRule } from "rules/fileComposition/helpers/validateFile/helpers/validateRules/helpers/handlePositionIndex/handlePositionIndex.types";
import { getSelectorNamesFromBody } from "rules/fileComposition/helpers/validateFile/helpers/validateRules/helpers/handlePositionIndex/helpers/getSelectorNamesFromBody";
import { isNameValid } from "rules/fileComposition/helpers/validateFile/helpers/validateRules/helpers/isNameValid";

interface GetPositionIndexProps {
  positionIndexRules: PositionIndexRule[];
  bodyWithoutImports: TSESTree.ProgramStatement[];
  nodeRange: string;
  positionIndex: PositionIndex | number;
}

export const getPositionIndex = ({
  positionIndexRules,
  bodyWithoutImports,
  nodeRange,
  positionIndex,
}: GetPositionIndexProps): number => {
  const selectorNamesFromBody = getSelectorNamesFromBody(bodyWithoutImports);

  const positionIndexRulesBody = selectorNamesFromBody
    .sort((a, b) => {
      if (typeof positionIndex === "object" && positionIndex.sorting === "none")
        return 0;

      return a.name.localeCompare(b.name, undefined, {
        numeric: true,
        sensitivity: "base",
      });
    })
    .map((body) => {
      const rule = positionIndexRules.find(
        ({ format, selector }) =>
          isCorrectSelector({
            selector,
            selectorType: body.selector,
            expressionName: body.expressionName,
          }) &&
          isNameValid({ formatWithoutReferences: format, name: body.name }),
      );

      if (!rule) return;

      return {
        ...rule,
        range: body.range,
        expressionName: body.expressionName,
      };
    })
    .filter((v) => v !== undefined)
    .sort((a, b) => {
      if (a.positionIndex < 0 && b.positionIndex >= 0) return 1;
      if (a.positionIndex >= 0 && b.positionIndex < 0) return -1;
      return a.positionIndex - b.positionIndex;
    });

  const positionIndexRulesNewOrderPositive = positionIndexRulesBody
    .filter(({ positionIndex }) => positionIndex >= 0)
    .map((rule, index) => ({
      ...rule,
      positionIndex: index,
    }));

  const positionIndexRulesNewOrderNegative = positionIndexRulesBody
    .filter(({ positionIndex }) => positionIndex < 0)
    .reverse()
    .map((rule, index) => ({
      ...rule,
      positionIndex: selectorNamesFromBody.length - 1 - index,
    }));

  const positionIndexRulesNewOrder = [
    ...positionIndexRulesNewOrderPositive,
    ...positionIndexRulesNewOrderNegative,
  ];

  const newPositionIndex = positionIndexRulesNewOrder.find(
    ({ range }) => range === nodeRange,
  )?.positionIndex;

  return newPositionIndex ?? 0;
};
