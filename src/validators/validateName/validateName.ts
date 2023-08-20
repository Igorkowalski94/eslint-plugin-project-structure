import { getInvalidNameError } from "./helpers/getInvalidNameError";
import { getIsRegex } from "./helpers/getIsRegex";
import { getNameError } from "./helpers/getNameError";
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

    if (getIsRegex(ruleName))
        return validateRegexPattern({
            nodeName,
            parentName,
            regex: ruleName,
            regexParameters,
        });

    if (ruleName === nodeName) return;

    throw getNameError(nodeName, ruleName);
};
