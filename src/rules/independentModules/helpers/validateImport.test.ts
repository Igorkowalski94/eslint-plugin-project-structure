import { validateAll } from "./validateAll";
import { ValidateImportProps, validateImport } from "./validateImport";
import { FinalError } from "../../../errors/FinalError";
import { getConfigPath } from "../../../helpers/getConfigPath";

jest.mock("./validateAll", () => ({
    validateAll: jest.fn(),
}));

jest.mock("../../../helpers/getConfigPath", () => ({
    getConfigPath: jest.fn(),
}));

describe("validateImport", () => {
    test("Should call report when error === FinalError ", () => {
        const reportMock = jest.fn();

        (getConfigPath as jest.Mock).mockReturnValue("configPath");

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

        (getConfigPath as jest.Mock).mockReturnValue("configPath");

        (validateAll as jest.Mock).mockImplementation(() => {
            throw "random error";
        });

        validateImport({
            context: { report: reportMock, settings: {} },
            importPath: "",
            node: {},
        } as unknown as ValidateImportProps);

        expect(reportMock).not.toHaveBeenCalled();
    });
});
