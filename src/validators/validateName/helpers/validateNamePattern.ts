import { Type } from "../../../types";
import { throwNamePatternInvalid } from "../../../validators/validateName/helpers/throwNamePatternInvalid";

export const validateRegexPattern = (
  nodeName: string,
  regex: string,
  type: Type
) => {
  const cleanedRegex = regex.match(/^\/(.+)\/$/)?.[1];

  if (!cleanedRegex) return;

  const regexp = new RegExp(cleanedRegex, "g");

  if (regexp.test(nodeName)) return;

  return throwNamePatternInvalid(nodeName, cleanedRegex, type);
};
