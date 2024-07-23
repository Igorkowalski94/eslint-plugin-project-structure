import { isIgnoredPathname } from "./helpers/isIgnoredPathname";
import { validateFolderStructure } from "./validateFolderStructure";
import { readConfigFile } from "../../../../helpers/readConfigFile";
import { getInvalidConfigFileError } from "../../errors/getInvalidConfigFileError";
import { getInvalidStructureError } from "../../errors/getInvalidStructureError";
import { validatePath } from "../validatePath/validatePath";

jest.mock("./helpers/isIgnoredPathname", () => ({
    isIgnoredPathname: jest.fn(),
}));

jest.mock("../validatePath/validatePath", () => ({
    validatePath: jest.fn(),
}));

jest.mock("../../../../helpers/readConfigFile", () => ({
    readConfigFile: jest.fn(),
}));

describe("validateFolderStructure", () => {
    it("should return undefined when filePath is undefined", () => {
        expect(
            validateFolderStructure(".projectStructurerc", undefined),
        ).toEqual(undefined);
    });

    it.each([0, 1, "", "1", [], [1], null, undefined])(
        "should throw error when config is invalid config = %s",
        (config) => {
            (readConfigFile as jest.Mock).mockReturnValue(config);

            expect(() =>
                validateFolderStructure(
                    ".projectStructurerc",
                    "ComponentName.tsx",
                ),
            ).toThrow(getInvalidConfigFileError(".projectStructurerc"));
        },
    );

    it.each([0, 1, "", "1", [], [1], null, undefined])(
        "should throw error when structure is invalid structure = %s",
        (structure) => {
            (readConfigFile as jest.Mock).mockReturnValue({
                structure,
            });

            expect(() =>
                validateFolderStructure(
                    ".projectStructurerc",
                    "ComponentName.tsx",
                ),
            ).toThrow(getInvalidStructureError());
        },
    );

    it("should return undefined when filePath is in ignorePatterns", () => {
        (isIgnoredPathname as jest.Mock).mockReturnValue(true);
        (readConfigFile as jest.Mock).mockReturnValue({ structure: {} });

        expect(
            validateFolderStructure(
                ".projectStructurerc",
                "src/features/ComponentName.tsx",
            ),
        ).toEqual(undefined);
    });

    it("should call validatePath", () => {
        const validatePathMock = jest.fn();

        (isIgnoredPathname as jest.Mock).mockReturnValue(false);
        (validatePath as jest.Mock).mockImplementation(validatePathMock);
        (readConfigFile as jest.Mock).mockReturnValue({ structure: {} });

        validateFolderStructure(
            ".projectStructurerc",
            "src/features/ComponentName.tsx",
        );

        expect(validatePathMock).toBeCalledWith({
            pathname: "src/features/ComponentName.tsx",
            parentName: "structure",
            rule: {},
            config: { structure: {} },
        });
    });
});
