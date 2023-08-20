import { validateRulesList } from "./validateRulesList";
import { getIdRuleError } from "../../../helpers/getIdRule/helpers/getIdRuleError";
import { ProjectStructureConfig, Rule } from "../../../types";

jest.mock("path", () => ({
    sep: "/",
}));

describe("validateRulesList", () => {
    const config: ProjectStructureConfig = {
        structure: {
            name: "src",
            children: [
                {
                    name: "features",
                    children: [
                        {
                            name: "/^${{PascalCase}}$/",
                            children: [
                                {
                                    name: "/^${{ParentName}}$/",
                                    extension: ".tsx",
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        rules: {},
    };

    const nodesList: Rule[] = [
        {
            name: "/^${{ParentName}}(\\.(context|test|test.helpers))$/",
            extension: ".tsx",
        },
        {
            name: "/^${{parentName}}(\\.(api|types))$/",
            extension: ".ts",
        },
    ];

    const nodesListRuleIdNotExist: Rule[] = [
        {
            ruleId: "test",
        },
    ];

    it("should throw error when rule requires only folders", () => {
        expect(() =>
            validateRulesList({
                pathname: "componentName.api.ts",
                parentName: "ComponentName",
                nodesList: [],
                config,
            }),
        ).toThrow(
            "\n\n 🔥🔥🔥 File 'componentName.api.ts' is invalid:\n\n It should be a folder. \n\n 🔥🔥🔥",
        );
    });

    it("should throw error when rule requires only files", () => {
        expect(() =>
            validateRulesList({
                pathname: "componentName",
                parentName: "ComponentName",
                nodesList: [],
                config,
            }),
        ).toThrow(
            "\n\n 🔥🔥🔥 Folder 'componentName' is invalid:\n\n It should be a file. \n\n 🔥🔥🔥",
        );
    });

    it("should not throw error when all rules passed", () => {
        expect(() =>
            validateRulesList({
                pathname: "componentName.api.ts",
                parentName: "ComponentName",
                nodesList,
                config,
            }),
        ).not.toThrow();
    });

    it("should throw error for all rules", () => {
        expect(() =>
            validateRulesList({
                pathname: "ComponentName.tsx",
                parentName: "ComponentName",
                nodesList,
                config,
            }),
        ).toThrow(
            "\n\n 🔥🔥🔥 File 'ComponentName.tsx' is invalid:\n\n It should match name pattern /^${{ParentName}}(\\.(context|test|test.helpers))$/\n or match name pattern /^${{parentName}}(\\.(api|types))$/ \n\n 🔥🔥🔥",
        );
    });

    it("should throw final error when ruleId do not exist in rules object", () => {
        expect(() =>
            validateRulesList({
                pathname: "componentName.api.ts",
                parentName: "ComponentName",
                nodesList: nodesListRuleIdNotExist,
                config,
            }),
        ).toThrow(getIdRuleError("test"));
    });
});
