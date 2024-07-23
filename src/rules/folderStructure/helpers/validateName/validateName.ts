import { isRegex } from "./helpers/isRegex";
import { isRegexInvalid } from "./helpers/isRegexInvalid";
import { validateRegexPattern } from "./helpers/validateRegexPattern/validateRegexPattern";
import { getInvalidNameError } from "../../errors/getInvalidNameError";
import { getInvalidRegexError } from "../../errors/getInvalidRegexError";
import { getNameError } from "../../errors/getNameError";
import { RegexParameters } from "../../folderStructure.types";

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
