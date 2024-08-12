import micromatch from "micromatch";

interface IsIgnoredPathnameProps {
  pathname: string;
  ignorePatterns?: string[];
}

export const isIgnoredPathname = ({
  pathname,
  ignorePatterns,
}: IsIgnoredPathnameProps): boolean => {
  if (!ignorePatterns) return false;

  return micromatch.some(pathname, ignorePatterns);
};
