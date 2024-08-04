import { validateAll } from "./validateAll";
import { getInvalidConfigFileError } from "../../../errors/getInvalidConfigFileError";
import { readConfigFile } from "../../../helpers/readConfigFile";

jest.mock("../../../helpers/readConfigFile", () => ({
    readConfigFile: jest.fn(),
}));

describe("validateAll", () => {
    test.each([undefined, ""])(
        "Should throw getInvalidConfigFileError when config is %s",
        (value) => {
            (readConfigFile as jest.Mock).mockReturnValue(value);

            expect(() =>
                validateAll({
                    configPath: "./config",
                    cwd: "../",
                    filename: "fileName",
                    importPath: "importPath",
                }),
            ).toThrow(getInvalidConfigFileError("./config"));
        },
    );
});
