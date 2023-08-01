import { validateInheritParentName } from "./validateInheritParentName";
import { getNameError } from "../../helpers/getNameError";

describe("validateInheritParentName", () => {
    it("should return undefined when !inheritParentName", () => {
        expect(
            validateInheritParentName("componentName", "parentName", {}),
        ).toEqual(undefined);
    });

    it("should not throw error when nodeName === inheritName with firstLetterUppercase", () => {
        expect(() =>
            validateInheritParentName("ParentName", "parentName", {
                inheritParentName: "firstLetterUppercase",
            }),
        ).not.toThrow();
    });

    it("should not throw error when nodeName === inheritName with firstLetterLowercase", () => {
        expect(() =>
            validateInheritParentName("parentName", "ParentName", {
                inheritParentName: "firstLetterLowercase",
            }),
        ).not.toThrow();
    });

    it("should throw error when nodeName !== inheritName", () => {
        expect(() =>
            validateInheritParentName("componentName", "parentName", {
                inheritParentName: "firstLetterUppercase",
            }),
        ).toThrow(getNameError("componentName", "ParentName"));
    });
});
