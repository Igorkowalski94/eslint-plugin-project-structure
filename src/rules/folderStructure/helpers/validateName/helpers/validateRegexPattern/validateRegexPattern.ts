import { applyRegexParameters } from "./helpers/applyRegexParameters";
import { getNameRegexError } from "../../../../errors/getNameRegexError";
import { RegexParameters } from "../../../../folderStructure.types";

export interface ValidateRegexPattern {
    nodeName: string;
    parentName: string;
    regex: string;
    regexParameters?: RegexParameters;
}

export const validateRegexPattern = ({
    nodeName,
    parentName,
    regex,
    regexParameters,
}: ValidateRegexPattern): void => {
    let currentRegex = regex;

    currentRegex = applyRegexParameters({
        regex: currentRegex,
        parentName,
        regexParameters,
    });

    const cleanedRegex = (
        currentRegex.match(/^\/(.+)\/$/) as RegExpMatchArray
    )[1];

    const regexp = new RegExp(cleanedRegex, "g");

    if (regexp.test(nodeName)) return;

    throw getNameRegexError(nodeName, regex);
};
