import { RegexParameters } from "types";

import { getInvalidRegexError } from "errors/getInvalidRegexError";

import { isRegexInvalid } from "helpers/isRegexInvalid";
import { transformStringToCase } from "helpers/transformStringToCase";

import { getNameRegexError } from "rules/folderStructure/errors/getNameRegexError";
import { REFERENCES } from "rules/folderStructure/folderStructure.consts";
import { applyRegexParameters } from "rules/folderStructure/helpers/validateName/helpers/applyRegexParameters";
import {
  DOT_CHARACTER_REGEX,
  WILDCARD_REGEX,
} from "rules/folderStructure/helpers/validateName/validateName.consts";

export interface ValidateNameProps {
  nodeName: string;
  ruleName: string;
  folderName: string;
  regexParameters?: RegexParameters;
}

export const validateName = ({
  nodeName,
  ruleName,
  folderName,
  regexParameters,
}: ValidateNameProps): void => {
  const regexImproved = ruleName
    .replaceAll(".", DOT_CHARACTER_REGEX)
    .replaceAll(`${DOT_CHARACTER_REGEX}${DOT_CHARACTER_REGEX}`, ".")
    .replaceAll("*", WILDCARD_REGEX)
    .replaceAll(`*${WILDCARD_REGEX}`, "*");

  if (isRegexInvalid(regexImproved)) throw getInvalidRegexError(regexImproved);

  const regexWithRegexParameters = applyRegexParameters({
    regex: regexImproved,
    folderName,
    regexParameters,
  });

  const finalRegex = new RegExp(`^${regexWithRegexParameters}$`, "g");

  if (finalRegex.test(nodeName)) return;

  const regexWithFolderName = ruleName
    .replaceAll(
      REFERENCES.folderName,
      transformStringToCase({
        str: folderName,
        transformTo: "camelCase",
      }),
    )
    .replaceAll(
      REFERENCES.FolderName,
      transformStringToCase({
        str: folderName,
        transformTo: "PascalCase",
      }),
    )
    .replaceAll(
      REFERENCES["folder-name"],
      transformStringToCase({
        str: folderName,
        transformTo: "kebab-case",
      }),
    )
    .replaceAll(
      REFERENCES.folder_name,
      transformStringToCase({
        str: folderName,
        transformTo: "snake_case",
      }),
    )
    .replaceAll(
      REFERENCES.FOLDER_NAME,
      transformStringToCase({
        str: folderName,
        transformTo: "SNAKE_CASE",
      }),
    );

  throw getNameRegexError(regexWithFolderName);
};
