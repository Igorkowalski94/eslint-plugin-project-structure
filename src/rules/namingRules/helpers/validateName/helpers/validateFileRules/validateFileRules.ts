import { getAllowNamesWithCaseReferences } from "rules/namingRules/helpers/validateName/helpers/validateFileRules/helpers/getAllowNamesWithCaseReferences";
import { getCurrentData } from "rules/namingRules/helpers/validateName/helpers/validateFileRules/helpers/getCurrentData/getCurrentData";
import { getFileNameWithoutExtension } from "rules/namingRules/helpers/validateName/helpers/validateFileRules/helpers/getFileNameWithoutExtension";
import { isCorrectNameType } from "rules/namingRules/helpers/validateName/helpers/validateFileRules/helpers/isCorrectNameType";
import { isNameValid } from "rules/namingRules/helpers/validateName/helpers/validateFileRules/helpers/isNameValid";
import { removeFilenameParts } from "rules/namingRules/helpers/validateName/helpers/validateFileRules/helpers/removeFilenameParts";
import { replaceReferencesWithData } from "rules/namingRules/helpers/validateName/helpers/validateFileRules/helpers/replaceReferencesWithData/replaceReferencesWithData";
import { NAME_TYPES } from "rules/namingRules/helpers/validateName/helpers/validateFileRules/validateFileRules.consts";
import { ValidateNameProps } from "rules/namingRules/helpers/validateName/validateName";
import {
  Context,
  FileNamingRules,
  NameType,
} from "rules/namingRules/namingRules.types";

interface ValidateFileRulesProps {
  name: string;
  filenamePath: string;
  node: ValidateNameProps["node"];
  nameType: NameType;
  fileRules: FileNamingRules;
  report: Context["report"];
}

export const validateFileRules = ({
  nameType,
  fileRules,
  name,
  node,
  report,
  filenamePath,
}: ValidateFileRulesProps): void => {
  const nameTypeConverted = NAME_TYPES[nameType];

  fileRules.rules.forEach((rule) => {
    if (
      !isCorrectNameType({
        nameType: nameTypeConverted,
        ruleNameType: rule.nameType,
      })
    )
      return;

    const {
      allowNames,
      allowNamesFileRoot,
      allowNamesExport,
      filenamePartsToRemove,
    } = rule;

    const filenameWithoutExtension = getFileNameWithoutExtension(filenamePath);
    const filenameWithoutParts = removeFilenameParts({
      filenameWithoutExtension,
      filenamePartsToRemove,
    });

    const { currentAllowNames, currentName, currentNode } = getCurrentData({
      allowNames,
      allowNamesFileRoot,
      allowNamesExport,
      nameType,
      node,
      name,
    });
    const allowNamesWithoutReferences = replaceReferencesWithData({
      allowNames: currentAllowNames,
      filenameWithoutParts,
    });
    const isValidExport = isNameValid({
      allowNamesWithoutReferences,
      name: currentName,
    });

    if (isValidExport) return;

    const allowNamesWithCaseReferences = getAllowNamesWithCaseReferences(
      allowNamesWithoutReferences,
    );

    report({
      node: currentNode,
      messageId: "invalidName",
      data: {
        nameType: nameTypeConverted,
        allowNamesWithoutReferences: allowNamesWithCaseReferences.join(", "),
      },
    });
  });
};
