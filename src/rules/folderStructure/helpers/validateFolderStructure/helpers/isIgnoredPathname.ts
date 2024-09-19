import { Pattern } from "types";

import { isCorrectPattern } from "helpers/isCorrectPattern";

interface IsIgnoredPathnameProps {
  pathname: string;
  ignorePatterns?: Pattern;
}

export const isIgnoredPathname = ({
  pathname,
  ignorePatterns,
}: IsIgnoredPathnameProps): boolean => {
  if (!ignorePatterns) return false;

  return isCorrectPattern({ input: pathname, pattern: ignorePatterns });
};
