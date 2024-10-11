import { RegexParameters } from "types";

import { ESLINT_ERRORS } from "rules/fileComposition/fileComposition.consts";
import {
  Context,
  Rule,
  Scope,
  FileRules,
  SelectorType,
} from "rules/fileComposition/fileComposition.types";
import { isCorrectSelector } from "rules/fileComposition/helpers/validateFile/helpers/isCorrectSelector";
import { isSelectorAllowed } from "rules/fileComposition/helpers/validateFile/helpers/isSelectorAllowed/isSelectorAllowed";
import { getFilenameWithoutParts } from "rules/fileComposition/helpers/validateFile/helpers/validateRules/helpers/getFilenameWithoutParts/getFilenameWithoutParts";
import { getFormatWithFilenameReferences } from "rules/fileComposition/helpers/validateFile/helpers/validateRules/helpers/getFormatWithFilenameReferences";
import { handlePositionIndex } from "rules/fileComposition/helpers/validateFile/helpers/validateRules/helpers/handlePositionIndex/handlePositionIndex";
import { isNameValid } from "rules/fileComposition/helpers/validateFile/helpers/validateRules/helpers/isNameValid";
import { prepareFormat } from "rules/fileComposition/helpers/validateFile/helpers/validateRules/helpers/prepareFormat/prepareFormat";
import { ValidateFileProps } from "rules/fileComposition/helpers/validateFile/validateFile";

interface ValidateRulesProps {
  name: string;
  filenamePath: string;
  node: ValidateFileProps["node"];
  nodeNotExported?: ValidateFileProps["node"];
  rules: Rule[];
  errorMessageId: keyof typeof ESLINT_ERRORS;
  regexParameters?: RegexParameters;
  expressionName?: string;
  allowOnlySpecifiedSelectors?: FileRules["allowOnlySpecifiedSelectors"];
  scope: Scope;
  context: Context;
  allRules: Rule[];
  selectorType: SelectorType;
}

export const validateRules = ({
  name,
  node,
  filenamePath,
  rules,
  errorMessageId,
  regexParameters,
  expressionName,
  allowOnlySpecifiedSelectors,
  scope,
  nodeNotExported,
  context,
  context: { report },
  allRules,
  selectorType,
}: ValidateRulesProps): void => {
  if (
    !isSelectorAllowed({
      rules,
      scope,
      allowOnlySpecifiedSelectors,
      node,
      selectorType,
      report,
      errorMessageId,
      expressionName,
    }) ||
    name === "*"
  )
    return;

  const selectorTypeRules = rules.filter(({ selector }) =>
    isCorrectSelector({
      selectorType,
      selector,
      expressionName,
    }),
  );

  const formatWithoutReferences = selectorTypeRules
    .map(({ format, filenamePartsToRemove, positionIndex }) => {
      const filenameWithoutParts = getFilenameWithoutParts({
        filenamePartsToRemove,
        filenamePath,
      });
      const { formatWithReferences, formatWithoutReferences } = prepareFormat({
        format,
        filenameWithoutParts,
        regexParameters,
      });
      const isValid = isNameValid({
        formatWithoutReferences,
        name,
      });

      if (isValid) {
        if (positionIndex === undefined || scope === "nestedSelectors") return;

        return handlePositionIndex({
          context,
          filenamePath,
          node: nodeNotExported ?? node,
          rules: allRules,
          selectorType,
          regexParameters,
          positionIndex,
        });
      }

      return getFormatWithFilenameReferences({
        formatWithReferences,
        filename: filenameWithoutParts,
      });
    })
    .filter((v): v is string[] => v !== undefined);

  if (
    !formatWithoutReferences.length ||
    formatWithoutReferences.length !== selectorTypeRules.length
  )
    return;

  report({
    node,
    messageId: "invalidName",
    data: {
      selectorType,
      formatWithoutReferences: formatWithoutReferences.flat().join(", "),
    },
  });
};
