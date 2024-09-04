import { RegexParameters } from "types";

import { getRegexWithoutReferences } from "helpers/getRegexWithoutReferences/getRegexWithoutReferences";

import { getDefaultRegexParameters } from "rules/namingRules/helpers/validateName/helpers/validateRules/helpers/getDefaultRegexParameters";
import { DEFAULT_FORMAT } from "rules/namingRules/helpers/validateName/helpers/validateRules/helpers/replaceReferencesWithData/replaceReferencesWithData.consts";
import { NamingRule } from "rules/namingRules/namingRules.types";

interface ReplaceReferencesWithDataProps {
  filenameWithoutParts: string;
  format: NamingRule["format"];
  regexParameters?: RegexParameters;
}

export const replaceReferencesWithData = ({
  format,
  filenameWithoutParts,
  regexParameters,
}: ReplaceReferencesWithDataProps): string[] => {
  let currentFormat: string[] = [];

  if (!format) currentFormat = DEFAULT_FORMAT;
  if (typeof format === "string") currentFormat = [format];
  if (Array.isArray(format)) currentFormat = format;

  return currentFormat.map((regex) => {
    const defaultRegexParameters = getDefaultRegexParameters({
      fileName: filenameWithoutParts,
      regexParameters,
    });

    return getRegexWithoutReferences({
      regex,
      regexParameters: defaultRegexParameters,
      key: "format",
    });
  });
};
