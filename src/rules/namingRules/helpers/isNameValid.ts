import { getInvalidRegexError } from "../../../errors/getInvalidRegexError";
import { isRegex } from "../../../helpers/isRegex";
import { isRegexInvalid } from "../../../helpers/isRegexInvalid";
import { NamingRule } from "../namingRules.types";

interface IsNameValidProps {
    name: string;
    allowNamesWithoutReference: NamingRule["allowNames"];
}

export const isNameValid = ({
    allowNamesWithoutReference,
    name,
}: IsNameValidProps): boolean =>
    Boolean(
        allowNamesWithoutReference?.some((pattern) => {
            if (!isRegex(pattern) || isRegexInvalid(pattern))
                throw getInvalidRegexError(pattern);

            const cleanedRegex = (
                pattern.match(/^\/(.+)\/$/) as RegExpMatchArray
            )[1];

            const regexp = new RegExp(cleanedRegex, "g");

            return regexp.test(name);
        }),
    );
