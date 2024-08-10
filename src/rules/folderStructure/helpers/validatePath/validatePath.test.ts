import { Rule } from "rules/folderStructure/folderStructure.types";
import { checkNodeExistence } from "rules/folderStructure/helpers/checkNodeExistence";
import { validateChildren } from "rules/folderStructure/helpers/validateChildren/validateChildren";
import { validateName } from "rules/folderStructure/helpers/validateName/validateName";
import { validatePath } from "rules/folderStructure/helpers/validatePath/validatePath";

jest.mock("rules/folderStructure/helpers/validateName/validateName", () => ({
    validateName: jest.fn(),
}));

jest.mock(
    "rules/folderStructure/helpers/validateChildren/validateChildren",
    () => ({
        validateChildren: jest.fn(),
    }),
);

jest.mock("rules/folderStructure/helpers/checkNodeExistence", () => ({
    checkNodeExistence: jest.fn(),
}));

describe("validatePath", () => {
    it("should call validateName when name is string", () => {
        const validateNameMock = jest.fn();
        (validateName as jest.Mock).mockImplementation(validateNameMock);

        validatePath({
            pathname: "ComponentName.tsx",
            filenameWithoutCwd: "ComponentName.tsx",
            cwd: "...",
            parentName: "parentName",
            rule: {
                name: "test",
            },
            config: {
                structure: {
                    name: "src",
                },
            },
        });

        expect(validateNameMock).toHaveBeenCalled();
    });

    it("should not call validateName when name undefined", () => {
        const validateNameMock = jest.fn();
        (validateName as jest.Mock).mockImplementation(validateNameMock);

        validatePath({
            pathname: "ComponentName.tsx",
            filenameWithoutCwd: "ComponentName.tsx",
            cwd: "...",
            parentName: "parentName",
            rule: {
                name: undefined,
            } as Rule,
            config: {
                structure: {
                    name: "src",
                },
            },
        });

        expect(validateNameMock).not.toHaveBeenCalled();
    });

    it("should call validateChildren when nodeRule includes children", () => {
        const validateChildrenMock = jest.fn();
        (validateChildren as jest.Mock).mockImplementation(
            validateChildrenMock,
        );

        validatePath({
            pathname: "src/ComponentName",
            filenameWithoutCwd: "ComponentName.tsx",
            cwd: "...",
            parentName: "parentName",
            rule: {
                children: [{ name: "componentName" }],
            },
            config: {
                structure: {
                    name: "src",
                },
            },
        });

        expect(validateChildrenMock).toHaveBeenCalled();
    });

    it("should not call validateChildren when nodeRule do not includes children", () => {
        const validateChildrenMock = jest.fn();
        (validateChildren as jest.Mock).mockImplementation(
            validateChildrenMock,
        );

        validatePath({
            pathname: "ComponentName.tsx",
            filenameWithoutCwd: "ComponentName.tsx",
            cwd: "...",
            parentName: "parentName",
            rule: {
                name: "ComponentName",
            },
            config: {
                structure: {
                    name: "src",
                },
            },
        });

        expect(validateChildrenMock).not.toHaveBeenCalled();
    });

    it("should call checkNodeExistence when nodeRule includes enforceExistence", () => {
        const checkNodeExistenceMock = jest.fn();
        (checkNodeExistence as jest.Mock).mockImplementation(
            checkNodeExistenceMock,
        );

        validatePath({
            pathname: "src/ComponentName",
            filenameWithoutCwd: "ComponentName.tsx",
            cwd: "...",
            parentName: "parentName",
            rule: {
                name: "ComponentName",
                enforceExistence: ["test.ts"],
            },
            config: {
                structure: {
                    name: "src",
                },
            },
        });

        expect(checkNodeExistenceMock).toHaveBeenCalled();
    });

    it("should not call checkNodeExistence when nodeRule do not includes enforceExistence", () => {
        const checkNodeExistenceMock = jest.fn();
        (checkNodeExistence as jest.Mock).mockImplementation(
            checkNodeExistenceMock,
        );

        validatePath({
            pathname: "ComponentName.tsx",
            filenameWithoutCwd: "ComponentName.tsx",
            cwd: "...",
            parentName: "parentName",
            rule: {
                name: "ComponentName",
            },
            config: {
                structure: {
                    name: "src",
                },
            },
        });

        expect(checkNodeExistenceMock).not.toHaveBeenCalled();
    });
});
