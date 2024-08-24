import { getInvalidRegexError } from "errors/getInvalidRegexError";

import { isRegexInvalid } from "helpers/isRegexInvalid";

import { NamingRule } from "rules/namingRules/namingRules.types";

interface IsNameValidProps {
  name: string;
  formatWithoutReferences: NamingRule["format"];
}

export const isNameValid = ({
  formatWithoutReferences,
  name,
}: IsNameValidProps): boolean =>
  Boolean(
    formatWithoutReferences?.some((pattern) => {
      if (isRegexInvalid(pattern)) throw getInvalidRegexError(pattern);

      const regexp = new RegExp(`^${pattern}$`, "g");

      return regexp.test(name);
    }),
  );
