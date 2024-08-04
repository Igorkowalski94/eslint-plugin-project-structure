import { TSESTree } from "@typescript-eslint/utils";
import { RuleContext } from "@typescript-eslint/utils/dist/ts-eslint";
import micromatch from "micromatch";

import { getAllowNamesWithCaseReferences } from "./getAllowNamesWithCaseReferences";
import { getCurrentAllowNames } from "./getCurrentAllowNames";
import { getFilenamePathWithoutRoot } from "./getFilenamePathWithoutRoot";
import { getFileNameWithoutExtension } from "./getFileNameWithoutExtension";
import { isCorrectNameType } from "./isCorrectNameType";
import { isNameValid } from "./isNameValid";
import { removeFilenameParts } from "./removeFilenameParts";
import { replaceReferencesWithData } from "./replaceReferencesWithData";
import { ESLINT_ERRORS } from "../namingRules.consts";
import { FileNamingRules, NameType } from "../namingRules.types";

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
    context: { filename, report, options, settings },
    node,
    nameType,
}: ValidateNameProps): void => {
    const filenamePath = getFilenamePathWithoutRoot({ filename, settings });

    const fileRules = options.find(({ filePattern }) =>
        micromatch.every(filenamePath, filePattern),
    );

    if (!fileRules) return;

    fileRules.rules.forEach((rule) => {
        if (!isCorrectNameType({ nameType, ruleNameType: rule.nameType }))
            return;

        const { allowNames, allowNamesFileRoot, filenamePartsToRemove } = rule;

        const currentAllowNames = getCurrentAllowNames({
            allowNames,
            allowNamesFileRoot,
            nameType,
            node,
        });

        if (!currentAllowNames) return;

        const filenameWithoutExtension =
            getFileNameWithoutExtension(filenamePath);

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
                allowNamesWithoutReferences: JSON.stringify(
                    allowNamesWithCaseReferences,
                ),
            },
        });
    });
};
