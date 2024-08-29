import { removeRuleReplicatesFromChildren } from "rules/folderStructure/helpers/validateChildren/helpers/removeRuleReplicatesFromChildren";

describe("removeRuleReplicatesFromChildren", () => {
  const children = [
    { ruleId: "hooks_folder" },
    { ruleId: "hooks_folder" },

    { ruleId: "components_folder" },

    { name: "FixedName1" },
    { name: "FixedName1" },

    { name: "{PascalCase}", children: [{ name: "{camelCase}.ts" }] },
    { name: "{PascalCase}", children: [{ name: "{camelCase}.ts" }] },

    {
      name: "{kebab-case}",
      children: [{ name: "components", ruleId: "componentRule" }],
    },
    { name: "{kebab-case}", ruleId: "domainRule" },
  ];

  const childrenWithoutDuplicates = [
    { ruleId: "hooks_folder" },
    { ruleId: "components_folder" },

    { name: "FixedName1" },

    { name: "{PascalCase}", children: [{ name: "{camelCase}.ts" }] },

    {
      name: "{kebab-case}",
      children: [{ name: "components", ruleId: "componentRule" }],
    },
  ];

  it("should remove duplicates from children", () => {
    expect(removeRuleReplicatesFromChildren(children)).toEqual(
      childrenWithoutDuplicates,
    );
  });
});
