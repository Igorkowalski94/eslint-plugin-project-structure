import { getInvalidNameError } from "./helpers/getInvalidNameError";
import { getInvalidRegexError } from "./helpers/getInvalidRegexError";
import { getNameError } from "./helpers/getNameError";
import { getNameRegexError } from "./helpers/validateRegexPattern/helpers/getNameRegexError";
import { validateName } from "./validateName";

describe("validateName", () => {
    it.each([0, 1, [], [1], null, undefined])(
        "should throw error when ruleName is invalid, ruleName =  %s",
        (ruleName) => {
            expect(() =>
                validateName({
                    nodeName: "componentName.api",
                    ruleName: ruleName as unknown as string,
                    parentName: "parentName",
                }),
            ).toThrow(getInvalidNameError(ruleName));
        },
    );

    it("should throw error when regex is invalid", () => {
        expect(() =>
            validateName({
                nodeName: "componentName.api",
                ruleName: "/^?/",
                parentName: "parentName",
            }),
        ).toThrow(getInvalidRegexError("/^?/"));
    });

    it("should not throw error when nodeName match regex", () => {
        expect(() =>
            validateName({
                nodeName: "componentName.api",
                ruleName: "/^.*\\.(types|api)$/",
                parentName: "parentName",
            }),
        ).not.toThrow();
    });

    it("should throw error when nodeName not match regex", () => {
        expect(() =>
            validateName({
                nodeName: "componentName.apxi",
                ruleName: "/^.*\\.(types|api)$/",
                parentName: "parentName",
            }),
        ).toThrow(
            getNameRegexError("componentName.apxi", "/^.*\\.(types|api)$/"),
        );
    });

    it("should not throw error when nodeName === ruleName", () => {
        expect(() =>
            validateName({
                nodeName: "componentName",
                ruleName: "componentName",
                parentName: "parentName",
            }),
        ).not.toThrow();
    });
    it("should throw error when nodeName !== ruleName", () => {
        expect(() =>
            validateName({
                nodeName: "componentName",
                ruleName: "XcomponentName",
                parentName: "parentName",
            }),
        ).toThrow(getNameError("componentName", "XcomponentName"));
    });
});
