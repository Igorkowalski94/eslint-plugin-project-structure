import { getNameRegexError } from "./helpers/getNameRegexError";
import { getIncorrectRegexError } from "./helpers/getRegexError";
import { validateRegexPattern } from "./validateRegexPattern";

describe("validateRegexPattern", () => {
    it("should not throw error when regex is correct", () => {
        expect(() =>
            validateRegexPattern("componentName.api", "/^.*\\.(types|api)$/"),
        ).not.toThrow();
    });

    it("should throw error when nodeName do not match regex pattern", () => {
        expect(() =>
            validateRegexPattern("componentName.a2pi", "/^.*\\.(types|api)$/"),
        ).toThrow(
            getNameRegexError("componentName.a2pi", "^.*\\.(types|api)$"),
        );
    });

    it("should throw error when regex is incorrect", () => {
        expect(() => validateRegexPattern("componentName.a2pi", "$$$")).toThrow(
            getIncorrectRegexError("$$$"),
        );
    });
});
