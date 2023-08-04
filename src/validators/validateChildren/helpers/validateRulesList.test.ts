import { getInvalidChildrenError } from "./getInvalidChildrenError";
import { validateRulesList } from "./validateRulesList";
import { getIdRuleError } from "../../../helpers/getIdRule/helpers/getIdRuleError";
import { getInvalidRuleIdError } from "../../../helpers/getIdRule/helpers/getInvalidRuleIdError";
import { getInvalidRulesError } from "../../../helpers/getIdRule/helpers/getInvalidRulesError";
import { Extension, ProjectStructureConfig, Rule } from "../../../types";
import { getInvalidExtensionError } from "../../validateExtension/helpers/getInvalidExtensionError";
import { getInvalidNameError } from "../../validateName/helpers/getInvalidNameError";
import { getInvalidTypeError } from "../../validatePath/helpers/getInvalidTypeError";

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

    const nodesListInvalidName: Rule[] = [
        {
            name: 2 as unknown as string,
        },
    ];

    const nodesListInvalidType: Rule[] = [
        {
            extension: ".tsx",
            children: [],
        } as unknown as Rule,
    ];

    const nodesListInvalidExtension: Rule[] = [
        {
            extension: 2 as unknown as Extension,
        },
    ];

    const nodesListInvalidChildren: Rule[] = [
        {
            children: 2 as unknown as Rule[],
        },
    ];

    const nodesListInvalidRuleId: Rule[] = [
        {
            ruleId: 2 as unknown as string,
        },
    ];
    const nodesListRuleIdNotExist: Rule[] = [
        {
            ruleId: "test",
        },
    ];

    it("should throw error when rule requires only folders", () => {
        expect(() =>
            validateRulesList(
                "componentName.api.ts",
                "ComponentName",
                [],
                config,
            ),
        ).toThrow(
            "\n\n 🔥🔥🔥 File 'componentName.api.ts' is invalid:\n\n It should be a folder. \n\n 🔥🔥🔥",
        );
    });

    it("should throw error when rule requires only files", () => {
        expect(() =>
            validateRulesList("componentName", "ComponentName", [], config),
        ).toThrow(
            "\n\n 🔥🔥🔥 Folder 'componentName' is invalid:\n\n It should be a file. \n\n 🔥🔥🔥",
        );
    });

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
            "\n\n 🔥🔥🔥 File 'ComponentName.tsx' is invalid:\n\n It should match name pattern /^${{ParentName}}(\\.(context|test|test.helpers))$/\n or match name pattern /^${{parentName}}(\\.(api|types))$/ \n\n 🔥🔥🔥",
        );
    });

    it("should throw final error when name is invalid", () => {
        expect(() =>
            validateRulesList(
                "componentName.api.tsx",
                "ComponentName",
                nodesListInvalidName,
                config,
            ),
        ).toThrow(getInvalidNameError(2));
    });

    it("should throw final error when type is invalid", () => {
        expect(() =>
            validateRulesList(
                "componentName.api.tsx",
                "ComponentName",
                nodesListInvalidType,
                config,
            ),
        ).toThrow(getInvalidTypeError());
    });

    it("should throw final error when extension is invalid", () => {
        expect(() =>
            validateRulesList(
                "componentName.api.tsx",
                "ComponentName",
                nodesListInvalidExtension,
                config,
            ),
        ).toThrow(getInvalidExtensionError(2));
    });

    it("should throw final error when children are invalid", () => {
        expect(() =>
            validateRulesList(
                "componentName.api.tsx",
                "ComponentName",
                nodesListInvalidChildren,
                config,
            ),
        ).toThrow(getInvalidChildrenError(2));
    });

    it("should throw final error when ruleId is invalid", () => {
        expect(() =>
            validateRulesList(
                "componentName.api.tsx",
                "ComponentName",
                nodesListInvalidRuleId,
                config,
            ),
        ).toThrow(getInvalidRuleIdError(2));
    });

    it("should throw final error when rules are invalid", () => {
        expect(() =>
            validateRulesList(
                "componentName.api.ts",
                "ComponentName",
                [{ ruleId: "test" }],
                {
                    structure: {
                        name: "src",
                    },
                    rules: 2 as unknown as ProjectStructureConfig["rules"],
                },
            ),
        ).toThrow(getInvalidRulesError(2));
    });

    it("should throw final error when ruleId do not exist in rules object", () => {
        expect(() =>
            validateRulesList(
                "componentName.api.ts",
                "ComponentName",
                nodesListRuleIdNotExist,
                config,
            ),
        ).toThrow(getIdRuleError("test"));
    });
});
