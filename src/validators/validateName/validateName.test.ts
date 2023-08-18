import { getInvalidNameError } from "./helpers/getInvalidNameError";
import { getNameError } from "./helpers/getNameError";
import { getNameRegexError } from "./helpers/validateRegexPattern/helpers/getNameRegexError";
import { validateName } from "./validateName";

describe("validateName", () => {
    it.each([0, 1, [], [1], null, undefined])(
        "should throw error when ruleName is invalid, ruleName =  %s",
        (ruleName) => {
            expect(() =>
                validateName(
                    "componentName.api",
                    ruleName as unknown as string,
                    "parentName",
                ),
            ).toThrow(getInvalidNameError(ruleName));
        },
    );

    it("should not throw error when nodeName match regex", () => {
        expect(() =>
            validateName(
                "componentName.api",
                "/^.*\\.(types|api)$/",
                "parentName",
            ),
        ).not.toThrow();
    });

    it("should throw error when nodeName not match regex", () => {
        expect(() =>
            validateName(
                "componentName.apxi",
                "/^.*\\.(types|api)$/",
                "parentName",
            ),
        ).toThrow(
            getNameRegexError("componentName.apxi", "/^.*\\.(types|api)$/"),
        );
    });

    it("should not throw error when nodeName === ruleName", () => {
        expect(
            validateName("componentName", "componentName", "parentName"),
        ).toEqual(undefined);
    });

    it("should throw error when nodeName !== ruleName", () => {
        expect(() =>
            validateName("componentName", "XcomponentName", "parentName"),
        ).toThrow(getNameError("componentName", "XcomponentName"));
    });
});
