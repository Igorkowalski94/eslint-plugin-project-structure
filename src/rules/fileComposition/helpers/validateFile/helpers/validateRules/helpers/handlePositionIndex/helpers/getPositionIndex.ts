import { TSESTree } from "@typescript-eslint/utils";

import { SelectorType } from "rules/fileComposition/fileComposition.types";
import { isCorrectSelector } from "rules/fileComposition/helpers/validateFile/helpers/isCorrectSelector";
import { PositionIndexRule } from "rules/fileComposition/helpers/validateFile/helpers/validateRules/helpers/handlePositionIndex/handlePositionIndex.types";
import { getSelectorNamesFromBody } from "rules/fileComposition/helpers/validateFile/helpers/validateRules/helpers/handlePositionIndex/helpers/getSelectorNamesFromBody";

interface GetPositionIndexProps {
  positionIndex: number;
  positionIndexRules: PositionIndexRule[];
  bodyWithoutImports: TSESTree.ProgramStatement[];
  name: string;
  selectorType: SelectorType;
}

export const getPositionIndex = ({
  positionIndexRules,
  positionIndex,
  bodyWithoutImports,
  name,
  selectorType,
}: GetPositionIndexProps): number => {
  const selectorNamesFromBody = getSelectorNamesFromBody(bodyWithoutImports);

  const positionIndexRulesBody = selectorNamesFromBody
    .map((body) =>
      positionIndexRules.find(
        ({ format, selector }) =>
          isCorrectSelector({
            selector,
            selectorType: body.selector,
            expressionName: body.expressionName,
          }) && format.includes(body.name),
      ),
    )
    .map((rule) => {
      if (!rule) return;

      const positionIndexNegativeDefault = selectorNamesFromBody.length - 1;
      const positionIndexNegative =
        selectorNamesFromBody.length + rule.positionIndex;
      const currentPositionIndexNegative =
        positionIndexNegative < 0
          ? positionIndexNegativeDefault
          : positionIndexNegative;

      return {
        ...rule,
        positionIndex:
          rule.positionIndex < 0
            ? currentPositionIndexNegative
            : rule.positionIndex,
      };
    })
    .filter((v): v is PositionIndexRule => v !== undefined)
    .sort((a, b) => a.positionIndex - b.positionIndex);

  let sortedIndex = 0;

  const positionIndexRulesNewOrder = positionIndexRulesBody.map(
    ({ format, selector, expressionName }) => ({
      format,
      selector,
      expressionName,
      positionIndex: positionIndexRulesBody[sortedIndex++],
    }),
  );

  const newPositionIndex = positionIndexRulesNewOrder.find(
    ({ format, expressionName, selector }) =>
      format.includes(name) &&
      isCorrectSelector({
        selector,
        selectorType,
        expressionName,
      }),
  )?.positionIndex.positionIndex;

  return newPositionIndex ?? positionIndex;
};
