import { getRecursionLimitError } from "errors/getRecursionLimitError";

import { getIdRuleError } from "rules/folderStructure/errors/getIdRuleError";
import {
  Rule,
  FolderStructureConfig,
} from "rules/folderStructure/folderStructure.types";
import { getRule } from "rules/folderStructure/helpers/validateFolderStructure/helpers/validatePath/helpers/getRule";

describe("getRule", () => {
  const testRule: Rule = {
    name: "ComponentName",
  };

  const test2Rule: Rule = {
    ruleId: "test3",
  };

  const test3Rule: Rule = {
    ruleId: "test4",
    children: [{ name: "test3Child.ts" }],
  };

  const test4Rule: Rule = {
    name: "test4Name",
    children: [{ name: "test4Child.ts" }],
  };

  const rules: FolderStructureConfig["rules"] = {
    test: testRule,
    test2: test2Rule,
    test3: test3Rule,
    test4: test4Rule,
    test5: { ruleId: "test2" },
    test6: { ruleId: "test7" },
    test7: { ruleId: "test6" },
  };

  it("should throw getRecursionLimitError", () => {
    expect(() => getRule({ rule: { ruleId: "test6" }, rules })).toThrow(
      getRecursionLimitError(rules.test7),
    );
  });

  it("should return rule when ruleId exist in rules object", () => {
    expect(getRule({ rule: { ruleId: "test" }, rules })).toEqual(testRule);
  });

  it("should return rule when !ruleId", () => {
    expect(getRule({ rule: { name: "test" }, rules })).toEqual({
      name: "test",
    });
  });

  it("should return rule when ruleId exist in rules object for nested ruleId", () => {
    expect(getRule({ rule: { ruleId: "test5" }, rules })).toEqual({
      name: "test4Name",
      children: [{ name: "test3Child.ts" }],
    });
  });

  it("should return idRule and add ruleId properties for nested ruleId", () => {
    expect(
      getRule({ rule: { name: "hello", ruleId: "test5" }, rules }),
    ).toEqual({
      name: "hello",
      children: [{ name: "test3Child.ts" }],
    });
  });

  it("should return idRule and add ruleId properties", () => {
    expect(
      getRule({ rule: { name: "FixedName", ruleId: "test" }, rules }),
    ).toEqual({
      ...testRule,
      name: "FixedName",
    });
  });

  it("should throw error when ruleId do not exist in rules object", () => {
    expect(() => getRule({ rule: { ruleId: "test8" } })).toThrow(
      getIdRuleError("test8"),
    );
  });
});
