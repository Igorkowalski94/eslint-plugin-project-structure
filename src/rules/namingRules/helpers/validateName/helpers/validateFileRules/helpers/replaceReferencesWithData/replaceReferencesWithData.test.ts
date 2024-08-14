import {
  CAMEL_CASE,
  PASCAL_CASE,
  SNAKE_CASE_LOWER,
  SNAKE_CASE_UPPER,
} from "consts";

import { replaceReferencesWithData } from "rules/namingRules/helpers/validateName/helpers/validateFileRules/helpers/replaceReferencesWithData/replaceReferencesWithData";
import { NamingRule } from "rules/namingRules/namingRules.types";

describe("replaceReferencesWithData", () => {
  test.each<{
    filenameWithoutParts: string;
    allowNames?: NamingRule["allowNames"];
    expected: NamingRule["allowNames"];
  }>([
    {
      filenameWithoutParts: "component-name",
      expected: [CAMEL_CASE, PASCAL_CASE],
    },

    {
      filenameWithoutParts: "componentName",
      allowNames: [
        "{PascalCase}",
        "{camelCase}",
        "{snake_case}",
        "{SNAKE_CASE}",
      ],
      expected: [PASCAL_CASE, CAMEL_CASE, SNAKE_CASE_LOWER, SNAKE_CASE_UPPER],
    },
    {
      filenameWithoutParts: "helperName1",
      allowNames: [
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
    ({ allowNames, filenameWithoutParts, expected }) => {
      expect(
        replaceReferencesWithData({
          allowNames,
          filenameWithoutParts,
        }),
      ).toEqual(expected);
    },
  );
});
