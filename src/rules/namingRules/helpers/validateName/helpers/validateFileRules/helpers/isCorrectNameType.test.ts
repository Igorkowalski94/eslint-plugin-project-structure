import { isCorrectNameType } from "rules/namingRules/helpers/validateName/helpers/validateFileRules/helpers/isCorrectNameType";
import { NameTypeRule, NamingRule } from "rules/namingRules/namingRules.types";

describe("isCorrectNameType", () => {
  test.each<{
    ruleNameType: NamingRule["nameType"];
    nameType: NameTypeRule;
    expected: boolean;
  }>([
    {
      ruleNameType: "arrowFunction",
      nameType: "arrowFunction",
      expected: true,
    },
    {
      ruleNameType: ["arrowFunction"],
      nameType: "arrowFunction",
      expected: true,
    },
    {
      ruleNameType: "class",
      nameType: "arrowFunction",
      expected: false,
    },
    {
      ruleNameType: ["class"],
      nameType: "arrowFunction",
      expected: false,
    },
  ])(
    "Should return correct values for %o",
    ({ ruleNameType, nameType, expected }) => {
      expect(
        isCorrectNameType({
          ruleNameType,
          nameType,
        }),
      ).toEqual(expected);
    },
  );
});
