import { getInvalidRuleError } from "./helpers/getInvalidRuleError";
import { validatePath } from "./validatePath";
import { Extension, Rule } from "../../types";
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
    it.each([0, 1, [], [1], null, undefined, "test", ""])(
        "should throw error when rule is invalid, rule =  %s",
        (rule) => {
            expect(() =>
                validatePath(
                    "componentName",
                    "parentName",
                    rule as unknown as Rule,
                    {
                        structure: {
                            name: "src",
                        },
                    },
                ),
            ).toThrow(getInvalidRuleError(rule));
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
                structure: {
                    name: "src",
                },
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
            } as Rule,
            {
                structure: {
                    name: "src",
                },
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
                } as Rule,
                {
                    structure: {
                        name: "src",
                    },
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
                } as Rule,
                {
                    structure: {
                        name: "src",
                    },
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
                children: [{ name: "componentName" }],
            },
            {
                structure: {
                    name: "src",
                },
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
            {
                name: "ComponentName",
            },
            {
                structure: {
                    name: "src",
                },
            },
        );

        expect(validateChildrenMock).not.toBeCalled();
    });
});
