import { FinalError } from "errors/FinalError";

import { readConfigFile } from "helpers/readConfigFile";

import { validateAll } from "rules/independentModules/helpers/validateAll";
import {
    validateImport,
    ValidateImportProps,
} from "rules/independentModules/helpers/validateImport";

jest.mock("rules/independentModules/helpers/validateAll", () => ({
    validateAll: jest.fn(),
}));

jest.mock("helpers/readConfigFile", () => ({
    readConfigFile: jest.fn(),
}));

describe("validateImport", () => {
    test("Should call report when error === FinalError ", () => {
        const reportMock = jest.fn();

        (readConfigFile as jest.Mock).mockReturnValue({});

        (validateAll as jest.Mock).mockImplementation(() => {
            throw new FinalError("error");
        });

        validateImport({
            context: { report: reportMock, settings: {}, cwd: "" },
            importPath: "",
            node: {},
        } as unknown as ValidateImportProps);

        expect(reportMock).toHaveBeenCalled();
    });

    test("Should not call report when error !== FinalError ", () => {
        const reportMock = jest.fn();

        (readConfigFile as jest.Mock).mockReturnValue({});

        (validateAll as jest.Mock).mockImplementation(() => {
            throw new Error("random error");
        });

        expect(() =>
            validateImport({
                context: { report: reportMock, settings: {}, cwd: "" },
                importPath: "",
                node: {},
            } as unknown as ValidateImportProps),
        ).toThrow(new Error("random error"));
    });
});
