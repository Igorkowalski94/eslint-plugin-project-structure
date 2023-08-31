import { isFileFromPathname } from "./isFileFromPathname";

describe("isFileFromPathname", () => {
    it("should return false when pathname includes /", () => {
        expect(isFileFromPathname("src/componentName")).toEqual(false);
    });

    it("should return false when pathname includes \\", () => {
        expect(isFileFromPathname("src\\componentName")).toEqual(false);
    });

    it("should return true when pathname not includes / or \\", () => {
        expect(isFileFromPathname("componentName")).toEqual(true);
    });
});
