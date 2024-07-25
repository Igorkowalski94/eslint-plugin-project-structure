import { validateRegexPattern } from "./helpers/validateRegexPattern/validateRegexPattern";
import { getInvalidRegexError } from "../../../../errors/getInvalidRegexError";
import { isRegex } from "../../../../helpers/isRegex";
import { isRegexInvalid } from "../../../../helpers/isRegexInvalid";
import { getInvalidNameError } from "../../errors/getInvalidNameError";
import { getNameError } from "../../errors/getNameError";
import { RegexParameters } from "../../folderStructure.types";

interface ValidateNameProps {
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
}: ValidateNameProps): void => {
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
