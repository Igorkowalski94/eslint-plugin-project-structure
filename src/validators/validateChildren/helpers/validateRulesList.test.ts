import { validateRulesList } from "./validateRulesList";
import { getIncorrectIdRuleError } from "../../../helpers/getIdRule/helpers/getIncorrectIdRuleError";
import { getIncorrectRegexError } from "../../../helpers/validateRegexPattern/helpers/getRegexError";
import { ProjectStructureConfig, Rule } from "../../../types";

jest.mock("path", () => ({
    sep: "/",
}));

describe("validateRulesList", () => {
    const config: ProjectStructureConfig = {
        structure: {
            name: "src",
            type: "folder",
            children: [
                {
                    name: "features",
                    type: "folder",
                    children: [
                        {
                            name: {
                                case: "PascalCase",
                            },
                            type: "folder",
                            children: [
                                {
                                    name: {
                                        inheritParentName:
                                            "firstLetterUppercase",
                                    },
                                    type: "file",
                                    extension: ".tsx",
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    };

    const nodesList: Rule[] = [
        {
            name: {
                inheritParentName: "firstLetterUppercase",
                regex: "/^\\.(context|test|test.helpers)$/",
            },
            type: "file",
            extension: ".tsx",
        },
        {
            name: {
                inheritParentName: "firstLetterLowercase",
                regex: "/^\\.(api|types)$/",
            },
            type: "file",
            extension: ".ts",
        },
    ];

    const nodesListIncorrectRegex: Rule[] = [
        {
            name: {
                inheritParentName: "firstLetterUppercase",
                regex: "$$$",
            },
            type: "file",
            extension: ".tsx",
        },
    ];

    const nodesListIncorrectRuleId: Rule[] = [
        {
            ruleId: "test",
        },
    ];

    it("should not throw error when all rules passed", () => {
        expect(() =>
            validateRulesList(
                "componentName.api.ts",
                "ComponentName",
                nodesList,
                config,
            ),
        ).not.toThrow();
    });

    it("should throw error for all rules", () => {
        expect(() =>
            validateRulesList(
                "ComponentName.tsx",
                "ComponentName",
                nodesList,
                config,
            ),
        ).toThrow(
            "\n\n 🔥🔥🔥 file 'ComponentName.tsx' is invalid:\n\n It should match name pattern ^ComponentName\\.(context|test|test.helpers)$\n or match name pattern ^componentName\\.(api|types)$ \n\n 🔥🔥🔥",
        );
    });

    it("should throw final error when regex is incorrect", () => {
        expect(() =>
            validateRulesList(
                "componentName.api.ts",
                "ComponentName",
                nodesListIncorrectRegex,
                config,
            ),
        ).toThrow(getIncorrectRegexError("$$$"));
    });

    it("should throw final error when ruleId do not exist in rules object", () => {
        expect(() =>
            validateRulesList(
                "componentName.api.ts",
                "ComponentName",
                nodesListIncorrectRuleId,
                config,
            ),
        ).toThrow(getIncorrectIdRuleError("test"));
    });
});
