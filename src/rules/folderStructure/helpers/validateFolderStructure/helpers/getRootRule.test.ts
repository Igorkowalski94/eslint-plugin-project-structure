import {
  FolderStructureConfig,
  Rule,
} from "rules/folderStructure/folderStructure.types";
import { getRootRule } from "rules/folderStructure/helpers/validateFolderStructure/helpers/getRootRule";

describe("getRootRule", () => {
  it.each<{
    structure: FolderStructureConfig["structure"];
    rootFolderName: string;
    expected: Rule;
  }>([
    {
      structure: [{ children: [] }, { name: "index.ts" }],
      rootFolderName: "rootFolderName",
      expected: {
        name: "*",
        children: [{ children: [] }, { name: "index.ts" }],
      },
    },
    {
      structure: { enforceExistence: [], children: [] },
      rootFolderName: "rootFolderName",
      expected: { name: "*", enforceExistence: [], children: [] },
    },
  ])(
    "Should return correct value for %o",
    ({ structure, rootFolderName, expected }) => {
      expect(getRootRule({ rootFolderName, structure })).toEqual(expected);
    },
  );
});
