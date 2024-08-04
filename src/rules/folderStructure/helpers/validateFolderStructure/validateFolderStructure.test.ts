import { isIgnoredPathname } from "./helpers/isIgnoredPathname";
import { validateFolderStructure } from "./validateFolderStructure";
import { getInvalidConfigFileError } from "../../../../errors/getInvalidConfigFileError";
import { readConfigFile } from "../../../../helpers/readConfigFile";
import { validateConfig } from "../../../../helpers/validateConfig";
import { validatePath } from "../validatePath/validatePath";

jest.mock("./helpers/isIgnoredPathname", () => ({
    isIgnoredPathname: jest.fn(),
}));

jest.mock("../../../../helpers/validateConfig", () => ({
    validateConfig: jest.fn(),
}));

jest.mock("../validatePath/validatePath", () => ({
    validatePath: jest.fn(),
}));

jest.mock("../../../../helpers/readConfigFile", () => ({
    readConfigFile: jest.fn(),
}));

describe("validateFolderStructure", () => {
    it.each([null, undefined])(
        "should throw error when config is invalid config = %s",
        (config) => {
            (readConfigFile as jest.Mock).mockReturnValue(config);

            expect(() =>
                validateFolderStructure({
                    cwd: "",
                    configPath: "folderStructure.json",
                    filename: "ComponentName.tsx",
                }),
            ).toThrow(getInvalidConfigFileError("folderStructure.json"));
        },
    );

    it("should return undefined when filePath is in ignorePatterns", () => {
        (isIgnoredPathname as jest.Mock).mockReturnValue(true);
        (readConfigFile as jest.Mock).mockReturnValue({ structure: {} });

        expect(
            validateFolderStructure({
                cwd: "",
                configPath: "folderStructure.json",
                filename: "src/features/ComponentName.tsx",
            }),
        ).toEqual(undefined);
    });

    it("should call validatePath", () => {
        const validatePathMock = jest.fn();

        (isIgnoredPathname as jest.Mock).mockReturnValue(false);
        (validatePath as jest.Mock).mockImplementation(validatePathMock);
        (validateConfig as jest.Mock).mockImplementation();
        (readConfigFile as jest.Mock).mockReturnValue({
            structure: { children: 2, name: {} },
        });

        validateFolderStructure({
            cwd: "",
            configPath: "folderStructure.json",
            filename: "src/features/ComponentName.tsx",
        });

        expect(validatePathMock).toHaveBeenCalledWith({
            pathname: "structure/src/features/ComponentName.tsx",
            filenameWithoutCwd: "src/features/ComponentName.tsx",
            parentName: "structure",
            rule: { children: 2, name: {} },
            config: { structure: { children: 2, name: {} } },
        });
    });
});
