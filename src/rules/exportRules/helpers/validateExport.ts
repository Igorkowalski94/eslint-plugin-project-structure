import { TSESTree } from "@typescript-eslint/utils";
import { RuleContext } from "@typescript-eslint/utils/dist/ts-eslint";
import micromatch from "micromatch";

import { getFileNameWithoutExtension } from "./getFileNameWithoutExtension";
import { isExportNameValid } from "./isExportNameValid";
import { removeFilenameParts } from "./removeFilenameParts";
import { replaceReferenceWithFilename } from "./replaceReferencesWithFilename";
import { ESLINT_ERRORS } from "../exportRules.consts";
import { ExportRules } from "../exportRules.types";

interface ValidateExportProps {
    exportName: string;
    context: RuleContext<keyof typeof ESLINT_ERRORS, ExportRules[]>;
    node:
        | TSESTree.Identifier
        | TSESTree.ClassDeclaration
        | TSESTree.FunctionDeclaration;
}

export const validateExport = ({
    exportName,
    context: { filename: filenamePath, report, options },
    node,
}: ValidateExportProps): void => {
    const rule = options.find(({ filePattern }) =>
        micromatch.every(filenamePath, filePattern),
    );

    if (!rule) return;

    const { allowExportNames, filenamePartsToRemove } = rule;

    const filenameWithoutExtension = getFileNameWithoutExtension(filenamePath);

    const filenameWithoutParts = removeFilenameParts({
        filenameWithoutExtension,
        filenamePartsToRemove,
    });

    const allowExportNamesWithoutReference = replaceReferenceWithFilename({
        allowExportNames,
        filenameWithoutParts,
    });

    const isValidExport = isExportNameValid({
        allowExportNamesWithoutReference,
        exportName,
    });

    if (isValidExport) return;

    report({
        node,
        messageId: "invalidExportName",
        data: {
            allowExportNamesWithoutReference: JSON.stringify(
                allowExportNamesWithoutReference,
            ),
        },
    });
};
