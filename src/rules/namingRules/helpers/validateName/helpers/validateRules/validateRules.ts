import { getFileNameWithoutExtension } from "rules/namingRules/helpers/validateName/helpers/validateRules/helpers/getFileNameWithoutExtension";
import { getFormatWithCaseReferences } from "rules/namingRules/helpers/validateName/helpers/validateRules/helpers/getFormatWithCaseReferences";
import { getRules } from "rules/namingRules/helpers/validateName/helpers/validateRules/helpers/getRules";
import { isCorrectSelector } from "rules/namingRules/helpers/validateName/helpers/validateRules/helpers/isCorrectSelector";
import { isNameValid } from "rules/namingRules/helpers/validateName/helpers/validateRules/helpers/isNameValid";
import { isSelectorAllowed } from "rules/namingRules/helpers/validateName/helpers/validateRules/helpers/isSelectorAllowed/isSelectorAllowed";
import { removeFilenameParts } from "rules/namingRules/helpers/validateName/helpers/validateRules/helpers/removeFilenameParts";
import { replaceReferencesWithData } from "rules/namingRules/helpers/validateName/helpers/validateRules/helpers/replaceReferencesWithData/replaceReferencesWithData";
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
}

export const validateRules = ({
  nodeType,
  name,
  node,
  report,
  filenamePath,
  namingRule,
  errorMessageId,
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
    const formatWithoutReferences = replaceReferencesWithData({
      format,
      filenameWithoutParts,
    });
    const isValidExport = isNameValid({
      formatWithoutReferences,
      name,
    });

    if (isValidExport) return;

    const formatWithCaseReferences = getFormatWithCaseReferences(
      formatWithoutReferences,
    );

    report({
      node,
      messageId: "invalidName",
      data: {
        selector: selectorConverted,
        formatWithoutReferences: formatWithCaseReferences.join(", "),
      },
    });
  });
};
