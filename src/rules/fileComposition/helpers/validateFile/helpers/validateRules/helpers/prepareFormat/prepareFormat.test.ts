import {
  CAMEL_CASE,
  PASCAL_CASE,
  SNAKE_CASE_LOWER,
  SNAKE_CASE_UPPER,
  STRICT_PASCAL_CASE,
} from "consts";

import { FileRule } from "rules/fileComposition/fileComposition.types";
import {
  prepareFormat,
  PrepareFormatReturn,
} from "rules/fileComposition/helpers/validateFile/helpers/validateRules/helpers/prepareFormat/prepareFormat";

describe("prepareFormat", () => {
  test.each<{
    filenameWithoutParts: string;
    format?: FileRule["format"];
    expected: PrepareFormatReturn;
  }>([
    {
      filenameWithoutParts: "component-name",
      expected: {
        formatWithReferences: ["{camelCase}"],
        formatWithoutReferences: [CAMEL_CASE],
      },
    },
    {
      filenameWithoutParts: "component-name",
      format: "{StrictPascalCase}",
      expected: {
        formatWithReferences: ["{StrictPascalCase}"],
        formatWithoutReferences: [STRICT_PASCAL_CASE],
      },
    },
    {
      filenameWithoutParts: "componentName",
      format: ["{PascalCase}", "{camelCase}", "{snake_case}", "{SNAKE_CASE}"],
      expected: {
        formatWithReferences: [
          "{PascalCase}",
          "{camelCase}",
          "{snake_case}",
          "{SNAKE_CASE}",
        ],
        formatWithoutReferences: [
          PASCAL_CASE,
          CAMEL_CASE,
          SNAKE_CASE_LOWER,
          SNAKE_CASE_UPPER,
        ],
      },
    },
    {
      filenameWithoutParts: "helperNNName1",
      format: [
        "{fileName}",
        "{FileName}",
        "{file_name}",
        "{FILE_NAME}",
        "{FileName}Props",
        "{FileName}Return",
      ],
      expected: {
        formatWithReferences: [
          "{fileName}",
          "{FileName}",
          "{file_name}",
          "{FILE_NAME}",
          "{FileName}Props",
          "{FileName}Return",
        ],
        formatWithoutReferences: [
          "helperNNName1",
          "HelperNNName1",
          "helper_nnname_1",
          "HELPER_NNNAME_1",
          "HelperNNName1Props",
          "HelperNNName1Return",
        ],
      },
    },
    {
      filenameWithoutParts: "HELPERNAME1",
      format: [
        "{fileName}",
        "{FileName}",
        "{file_name}",
        "{FILE_NAME}",
        "{FileName}Props",
        "{FileName}Return",
      ],
      expected: {
        formatWithReferences: [
          "{fileName}",
          "{FileName}",
          "{file_name}",
          "{FILE_NAME}",
          "{FileName}Props",
          "{FileName}Return",
        ],
        formatWithoutReferences: [
          "helpername1",
          "Helpername1",
          "helpername_1",
          "HELPERNAME_1",
          "Helpername1Props",
          "Helpername1Return",
        ],
      },
    },
  ])(
    "Should return correct values for %o",
    ({ format, filenameWithoutParts, expected }) => {
      expect(
        prepareFormat({
          format,
          filenameWithoutParts,
        }),
      ).toEqual(expected);
    },
  );
});
