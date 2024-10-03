import { TSESTree } from "@typescript-eslint/utils";

import { PositionIndexRule } from "rules/fileComposition/helpers/validateFile/helpers/validateRules/helpers/handlePositionIndex/handlePositionIndex.types";
import { getSelectorNamesFromBody } from "rules/fileComposition/helpers/validateFile/helpers/validateRules/helpers/handlePositionIndex/helpers/getSelectorNamesFromBody";

interface GetPositionIndexProps {
  positionIndex: number;
  positionIndexRules: PositionIndexRule[];
  bodyWithoutImports: TSESTree.ProgramStatement[];
  name: string;
}

export const getPositionIndex = ({
  positionIndexRules,
  positionIndex,
  bodyWithoutImports,
  name,
}: GetPositionIndexProps): number => {
  const selectorNamesFromBody = getSelectorNamesFromBody(bodyWithoutImports);

  const positionIndexRulesBody = selectorNamesFromBody
    .map((name) =>
      positionIndexRules.find(({ format }) => format.includes(name)),
    )
    .filter((v): v is PositionIndexRule => v !== undefined)
    .sort((a, b) => a.positionIndex - b.positionIndex);

  const positionIndexRulesNewOrder = positionIndexRulesBody.map(
    ({ format }, index) => ({
      format,
      positionIndex: index,
    }),
  );

  const newPositionIndex = positionIndexRulesNewOrder.find(({ format }) =>
    format.includes(name),
  )?.positionIndex;

  return newPositionIndex ?? positionIndex;
};
