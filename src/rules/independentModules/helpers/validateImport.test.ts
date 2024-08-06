import { validateAll } from "./validateAll";
import { ValidateImportProps, validateImport } from "./validateImport";
import { FinalError } from "../../../errors/FinalError";
import { readConfigFile } from "../../../helpers/readConfigFile";

jest.mock("./validateAll", () => ({
    validateAll: jest.fn(),
}));

jest.mock("../../../helpers/readConfigFile", () => ({
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
            context: { report: reportMock, settings: {} },
            importPath: "",
            node: {},
        } as unknown as ValidateImportProps);

        expect(reportMock).toHaveBeenCalled();
    });

    test("Should not call report when error !== FinalError ", () => {
        const reportMock = jest.fn();

        (readConfigFile as jest.Mock).mockReturnValue({});

        (validateAll as jest.Mock).mockImplementation(() => {
            throw "random error";
        });

        expect(() =>
            validateImport({
                context: { report: reportMock, settings: {} },
                importPath: "",
                node: {},
            } as unknown as ValidateImportProps),
        ).toThrow("random error");
    });
});
