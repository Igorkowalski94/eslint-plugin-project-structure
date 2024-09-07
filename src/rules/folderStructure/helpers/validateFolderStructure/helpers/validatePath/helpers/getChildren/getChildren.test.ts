import { Rule } from "rules/folderStructure/folderStructure.types";
import { getChildren } from "rules/folderStructure/helpers/validateFolderStructure/helpers/validatePath/helpers/getChildren/getChildren";

describe("getChildren", () => {
  it.each<{
    children: Rule[] | undefined;
    expected: Rule[] | undefined;
  }>([
    {
      children: [],
      expected: [],
    },
    {
      children: undefined,
      expected: undefined,
    },
  ])("Should return correct value for %o", ({ children, expected }) => {
    expect(getChildren({ children })).toEqual(expected);
  });
});
