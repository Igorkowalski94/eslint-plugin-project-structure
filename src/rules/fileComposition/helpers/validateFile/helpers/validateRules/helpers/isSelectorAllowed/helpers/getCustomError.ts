import {
  AllowOnlySpecifiedSelectors,
  Scope,
  SelectorType,
} from "rules/fileComposition/fileComposition.types";

export interface GetCustomErrorProps {
  selectorType: SelectorType;
  allowOnlySpecifiedSelectors: AllowOnlySpecifiedSelectors | true;
  scope: Scope;
}

export const getCustomError = ({
  selectorType,
  allowOnlySpecifiedSelectors,
  scope,
}: GetCustomErrorProps): string => {
  if (allowOnlySpecifiedSelectors === true) return "";

  if (typeof allowOnlySpecifiedSelectors[scope] === "object") {
    const scopeErrors = {
      ...allowOnlySpecifiedSelectors.error,
      ...allowOnlySpecifiedSelectors[scope],
    };

    if (!scopeErrors[selectorType]) return "";

    return `\n\n${scopeErrors[selectorType]}\n\n`;
  }

  if (allowOnlySpecifiedSelectors.error?.[selectorType])
    return `\n\n${allowOnlySpecifiedSelectors.error[selectorType]}\n\n`;

  return "";
};
