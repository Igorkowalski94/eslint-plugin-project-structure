import { getNameError } from "../../helpers/getNameError";
import { validateRegexPattern } from "../../helpers/validateRegexPattern/validateRegexPattern";
import { Name } from "../../types";

export const validateName = (nodeName: string, ruleName: Name): void => {
    if (typeof ruleName === "string") {
        if (ruleName === nodeName) return;

        throw getNameError(nodeName, ruleName);
    }

    const { regex } = ruleName;

    if (regex) validateRegexPattern(nodeName, regex);
};
