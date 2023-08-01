import { validatePath } from "./validatePath";
import { Name } from "../../types";
import { validateCase } from "../validateCase/validateCase";
import { validateChildren } from "../validateChildren/validateChildren";
import { validateExtension } from "../validateExtension/validateExtension";
import { validateInheritParentName } from "../validateInheritParentName/validateInheritParentName";
import { validateName } from "../validateName/validateName";

jest.mock("../validateInheritParentName/validateInheritParentName", () => ({
    validateInheritParentName: jest.fn(),
}));

jest.mock("../validateName/validateName", () => ({
    validateName: jest.fn(),
}));

jest.mock("../validateCase/validateCase", () => ({
    validateCase: jest.fn(),
}));

jest.mock("../validateExtension/validateExtension", () => ({
    validateExtension: jest.fn(),
}));

jest.mock("../validateChildren/validateChildren", () => ({
    validateChildren: jest.fn(),
}));

describe("validatePath", () => {
    it.each<[Name]>([
        [{ inheritParentName: "firstLetterLowercase" }],
        [{ regex: "//", inheritParentName: "firstLetterUppercase" }],
    ])("should call validateInheritParentName when name =  %s", (name) => {
        const validateInheritParentNameMock = jest.fn();
        (validateInheritParentName as jest.Mock).mockImplementation(
            validateInheritParentNameMock,
        );

        validatePath(
            "ComponentName.tsx",
            "componentName",
            {
                name,
            },
            {
                structure: {},
            },
        );

        expect(validateInheritParentNameMock).toBeCalled();
    });

    it.each<[Name]>([
        [{ case: "PascalCase" }],
        [{ regex: "//" }],
        ["componentName"],
    ])("should not call validateInheritParentName when name =  %s", (name) => {
        const validateInheritParentNameMock = jest.fn();
        (validateInheritParentName as jest.Mock).mockImplementation(
            validateInheritParentNameMock,
        );

        validatePath(
            "ComponentName.tsx",
            "componentName",
            {
                name,
            },
            {
                structure: {},
            },
        );

        expect(validateInheritParentNameMock).not.toBeCalled();
    });

    it("should call validateName when name is string", () => {
        const validateNameMock = jest.fn();
        (validateName as jest.Mock).mockImplementation(validateNameMock);

        validatePath(
            "ComponentName.tsx",
            "componentName",
            {
                name: "test",
            },
            {
                structure: {},
            },
        );

        expect(validateNameMock).toBeCalled();
    });

    it.each<[Name]>([
        [{ inheritParentName: "firstLetterLowercase" }],
        [{ regex: "//", inheritParentName: "firstLetterLowercase" }],
    ])("should not call validateName when name =  %s", (name) => {
        const validateNameMock = jest.fn();
        (validateName as jest.Mock).mockImplementation(validateNameMock);

        validatePath(
            "ComponentName.tsx",
            "componentName",
            {
                name,
            },
            {
                structure: {},
            },
        );

        expect(validateNameMock).not.toBeCalled();
    });

    it("should call validateCase when name is object and case is passed", () => {
        const validateCaseMock = jest.fn();
        (validateCase as jest.Mock).mockImplementation(validateCaseMock);

        validatePath(
            "ComponentName.tsx",
            "componentName",
            {
                name: { case: "PascalCase" },
            },
            {
                structure: {},
            },
        );

        expect(validateCaseMock).toBeCalled();
    });

    it.each<[Name]>([
        [{ inheritParentName: "firstLetterLowercase" }],
        [{ regex: "//" }],
        [{ regex: "//", inheritParentName: "firstLetterUppercase" }],
        ["componentName"],
    ])("should not call validateCase when name =  %s", (name) => {
        const validateCaseMock = jest.fn();
        (validateCase as jest.Mock).mockImplementation(validateCaseMock);

        validatePath(
            "ComponentName.tsx",
            "componentName",
            {
                name,
            },
            {
                structure: {},
            },
        );

        expect(validateCaseMock).not.toBeCalled();
    });

    it("should call validateExtension when fileName has extension", () => {
        const validateExtensionMock = jest.fn();
        (validateExtension as jest.Mock).mockImplementation(
            validateExtensionMock,
        );

        validatePath(
            "ComponentName.tsx",
            "componentName",
            {},
            {
                structure: {},
            },
        );

        expect(validateExtensionMock).toBeCalled();
    });

    it("should not call validateExtension when fileName do not include extension", () => {
        const validateExtensionMock = jest.fn();
        (validateExtension as jest.Mock).mockImplementation(
            validateExtensionMock,
        );

        validatePath(
            "src/ComponentName",
            "src",
            {},
            {
                structure: {},
            },
        );

        expect(validateExtensionMock).not.toBeCalled();
    });

    it("should call validateChildren when nodeRule includes children", () => {
        const validateChildrenMock = jest.fn();
        (validateChildren as jest.Mock).mockImplementation(
            validateChildrenMock,
        );

        validatePath(
            "src/ComponentName",
            "src",
            {
                children: [{ name: "elo" }],
            },
            {
                structure: {},
            },
        );

        expect(validateChildrenMock).toBeCalled();
    });

    it("should not call validateChildren when nodeRule do not includes children", () => {
        const validateChildrenMock = jest.fn();
        (validateChildren as jest.Mock).mockImplementation(
            validateChildrenMock,
        );

        validatePath(
            "ComponentName.tsx",
            "componentName",
            {},
            {
                structure: {},
            },
        );

        expect(validateChildrenMock).not.toBeCalled();
    });
});
