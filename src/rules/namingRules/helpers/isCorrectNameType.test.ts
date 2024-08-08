import { isCorrectNameType } from "rules/namingRules/helpers/isCorrectNameType";
import { NamingRule, NameType } from "rules/namingRules/namingRules.types";

describe("isCorrectNameType", () => {
    test.each<{
        ruleNameType: NamingRule["nameType"];
        nameType: NameType;
        expected: boolean;
    }>([
        {
            ruleNameType: "ArrowFunctionExpression",
            nameType: "ArrowFunctionExpression",
            expected: true,
        },
        {
            ruleNameType: ["ArrowFunctionExpression"],
            nameType: "ArrowFunctionExpression",
            expected: true,
        },
        {
            ruleNameType: "ClassDeclaration",
            nameType: "ArrowFunctionExpression",
            expected: false,
        },
        {
            ruleNameType: ["ClassDeclaration"],
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
