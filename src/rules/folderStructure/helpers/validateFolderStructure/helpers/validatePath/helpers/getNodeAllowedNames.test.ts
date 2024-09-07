import { NodeType, Rule } from "rules/folderStructure/folderStructure.types";
import { getNodeAllowedNames } from "rules/folderStructure/helpers/validateFolderStructure/helpers/validatePath/helpers/getNodeAllowedNames";

describe("getNodeAllowedNames", () => {
  it.each<{
    nodeType: NodeType;
    children?: Rule[];
    expected: string[];
  }>([
    {
      nodeType: "File",
      expected: [],
    },
    {
      nodeType: "File",
      children: [
        { name: "{camelCase}.tsx" },
        { name: "{PascalCase}.tsx" },
        { name: "folder", children: [] },
      ],
      expected: ["{camelCase}.tsx", "{PascalCase}.tsx"],
    },
    {
      nodeType: "Folder",
      children: [
        { name: "{camelCase}.tsx" },
        { name: "{PascalCase}.tsx" },
        { name: "folder", children: [] },
      ],
      expected: ["folder"],
    },
  ])(
    "Should return correct value for %o",
    ({ nodeType, children, expected }) => {
      expect(
        getNodeAllowedNames({
          folderName: "FolderName",
          nodeType,
          children,
        }),
      ).toEqual(expected);
    },
  );
});
