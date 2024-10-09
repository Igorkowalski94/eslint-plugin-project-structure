import { RegexParameters } from "types";

import { Rule } from "rules/fileComposition/fileComposition.types";
import { getFilenameWithoutParts } from "rules/fileComposition/helpers/validateFile/helpers/validateRules/helpers/getFilenameWithoutParts/getFilenameWithoutParts";
import { PositionIndexRule } from "rules/fileComposition/helpers/validateFile/helpers/validateRules/helpers/handlePositionIndex/handlePositionIndex.types";
import { prepareFormat } from "rules/fileComposition/helpers/validateFile/helpers/validateRules/helpers/prepareFormat/prepareFormat";

interface GetPositionIndexRulesProps {
  rules: Rule[];
  regexParameters?: RegexParameters;
  filenamePath: string;
}

export const getPositionIndexRules = ({
  rules,
  regexParameters,
  filenamePath,
}: GetPositionIndexRulesProps): PositionIndexRule[] =>
  rules
    .map(({ format, selector, filenamePartsToRemove, positionIndex }) => {
      if (positionIndex === undefined) return;

      const filenameWithoutParts = getFilenameWithoutParts({
        filenamePartsToRemove,
        filenamePath,
      });

      return {
        positionIndex,
        selector,
        format: prepareFormat({
          format,
          filenameWithoutParts,
          regexParameters,
        }).formatWithoutReferences,
      };
    })
    .filter((v): v is PositionIndexRule => v !== undefined);
