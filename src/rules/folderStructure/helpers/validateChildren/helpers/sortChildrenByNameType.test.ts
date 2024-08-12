import { sortChildrenByNameType } from "rules/folderStructure/helpers/validateChildren/helpers/sortChildrenByNameType";

describe("sortChildrenByNameType", () => {
  const children = [
    { name: "FixedName1" },
    { name: "{ParentName}" },
    { name: "FixedName2" },
    { ruleId: "ruleId" },
    { children: [] },
    { name: "{camelCase}" },
    { extension: "*" },
    { name: "FixedName3" },
  ];

  const childrenSorted = [
    { name: "FixedName3" },
    { name: "FixedName2" },
    { name: "FixedName1" },
    { ruleId: "ruleId" },
    { children: [] },
    { extension: "*" },
    { name: "{camelCase}" },
    { name: "{ParentName}" },
  ];

  it("should sort children by name type", () => {
    expect(sortChildrenByNameType(children)).toEqual(childrenSorted);
  });
});
