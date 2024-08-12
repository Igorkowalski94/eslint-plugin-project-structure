import {
  Rule,
  FolderStructureConfig,
} from "rules/folderStructure/folderStructure.types";
import { filterRulesByType } from "rules/folderStructure/helpers/validateChildren/helpers/filterRulesByType";

describe("filterRulesByType", () => {
  const fileRule: Rule = {
    name: "ComponentName.tsx",
  };

  const folderRule: Rule = {
    children: [fileRule, { children: [fileRule] }],
  };

  const rules: FolderStructureConfig["rules"] = {
    folder: folderRule,
    file: fileRule,
  };

  const idFile: Rule = { ruleId: "file" };
  const idFolder: Rule = { ruleId: "folder" };

  it.each<{ filter: boolean; pathname: string; rule: Rule }>([
    {
      filter: false,
      pathname: "src/componentName",
      rule: fileRule,
    },
    { filter: false, pathname: "src/componentName", rule: idFile },

    { filter: true, pathname: "src/componentName", rule: folderRule },
    { filter: true, pathname: "src/componentName", rule: idFolder },

    { filter: true, pathname: "componentName", rule: fileRule },
    { filter: true, pathname: "componentName", rule: idFile },

    { filter: false, pathname: "componentName", rule: folderRule },
    { filter: false, pathname: "componentName", rule: idFolder },
  ])("should return correct value for %o", ({ filter, pathname, rule }) => {
    expect(
      filterRulesByType({
        pathname,
        rule,
        rules,
      }),
    ).toEqual(filter);
  });
});
