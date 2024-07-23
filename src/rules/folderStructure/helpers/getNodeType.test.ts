import { getNodeType } from "./getNodeType";

describe("getNodeType", () => {
    it("should return 'file' when nodeName includes .", () => {
        expect(getNodeType("fileName.tsx")).toEqual("File");
    });

    it("should return 'folder' when pathname do not includes .", () => {
        expect(getNodeType("FolderName")).toEqual("Folder");
    });
});
