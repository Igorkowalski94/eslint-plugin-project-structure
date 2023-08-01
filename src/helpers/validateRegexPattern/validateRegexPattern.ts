import { getIsRegexCorrect } from "./helpers/getIsRegexCorrect";
import { getNameRegexError } from "./helpers/getNameRegexError";
import { getIncorrectRegexError } from "./helpers/getRegexError";

export const validateRegexPattern = (nodeName: string, regex: string): void => {
    if (!getIsRegexCorrect(regex)) throw getIncorrectRegexError(regex);

    const cleanedRegex = (regex.match(/^\/(.+)\/$/) as RegExpMatchArray)[1];

    const regexp = new RegExp(cleanedRegex, "g");

    if (regexp.test(nodeName)) return;

    throw getNameRegexError(nodeName, cleanedRegex);
};
