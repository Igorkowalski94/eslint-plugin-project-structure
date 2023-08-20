import { getLowerCaseFirstLetter } from "./getLowerCaseFirstLetter";
import { getUpperCaseFirstLetter } from "./getUpperCaseFirstLetter";
import { RegexParameters } from "../../../../../types";
import {
    PASCAL_CASE,
    CAMEL_CASE,
    SNAKE_CASE,
    KEBAB_CASE,
} from "../validateRegexPattern.consts";

export const getDefaultRegexParameters = (
    parentName: string,
    regexParameters: RegexParameters = {},
): Record<string, string> => ({
    PascalCase: PASCAL_CASE,
    camelCase: CAMEL_CASE,
    snake_case: SNAKE_CASE,
    "kebab-case": KEBAB_CASE,
    "dash-case": KEBAB_CASE,
    ...regexParameters,
    ParentName: getUpperCaseFirstLetter(parentName),
    parentName: getLowerCaseFirstLetter(parentName),
});
8;
