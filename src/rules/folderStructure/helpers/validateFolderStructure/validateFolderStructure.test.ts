import path from "path";

import { validateConfig } from "helpers/validateConfig";

import { checkNodeExistence } from "rules/folderStructure/helpers/validateFolderStructure/helpers/checkNodeExistence";
import { isIgnoredPathname } from "rules/folderStructure/helpers/validateFolderStructure/helpers/isIgnoredPathname";
import { validatePath } from "rules/folderStructure/helpers/validateFolderStructure/helpers/validatePath/validatePath";
import { validateFolderStructure } from "rules/folderStructure/helpers/validateFolderStructure/validateFolderStructure";

jest.mock(
  "rules/folderStructure/helpers/validateFolderStructure/helpers/isIgnoredPathname",
  () => ({
    isIgnoredPathname: jest.fn(),
  }),
);

jest.mock("helpers/validateConfig", () => ({
  validateConfig: jest.fn(),
}));

jest.mock(
  "rules/folderStructure/helpers/validateFolderStructure/helpers/validatePath/validatePath",
  () => ({
    validatePath: jest.fn(),
  }),
);

jest.mock(
  "rules/folderStructure/helpers/validateFolderStructure/helpers/checkNodeExistence",
  () => ({
    checkNodeExistence: jest.fn(),
  }),
);

describe("validateFolderStructure", () => {
  it("should return undefined when filePath is in ignorePatterns", () => {
    (isIgnoredPathname as jest.Mock).mockReturnValue(true);

    expect(
      validateFolderStructure({
        structureRoot: path.join("C:", "rootFolderName"),
        projectRoot: path.join("C:", "rootFolderName"),
        config: { structure: [{ name: "camelCase.tsx" }] },
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

  it("should call checkNodeExistence", () => {
    const checkNodeExistenceMock = jest.fn();

    (isIgnoredPathname as jest.Mock).mockReturnValue(false);
    (checkNodeExistence as jest.Mock).mockImplementation(
      checkNodeExistenceMock,
    );
    (validateConfig as jest.Mock).mockImplementation();

    validateFolderStructure({
      structureRoot: path.join("C:", "rootFolderName"),
      projectRoot: path.join("C:", "rootFolderName"),
      config: {
        structure: {
          enforceExistence: ["./src/test.ts"],
          children: [{ name: "camelCase.tsx" }],
        },
      },
      filename: path.join(
        "C:",
        "rootFolderName",
        "src",
        "features",
        "ComponentName.tsx",
      ),
    });

    expect(checkNodeExistenceMock).toHaveBeenCalledWith({
      enforceExistence: ["./src/test.ts"],
      nodeName: "rootFolderName",
      nodeType: "Folder",
      structureRoot: path.join("C:", "rootFolderName"),
      projectRoot: path.join("C:", "rootFolderName"),
      nodePath: "",
    });
  });

  it("should call validatePath", () => {
    const validatePathMock = jest.fn();

    (isIgnoredPathname as jest.Mock).mockReturnValue(false);
    (validatePath as jest.Mock).mockImplementation(validatePathMock);
    (validateConfig as jest.Mock).mockImplementation();

    validateFolderStructure({
      structureRoot: path.join("C:", "rootFolderName"),
      projectRoot: path.join("C:", "rootFolderName"),
      config: {
        structure: { name: "name", children: [{ name: "camelCase.tsx" }] },
      },
      filename: path.join(
        "C:",
        "rootFolderName",
        "src",
        "features",
        "ComponentName.tsx",
      ),
    });

    expect(validatePathMock).toHaveBeenCalledWith({
      pathname: "src/features/ComponentName.tsx",
      filenameWithoutProjectRoot: "src/features/ComponentName.tsx",
      structureRoot: path.join("C:", "rootFolderName"),
      projectRoot: path.join("C:", "rootFolderName"),
      folderName: "rootFolderName",
      rule: { name: "rootFolderName", children: [{ name: "camelCase.tsx" }] },
      config: {
        structure: { name: "name", children: [{ name: "camelCase.tsx" }] },
      },
    });
  });
});
