import { getIdRule } from "./getIdRule";
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
