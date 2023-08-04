import { filterRulesByType } from "./filterRulesByType";
import { getInvalidRuleError } from "./getInvalidRuleError";
import { RuleId, ProjectStructureConfig, Rule } from "../../../types";

describe("filterRulesByType", () => {
    const emptyRule: Rule = {} as Rule;

    const fileRule: Rule = {
        extension: ".tsx",
    };

    const nameRule: Rule = {
        name: "componentName",
    };

    const folderRole: Rule = {
        children: [fileRule, emptyRule, { children: [nameRule] }],
    };

    const projectStructureConfig: ProjectStructureConfig = {
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

    it.each([0, 1, [], [1], null, "test", ""])(
        "should throw error when rule in children is invalid, rule =  %s",
        (rule) => {
            expect(() =>
                filterRulesByType("componentName", rule as unknown as Rule, {
                    structure: {
                        name: "src",
                    },
                }),
            ).toThrow(getInvalidRuleError(rule));
        },
    );

    it.each<[boolean, string, Rule]>([
        [false, "src/componentName", fileRule],
        [false, "src/componentName", idFile],

        [true, "src/componentName", emptyRule],
        [true, "src/componentName", idEmpty],
        [true, "src/componentName", folderRole],
        [true, "src/componentName", idFolder],
        [true, "src/componentName", idName],

        [false, "src\\componentName", fileRule],
        [false, "src\\componentName", idFile],

        [true, "src\\componentName", emptyRule],
        [true, "src\\componentName", idEmpty],
        [true, "src\\componentName", folderRole],
        [true, "src\\componentName", idFolder],
        [true, "src\\componentName", idName],

        [true, "componentName", fileRule],
        [true, "componentName", idFile],
        [true, "componentName", emptyRule],
        [true, "componentName", idEmpty],

        [false, "componentName", folderRole],
        [false, "componentName", idFolder],
    ])(
        "should return %s  when pathname is %s, rule is %s",
        (filter, pathname, rule) => {
            expect(
                filterRulesByType(pathname, rule, projectStructureConfig),
            ).toEqual(filter);
        },
    );

    it("should return true when !nodeRule", () => {
        expect(() =>
            filterRulesByType(
                "componentName",
                { ruleId: "test" },
                {
                    structure: {
                        name: "src",
                    },
                },
            ),
        ).toThrow();
    });
});
