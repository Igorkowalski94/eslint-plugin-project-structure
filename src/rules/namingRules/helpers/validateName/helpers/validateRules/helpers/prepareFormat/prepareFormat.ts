import { RegexParameters } from "types";

import { getRegexWithoutReferences } from "helpers/getRegexWithoutReferences/getRegexWithoutReferences";

import { getDefaultRegexParameters } from "rules/namingRules/helpers/validateName/helpers/validateRules/helpers/getDefaultRegexParameters";
import { DEFAULT_FORMAT } from "rules/namingRules/helpers/validateName/helpers/validateRules/helpers/prepareFormat/prepareFormat.consts";
import { NamingRule } from "rules/namingRules/namingRules.types";

interface PrepareFormatProps {
  filenameWithoutParts: string;
  format: NamingRule["format"];
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
      regex,
      regexParameters: defaultRegexParameters,
      key: "format",
    }),
  );

  return {
    formatWithoutReferences,
    formatWithReferences: currentFormat,
  };
};
