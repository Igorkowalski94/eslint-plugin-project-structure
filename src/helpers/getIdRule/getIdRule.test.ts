import { getIdRule } from "./getIdRule";
import { getInvalidRuleIdError } from "./helpers/getInvalidRuleIdError";
import { getInvalidRulesError } from "./helpers/getInvalidRulesError";
import { ProjectStructureConfig, Rule } from "../../types";

describe("getIdRule", () => {
    const testRule: Rule = {
        name: "ComponentName",
    };

    const config: ProjectStructureConfig = {
        structure: {},
        rules: {
            test: testRule,
        },
    };

    it.each([0, 1, {}, [], [1], null])(
        "should throw error when ruleId is invalid, ruleId =  %s",
        (ruleId) => {
            expect(() =>
                getIdRule({ ruleId: ruleId as string }, config),
            ).toThrow(getInvalidRuleIdError(ruleId));
        },
    );

    it.each([0, 1, [], [1], undefined, null])(
        "should throw error when rules are invalid, rules =  %s",
        (rules) => {
            expect(() =>
                getIdRule(
                    { ruleId: "test" },
                    {
                        structure: {},
                        rules: rules as unknown as ProjectStructureConfig["rules"],
                    },
                ),
            ).toThrow(getInvalidRulesError(rules));
        },
    );

    it("should return rule when ruleId exist in rules object", () => {
        expect(getIdRule({ ruleId: "test" }, config)).toEqual(testRule);
    });

    it("should throw error when rules object is empty", () => {
        expect(() =>
            getIdRule({ ruleId: "test2" }, { structure: {} }),
        ).toThrow();
    });

    it("should throw error when ruleId do not exist in rules object", () => {
        expect(() => getIdRule({ ruleId: "test2" }, config)).toThrow();
    });
});
