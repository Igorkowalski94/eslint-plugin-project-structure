import { filterRulesByType } from "./filterRulesByType";
import { RuleId, ProjectStructureConfig, Rule } from "../../../types";

describe("filterRulesByType", () => {
    const fileRule: Rule = {
        type: "file",
    };

    const emptyRule: Rule = {};

    const fileRuleWithExtension: Rule = {
        type: "file",
        extension: ".tsx",
    };

    const extensionRule: Rule = {
        extension: ".tsx",
    };

    const folderRole: Rule = {
        type: "folder",
        children: [
            fileRule,
            extensionRule,
            emptyRule,
            { type: "folder", children: [] },
        ],
    };

    const projectStructureConfig: ProjectStructureConfig = {
        ignorePatterns: [],
        rules: {
            folder: {
                type: "folder",
                children: [],
            },
            file: {
                type: "file",
            },
            fileWithExtension: {
                type: "file",
                extension: ".ts",
            },
            idExtension: {
                extension: ".ts",
            },
            idEmpty: {},
        },
        structure: {},
    };

    const idFile: RuleId = { ruleId: "file" };
    const idFileWithExtension: RuleId = { ruleId: "fileWithExtension" };
    const idFolder: RuleId = { ruleId: "folder" };
    const idEmpty = { ruleId: "idEmpty" };
    const idExtension = { ruleId: "idExtension" };

    it.each<[boolean, string, Rule]>([
        [false, "src/componentName", fileRule],
        [false, "src/componentName", extensionRule],
        [false, "src/componentName", idExtension],
        [false, "src/componentName", fileRuleWithExtension],
        [false, "src/componentName", idFileWithExtension],
        [false, "src/componentName", idFile],

        [true, "src/componentName", emptyRule],
        [true, "src/componentName", idEmpty],
        [true, "src/componentName", folderRole],
        [true, "src/componentName", idFolder],

        [false, "src\\componentName", fileRule],
        [false, "src\\componentName", extensionRule],
        [false, "src\\componentName", idExtension],
        [false, "src\\componentName", fileRuleWithExtension],
        [false, "src\\componentName", idFileWithExtension],
        [false, "src\\componentName", idFile],

        [true, "src\\componentName", emptyRule],
        [true, "src\\componentName", idEmpty],
        [true, "src\\componentName", folderRole],
        [true, "src\\componentName", idFolder],

        [true, "componentName", fileRule],
        [true, "componentName", extensionRule],
        [true, "componentName", idExtension],
        [true, "componentName", fileRuleWithExtension],
        [true, "componentName", idFileWithExtension],
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
                    structure: {},
                },
            ),
        ).toThrow();
    });
});
