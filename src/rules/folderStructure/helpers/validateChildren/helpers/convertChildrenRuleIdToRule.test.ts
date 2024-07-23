import { convertChildrenRuleIdToRule } from "./convertChildrenRuleIdToRule";

describe("convertChildrenRuleIdToRule", () => {
    const children = [{ ruleId: "ruleId" }, { name: "name2" }];
    const childrenConverted = [{ name: "name1" }, { name: "name2" }];
    const config = {
        structure: {
            name: "src",
            children,
        },
        rules: {
            ruleId: {
                name: "name1",
            },
        },
    };

    it("should convert children ruleId to rule", () => {
        expect(convertChildrenRuleIdToRule(children, config)).toEqual(
            childrenConverted,
        );
    });
});
