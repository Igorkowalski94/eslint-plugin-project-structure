import { getInheritName } from "./helpers/getInheritName/getInheritName";
import { getRegexWithInheritName } from "./helpers/getRegexWithInheritName";
import { getNameError } from "../../helpers/getNameError";
import { validateRegexPattern } from "../../helpers/validateRegexPattern/validateRegexPattern";
import { NameBase } from "../../types";

export const validateInheritParentName = (
    nodeName: string,
    parentName: string,
    { regex, inheritParentName }: NameBase,
): void => {
    if (!inheritParentName) return;

    const inheritName = getInheritName(parentName, inheritParentName);

    if (!regex) {
        if (nodeName === inheritName) return;

        throw getNameError(nodeName, inheritName);
    }
    const regexWithInheritName = getRegexWithInheritName(regex, inheritName);

    validateRegexPattern(nodeName, regexWithInheritName);
};
