import {
  PASCAL_CASE,
  CAMEL_CASE,
  SNAKE_CASE_LOWER,
  SNAKE_CASE_UPPER,
} from "consts";

import { transformStringToCase } from "rules/namingRules/helpers/transformStringToCase";
import {
  DEFAULT_ALLOW_NAMES,
  REFERENCES,
} from "rules/namingRules/namingRules.consts";
import { NamingRule } from "rules/namingRules/namingRules.types";

interface ReplaceReferencesWithDataProps {
  filenameWithoutParts: string;
  allowNames: NamingRule["allowNames"];
}

export const replaceReferencesWithData = ({
  allowNames,
  filenameWithoutParts,
}: ReplaceReferencesWithDataProps): string[] =>
  (allowNames ?? DEFAULT_ALLOW_NAMES).map((pattern) =>
    pattern
      .replaceAll(REFERENCES.PascalCase, PASCAL_CASE)
      .replaceAll(REFERENCES.camelCase, CAMEL_CASE)
      .replaceAll(REFERENCES.snake_case, SNAKE_CASE_LOWER)
      .replaceAll(REFERENCES.SNAKE_CASE, SNAKE_CASE_UPPER)
      .replaceAll(
        REFERENCES.filename_PascalCase,
        transformStringToCase(filenameWithoutParts, "PascalCase"),
      )
      .replaceAll(
        REFERENCES.filename_snake_case,
        transformStringToCase(filenameWithoutParts, "snake_case"),
      )
      .replaceAll(
        REFERENCES.filename_SNAKE_CASE,
        transformStringToCase(filenameWithoutParts, "SNAKE_CASE"),
      )
      .replaceAll(
        REFERENCES.filename_camelCase,
        transformStringToCase(filenameWithoutParts, "camelCase"),
      ),
  );
