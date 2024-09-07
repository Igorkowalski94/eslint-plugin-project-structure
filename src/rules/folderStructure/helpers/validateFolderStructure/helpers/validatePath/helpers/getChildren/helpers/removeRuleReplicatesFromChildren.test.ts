import { removeRuleReplicatesFromChildren } from "rules/folderStructure/helpers/validateFolderStructure/helpers/validatePath/helpers/getChildren/helpers/removeRuleReplicatesFromChildren";

describe("removeRuleReplicatesFromChildren", () => {
  const children = [
    { ruleId: "ruleId" },

    { name: "FixedName1.tsx" },
    { name: "FixedName1.tsx" },
    { name: "FixedName1.js" },

    { name: "*" },
    { name: "*" },
    { name: "*", children: [{ name: "{camelCase}.ts" }] },
    { name: "*", children: [{ name: "{PascalCase}.ts" }] },

    { name: "{PascalCase}", children: [{ name: "{camelCase}.ts" }] },
    { name: "{PascalCase}", children: [{ name: "{PascalCase}.ts" }] },

    { name: "{PascalCase}.hello", children: [{ name: "{PascalCase}.ts" }] },
  ];

  const childrenWithoutDuplicates = [
    { ruleId: "ruleId" },

    { name: "FixedName1.tsx" },
    { name: "FixedName1.js" },

    { name: "*" },
    { name: "*", children: [{ name: "{camelCase}.ts" }] },

    { name: "{PascalCase}", children: [{ name: "{camelCase}.ts" }] },

    { name: "{PascalCase}.hello", children: [{ name: "{PascalCase}.ts" }] },
  ];

  it("should remove duplicates from children", () => {
    expect(removeRuleReplicatesFromChildren(children)).toEqual(
      childrenWithoutDuplicates,
    );
  });
});
