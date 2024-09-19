import micromatch from "micromatch";
import { Pattern } from "types";

interface IsCorrectPatternProps {
  pattern: Pattern;
  input: string;
}

export const isCorrectPattern = ({
  input,
  pattern,
}: IsCorrectPatternProps): boolean => {
  if (typeof pattern === "string") return micromatch.every(input, pattern);

  return pattern.some((p) => micromatch.every(input, p));
};
