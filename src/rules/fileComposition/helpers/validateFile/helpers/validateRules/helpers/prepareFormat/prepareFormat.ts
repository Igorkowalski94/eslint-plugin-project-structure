import { WILDCARD_REGEX } from "consts";
import { RegexParameters } from "types";

import { getRegexWithoutReferences } from "helpers/getRegexWithoutReferences/getRegexWithoutReferences";

import { Rule } from "rules/fileComposition/fileComposition.types";
import { getDefaultRegexParameters } from "rules/fileComposition/helpers/validateFile/helpers/validateRules/helpers/prepareFormat/helpers/getDefaultRegexParameters";
import { DEFAULT_FORMAT } from "rules/fileComposition/helpers/validateFile/helpers/validateRules/helpers/prepareFormat/prepareFormat.consts";

interface PrepareFormatProps {
  filenameWithoutParts: string;
  format: Rule["format"];
  regexParameters?: RegexParameters;
}

export interface PrepareFormatReturn {
  formatWithoutReferences: string[];
  formatWithReferences: string[];
}

export const prepareFormat = ({
  format,
  filenameWithoutParts,
  regexParameters,
}: PrepareFormatProps): PrepareFormatReturn => {
  let currentFormat: string[] = [];

  if (!format) currentFormat = DEFAULT_FORMAT;
  if (typeof format === "string") currentFormat = [format];
  if (Array.isArray(format)) currentFormat = format;

  const defaultRegexParameters = getDefaultRegexParameters({
    fileName: filenameWithoutParts,
    regexParameters,
  });

  const formatWithoutReferences = currentFormat.map((regex) =>
    getRegexWithoutReferences({
      regex: regex
        .replaceAll("*", WILDCARD_REGEX)
        .replaceAll(`${WILDCARD_REGEX}${WILDCARD_REGEX}`, "*"),
      regexParameters: defaultRegexParameters,
      key: "format",
    }),
  );

  return {
    formatWithoutReferences,
    formatWithReferences: currentFormat,
  };
};
