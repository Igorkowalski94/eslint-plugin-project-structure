import { getInvalidConfigError } from "./helpers/getInvalidConfigError";
import { isIgnoredFile } from "./helpers/isIgnoredFile";
import { readConfigFile } from "./helpers/readConfigFile";
import { validateFileStructure } from "./validateFileStructure";
import { validatePath } from "../../validators/validatePath/validatePath";

jest.mock("./helpers/isIgnoredFile", () => ({
    isIgnoredFile: jest.fn(),
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

    it("should throw error when config is undefined", () => {
        expect(() =>
            validateFileStructure(
                ".projectStructurerc",
                "src/features/ComponentName.tsx",
            ),
        ).toThrow(getInvalidConfigError(".projectStructurerc"));
    });

    it("should throw error when config do not have structure", () => {
        (readConfigFile as jest.Mock).mockReturnValue({});

        expect(() =>
            validateFileStructure(
                ".projectStructurerc",
                "src/features/ComponentName.tsx",
            ),
        ).toThrow(getInvalidConfigError(".projectStructurerc"));
    });

    it("should return undefined when filePath is in ignorePatterns", () => {
        (isIgnoredFile as jest.Mock).mockReturnValue(true);
        (readConfigFile as jest.Mock).mockReturnValue({ structure: {} });

        expect(
            validateFileStructure(
                ".projectStructurerc",
                "src/features/ComponentName.tsx",
            ),
        ).toEqual(undefined);
    });

    it("should call undefined when filePath is in ignorePatterns", () => {
        const validatePathMock = jest.fn();

        (isIgnoredFile as jest.Mock).mockReturnValue(false);
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
