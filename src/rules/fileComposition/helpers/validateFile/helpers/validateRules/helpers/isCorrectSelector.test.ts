import {
  Selector,
  FileRule,
} from "rules/fileComposition/fileComposition.types";
import { isCorrectSelector } from "rules/fileComposition/helpers/validateFile/helpers/validateRules/helpers/isCorrectSelector";

describe("isCorrectNameType", () => {
  test.each<{
    ruleSelector: FileRule["selector"];
    selector: Selector;
    expected: boolean;
  }>([
    {
      ruleSelector: "arrowFunction",
      selector: "arrowFunction",
      expected: true,
    },
    {
      ruleSelector: ["arrowFunction"],
      selector: "arrowFunction",
      expected: true,
    },
    {
      ruleSelector: "class",
      selector: "arrowFunction",
      expected: false,
    },
    {
      ruleSelector: ["class"],
      selector: "arrowFunction",
      expected: false,
    },
  ])(
    "Should return correct values for %o",
    ({ ruleSelector, selector, expected }) => {
      expect(
        isCorrectSelector({
          ruleSelector,
          selector,
        }),
      ).toEqual(expected);
    },
  );
});
