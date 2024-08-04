import { validatePath } from "./validatePath";
import { Rule } from "../../folderStructure.types";
import { validateChildren } from "../validateChildren/validateChildren";
import { validateName } from "../validateName/validateName";

jest.mock("../validateName/validateName", () => ({
    validateName: jest.fn(),
}));

jest.mock("../validateChildren/validateChildren", () => ({
    validateChildren: jest.fn(),
}));

describe("validatePath", () => {
    it("should call validateName when name is string", () => {
        const validateNameMock = jest.fn();
        (validateName as jest.Mock).mockImplementation(validateNameMock);

        validatePath({
            pathname: "ComponentName.tsx",
            filenameWithoutCwd: "ComponentName.tsx",
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
});
