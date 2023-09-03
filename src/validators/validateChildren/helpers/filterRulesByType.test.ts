import { FilterRulesByType, filterRulesByType } from "./filterRulesByType";
import { RuleId, ProjectStructureConfig, Rule } from "../../../types";

describe("filterRulesByType", () => {
    const emptyRule: Rule = {} as Rule;

    const fileRule: Rule = {
        extension: ".tsx",
    };

    const nameRule: Rule = {
        name: "componentName",
    };

    const folderRule: Rule = {
        children: [fileRule, emptyRule, { children: [nameRule] }],
    };

    const config: ProjectStructureConfig = {
        ignorePatterns: [],
        rules: {
            folder: {
                children: [],
            },
            file: {
                extension: ".ts",
            },
            name: {
                name: "elo",
            },
            idEmpty: {} as Rule,
        },
        structure: {
            name: "src",
        },
    };

    const idFile: RuleId = { ruleId: "file" };
    const idFolder: RuleId = { ruleId: "folder" };
    const idEmpty = { ruleId: "idEmpty" };
    const idName = { ruleId: "name" };

    it.each<[boolean, Omit<FilterRulesByType, "config">]>([
        [false, { pathname: "src/componentName", rule: fileRule }],
        [false, { pathname: "src/componentName", rule: idFile }],

        [true, { pathname: "src/componentName", rule: emptyRule }],
        [true, { pathname: "src/componentName", rule: idEmpty }],
        [true, { pathname: "src/componentName", rule: folderRule }],
        [true, { pathname: "src/componentName", rule: idFolder }],
        [true, { pathname: "src/componentName", rule: idName }],

        [true, { pathname: "componentName", rule: fileRule }],
        [true, { pathname: "componentName", rule: idFile }],
        [true, { pathname: "componentName", rule: emptyRule }],
        [true, { pathname: "componentName", rule: idEmpty }],

        [false, { pathname: "componentName", rule: folderRule }],
        [false, { pathname: "componentName", rule: idFolder }],
    ])("should return %s  when args = %s", (filter, { pathname, rule }) => {
        expect(
            filterRulesByType({
                pathname,
                rule,
                config,
            }),
        ).toEqual(filter);
    });

    it("should return true when !nodeRule", () => {
        expect(() =>
            filterRulesByType({
                pathname: "componentName",
                rule: { ruleId: "test" },
                config: {
                    structure: {
                        name: "src",
                    },
                },
            }),
        ).toThrow();
    });
});
