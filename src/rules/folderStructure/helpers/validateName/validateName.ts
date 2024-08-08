import { getInvalidRegexError } from "errors/getInvalidRegexError";

import { isRegexInvalid } from "helpers/isRegexInvalid";

import { getNameRegexError } from "rules/folderStructure/errors/getNameRegexError";
import { REFERENCES } from "rules/folderStructure/folderStructure.consts";
import { RegexParameters } from "rules/folderStructure/folderStructure.types";
import { applyRegexParameters } from "rules/folderStructure/helpers/validateName/helpers/applyRegexParameters";
import { getLowerCaseFirstLetter } from "rules/folderStructure/helpers/validateName/helpers/getLowerCaseFirstLetter";
import { getUpperCaseFirstLetter } from "rules/folderStructure/helpers/validateName/helpers/getUpperCaseFirstLetter";
import {
    DOT_CHARACTER_REGEX,
    WILDCARD_REGEX,
} from "rules/folderStructure/helpers/validateName/validateName.consts";

export interface ValidateNameProps {
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
    const regexImproved = ruleName
        .replaceAll(".", DOT_CHARACTER_REGEX)
        .replaceAll(`${DOT_CHARACTER_REGEX}${DOT_CHARACTER_REGEX}`, ".")
        .replaceAll("*", WILDCARD_REGEX)
        .replaceAll(`*${WILDCARD_REGEX}`, "*");

    if (isRegexInvalid(regexImproved))
        throw getInvalidRegexError(regexImproved);

    const regexWithRegexParameters = applyRegexParameters({
        regex: regexImproved,
        parentName,
        regexParameters,
    });

    const finalRegex = new RegExp(`^${regexWithRegexParameters}$`, "g");

    if (finalRegex.test(nodeName)) return;

    const regexWithParentName = ruleName
        .replaceAll(REFERENCES.parentName, getLowerCaseFirstLetter(parentName))
        .replaceAll(REFERENCES.ParentName, getUpperCaseFirstLetter(parentName));

    throw getNameRegexError(regexWithParentName);
};
