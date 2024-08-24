import { CustomErrors, Selector } from "rules/namingRules/namingRules.types";

interface GetCustomErrorProps {
  selector: Selector;
  errors?: CustomErrors;
}

export const getCustomError = ({
  selector,
  errors,
}: GetCustomErrorProps): string => {
  if (!errors?.[selector]) return "";

  return `\n\n${errors[selector]}\n\n`;
};
