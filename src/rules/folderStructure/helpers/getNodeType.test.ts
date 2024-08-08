import { getNodeType } from "rules/folderStructure/helpers/getNodeType";

describe("getNodeType", () => {
    it("should return 'file' when nodeName do not includes /", () => {
        expect(getNodeType("fileName.tsx")).toEqual("File");
    });

    it("should return 'folder' when nodeName includes /", () => {
        expect(getNodeType("FolderName/filename.tsx")).toEqual("Folder");
    });
});
