import path from "path";

import { validateConfig } from "helpers/validateConfig";

import { isIgnoredPathname } from "rules/folderStructure/helpers/validateFolderStructure/helpers/isIgnoredPathname";
import { validateFolderStructure } from "rules/folderStructure/helpers/validateFolderStructure/validateFolderStructure";
import { validatePath } from "rules/folderStructure/helpers/validatePath/validatePath";

jest.mock(
  "rules/folderStructure/helpers/validateFolderStructure/helpers/isIgnoredPathname",
  () => ({
    isIgnoredPathname: jest.fn(),
  }),
);

jest.mock("helpers/validateConfig", () => ({
  validateConfig: jest.fn(),
}));

jest.mock("rules/folderStructure/helpers/validatePath/validatePath", () => ({
  validatePath: jest.fn(),
}));

describe("validateFolderStructure", () => {
  it("should return undefined when filePath is in ignorePatterns", () => {
    (isIgnoredPathname as jest.Mock).mockReturnValue(true);

    expect(
      validateFolderStructure({
        cwd: path.join("C:", "rootFolderName"),
        config: { structure: {} },
        filename: path.join(
          "C:",
          "rootFolderName",
          "src",
          "features",
          "ComponentName.tsx",
        ),
      }),
    ).toEqual(undefined);
  });

  it("should call validatePath", () => {
    const validatePathMock = jest.fn();

    (isIgnoredPathname as jest.Mock).mockReturnValue(false);
    (validatePath as jest.Mock).mockImplementation(validatePathMock);
    (validateConfig as jest.Mock).mockImplementation();

    validateFolderStructure({
      cwd: path.join("C:", "rootFolderName"),
      config: { structure: {} },
      filename: path.join(
        "C:",
        "rootFolderName",
        "src",
        "features",
        "ComponentName.tsx",
      ),
    });

    expect(validatePathMock).toHaveBeenCalledWith({
      pathname: "rootFolderName/src/features/ComponentName.tsx",
      filenameWithoutCwd: "src/features/ComponentName.tsx",
      cwd: path.join("C:", "rootFolderName"),
      folderName: "rootFolderName",
      rule: {},
      config: { structure: {} },
    });
  });
});
