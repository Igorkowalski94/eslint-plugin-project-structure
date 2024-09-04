import {
  PASCAL_CASE,
  CAMEL_CASE,
  SNAKE_CASE_LOWER,
  SNAKE_CASE_UPPER,
  STRICT_CAMEL_CASE,
  STRICT_PASCAL_CASE,
} from "consts";

import { REFERENCES } from "rules/namingRules/helpers/validateName/helpers/validateRules/validateRules.consts";

export const getFormatWithCaseReferences = (
  formatWithoutReferences: string[],
): string[] =>
  formatWithoutReferences.map((pattern) =>
    pattern
      .replaceAll(CAMEL_CASE, REFERENCES.camelCase)
      .replaceAll(PASCAL_CASE, REFERENCES.PascalCase)
      .replaceAll(STRICT_CAMEL_CASE, REFERENCES.strictCamelCase)
      .replaceAll(STRICT_PASCAL_CASE, REFERENCES.StrictPascalCase)
      .replaceAll(SNAKE_CASE_LOWER, REFERENCES.snake_case)
      .replaceAll(SNAKE_CASE_UPPER, REFERENCES.SNAKE_CASE),
  );
