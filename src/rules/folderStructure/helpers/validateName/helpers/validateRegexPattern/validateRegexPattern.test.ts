import {
    ValidateRegexPattern,
    validateRegexPattern,
} from "./validateRegexPattern";
import { getNameRegexError } from "../../../../errors/getNameRegexError";

describe("validateRegexPattern", () => {
    it.each<[ValidateRegexPattern]>([
        [
            {
                nodeName: "parentName",
                parentName: "ParentName",
                regex: "/^{parentName}$/",
            },
        ],
        [
            {
                nodeName: "ParentName",
                parentName: "ParentName",
                regex: "/^{ParentName}$/",
            },
        ],
        [
            {
                nodeName: "ComponentName",
                parentName: "ParentName",
                regex: "/^{PascalCase}$/",
            },
        ],
        [
            {
                nodeName: "componentName",
                parentName: "ParentName",
                regex: "/^{camelCase}$/",
            },
        ],
        [
            {
                nodeName: "component_name",
                parentName: "ParentName",
                regex: "/^{snake_case}$/",
            },
        ],
        [
            {
                nodeName: "component-name",
                parentName: "ParentName",
                regex: "/^{kebab-case}$/",
            },
        ],
        [
            {
                nodeName: "useHook.test",
                parentName: "parentName",
                regex: "/^(use){PascalCase}(?:\\.(test|test.helpers))?$/",
            },
        ],
        [
            {
                nodeName: "helper.test",
                parentName: "parentName",
                regex: "/^{camelCase}(?:\\.(test|test.helpers))?$/",
            },
        ],
        [
            {
                nodeName: "parentName.test",
                parentName: "parentName",
                regex: "/^{parentName}(?:\\.(test|test.helpers))?$/",
            },
        ],
    ])(
        "should not throw error when nodeName match regex pattern for args = %s",
        (args) => {
            expect(() => validateRegexPattern(args)).not.toThrow();
        },
    );

    it.each<[ValidateRegexPattern]>([
        [
            {
                nodeName: "XparentName",
                parentName: "ParentName",
                regex: "/^{parentName}$/",
            },
        ],
        [
            {
                nodeName: "XParentName",
                parentName: "ParentName",
                regex: "/^{ParentName}$/",
            },
        ],
        [
            {
                nodeName: "xComponentName",
                parentName: "ParentName",
                regex: "/^{PascalCase}$/",
            },
        ],
        [
            {
                nodeName: "XcomponentName",
                parentName: "ParentName",
                regex: "/^{camelCase}$/",
            },
        ],
        [
            {
                nodeName: "Xcomponent_name",
                parentName: "ParentName",
                regex: "/^{snake_case}$/",
            },
        ],
        [
            {
                nodeName: "Xcomponent-name",
                parentName: "ParentName",
                regex: "/^{kebab-case}$/",
            },
        ],
        [
            {
                nodeName: "XuseHook.test",
                parentName: "parentName",
                regex: "/^(use){PascalCase}(?:\\.(test|test.helpers))?$/",
            },
        ],
        [
            {
                nodeName: "Xhelper.test",
                parentName: "parentName",
                regex: "/^{camelCase}(?:\\.(test|test.helpers))?$/",
            },
        ],
        [
            {
                nodeName: "XparentName.test",
                parentName: "parentName",
                regex: "/^{parentName}(?:\\.(test|test.helpers))?$/",
            },
        ],
    ])(
        "should throw error when nodeName do not match regex pattern for args = %s",
        ({ nodeName, parentName, regex }) => {
            expect(() =>
                validateRegexPattern({ nodeName, parentName, regex }),
            ).toThrow(getNameRegexError(nodeName, regex));
        },
    );
});
