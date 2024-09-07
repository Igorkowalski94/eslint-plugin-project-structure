import { RegexParameters } from "types";

import { getRegexWithoutReferences } from "helpers/getRegexWithoutReferences/getRegexWithoutReferences";

import { getDefaultRegexParameters } from "rules/folderStructure/helpers/validateFolderStructure/helpers/validatePath/helpers/validateName/helpers/getDefaultRegexParameters";

interface ApplyRegexParametersProps {
  regex: string;
  folderName: string;
  regexParameters?: RegexParameters;
}

export const applyRegexParameters = ({
  regex,
  folderName,
  regexParameters,
}: ApplyRegexParametersProps): string => {
  const defaultRegexParameters = getDefaultRegexParameters({
    folderName,
    regexParameters,
  });

  return getRegexWithoutReferences({
    regex,
    regexParameters: defaultRegexParameters,
    key: "name",
  });
};
