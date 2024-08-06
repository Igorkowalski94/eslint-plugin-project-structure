import { handleProgram, HandleProgramProps } from "./handleProgram";
import { validateFolderStructure } from "./validateFolderStructure/validateFolderStructure";
import { FinalError } from "../../../errors/FinalError";
import { readConfigFile } from "../../../helpers/readConfigFile";

jest.mock("./validateFolderStructure/validateFolderStructure", () => ({
    validateFolderStructure: jest.fn(),
}));

jest.mock("../../../helpers/readConfigFile", () => ({
    readConfigFile: jest.fn(),
}));

describe("validateImport", () => {
    test("Should call report when error === FinalError ", () => {
        const reportMock = jest.fn();

        (readConfigFile as jest.Mock).mockReturnValue({});

        (validateFolderStructure as jest.Mock).mockImplementation(() => {
            throw new FinalError("error");
        });

        handleProgram({
            context: { report: reportMock, settings: {} },
            importPath: "",
            node: {},
        } as unknown as HandleProgramProps);

        expect(reportMock).toHaveBeenCalled();
    });

    test("Should throw random error when error !== FinalError ", () => {
        const reportMock = jest.fn();

        (readConfigFile as jest.Mock).mockReturnValue({});

        (validateFolderStructure as jest.Mock).mockImplementation(() => {
            throw "random error";
        });

        expect(() =>
            handleProgram({
                context: { report: reportMock, settings: {} },
                importPath: "",
                node: {},
            } as unknown as HandleProgramProps),
        ).toThrow("random error");
    });
});
