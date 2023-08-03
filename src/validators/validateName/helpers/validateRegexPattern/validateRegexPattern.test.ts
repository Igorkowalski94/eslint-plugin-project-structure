import { getNameRegexError } from "./helpers/getNameRegexError";
import { validateRegexPattern } from "./validateRegexPattern";

describe("validateRegexPattern", () => {
    it.each<[string, string, string]>([
        ["parentName", "ParentName", "/^${{parentName}}$/"],
        ["ParentName", "ParentName", "/^${{ParentName}}$/"],
        ["ComponentName", "ParentName", "/^${{PascalCase}}$/"],
        ["componentName", "ParentName", "/^${{camelCase}}$/"],
        ["component_name", "ParentName", "/^${{snake_case}}$/"],
        ["component-name", "ParentName", "/^${{kebab-case}}$/"],
        ["component-name", "ParentName", "/^${{dash-case}}$/"],
        [
            "useHook.test",
            "parentName",
            "/^(use)${{PascalCase}}(?:\\.(test|test.helpers))?$/",
        ],
        [
            "helper.test",
            "parentName",
            "/^${{camelCase}}(?:\\.(test|test.helpers))?$/",
        ],
        [
            "parentName.test",
            "parentName",
            "/^${{parentName}}(?:\\.(test|test.helpers))?$/",
        ],
    ])(
        "should not throw error when nodeName match regex pattern for nodeName = %s, parentName = %s,  regex =  %s",
        (nodeName, parentName, regex) => {
            expect(() =>
                validateRegexPattern(nodeName, parentName, regex),
            ).not.toThrow();
        },
    );

    it.each<[string, string, string]>([
        ["XparentName", "ParentName", "/^${{parentName}}$/"],
        ["XParentName", "ParentName", "/^${{ParentName}}$/"],
        ["xComponentName", "ParentName", "/^${{PascalCase}}$/"],
        ["XcomponentName", "ParentName", "/^${{camelCase}}$/"],
        ["Xcomponent_name", "ParentName", "/^${{snake_case}}$/"],
        ["Xcomponent-name", "ParentName", "/^${{kebab-case}}$/"],
        ["Xcomponent-name", "ParentName", "/^${{dash-case}}$/"],
        [
            "XuseHook.test",
            "parentName",
            "/^(use)${{PascalCase}}(?:\\.(test|test.helpers))?$/",
        ],
        [
            "Xhelper.test",
            "parentName",
            "/^${{camelCase}}(?:\\.(test|test.helpers))?$/",
        ],
        [
            "XparentName.test",
            "parentName",
            "/^${{parentName}}(?:\\.(test|test.helpers))?$/",
        ],
    ])(
        "should throw error when nodeName do not match regex pattern for nodeName = %s, parentName = %s,  regex =  %s",
        (nodeName, parentName, regex) => {
            expect(() =>
                validateRegexPattern(nodeName, parentName, regex),
            ).toThrow(getNameRegexError(nodeName, regex));
        },
    );
});
