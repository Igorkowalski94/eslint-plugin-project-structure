import { getInvalidNameError } from "./helpers/getInvalidNameError";
import { getIsRegex } from "./helpers/getIsRegex";
import { getNameError } from "./helpers/getNameError";
import { validateRegexPattern } from "./helpers/validateRegexPattern/validateRegexPattern";

export const validateName = (
    nodeName: string,
    ruleName: string,
    parentName: string,
): void => {
    if (typeof ruleName !== "string") throw getInvalidNameError(ruleName);

    if (getIsRegex(ruleName))
        return validateRegexPattern(nodeName, parentName, ruleName);

    if (ruleName === nodeName) return;

    throw getNameError(nodeName, ruleName);
};
