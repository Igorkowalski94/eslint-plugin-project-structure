import { getInvalidRegexError } from "errors/getInvalidRegexError";

import { isRegexInvalid } from "helpers/isRegexInvalid";

interface IsNameValidProps {
  name: string;
  formatWithoutReferences: string[];
}

export const isNameValid = ({
  formatWithoutReferences,
  name,
}: IsNameValidProps): boolean =>
  formatWithoutReferences.some((pattern) => {
    if (isRegexInvalid(pattern)) throw getInvalidRegexError(pattern);

    const regexp = new RegExp(`^${pattern}$`, "g");

    return regexp.test(name);
  });
