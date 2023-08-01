import { getInheritName } from "./getInheritName";

describe("getInheritName", () => {
    it("should return parentName with firstLetterLowercase", () => {
        expect(getInheritName("parentName", "firstLetterLowercase")).toEqual(
            "parentName",
        );
    });

    it("should return parentName with firstLetterUppercase", () => {
        expect(getInheritName("parentName", "firstLetterUppercase")).toEqual(
            "ParentName",
        );
    });
});
