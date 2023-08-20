import { getIdRule } from "./getIdRule";
import { getIdRuleError } from "./helpers/getIdRuleError";
import { getInvalidRuleIdError } from "./helpers/getInvalidRuleIdError";
import { getInvalidRulesError } from "./helpers/getInvalidRulesError";
import { ProjectStructureConfig, Rule } from "../../types";

describe("getIdRule", () => {
    const testRule: Rule = {
        name: "ComponentName",
    };

    const config: ProjectStructureConfig = {
        structure: {
            name: "src",
        },
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
                        structure: {
                            name: "src",
                        },
                        rules: rules as unknown as ProjectStructureConfig["rules"],
                    },
                ),
            ).toThrow(getInvalidRulesError());
        },
    );

    it("should return rule when ruleId exist in rules object", () => {
        expect(getIdRule({ ruleId: "test" }, config)).toEqual(testRule);
    });

    it("should return idRule and add ruleId properties", () => {
        expect(
            getIdRule({ name: "FixedName", ruleId: "test" }, config),
        ).toEqual({ ...testRule, name: "FixedName" });
    });

    it("should throw error when ruleId do not exist in rules object", () => {
        expect(() => getIdRule({ ruleId: "test2" }, config)).toThrow(
            getIdRuleError("test2"),
        );
    });
});
