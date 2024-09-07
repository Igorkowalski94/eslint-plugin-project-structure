import {
  PASCAL_CASE,
  CAMEL_CASE,
  SNAKE_CASE_LOWER,
  SNAKE_CASE_UPPER,
  KEBAB_CASE,
  STRICT_CAMEL_CASE,
  STRICT_PASCAL_CASE,
} from "consts";
import { RegexParameters } from "types";

import { transformStringToCase } from "helpers/transformStringToCase";

interface GetDefaultRegexParametersProps {
  folderName: string;
  regexParameters?: RegexParameters;
}

export const getDefaultRegexParameters = ({
  folderName,
  regexParameters = {},
}: GetDefaultRegexParametersProps): RegexParameters => ({
  camelCase: CAMEL_CASE,
  PascalCase: PASCAL_CASE,
  strictCamelCase: STRICT_CAMEL_CASE,
  StrictPascalCase: STRICT_PASCAL_CASE,
  snake_case: SNAKE_CASE_LOWER,
  SNAKE_CASE: SNAKE_CASE_UPPER,
  "kebab-case": KEBAB_CASE,
  ...regexParameters,
  folderName: transformStringToCase({
    str: folderName,
    transformTo: "camelCase",
  }),
  FolderName: transformStringToCase({
    str: folderName,
    transformTo: "PascalCase",
  }),
  "folder-name": transformStringToCase({
    str: folderName,
    transformTo: "kebab-case",
  }),
  folder_name: transformStringToCase({
    str: folderName,
    transformTo: "snake_case",
  }),
  FOLDER_NAME: transformStringToCase({
    str: folderName,
    transformTo: "SNAKE_CASE",
  }),
});
