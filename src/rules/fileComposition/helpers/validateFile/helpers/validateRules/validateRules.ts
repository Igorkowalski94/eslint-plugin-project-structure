import { RegexParameters } from "types";

import { ESLINT_ERRORS } from "rules/fileComposition/fileComposition.consts";
import {
  Context,
  FileRule,
  FileRuleObject,
  NodeType,
} from "rules/fileComposition/fileComposition.types";
import { getFileNameWithoutExtension } from "rules/fileComposition/helpers/validateFile/helpers/validateRules/helpers/getFileNameWithoutExtension";
import { getFormatWithFilenameReferences } from "rules/fileComposition/helpers/validateFile/helpers/validateRules/helpers/getFormatWithFilenameReferences";
import { getRules } from "rules/fileComposition/helpers/validateFile/helpers/validateRules/helpers/getRules";
import { isCorrectSelector } from "rules/fileComposition/helpers/validateFile/helpers/validateRules/helpers/isCorrectSelector";
import { isNameValid } from "rules/fileComposition/helpers/validateFile/helpers/validateRules/helpers/isNameValid";
import { isSelectorAllowed } from "rules/fileComposition/helpers/validateFile/helpers/validateRules/helpers/isSelectorAllowed/isSelectorAllowed";
import { prepareFormat } from "rules/fileComposition/helpers/validateFile/helpers/validateRules/helpers/prepareFormat/prepareFormat";
import { removeFilenameParts } from "rules/fileComposition/helpers/validateFile/helpers/validateRules/helpers/removeFilenameParts";
import { SELECTORS } from "rules/fileComposition/helpers/validateFile/helpers/validateRules/validateRules.consts";
import { ValidateFileProps } from "rules/fileComposition/helpers/validateFile/validateFile";

interface ValidateRulesProps {
  name: string;
  filenamePath: string;
  node: ValidateFileProps["node"];
  nodeType: NodeType;
  report: Context["report"];
  fileRule: FileRule[] | FileRuleObject;
  errorMessageId: keyof typeof ESLINT_ERRORS;
  regexParameters?: RegexParameters;
}

export const validateRules = ({
  nodeType,
  name,
  node,
  report,
  filenamePath,
  fileRule,
  errorMessageId,
  regexParameters,
}: ValidateRulesProps): void => {
  const selectorConverted = SELECTORS[nodeType];

  if (
    !isSelectorAllowed({
      fileRule,
      node,
      nodeType,
      report,
      errorMessageId,
    })
  )
    return;

  getRules(fileRule).forEach((rule) => {
    if (
      !isCorrectSelector({
        selector: selectorConverted,
        ruleSelector: rule.selector,
      })
    )
      return;

    const { format, filenamePartsToRemove } = rule;

    const filenameWithoutExtension = getFileNameWithoutExtension(filenamePath);
    const filenameWithoutParts = removeFilenameParts({
      filenameWithoutExtension,
      filenamePartsToRemove,
    });
    const { formatWithReferences, formatWithoutReferences } = prepareFormat({
      format,
      filenameWithoutParts,
      regexParameters,
    });
    const isValidExport = isNameValid({
      formatWithoutReferences,
      name,
    });

    if (isValidExport || name === "*") return;

    const formatWithFilenameReferences = getFormatWithFilenameReferences({
      formatWithReferences,
      filename: filenameWithoutParts,
    });

    report({
      node,
      messageId: "invalidName",
      data: {
        selector: selectorConverted,
        formatWithoutReferences: formatWithFilenameReferences.join(", "),
      },
    });
  });
};
