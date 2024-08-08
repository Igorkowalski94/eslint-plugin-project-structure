import { getInvalidRegexError } from "errors/getInvalidRegexError";

import { getNameRegexError } from "rules/folderStructure/errors/getNameRegexError";
import {
    validateName,
    ValidateNameProps,
} from "rules/folderStructure/helpers/validateName/validateName";
import {
    WILDCARD_REGEX,
    DOT_CHARACTER_REGEX,
} from "rules/folderStructure/helpers/validateName/validateName.consts";

describe("validateName", () => {
    it("should throw error when regex is invalid", () => {
        expect(() =>
            validateName({
                nodeName: "componentName.api",
                ruleName: "/^?/*.",
                parentName: "parentName",
            }),
        ).toThrow(
            getInvalidRegexError(`/^?/${WILDCARD_REGEX}${DOT_CHARACTER_REGEX}`),
        );
    });

    it.each<[ValidateNameProps]>([
        [
            {
                nodeName: "parentName",
                parentName: "ParentName",
                ruleName: "parentName",
            },
        ],
        [
            {
                nodeName: "ParentName",
                parentName: "ParentName",
                ruleName: "ParentName",
            },
        ],
        [
            {
                nodeName: "ComponentName",
                parentName: "ParentName",
                ruleName: "{PascalCase}",
            },
        ],
        [
            {
                nodeName: "componentName",
                parentName: "ParentName",
                ruleName: "{camelCase}",
            },
        ],
        [
            {
                nodeName: "component_name",
                parentName: "ParentName",
                ruleName: "{snake_case}",
            },
        ],
        [
            {
                nodeName: "component-name",
                parentName: "ParentName",
                ruleName: "{kebab-case}",
            },
        ],
        [
            {
                nodeName: "useHook.test.ts",
                parentName: "parentName",
                ruleName: "(use){PascalCase}(?:.(test|test.helpers))?.ts",
            },
        ],
        [
            {
                nodeName: "helper.test.ts",
                parentName: "parentName",
                ruleName: "{camelCase}(?:.(test|test.helpers))?.ts",
            },
        ],
        [
            {
                nodeName: "parentName.test.ts",
                parentName: "parentName",
                ruleName: "parentName(?:.(test|test.helpers))?.ts",
            },
        ],
        [
            {
                nodeName: "componentName.ts",
                parentName: "parentName",
                ruleName: "*.ts",
            },
        ],
        [
            {
                nodeName: "componentName,ts",
                parentName: "parentName",
                ruleName: "*..ts",
            },
        ],
        [
            {
                nodeName: "xxx",
                parentName: "parentName",
                ruleName: "*",
            },
        ],
        [
            {
                nodeName: "bbb",
                parentName: "parentName",
                ruleName: "b**",
            },
        ],
    ])(
        "should not throw error when nodeName match regex pattern for args = %s",
        (args) => {
            expect(() => validateName(args)).not.toThrow();
        },
    );

    it.each<[ValidateNameProps]>([
        [
            {
                nodeName: "XparentName",
                parentName: "ParentName",
                ruleName: "parentName",
            },
        ],
        [
            {
                nodeName: "XParentName",
                parentName: "ParentName",
                ruleName: "ParentName",
            },
        ],
        [
            {
                nodeName: "xComponentName",
                parentName: "ParentName",
                ruleName: "{PascalCase}",
            },
        ],
        [
            {
                nodeName: "XcomponentName",
                parentName: "ParentName",
                ruleName: "{camelCase}",
            },
        ],
        [
            {
                nodeName: "Xcomponent_name",
                parentName: "ParentName",
                ruleName: "{snake_case}",
            },
        ],
        [
            {
                nodeName: "Xcomponent-name",
                parentName: "ParentName",
                ruleName: "{kebab-case}",
            },
        ],
        [
            {
                nodeName: "XuseHook.test.ts",
                parentName: "parentName",
                ruleName: "(use){PascalCase}(?:.(test|test.helpers))?.ts",
            },
        ],
        [
            {
                nodeName: "Xhelper.test.ts",
                parentName: "parentName",
                ruleName: "{camelCase}(?:.(test|test.helpers))?.ts",
            },
        ],
        [
            {
                nodeName: "XparentName.test.ts",
                parentName: "parentName",
                ruleName: "parentName(?:.(test|test.helpers))?.ts",
            },
        ],
        [
            {
                nodeName: "componentName,ts",
                parentName: "parentName",
                ruleName: "*.ts",
            },
        ],
        [
            {
                nodeName: "c",
                parentName: "parentName",
                ruleName: "b**",
            },
        ],
    ])(
        "should throw error when nodeName do not match regex pattern for args = %s",
        ({ nodeName, parentName, ruleName }) => {
            expect(() =>
                validateName({ nodeName, parentName, ruleName }),
            ).toThrow(getNameRegexError(ruleName));
        },
    );
});
