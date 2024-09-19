import { RegexParameters } from "types";

import { getFileNameWithoutExtension } from "rules/namingRules/helpers/validateName/helpers/validateRules/helpers/getFileNameWithoutExtension";
import { getFormatWithFilenameReferences } from "rules/namingRules/helpers/validateName/helpers/validateRules/helpers/getFormatWithFilenameReferences";
import { getRules } from "rules/namingRules/helpers/validateName/helpers/validateRules/helpers/getRules";
import { isCorrectSelector } from "rules/namingRules/helpers/validateName/helpers/validateRules/helpers/isCorrectSelector";
import { isNameValid } from "rules/namingRules/helpers/validateName/helpers/validateRules/helpers/isNameValid";
import { isSelectorAllowed } from "rules/namingRules/helpers/validateName/helpers/validateRules/helpers/isSelectorAllowed/isSelectorAllowed";
import { prepareFormat } from "rules/namingRules/helpers/validateName/helpers/validateRules/helpers/prepareFormat/prepareFormat";
import { removeFilenameParts } from "rules/namingRules/helpers/validateName/helpers/validateRules/helpers/removeFilenameParts";
import { SELECTORS } from "rules/namingRules/helpers/validateName/helpers/validateRules/validateRules.consts";
import { ValidateNameProps } from "rules/namingRules/helpers/validateName/validateName";
import { ESLINT_ERRORS } from "rules/namingRules/namingRules.consts";
import {
  Context,
  NamingRule,
  NamingRuleObject,
  NodeType,
} from "rules/namingRules/namingRules.types";

interface ValidateRulesProps {
  name: string;
  filenamePath: string;
  node: ValidateNameProps["node"];
  nodeType: NodeType;
  report: Context["report"];
  namingRule: NamingRule[] | NamingRuleObject;
  errorMessageId: keyof typeof ESLINT_ERRORS;
  regexParameters?: RegexParameters;
}

export const validateRules = ({
  nodeType,
  name,
  node,
  report,
  filenamePath,
  namingRule,
  errorMessageId,
  regexParameters,
}: ValidateRulesProps): void => {
  const selectorConverted = SELECTORS[nodeType];

  if (
    !isSelectorAllowed({
      namingRule,
      node,
      nodeType,
      report,
      errorMessageId,
    })
  )
    return;

  getRules(namingRule).forEach((rule) => {
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

    if (isValidExport) return;

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
