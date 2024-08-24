import {
  PASCAL_CASE,
  CAMEL_CASE,
  SNAKE_CASE_LOWER,
  SNAKE_CASE_UPPER,
} from "consts";

import { validateReferences } from "helpers/validateReferences/validateReferences";

import { transformStringToCase } from "rules/namingRules/helpers/validateName/helpers/validateRules/helpers/replaceReferencesWithData/helpers/transformStringToCase";
import { DEFAULT_FORMAT } from "rules/namingRules/helpers/validateName/helpers/validateRules/helpers/replaceReferencesWithData/replaceReferencesWithData.consts";
import { REFERENCES } from "rules/namingRules/helpers/validateName/helpers/validateRules/validateRules.consts";
import { NamingRule } from "rules/namingRules/namingRules.types";

interface ReplaceReferencesWithDataProps {
  filenameWithoutParts: string;
  format: NamingRule["format"];
}

export const replaceReferencesWithData = ({
  format,
  filenameWithoutParts,
}: ReplaceReferencesWithDataProps): string[] =>
  (format ?? DEFAULT_FORMAT).map((pattern) => {
    validateReferences({ pattern, allowedReferences: Object.keys(REFERENCES) });

    return pattern
      .replaceAll(REFERENCES.PascalCase, PASCAL_CASE)
      .replaceAll(REFERENCES.camelCase, CAMEL_CASE)
      .replaceAll(REFERENCES.snake_case, SNAKE_CASE_LOWER)
      .replaceAll(REFERENCES.SNAKE_CASE, SNAKE_CASE_UPPER)
      .replaceAll(
        REFERENCES.filename_PascalCase,
        transformStringToCase({
          str: filenameWithoutParts,
          transformTo: "PascalCase",
        }),
      )
      .replaceAll(
        REFERENCES.filename_snake_case,
        transformStringToCase({
          str: filenameWithoutParts,
          transformTo: "snake_case",
        }),
      )
      .replaceAll(
        REFERENCES.filename_SNAKE_CASE,
        transformStringToCase({
          str: filenameWithoutParts,
          transformTo: "SNAKE_CASE",
        }),
      )
      .replaceAll(
        REFERENCES.filename_camelCase,
        transformStringToCase({
          str: filenameWithoutParts,
          transformTo: "camelCase",
        }),
      );
  });
