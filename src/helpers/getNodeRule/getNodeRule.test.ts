import { getNodeRule } from "./getNodeRule";

describe("getNodeRule", () => {
    it("should throw error when rule ruleId do not exist in rules object", () => {
        expect(() =>
            getNodeRule(
                { ruleId: "test" },
                {
                    structure: {},
                },
            ),
        ).toThrow();
    });

    it("should return rule ruleId when rule exist in rules object", () => {
        expect(
            getNodeRule(
                { ruleId: "test" },
                {
                    structure: {},
                    rules: {
                        test: {},
                    },
                },
            ),
        ).toEqual({});
    });

    it("should return rule when rule is not ruleId", () => {
        expect(
            getNodeRule(
                { name: "ComponentName" },
                {
                    structure: {},
                },
            ),
        ).toEqual({ name: "ComponentName" });
    });
});
