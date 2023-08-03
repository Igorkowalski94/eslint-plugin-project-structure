import { getInvalidConfigFileError } from "./helpers/getInvalidConfigFileError";
import { getInvalidStructureError } from "./helpers/getInvalidStructureError";
import { isIgnoredPath } from "./helpers/isIgnoredPath";
import { readConfigFile } from "./helpers/readConfigFile";
import { validateFileStructure } from "./validateFileStructure";
import { validatePath } from "../../validators/validatePath/validatePath";

jest.mock("./helpers/isIgnoredPath", () => ({
    isIgnoredPath: jest.fn(),
}));

jest.mock("../../validators/validatePath/validatePath", () => ({
    validatePath: jest.fn(),
}));

jest.mock("./helpers/readConfigFile", () => ({
    readConfigFile: jest.fn(),
}));

describe("validateFileStructure", () => {
    it("should return undefined when filePath is undefined", () => {
        expect(validateFileStructure(".projectStructurerc", undefined)).toEqual(
            undefined,
        );
    });

    it.each([0, 1, "", "1", [], [1], null, undefined])(
        "should throw error when config is invalid config = %s",
        (config) => {
            (readConfigFile as jest.Mock).mockReturnValue(config);

            expect(() =>
                validateFileStructure(
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
                validateFileStructure(
                    ".projectStructurerc",
                    "ComponentName.tsx",
                ),
            ).toThrow(getInvalidStructureError(structure));
        },
    );

    it("should return undefined when filePath is in ignorePatterns", () => {
        (isIgnoredPath as jest.Mock).mockReturnValue(true);
        (readConfigFile as jest.Mock).mockReturnValue({ structure: {} });

        expect(
            validateFileStructure(
                ".projectStructurerc",
                "src/features/ComponentName.tsx",
            ),
        ).toEqual(undefined);
    });

    it("should call validatePath", () => {
        const validatePathMock = jest.fn();

        (isIgnoredPath as jest.Mock).mockReturnValue(false);
        (validatePath as jest.Mock).mockImplementation(validatePathMock);
        (readConfigFile as jest.Mock).mockReturnValue({ structure: {} });

        validateFileStructure(
            ".projectStructurerc",
            "src/features/ComponentName.tsx",
        );

        expect(validatePathMock).toBeCalledWith(
            "src/features/ComponentName.tsx",
            "structure",
            {},
            { structure: {} },
        );
    });
});
