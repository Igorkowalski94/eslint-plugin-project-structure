import { validateName } from "./validateName";
import { getNameError } from "../../helpers/getNameError";
import { getNameRegexError } from "../../helpers/validateRegexPattern/helpers/getNameRegexError";

describe("validateName", () => {
    it("should not throw error when nodeName === roleName", () => {
        expect(() =>
            validateName("componentName", "componentName"),
        ).not.toThrow();
    });

    it("should throw error when nodeName !== roleName", () => {
        expect(() => validateName("componentName", "XcomponentName")).toThrow(
            getNameError("componentName", "XcomponentName"),
        );
    });

    it("should not throw error when nodeName match regex", () => {
        expect(() =>
            validateName("componentName.api", {
                regex: "/^.*\\.(types|api)$/",
            }),
        ).not.toThrow();
    });

    it("should  throw error when nodeName mot match regex", () => {
        expect(() =>
            validateName("componentName.apxi", {
                regex: "/^.*\\.(types|api)$/",
            }),
        ).toThrow(
            getNameRegexError("componentName.apxi", "^.*\\.(types|api)$"),
        );
    });
});
