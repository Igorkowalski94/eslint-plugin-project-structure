import {
  PASCAL_CASE,
  CAMEL_CASE,
  SNAKE_CASE_LOWER,
  SNAKE_CASE_UPPER,
} from "consts";

import { REFERENCES } from "rules/namingRules/helpers/validateName/helpers/validateRules/validateRules.consts";

export const getFormatWithCaseReferences = (
  formatWithoutReferences: string[],
): string[] =>
  formatWithoutReferences.map((pattern) =>
    pattern
      .replaceAll(PASCAL_CASE, REFERENCES.PascalCase)
      .replaceAll(CAMEL_CASE, REFERENCES.camelCase)
      .replaceAll(SNAKE_CASE_LOWER, REFERENCES.snake_case)
      .replaceAll(SNAKE_CASE_UPPER, REFERENCES.SNAKE_CASE),
  );
