import { getNodeName } from "./getNodeName";

jest.mock("path", () => ({
    sep: "/",
}));

describe("getNodeName", () => {
    it("should return correct nodeName and fileNameWithExtension when pathname is folder", () => {
        expect(getNodeName("src/features")).toEqual({
            nodeName: "src",
            fileNameWithExtension: undefined,
        });
    });

    it("should return correct nodeName and fileNameWithExtension when pathname is file", () => {
        expect(getNodeName("ComponentName.tsx")).toEqual({
            nodeName: "ComponentName",
            fileNameWithExtension: "ComponentName.tsx",
        });
    });
});
