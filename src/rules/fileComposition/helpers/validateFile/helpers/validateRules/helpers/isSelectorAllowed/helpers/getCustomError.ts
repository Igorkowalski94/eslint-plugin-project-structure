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

  if (
    typeof allowOnlySpecifiedSelectors[scope] === "object" &&
    allowOnlySpecifiedSelectors[scope][selectorType]
  )
    return `\n\n${allowOnlySpecifiedSelectors[scope][selectorType]}\n\n`;

  if (allowOnlySpecifiedSelectors.error?.[selectorType])
    return `\n\n${allowOnlySpecifiedSelectors.error[selectorType]}\n\n`;

  return "";
};
