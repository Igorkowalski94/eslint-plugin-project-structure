import {
  CAMEL_CASE,
  PASCAL_CASE,
  SNAKE_CASE_LOWER,
  SNAKE_CASE_UPPER,
  STRICT_PASCAL_CASE,
} from "consts";

import { replaceReferencesWithData } from "rules/namingRules/helpers/validateName/helpers/validateRules/helpers/replaceReferencesWithData/replaceReferencesWithData";
import { NamingRule } from "rules/namingRules/namingRules.types";

describe("replaceReferencesWithData", () => {
  test.each<{
    filenameWithoutParts: string;
    format?: NamingRule["format"];
    expected: NamingRule["format"];
  }>([
    {
      filenameWithoutParts: "component-name",
      expected: [CAMEL_CASE],
    },
    {
      filenameWithoutParts: "component-name",
      format: "{StrictPascalCase}",
      expected: [STRICT_PASCAL_CASE],
    },
    {
      filenameWithoutParts: "componentName",
      format: ["{PascalCase}", "{camelCase}", "{snake_case}", "{SNAKE_CASE}"],
      expected: [PASCAL_CASE, CAMEL_CASE, SNAKE_CASE_LOWER, SNAKE_CASE_UPPER],
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
      expected: [
        "helperNNName1",
        "HelperNNName1",
        "helper_nnname_1",
        "HELPER_NNNAME_1",
        "HelperNNName1Props",
        "HelperNNName1Return",
      ],
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
      expected: [
        "helpername1",
        "Helpername1",
        "helpername_1",
        "HELPERNAME_1",
        "Helpername1Props",
        "Helpername1Return",
      ],
    },
  ])(
    "Should return correct values for %o",
    ({ format, filenameWithoutParts, expected }) => {
      expect(
        replaceReferencesWithData({
          format,
          filenameWithoutParts,
        }),
      ).toEqual(expected);
    },
  );
});
