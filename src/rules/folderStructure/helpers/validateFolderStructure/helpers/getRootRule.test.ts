import {
  FolderStructureConfig,
  Rule,
} from "rules/folderStructure/folderStructure.types";
import { getRootRule } from "rules/folderStructure/helpers/validateFolderStructure/helpers/getRootRule";

describe("getRootRule", () => {
  it.each<{ structure: FolderStructureConfig["structure"]; expected: Rule }>([
    {
      structure: [{ children: [] }, { name: "index.ts" }],
      expected: { children: [{ children: [] }, { name: "index.ts" }] },
    },
    {
      structure: { enforceExistence: [], children: [] },
      expected: { enforceExistence: [], children: [] },
    },
  ])("Should return correct value for %o", ({ structure, expected }) => {
    expect(getRootRule(structure)).toEqual(expected);
  });
});
