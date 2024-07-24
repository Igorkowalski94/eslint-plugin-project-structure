import { TSESTree } from "@typescript-eslint/utils";
import { RuleContext } from "@typescript-eslint/utils/dist/ts-eslint";

import { getFileNameWithoutExtension } from "./getFileNameWithoutExtension";
import { validateName } from "./validateName";
import { ESLINT_ERRORS } from "../namingRules.consts";
import { NamingRule } from "../namingRules.types";

jest.mock("./getFileNameWithoutExtension", () => ({
    getFileNameWithoutExtension: jest.fn(),
}));

jest.mock("./shouldIgnoreFilenameReferences", () => ({
    shouldIgnoreFilenameReferences: jest.fn().mockReturnValue(false),
}));

jest.mock("path", () => ({
    ...jest.requireActual("path"),
    sep: "/",
}));

describe("validateName", () => {
    test("Should not call getFileNameWithoutExtension when !rule", () => {
        const getFileNameWithoutExtensionMock = jest.fn();

        (getFileNameWithoutExtension as jest.Mock).mockImplementation(
            getFileNameWithoutExtensionMock,
        );

        validateName({
            context: {
                settings: {},
                filename: ".../src/features/Feature1/Feature1.tsx",
                options: [
                    {
                        type: "VariableDeclarator",
                        filePattern: "**/*.ts",
                    },
                ],
                report: () => {},
            } as unknown as RuleContext<
                keyof typeof ESLINT_ERRORS,
                NamingRule[]
            >,
            name: "componentName",
            node: {} as TSESTree.VariableDeclarator,
            nameType: "VariableDeclarator",
        });

        expect(getFileNameWithoutExtensionMock).not.toHaveBeenCalled();
    });

    test.each<{ nameType: NamingRule["nameType"] }>([
        { nameType: "ClassDeclaration" },
        { nameType: ["ArrowFunctionExpression", "ClassDeclaration"] },
    ])("Should not call getFileNameWithoutExtension for %o", ({ nameType }) => {
        const getFileNameWithoutExtensionMock = jest.fn();

        (getFileNameWithoutExtension as jest.Mock).mockImplementation(
            getFileNameWithoutExtensionMock,
        );

        validateName({
            context: {
                settings: {},
                filename: ".../src/features/Feature1/Feature1.ts",
                options: [
                    {
                        nameType,
                        filePattern: "**/*.ts",
                    },
                ],
                report: () => {},
            } as unknown as RuleContext<
                keyof typeof ESLINT_ERRORS,
                NamingRule[]
            >,
            name: "componentName",
            node: {} as TSESTree.VariableDeclarator,
            nameType: "VariableDeclarator",
        });

        expect(getFileNameWithoutExtensionMock).not.toHaveBeenCalled();
    });

    test("Should not call report when name is valid", () => {
        const reportMock = jest.fn();

        (getFileNameWithoutExtension as jest.Mock).mockReturnValue("Feature1");

        validateName({
            context: {
                settings: {},

                filename: ".../src/features/Feature1/Feature1.tsx",
                options: [
                    {
                        type: "VariableDeclarator",
                        filePattern: "**/*.tsx",
                    },
                ],
                report: reportMock,
            } as unknown as RuleContext<
                keyof typeof ESLINT_ERRORS,
                NamingRule[]
            >,
            name: "Feature1",
            node: {} as TSESTree.VariableDeclarator,
            nameType: "VariableDeclarator",
        });

        expect(reportMock).not.toHaveBeenCalled();
    });

    test("Should call report when name is invalid", () => {
        const reportMock = jest.fn();

        (getFileNameWithoutExtension as jest.Mock).mockReturnValue(
            "helper.consts",
        );

        validateName({
            context: {
                settings: {},
                filename: ".../src/helpers/helper.consts.ts",
                options: [
                    {
                        filePattern: "**/*.ts",
                        type: "VariableDeclarator",
                        filenamePartsToRemove: [".consts"],
                        allowNames: [
                            "/^{filename_camelCase}$/",
                            "/^{filename_PascalCase}Props$/",
                            "/^{filename_PascalCase}Return$/",
                        ],
                    },
                ],
                report: reportMock,
            } as unknown as RuleContext<
                keyof typeof ESLINT_ERRORS,
                NamingRule[]
            >,
            name: "Helper",
            node: {} as TSESTree.VariableDeclarator,
            nameType: "VariableDeclarator",
        });

        expect(reportMock).toHaveBeenCalledWith({
            node: {},
            messageId: "invalidName",
            data: {
                allowNamesWithoutReference: JSON.stringify([
                    "/^helper$/",
                    "/^HelperProps$/",
                    "/^HelperReturn$/",
                ]),
            },
        });
    });
});
