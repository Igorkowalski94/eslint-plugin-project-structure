import { getFolderTypeWithExtensionError } from "./helpers/getFolderTypeWithExtensionError";
import { getInvalidTypeError } from "./helpers/getInvalidTypeError";
import { getRuleIdWithOtherKeysError } from "./helpers/getRuleIdWithOtherKeysError";
import { validatePath } from "./validatePath";
import { Extension, Rule, Type } from "../../types";
import { validateChildren } from "../validateChildren/validateChildren";
import { validateExtension } from "../validateExtension/validateExtension";
import { validateName } from "../validateName/validateName";

jest.mock("../validateName/validateName", () => ({
    validateName: jest.fn(),
}));

jest.mock("../validateExtension/validateExtension", () => ({
    validateExtension: jest.fn(),
}));

jest.mock("../validateChildren/validateChildren", () => ({
    validateChildren: jest.fn(),
}));

describe("validatePath", () => {
    it.each<Rule>([
        { children: [] },
        { type: "folder", children: [] },
        { type: "file" },
        { extension: ".tsx" },
        { extension: [".tsx"] },
        { name: "test" },
    ])(
        "should throw error when ruleId is used with other keys, rule =  %s",
        (rule) => {
            expect(() =>
                validatePath(
                    "ComponentName.tsx",
                    "parentName",
                    {
                        ruleId: "test",
                        ...rule,
                    } as Rule,
                    {
                        structure: {},
                    },
                ),
            ).toThrow(getRuleIdWithOtherKeysError("test"));
        },
    );

    it.each([0, 1, {}, [], [1], null, "test", ""])(
        "should throw error when type is invalid, type =  %s",
        (type) => {
            expect(() =>
                validatePath(
                    "ComponentName.tsx",
                    "parentName",
                    {
                        type: type as unknown as undefined,
                    },
                    {
                        structure: {},
                    },
                ),
            ).toThrow(getInvalidTypeError(type));
        },
    );

    it.each<Extension>([".tsx", [".ts", ".js"]])(
        "should throw error when extension is used with type folder, extension =  %s",
        (extension) => {
            expect(() =>
                validatePath(
                    "ComponentName.tsx",
                    "parentName",
                    {
                        type: "folder",
                        extension,
                        children: [],
                    } as unknown as Rule,
                    {
                        structure: {},
                    },
                ),
            ).toThrow(getFolderTypeWithExtensionError(extension));
        },
    );

    it.each<Type | undefined>(["file", "folder", undefined])(
        "should not throw error when type is valid, type =  %s",
        (type) => {
            expect(() =>
                validatePath(
                    "ComponentName.tsx",
                    "parentName",
                    {
                        type: type as undefined,
                    },
                    {
                        structure: {},
                    },
                ),
            ).not.toThrow();
        },
    );

    it("should call validateName when name is string", () => {
        const validateNameMock = jest.fn();
        (validateName as jest.Mock).mockImplementation(validateNameMock);

        validatePath(
            "ComponentName.tsx",
            "parentName",
            {
                name: "test",
            },
            {
                structure: {},
            },
        );

        expect(validateNameMock).toBeCalled();
    });

    it("should not call validateName when name undefined", () => {
        const validateNameMock = jest.fn();
        (validateName as jest.Mock).mockImplementation(validateNameMock);

        validatePath(
            "ComponentName.tsx",
            "parentName",
            {
                name: undefined,
            },
            {
                structure: {},
            },
        );

        expect(validateNameMock).not.toBeCalled();
    });

    it.each<[string, Extension | undefined]>([
        ["ComponentName.tsx", [".tsx", ".ts"]],
        ["ComponentName.tsx", ".tsx"],
    ])(
        "should call validateExtension when pathname = %s, extension = %s",
        (pathname, extension) => {
            const validateExtensionMock = jest.fn();
            (validateExtension as jest.Mock).mockImplementation(
                validateExtensionMock,
            );

            validatePath(
                pathname,
                "parentName",
                {
                    extension,
                },
                {
                    structure: {},
                },
            );

            expect(validateExtensionMock).toBeCalled();
        },
    );

    it.each<[string, Extension | undefined]>([
        ["ComponentName.tsx", undefined],
        ["ComponentName/ComponentName.tsx", ".tsx"],
    ])(
        "should not call validateExtension when pathname = %s, extension = %s",
        (pathname, extension) => {
            const validateExtensionMock = jest.fn();
            (validateExtension as jest.Mock).mockImplementation(
                validateExtensionMock,
            );

            validatePath(
                pathname,
                "parentName",
                {
                    extension,
                },
                {
                    structure: {},
                },
            );

            expect(validateExtensionMock).not.toBeCalled();
        },
    );

    it("should call validateChildren when nodeRule includes children", () => {
        const validateChildrenMock = jest.fn();
        (validateChildren as jest.Mock).mockImplementation(
            validateChildrenMock,
        );

        validatePath(
            "src/ComponentName",
            "parentName",
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
            "parentName",
            {},
            {
                structure: {},
            },
        );

        expect(validateChildrenMock).not.toBeCalled();
    });
});
