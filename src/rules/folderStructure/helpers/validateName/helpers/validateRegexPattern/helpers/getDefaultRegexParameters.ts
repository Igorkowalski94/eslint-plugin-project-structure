import { getLowerCaseFirstLetter } from "./getLowerCaseFirstLetter";
import { getUpperCaseFirstLetter } from "./getUpperCaseFirstLetter";
import {
    CAMEL_CASE,
    KEBAB_CASE,
    PASCAL_CASE,
    SNAKE_CASE_LOWER,
    SNAKE_CASE_UPPER,
} from "../../../../../../../consts";
import { RegexParameters } from "../../../../../folderStructure.types";

export const getDefaultRegexParameters = (
    parentName: string,
    regexParameters: RegexParameters = {},
): Record<string, string> => ({
    PascalCase: PASCAL_CASE,
    camelCase: CAMEL_CASE,
    snake_case: SNAKE_CASE_LOWER,
    SNAKE_CASE: SNAKE_CASE_UPPER,
    "kebab-case": KEBAB_CASE,
    ...regexParameters,
    ParentName: getUpperCaseFirstLetter(parentName),
    parentName: getLowerCaseFirstLetter(parentName),
});
8;
