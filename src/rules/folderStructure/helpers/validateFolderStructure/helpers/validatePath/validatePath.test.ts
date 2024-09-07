import { getNameError } from "rules/folderStructure/errors/getNameError";
import { getNodeTypeError } from "rules/folderStructure/errors/getNodeTypeError";
import { checkNodeExistence } from "rules/folderStructure/helpers/validateFolderStructure/helpers/checkNodeExistence";
import { validatePath } from "rules/folderStructure/helpers/validateFolderStructure/helpers/validatePath/validatePath";

jest.mock(
  "rules/folderStructure/helpers/validateFolderStructure/helpers/checkNodeExistence",
  () => ({
    checkNodeExistence: jest.fn(),
  }),
);

describe("validatePath", () => {
  it("Should throw getNodeTypeError", () => {
    expect(() =>
      validatePath({
        pathname: "src/componentName/componentName.tsx",
        filenameWithoutCwd: "src/componentName/componentName.tsx",
        cwd: "projectName",
        folderName: "projectName",
        rule: {
          name: "*",
          children: [
            {
              name: "src",
              children: [
                {
                  name: "{PascalCase}.tsx",
                },
              ],
            },
          ],
        },
        config: {
          structure: [
            {
              name: "src",
              children: [
                {
                  name: "{PascalCase}.tsx",
                },
              ],
            },
          ],
        },
      }),
    ).toThrow(
      getNodeTypeError({
        nodeName: "componentName",
        nodePath: "src/componentName",
        nodeType: "Folder",
      }),
    );
  });

  it("Should throw getNameError", () => {
    expect(() =>
      validatePath({
        pathname: "src/componentName.tsx",
        filenameWithoutCwd: "src/componentName.tsx",
        cwd: "projectName",
        folderName: "projectName",
        rule: {
          name: "*",
          children: [
            {
              name: "src",
              children: [
                {
                  name: "{PascalCase}.tsx",
                },
              ],
            },
          ],
        },
        config: {
          structure: [
            {
              name: "src",
              children: [
                {
                  name: "{PascalCase}.tsx",
                },
              ],
            },
          ],
        },
      }),
    ).toThrow(
      getNameError({
        allowedNames: ["{PascalCase}.tsx"],
        nodeName: "componentName.tsx",
        nodePath: "src/componentName.tsx",
        nodeType: "File",
      }),
    );
  });

  it("Should call checkNodeExistence", () => {
    const checkNodeExistenceMock = jest.fn();

    (checkNodeExistence as jest.Mock).mockImplementation(
      checkNodeExistenceMock,
    );

    validatePath({
      pathname: "src/ComponentName.tsx",
      filenameWithoutCwd: "src/ComponentName.tsx",
      cwd: "projectName",
      folderName: "projectName",
      rule: {
        name: "*",
        children: [
          {
            name: "src",
            children: [
              {
                name: "{PascalCase}.tsx",
                enforceExistence: ["{NodeName}.test.tsx"],
              },
            ],
          },
        ],
      },
      config: {
        structure: [
          {
            name: "src",
            children: [
              {
                name: "{PascalCase}.tsx",
                enforceExistence: ["{NodeName}.test.tsx"],
              },
            ],
          },
        ],
      },
    });

    expect(checkNodeExistence).toHaveBeenCalled();
  });
});
