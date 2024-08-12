import {
  PASCAL_CASE,
  CAMEL_CASE,
  SNAKE_CASE_LOWER,
  SNAKE_CASE_UPPER,
  KEBAB_CASE,
} from "consts";

import { RegexParameters } from "rules/folderStructure/folderStructure.types";
import { getLowerCaseFirstLetter } from "rules/folderStructure/helpers/getLowerCaseFirstLetter";
import { getUpperCaseFirstLetter } from "rules/folderStructure/helpers/getUpperCaseFirstLetter";

interface GetDefaultRegexParametersProps {
  parentName: string;
  regexParameters?: RegexParameters;
}

export const getDefaultRegexParameters = ({
  parentName,
  regexParameters = {},
}: GetDefaultRegexParametersProps): Record<string, string> => ({
  PascalCase: PASCAL_CASE,
  camelCase: CAMEL_CASE,
  snake_case: SNAKE_CASE_LOWER,
  SNAKE_CASE: SNAKE_CASE_UPPER,
  "kebab-case": KEBAB_CASE,
  ...regexParameters,
  ParentName: getUpperCaseFirstLetter(parentName),
  parentName: getLowerCaseFirstLetter(parentName),
});
