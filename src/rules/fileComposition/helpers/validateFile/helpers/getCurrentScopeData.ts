import { ESLINT_ERRORS } from "rules/fileComposition/fileComposition.consts";
import { Scope } from "rules/fileComposition/fileComposition.types";

interface GetCurrentScopeDataProps {
  isFileExport: boolean;
  isFileRoot: boolean;
}

export interface GetCurrentScopeDataReturn {
  scope: Scope;
  errorMessageId: keyof typeof ESLINT_ERRORS;
}

export const getCurrentScopeData = ({
  isFileExport,
  isFileRoot,
}: GetCurrentScopeDataProps): GetCurrentScopeDataReturn => {
  if (isFileExport)
    return {
      scope: "fileExport",
      errorMessageId: "prohibitedSelectorExport",
    };

  if (isFileRoot)
    return {
      scope: "fileRoot",
      errorMessageId: "prohibitedSelectorRoot",
    };

  return {
    scope: "nestedSelectors",
    errorMessageId: "prohibitedSelectorNested",
  };
};
