import { getRule } from "./getRule";
import { getIdRuleError } from "../errors/getIdRuleError";
import { FolderStructureConfig, Rule } from "../folderStructure.types";

describe("getRule", () => {
    const testRule: Rule = {
        name: "ComponentName",
    };

    const rules: FolderStructureConfig["rules"] = {
        test: testRule,
    };

    it("should return rule when ruleId exist in rules object", () => {
        expect(getRule({ rule: { ruleId: "test" }, rules })).toEqual(testRule);
    });

    it("should return idRule and add ruleId properties", () => {
        expect(
            getRule({ rule: { name: "FixedName", ruleId: "test" }, rules }),
        ).toEqual({
            ...testRule,
            name: "FixedName",
        });
    });

    it("should throw error when ruleId do not exist in rules object", () => {
        expect(() => getRule({ rule: { ruleId: "test2" }, rules })).toThrow(
            getIdRuleError("test2"),
        );
    });
});
