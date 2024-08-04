import { applyRegexParameters } from "./helpers/applyRegexParameters";
import { getLowerCaseFirstLetter } from "./helpers/getLowerCaseFirstLetter";
import { getUpperCaseFirstLetter } from "./helpers/getUpperCaseFirstLetter";
import { DOT_CHARACTER_REGEX, WILDCARD_REGEX } from "./validateName.consts";
import { getInvalidRegexError } from "../../../../errors/getInvalidRegexError";
import { isRegexInvalid } from "../../../../helpers/isRegexInvalid";
import { getNameRegexError } from "../../errors/getNameRegexError";
import { REFERENCES } from "../../folderStructure.consts";
import { RegexParameters } from "../../folderStructure.types";

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
