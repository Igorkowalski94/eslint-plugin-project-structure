import path from "path";

import { TSESTree } from "@typescript-eslint/utils";
import { RuleContext } from "@typescript-eslint/utils/dist/ts-eslint";
import micromatch from "micromatch";

import { getAllowNamesWithCaseReferences } from "rules/namingRules/helpers/getAllowNamesWithCaseReferences";
import { getCurrentAllowNames } from "rules/namingRules/helpers/getCurrentAllowNames";
import { getFileNameWithoutExtension } from "rules/namingRules/helpers/getFileNameWithoutExtension";
import { isCorrectNameType } from "rules/namingRules/helpers/isCorrectNameType";
import { isNameValid } from "rules/namingRules/helpers/isNameValid";
import { removeFilenameParts } from "rules/namingRules/helpers/removeFilenameParts";
import { replaceReferencesWithData } from "rules/namingRules/helpers/replaceReferencesWithData";
import {
  ESLINT_ERRORS,
  NAME_TYPES,
} from "rules/namingRules/namingRules.consts";
import { FileNamingRules, NameType } from "rules/namingRules/namingRules.types";

export interface ValidateNameProps {
  name: string;
  context: RuleContext<keyof typeof ESLINT_ERRORS, FileNamingRules[]>;
  node:
    | TSESTree.VariableDeclarator
    | TSESTree.ClassDeclaration
    | TSESTree.FunctionDeclaration
    | TSESTree.TSTypeAliasDeclaration
    | TSESTree.TSInterfaceDeclaration
    | TSESTree.TSEnumDeclaration;
  nameType: NameType;
}

export const validateName = ({
  name,
  // eslint-disable-next-line @typescript-eslint/unbound-method
  context: { filename, report, options, cwd },
  node,
  nameType,
}: ValidateNameProps): void => {
  const filenamePath = path.resolve(cwd, filename);

  const fileRules = options.find(({ filePattern }) =>
    micromatch.every(filenamePath, filePattern),
  );
  const nameTypeConverted = NAME_TYPES[nameType];

  if (!fileRules) return;

  fileRules.rules.forEach((rule) => {
    if (
      !isCorrectNameType({
        nameType: nameTypeConverted,
        ruleNameType: rule.nameType,
      })
    )
      return;

    const { allowNames, allowNamesFileRoot, filenamePartsToRemove } = rule;

    const currentAllowNames = getCurrentAllowNames({
      allowNames,
      allowNamesFileRoot,
      nameType,
      node,
    });

    if (!currentAllowNames) return;

    const filenameWithoutExtension = getFileNameWithoutExtension(filenamePath);

    const filenameWithoutParts = removeFilenameParts({
      filenameWithoutExtension,
      filenamePartsToRemove,
    });

    const allowNamesWithoutReferences = replaceReferencesWithData({
      allowNames: currentAllowNames,
      filenameWithoutParts,
    });

    const isValidExport = isNameValid({
      allowNamesWithoutReferences,
      name,
    });

    if (isValidExport) return;

    const allowNamesWithCaseReferences = getAllowNamesWithCaseReferences(
      allowNamesWithoutReferences,
    );

    report({
      node,
      messageId: "invalidName",
      data: {
        nameType: nameTypeConverted,
        allowNamesWithoutReferences: allowNamesWithCaseReferences.join(", "),
      },
    });
  });
};
