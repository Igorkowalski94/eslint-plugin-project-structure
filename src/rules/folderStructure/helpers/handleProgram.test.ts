import { handleProgram, HandleProgramProps } from "./handleProgram";
import { validateFolderStructure } from "./validateFolderStructure/validateFolderStructure";
import { FinalError } from "../../../errors/FinalError";

jest.mock("./validateFolderStructure/validateFolderStructure", () => ({
    validateFolderStructure: jest.fn(),
}));

describe("validateImport", () => {
    test("Should call report when error === FinalError ", () => {
        const reportMock = jest.fn();

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

    test("Should not call report when error !== FinalError ", () => {
        const reportMock = jest.fn();

        (validateFolderStructure as jest.Mock).mockImplementation(() => {
            throw "random error";
        });

        handleProgram({
            context: { report: reportMock, settings: {} },
            importPath: "",
            node: {},
        } as unknown as HandleProgramProps);

        expect(reportMock).not.toHaveBeenCalled();
    });
});
