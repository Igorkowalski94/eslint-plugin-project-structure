import {
  CAMEL_CASE,
  PASCAL_CASE,
  SNAKE_CASE_LOWER,
  SNAKE_CASE_UPPER,
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
      filenameWithoutParts: "componentName",
      format: ["{PascalCase}", "{camelCase}", "{snake_case}", "{SNAKE_CASE}"],
      expected: [PASCAL_CASE, CAMEL_CASE, SNAKE_CASE_LOWER, SNAKE_CASE_UPPER],
    },
    {
      filenameWithoutParts: "helperName1",
      format: [
        "{filename_camelCase}",
        "{filename_snake_case}",
        "{filename_SNAKE_CASE}",
        "{filename_PascalCase}Props",
        "{filename_PascalCase}Return",
      ],
      expected: [
        "helperName1",
        "helper_name_1",
        "HELPER_NAME_1",
        "HelperName1Props",
        "HelperName1Return",
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
