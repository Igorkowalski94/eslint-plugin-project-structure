import { NodeType, Rule } from "rules/folderStructure/folderStructure.types";
import { getNodeRule } from "rules/folderStructure/helpers/validateFolderStructure/helpers/validatePath/helpers/getNodeRule";

describe("getNodeRule", () => {
  it.each<{
    nodeName: string;
    nodeType: NodeType;
    children?: Rule[];
    expected: Rule | undefined;
  }>([
    {
      nodeName: "nodeName.tsx",
      nodeType: "File",
      expected: undefined,
    },
    {
      nodeName: "nodeName.tsx",
      nodeType: "File",
      children: [
        { name: "{camelCase}", children: [] },
        { ruleId: "ruleId" },
        { name: "{PascalCase}.tsx" },
        { name: "{camelCase}.tsx" },
      ],
      expected: { name: "{camelCase}.tsx" },
    },
    {
      nodeName: "nodeName",
      nodeType: "Folder",
      children: [
        { ruleId: "ruleId" },
        { name: "{PascalCase}.tsx" },
        { name: "{camelCase}.tsx" },
        { name: "{camelCase}", children: [] },
      ],
      expected: { name: "{camelCase}", children: [] },
    },
  ])(
    "Should return correct value for %o",
    ({ nodeName, nodeType, children, expected }) => {
      expect(
        getNodeRule({ folderName: "folderName", nodeName, nodeType, children }),
      ).toEqual(expected);
    },
  );
});
