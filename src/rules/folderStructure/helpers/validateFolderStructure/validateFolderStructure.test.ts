import { isIgnoredPathname } from "./helpers/isIgnoredPathname";
import { validateFolderStructure } from "./validateFolderStructure";
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

describe("validateFolderStructure", () => {
    it("should return undefined when filePath is in ignorePatterns", () => {
        (isIgnoredPathname as jest.Mock).mockReturnValue(true);

        expect(
            validateFolderStructure({
                cwd: "",
                config: { structure: {} },
                filename: "src/features/ComponentName.tsx",
            }),
        ).toEqual(undefined);
    });

    it("should call validatePath", () => {
        const validatePathMock = jest.fn();

        (isIgnoredPathname as jest.Mock).mockReturnValue(false);
        (validatePath as jest.Mock).mockImplementation(validatePathMock);
        (validateConfig as jest.Mock).mockImplementation();

        validateFolderStructure({
            cwd: "",
            config: { structure: {} },
            filename: "src/features/ComponentName.tsx",
        });

        expect(validatePathMock).toHaveBeenCalledWith({
            pathname: "structure/src/features/ComponentName.tsx",
            filenameWithoutCwd: "src/features/ComponentName.tsx",
            parentName: "structure",
            rule: {},
            config: { structure: {} },
        });
    });
});
