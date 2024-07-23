import { TSESTree } from "@typescript-eslint/utils";
import { RuleContext } from "@typescript-eslint/utils/dist/ts-eslint";

import { getFileNameWithoutExtension } from "./getFileNameWithoutExtension";
import { validateExport } from "./validateExport";
import { ESLINT_ERRORS } from "../exportRules.consts";
import { ExportRules } from "../exportRules.types";

jest.mock("./getFileNameWithoutExtension", () => ({
    getFileNameWithoutExtension: jest.fn(),
}));

describe("validateExport", () => {
    test("Should not call getFileNameWithoutExtension when !rule", () => {
        const getFileNameWithoutExtensionMock = jest.fn();

        (getFileNameWithoutExtension as jest.Mock).mockImplementation(
            getFileNameWithoutExtensionMock,
        );

        validateExport({
            context: {
                filename: "features/Feature1/Feature1.tsx",
                options: [
                    {
                        filePattern: "**/*.ts",
                    },
                ],
                report: () => {},
            } as unknown as RuleContext<
                keyof typeof ESLINT_ERRORS,
                ExportRules[]
            >,
            exportName: "componentName",
            node: {} as TSESTree.Identifier,
        });

        expect(getFileNameWithoutExtensionMock).not.toHaveBeenCalled();
    });

    test("Should not call report when exportName is valid", () => {
        const reportMock = jest.fn();

        (getFileNameWithoutExtension as jest.Mock).mockReturnValue("Feature1");

        validateExport({
            context: {
                filename: "features/Feature1/Feature1.tsx",
                options: [
                    {
                        filePattern: "**/*.tsx",
                    },
                ],
                report: reportMock,
            } as unknown as RuleContext<
                keyof typeof ESLINT_ERRORS,
                ExportRules[]
            >,
            exportName: "Feature1",
            node: {} as TSESTree.Identifier,
        });

        expect(reportMock).not.toHaveBeenCalled();
    });

    test("Should call report when exportName is invalid", () => {
        const reportMock = jest.fn();

        (getFileNameWithoutExtension as jest.Mock).mockReturnValue(
            "helper.consts",
        );

        validateExport({
            context: {
                filename: "helpers/helper.consts.ts",
                options: [
                    {
                        filePattern: "**/*.ts",
                        filenamePartsToRemove: [".consts"],
                        allowExportNames: [
                            "/^{filename_camelCase}$/",
                            "/^{filename_PascalCase}Props$/",
                            "/^{filename_PascalCase}Return$/",
                        ],
                    },
                ],
                report: reportMock,
            } as unknown as RuleContext<
                keyof typeof ESLINT_ERRORS,
                ExportRules[]
            >,
            exportName: "Helper",
            node: {} as TSESTree.Identifier,
        });

        expect(reportMock).toHaveBeenCalledWith({
            node: {},
            messageId: "invalidExportName",
            data: {
                allowExportNamesWithoutReference: JSON.stringify([
                    "/^helper$/",
                    "/^HelperProps$/",
                    "/^HelperReturn$/",
                ]),
            },
        });
    });
});
