import { getInvalidRegexError } from "../../../errors/getInvalidRegexError";
import { isRegex } from "../../../helpers/isRegex";
import { isRegexInvalid } from "../../../helpers/isRegexInvalid";
import { ExportRules } from "../exportRules.types";

interface IsExportNameValidProps {
    exportName: string;
    allowExportNamesWithoutReference: ExportRules["allowExportNames"];
}

export const isExportNameValid = ({
    allowExportNamesWithoutReference,
    exportName,
}: IsExportNameValidProps): boolean =>
    Boolean(
        allowExportNamesWithoutReference?.some((pattern) => {
            if (!isRegex(pattern) || isRegexInvalid(pattern))
                throw getInvalidRegexError(pattern);

            const cleanedRegex = (
                pattern.match(/^\/(.+)\/$/) as RegExpMatchArray
            )[1];

            const regexp = new RegExp(cleanedRegex, "g");

            return regexp.test(exportName);
        }),
    );
