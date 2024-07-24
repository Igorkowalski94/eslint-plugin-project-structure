import { TSESTree } from "@typescript-eslint/utils";
import { RuleContext } from "@typescript-eslint/utils/dist/ts-eslint";
import micromatch from "micromatch";

import { getFilenamePathWithoutRoot } from "./getFilenamePathWithoutRoot";
import { getFileNameWithoutExtension } from "./getFileNameWithoutExtension";
import { isNameValid } from "./isNameValid";
import { removeFilenameParts } from "./removeFilenameParts";
import { replaceReferencesWithData } from "./replaceReferencesWithData";
import { shouldIgnoreFilenameReferences } from "./shouldIgnoreFilenameReferences";
import { ESLINT_ERRORS } from "../namingRules.consts";
import { NamingRule, NameType } from "../namingRules.types";

interface ValidateNameProps {
    name: string;
    context: RuleContext<keyof typeof ESLINT_ERRORS, NamingRule[]>;
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

    const rule = options.find(({ filePattern }) =>
        micromatch.every(filenamePath, filePattern),
    );

    if (!rule) return;

    if (Array.isArray(rule.nameType) && !rule.nameType.includes(nameType))
        return;

    if (typeof rule.nameType === "string" && rule.nameType !== nameType) return;

    const { allowNames, filenamePartsToRemove } = rule;

    const filenameWithoutExtension = getFileNameWithoutExtension(filenamePath);

    const filenameWithoutParts = removeFilenameParts({
        filenameWithoutExtension,
        filenamePartsToRemove,
    });

    const allowNamesWithoutReference = replaceReferencesWithData({
        allowNames,
        filenameWithoutParts,
        ignoreFilenameReferences: shouldIgnoreFilenameReferences({
            nameType,
            node,
        }),
    });

    const isValidExport = isNameValid({
        allowNamesWithoutReference,
        name,
    });

    if (isValidExport) return;

    report({
        node,
        messageId: "invalidName",
        data: {
            allowNamesWithoutReference: JSON.stringify(
                allowNamesWithoutReference,
            ),
        },
    });
};
