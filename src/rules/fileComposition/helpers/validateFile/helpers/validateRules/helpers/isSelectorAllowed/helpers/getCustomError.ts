import {
  CustomErrors,
  SelectorType,
} from "rules/fileComposition/fileComposition.types";

interface GetCustomErrorProps {
  selectorType: SelectorType;
  errors?: CustomErrors;
}

export const getCustomError = ({
  selectorType,
  errors,
}: GetCustomErrorProps): string => {
  if (!errors?.[selectorType]) return "";

  return `\n\n${errors[selectorType]}\n\n`;
};
