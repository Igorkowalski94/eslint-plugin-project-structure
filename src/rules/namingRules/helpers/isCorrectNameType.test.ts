import { isCorrectNameType } from "rules/namingRules/helpers/isCorrectNameType";
import { NamingRule, NameType } from "rules/namingRules/namingRules.types";

describe("isCorrectNameType", () => {
    test.each<{
        ruleNameType: NamingRule["nameType"];
        nameType: NameType;
        expected: boolean;
    }>([
        {
            ruleNameType: "arrowFunction",
            nameType: "ArrowFunctionExpression",
            expected: true,
        },
        {
            ruleNameType: ["arrowFunction"],
            nameType: "ArrowFunctionExpression",
            expected: true,
        },
        {
            ruleNameType: "class",
            nameType: "ArrowFunctionExpression",
            expected: false,
        },
        {
            ruleNameType: ["class"],
            nameType: "ArrowFunctionExpression",
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
