import { getInvalidNameError } from "./helpers/getInvalidNameError";
import { getInvalidRegexError } from "./helpers/getInvalidRegexError";
import { getNameError } from "./helpers/getNameError";
import { isRegex } from "./helpers/isRegex";
import { isRegexInvalid } from "./helpers/isRegexInvalid";
import { validateRegexPattern } from "./helpers/validateRegexPattern/validateRegexPattern";
import { RegexParameters } from "../../types";

interface ValidateName {
    nodeName: string;
    ruleName: string;
    parentName: string;
    regexParameters?: RegexParameters;
}

export const validateName = ({
    nodeName,
    ruleName,
    parentName,
    regexParameters,
}: ValidateName): void => {
    if (typeof ruleName !== "string") throw getInvalidNameError(ruleName);
    if (isRegexInvalid(ruleName)) throw getInvalidRegexError(ruleName);

    if (isRegex(ruleName))
        return validateRegexPattern({
            nodeName,
            parentName,
            regex: ruleName,
            regexParameters,
        });

    if (ruleName === nodeName) return;

    throw getNameError(nodeName, ruleName);
};
