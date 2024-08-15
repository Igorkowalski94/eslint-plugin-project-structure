import { validateReferences } from "helpers/validateReferences/validateReferences";

import { RegexParameters } from "rules/folderStructure/folderStructure.types";
import { getDefaultRegexParameters } from "rules/folderStructure/helpers/validateName/helpers/getDefaultRegexParameters";

interface ApplyRegexParametersProps {
  regex: string;
  parentName: string;
  regexParameters?: RegexParameters;
}

export const applyRegexParameters = ({
  regex,
  parentName,
  regexParameters,
}: ApplyRegexParametersProps): string => {
  let currentRegex = regex;

  const defaultRegexParameters = getDefaultRegexParameters({
    parentName,
    regexParameters,
  });

  const regexParametersKeys = Object.keys(defaultRegexParameters);

  validateReferences({
    pattern: regex,
    allowedReferences: regexParametersKeys,
  });

  regexParametersKeys.forEach(
    (key) =>
      (currentRegex = currentRegex.replaceAll(
        `{${key}}`,
        defaultRegexParameters[key],
      )),
  );

  return currentRegex;
};
