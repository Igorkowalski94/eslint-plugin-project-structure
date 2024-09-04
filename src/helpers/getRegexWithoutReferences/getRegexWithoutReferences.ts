import { RegexParameters } from "types";

import { validateReferences } from "helpers/getRegexWithoutReferences/helpers/validateReferences/validateReferences";

interface GetRegexWithoutReferencesProps {
  regex: string;
  regexParameters: RegexParameters;
  key: string;
}

export const getRegexWithoutReferences = ({
  regex,
  regexParameters,
  key,
}: GetRegexWithoutReferencesProps): string => {
  let currentRegex = regex;
  const regexParametersKeys = Object.keys(regexParameters);

  validateReferences({
    regex,
    allowedReferences: regexParametersKeys,
    key,
  });

  regexParametersKeys.forEach(
    (key) =>
      (currentRegex = currentRegex.replaceAll(
        `{${key}}`,
        regexParameters[key],
      )),
  );

  return currentRegex;
};
