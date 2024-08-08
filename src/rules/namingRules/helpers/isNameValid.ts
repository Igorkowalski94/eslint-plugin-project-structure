import { getInvalidRegexError } from "errors/getInvalidRegexError";

import { isRegexInvalid } from "helpers/isRegexInvalid";

import { NamingRule } from "rules/namingRules/namingRules.types";

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
            if (isRegexInvalid(pattern)) throw getInvalidRegexError(pattern);

            const regexp = new RegExp(`^${pattern}$`, "g");

            return regexp.test(name);
        }),
    );
