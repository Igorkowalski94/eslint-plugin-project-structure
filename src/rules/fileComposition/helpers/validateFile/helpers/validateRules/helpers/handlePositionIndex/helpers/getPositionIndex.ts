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
    .filter((v): v is PositionIndexRule => v !== undefined)
    .sort((a, b) => {
      if (a.positionIndex < 0 && b.positionIndex >= 0) return 1;
      if (a.positionIndex >= 0 && b.positionIndex < 0) return -1;
      return a.positionIndex - b.positionIndex;
    });

  const positionIndexRulesNewOrder = positionIndexRulesBody.map(
    ({ format, selector, expressionName, positionIndex }, index) => {
      const positionIndexNegativeDefault = selectorNamesFromBody.length - 1;
      const positionIndexNegative =
        selectorNamesFromBody.length + positionIndex;
      const currentPositionIndexNegative =
        positionIndexNegative < 0
          ? positionIndexNegativeDefault
          : positionIndexNegative;

      return {
        format,
        selector,
        expressionName,
        positionIndex: positionIndex < 0 ? currentPositionIndexNegative : index,
      };
    },
  );

  const newPositionIndex = positionIndexRulesNewOrder.find(
    ({ format, expressionName, selector }) =>
      format.includes(name) &&
      isCorrectSelector({
        selector,
        selectorType,
        expressionName,
      }),
  )?.positionIndex;

  return newPositionIndex ?? positionIndex;
};
