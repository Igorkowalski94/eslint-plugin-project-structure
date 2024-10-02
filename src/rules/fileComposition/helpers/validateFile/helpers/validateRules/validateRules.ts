import { RegexParameters } from "types";

import { ESLINT_ERRORS } from "rules/fileComposition/fileComposition.consts";
import {
  Context,
  Rule,
  NodeType,
  Scope,
  FileRules,
} from "rules/fileComposition/fileComposition.types";
import { getFileNameWithoutExtension } from "rules/fileComposition/helpers/validateFile/helpers/validateRules/helpers/getFileNameWithoutExtension";
import { getFormatWithFilenameReferences } from "rules/fileComposition/helpers/validateFile/helpers/validateRules/helpers/getFormatWithFilenameReferences";
import { isCorrectSelector } from "rules/fileComposition/helpers/validateFile/helpers/validateRules/helpers/isCorrectSelector";
import { isNameValid } from "rules/fileComposition/helpers/validateFile/helpers/validateRules/helpers/isNameValid";
import { isSelectorAllowed } from "rules/fileComposition/helpers/validateFile/helpers/validateRules/helpers/isSelectorAllowed/isSelectorAllowed";
import { prepareFormat } from "rules/fileComposition/helpers/validateFile/helpers/validateRules/helpers/prepareFormat/prepareFormat";
import { removeFilenameParts } from "rules/fileComposition/helpers/validateFile/helpers/validateRules/helpers/removeFilenameParts";
import { validatePositionIndex } from "rules/fileComposition/helpers/validateFile/helpers/validateRules/helpers/validatePositionIndex/validatePositionIndex";
import { SELECTORS } from "rules/fileComposition/helpers/validateFile/helpers/validateRules/validateRules.consts";
import { ValidateFileProps } from "rules/fileComposition/helpers/validateFile/validateFile";

interface ValidateRulesProps {
  name: string;
  filenamePath: string;
  node: ValidateFileProps["node"];
  nodeType: NodeType;
  rules: Rule[];
  errorMessageId: keyof typeof ESLINT_ERRORS;
  regexParameters?: RegexParameters;
  expressionName?: string;
  allowOnlySpecifiedSelectors?: FileRules["allowOnlySpecifiedSelectors"];
  scope: Scope;
  context: Context;
}

export const validateRules = ({
  nodeType,
  name,
  node,
  filenamePath,
  rules,
  errorMessageId,
  regexParameters,
  expressionName,
  allowOnlySpecifiedSelectors,
  scope,
  context,
  context: { report },
}: ValidateRulesProps): void => {
  const selectorType = SELECTORS[nodeType];

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
    .map((rule) => {
      const { format, filenamePartsToRemove, positionIndex } = rule;

      const filenameWithoutExtension =
        getFileNameWithoutExtension(filenamePath);
      const filenameWithoutParts = removeFilenameParts({
        filenameWithoutExtension,
        filenamePartsToRemove,
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

      if (isValid)
        return validatePositionIndex({
          node,
          positionIndex,
          selectorType,
          context,
        });

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
