import { getIsFileFromPathname } from "./getIsFileFromPathName";

describe("getIsFileFromNodeName", () => {
    it("should return false when pathname includes /", () => {
        expect(getIsFileFromPathname("src/componentName")).toEqual(false);
    });

    it("should return false when pathname includes \\", () => {
        expect(getIsFileFromPathname("src\\componentName")).toEqual(false);
    });

    it("should return true when pathname not includes / or \\", () => {
        expect(getIsFileFromPathname("componentName")).toEqual(true);
    });
});
