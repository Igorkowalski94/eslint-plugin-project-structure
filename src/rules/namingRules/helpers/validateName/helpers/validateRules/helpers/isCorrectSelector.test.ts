import { isCorrectSelector } from "rules/namingRules/helpers/validateName/helpers/validateRules/helpers/isCorrectSelector";
import { Selector, NamingRule } from "rules/namingRules/namingRules.types";

describe("isCorrectNameType", () => {
  test.each<{
    ruleSelector: NamingRule["selector"];
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
