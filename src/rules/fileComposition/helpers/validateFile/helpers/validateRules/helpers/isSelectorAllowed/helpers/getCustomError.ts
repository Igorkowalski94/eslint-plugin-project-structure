import {
  CustomErrors,
  SelectorType,
} from "rules/fileComposition/fileComposition.types";

interface GetCustomErrorProps {
  selectorKey: SelectorType;
  errors?: CustomErrors;
}

export const getCustomError = ({
  selectorKey,
  errors,
}: GetCustomErrorProps): string => {
  if (!errors?.[selectorKey]) return "";

  return `\n\n${errors[selectorKey]}\n\n`;
};
