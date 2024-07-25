import { getInvalidRegexError } from "../../../errors/getInvalidRegexError";
import { isRegex } from "../../../helpers/isRegex";
import { isRegexInvalid } from "../../../helpers/isRegexInvalid";
import { NamingRule } from "../namingRules.types";

interface IsNameValidProps {
    name: string;
    allowNamesWithoutReferences: NamingRule["allowNames"];
}

export const isNameValid = ({
    allowNamesWithoutReferences,
    name,
}: IsNameValidProps): boolean =>
    Boolean(
        allowNamesWithoutReferences?.some((pattern) => {
            if (!isRegex(pattern) || isRegexInvalid(pattern))
                throw getInvalidRegexError(pattern);

            const cleanedRegex = (
                pattern.match(/^\/(.+)\/$/) as RegExpMatchArray
            )[1];

            const regexp = new RegExp(cleanedRegex, "g");

            return regexp.test(name);
        }),
    );
