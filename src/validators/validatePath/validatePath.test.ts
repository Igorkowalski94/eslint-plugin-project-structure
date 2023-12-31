import { getInvalidRuleError } from "./helpers/getInvalidRuleError";
import { getInvalidTypeError } from "./helpers/getInvalidTypeError";
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
                validatePath({
                    pathname: "componentName",
                    parentName: "parentName",
                    rule: rule as unknown as Rule,
                    config: {
                        structure: {
                            name: "src",
                        },
                    },
                }),
            ).toThrow(getInvalidRuleError(rule));
        },
    );

    it("should throw final error when rule type is invalid", () => {
        expect(() =>
            validatePath({
                pathname: "componentName",
                parentName: "parentName",
                rule: { children: [], extension: [] } as unknown as Rule,
                config: {
                    structure: {
                        name: "src",
                    },
                },
            }),
        ).toThrow(getInvalidTypeError({ children: [], extension: [] }));
    });

    it("should call validateName when name is string", () => {
        const validateNameMock = jest.fn();
        (validateName as jest.Mock).mockImplementation(validateNameMock);

        validatePath({
            pathname: "ComponentName.tsx",
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

        expect(validateNameMock).toBeCalled();
    });

    it("should not call validateName when name undefined", () => {
        const validateNameMock = jest.fn();
        (validateName as jest.Mock).mockImplementation(validateNameMock);

        validatePath({
            pathname: "ComponentName.tsx",
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

            validatePath({
                pathname,
                parentName: "parentName",
                rule: {
                    extension,
                } as Rule,
                config: {
                    structure: {
                        name: "src",
                    },
                },
            });

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

            validatePath({
                pathname,
                parentName: "parentName",
                rule: {
                    extension,
                } as Rule,
                config: {
                    structure: {
                        name: "src",
                    },
                },
            });

            expect(validateExtensionMock).not.toBeCalled();
        },
    );

    it("should call validateChildren when nodeRule includes children", () => {
        const validateChildrenMock = jest.fn();
        (validateChildren as jest.Mock).mockImplementation(
            validateChildrenMock,
        );

        validatePath({
            pathname: "src/ComponentName",
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

        expect(validateChildrenMock).toBeCalled();
    });

    it("should not call validateChildren when nodeRule do not includes children", () => {
        const validateChildrenMock = jest.fn();
        (validateChildren as jest.Mock).mockImplementation(
            validateChildrenMock,
        );

        validatePath({
            pathname: "ComponentName.tsx",
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

        expect(validateChildrenMock).not.toBeCalled();
    });
});
