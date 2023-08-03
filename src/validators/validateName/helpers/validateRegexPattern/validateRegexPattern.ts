import { getLowerCaseFirstLetter } from "./helpers/getLowerCaseFirstLetter";
import { getNameRegexError } from "./helpers/getNameRegexError";
import { getUpperCaseFirstLetter } from "./helpers/getUpperCaseFirstLetter";
import {
    CAMEL_CASE,
    KEBAB_CASE,
    PASCAL_CASE,
    SNAKE_CASE,
} from "./validateRegexPattern.consts";

export const validateRegexPattern = (
    nodeName: string,
    parentName: string,
    regex: string,
): void => {
    let currentRegex = regex;
    currentRegex = currentRegex.replace(
        "${{ParentName}}",
        getUpperCaseFirstLetter(parentName),
    );
    currentRegex = currentRegex.replace(
        "${{parentName}}",
        getLowerCaseFirstLetter(parentName),
    );
    currentRegex = currentRegex.replace("${{PascalCase}}", `${PASCAL_CASE}`);
    currentRegex = currentRegex.replace("${{camelCase}}", `${CAMEL_CASE}`);
    currentRegex = currentRegex.replace("${{snake_case}}", `${SNAKE_CASE}`);
    currentRegex = currentRegex.replace("${{kebab-case}}", `${KEBAB_CASE}`);
    currentRegex = currentRegex.replace("${{dash-case}}", `${KEBAB_CASE}`);

    const cleanedRegex = (
        currentRegex.match(/^\/(.+)\/$/) as RegExpMatchArray
    )[1];

    const regexp = new RegExp(cleanedRegex, "g");

    if (regexp.test(nodeName)) return;

    throw getNameRegexError(nodeName, regex);
};
