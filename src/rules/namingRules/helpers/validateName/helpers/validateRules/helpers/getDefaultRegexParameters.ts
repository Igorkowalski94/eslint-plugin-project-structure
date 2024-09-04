import {
  PASCAL_CASE,
  CAMEL_CASE,
  SNAKE_CASE_LOWER,
  SNAKE_CASE_UPPER,
  STRICT_CAMEL_CASE,
  STRICT_PASCAL_CASE,
} from "consts";
import { RegexParameters } from "types";

import { transformStringToCase } from "helpers/transformStringToCase";

interface GetDefaultRegexParametersProps {
  fileName: string;
  regexParameters?: RegexParameters;
}

export const getDefaultRegexParameters = ({
  fileName,
  regexParameters = {},
}: GetDefaultRegexParametersProps): RegexParameters => ({
  camelCase: CAMEL_CASE,
  PascalCase: PASCAL_CASE,
  strictCamelCase: STRICT_CAMEL_CASE,
  StrictPascalCase: STRICT_PASCAL_CASE,
  snake_case: SNAKE_CASE_LOWER,
  SNAKE_CASE: SNAKE_CASE_UPPER,
  ...regexParameters,
  fileName: transformStringToCase({
    str: fileName,
    transformTo: "camelCase",
  }),
  FileName: transformStringToCase({
    str: fileName,
    transformTo: "PascalCase",
  }),
  file_name: transformStringToCase({
    str: fileName,
    transformTo: "snake_case",
  }),
  FILE_NAME: transformStringToCase({
    str: fileName,
    transformTo: "SNAKE_CASE",
  }),
});
