import { getIdRuleError } from "rules/folderStructure/errors/getIdRuleError";
import {
    Rule,
    FolderStructureConfig,
} from "rules/folderStructure/folderStructure.types";
import { getRule } from "rules/folderStructure/helpers/getRule";

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
