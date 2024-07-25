import { TSESTree } from "@typescript-eslint/utils";
import { RuleContext } from "@typescript-eslint/utils/dist/ts-eslint";

import { getCurrentAllowNames } from "./getCurrentAllowNames";
import { isCorrectNameType } from "./isCorrectNameType";
import { validateName } from "./validateName";
import { CAMEL_CASE } from "../../../consts";
import { ESLINT_ERRORS } from "../namingRules.consts";
import { FileNamingRules } from "../namingRules.types";

jest.mock("./isCorrectNameType", () => ({
    isCorrectNameType: jest.fn(),
}));

jest.mock("./getCurrentAllowNames", () => ({
    getCurrentAllowNames: jest.fn(),
}));

jest.mock("path", () => ({
    ...jest.requireActual("path"),
    sep: "/",
}));

describe("validateName", () => {
    test("Should return undefined if !fileRule", () => {
        expect(
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
                    FileNamingRules[]
                >,
                name: "componentName",
                node: {} as TSESTree.VariableDeclarator,
                nameType: "VariableDeclarator",
            }),
        ).toEqual(undefined);
    });

    test("Should return undefined if !isCorrectNameType", () => {
        const isCorrectNameTypeMock = jest.fn().mockReturnValue(false);

        (isCorrectNameType as jest.Mock).mockImplementation(
            isCorrectNameTypeMock,
        );

        expect(
            validateName({
                context: {
                    settings: {},
                    filename: ".../src/features/Feature1/Feature1.tsx",
                    options: [
                        {
                            filePattern: "**/*.tsx",
                            rules: [
                                {
                                    nameType: "VariableDeclarator",
                                    allowNames: ["/^{camelCase}$/"],
                                },
                            ],
                        },
                    ],
                    report: () => {},
                } as unknown as RuleContext<
                    keyof typeof ESLINT_ERRORS,
                    FileNamingRules[]
                >,
                name: "componentName",
                node: {} as TSESTree.VariableDeclarator,
                nameType: "VariableDeclarator",
            }),
        ).toEqual(undefined);

        expect(isCorrectNameTypeMock).toHaveBeenCalled();
    });

    test("Should return undefined if !currentAllowNames", () => {
        const isCorrectNameTypeMock = jest.fn().mockReturnValue(true);
        const getCurrentAllowNamesMock = jest.fn().mockReturnValue(undefined);

        (isCorrectNameType as jest.Mock).mockImplementation(
            isCorrectNameTypeMock,
        );

        (getCurrentAllowNames as jest.Mock).mockImplementation(
            getCurrentAllowNamesMock,
        );

        expect(
            validateName({
                context: {
                    settings: {},
                    filename: ".../src/features/Feature1/Feature1.tsx",
                    options: [
                        {
                            filePattern: "**/*.tsx",
                            rules: [
                                {
                                    nameType: "VariableDeclarator",
                                    allowNames: ["/^{camelCase}$/"],
                                },
                            ],
                        },
                    ],
                    report: () => {},
                } as unknown as RuleContext<
                    keyof typeof ESLINT_ERRORS,
                    FileNamingRules[]
                >,
                name: "componentName",
                node: {} as TSESTree.VariableDeclarator,
                nameType: "VariableDeclarator",
            }),
        ).toEqual(undefined);

        expect(isCorrectNameTypeMock).toHaveBeenCalled();
        expect(getCurrentAllowNamesMock).toHaveBeenCalled();
    });

    test("Should call report if !isValidExport", () => {
        const isCorrectNameTypeMock = jest.fn().mockReturnValue(true);
        const getCurrentAllowNamesMock = jest
            .fn()
            .mockReturnValue(["/^{camelCase}$/"]);
        const reportMock = jest.fn();

        (isCorrectNameType as jest.Mock).mockImplementation(
            isCorrectNameTypeMock,
        );

        (getCurrentAllowNames as jest.Mock).mockImplementation(
            getCurrentAllowNamesMock,
        );

        validateName({
            context: {
                settings: {},
                filename: ".../src/features/Feature1/Feature1.tsx",
                options: [
                    {
                        filePattern: "**/*.tsx",
                        rules: [
                            {
                                nameType: "VariableDeclarator",
                                allowNames: ["/^{camelCase}$/"],
                            },
                        ],
                    },
                ],
                report: reportMock,
            } as unknown as RuleContext<
                keyof typeof ESLINT_ERRORS,
                FileNamingRules[]
            >,
            name: "VariableName",
            node: {} as TSESTree.VariableDeclarator,
            nameType: "VariableDeclarator",
        });

        expect(isCorrectNameTypeMock).toHaveBeenCalled();
        expect(getCurrentAllowNamesMock).toHaveBeenCalled();
        expect(reportMock).toHaveBeenCalledWith({
            node: {},
            messageId: "invalidName",
            data: {
                allowNamesWithoutReferences: JSON.stringify([
                    `/^${CAMEL_CASE}$/`,
                ]),
            },
        });
    });

    test("Should not call report if isValidExport", () => {
        const isCorrectNameTypeMock = jest.fn().mockReturnValue(true);
        const getCurrentAllowNamesMock = jest
            .fn()
            .mockReturnValue(["/^{camelCase}$/"]);
        const reportMock = jest.fn();

        (isCorrectNameType as jest.Mock).mockImplementation(
            isCorrectNameTypeMock,
        );

        (getCurrentAllowNames as jest.Mock).mockImplementation(
            getCurrentAllowNamesMock,
        );

        validateName({
            context: {
                settings: {},
                filename: ".../src/features/Feature1/Feature1.tsx",
                options: [
                    {
                        filePattern: "**/*.tsx",
                        rules: [
                            {
                                nameType: "VariableDeclarator",
                                allowNames: ["/^{camelCase}$/"],
                            },
                        ],
                    },
                ],
                report: reportMock,
            } as unknown as RuleContext<
                keyof typeof ESLINT_ERRORS,
                FileNamingRules[]
            >,
            name: "variableName",
            node: {} as TSESTree.VariableDeclarator,
            nameType: "VariableDeclarator",
        });

        expect(isCorrectNameTypeMock).toHaveBeenCalled();
        expect(getCurrentAllowNamesMock).toHaveBeenCalled();
        expect(reportMock).not.toHaveBeenCalled();
    });
});
