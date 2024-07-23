import { validateRulesList } from "./helpers/validateRulesList";
import { validateChildren } from "./validateChildren";
import { getInvalidChildrenError } from "../../errors/getInvalidChildrenError";
import { Rule } from "../../folderStructure.types";

jest.mock("./helpers/validateRulesList", () => ({
    validateRulesList: jest.fn(),
}));

describe("validateChildren", () => {
    it.each([
        0,
        1,
        {},
        null,
        undefined,
        "test",
        "",

        [0],
        [1],
        [null],
        [undefined],
        ["test"],
        [""],
    ])(
        "should throw error when children are invalid, children =  %s",
        (children) => {
            expect(() =>
                validateChildren({
                    pathname: "src/features/ComponentName.tsx",
                    nodeName: "src/features",
                    children: children as Rule[],
                    config: {
                        structure: {
                            name: "src",
                        },
                    },
                }),
            ).toThrow(getInvalidChildrenError(children));
        },
    );

    it("should call validateChildren when children are not empty", () => {
        const validateRulesListMock = jest.fn();

        (validateRulesList as jest.Mock).mockImplementation(
            validateRulesListMock,
        );

        validateChildren({
            pathname: "src/features/ComponentName.tsx",
            nodeName: "src/features",
            children: [
                {
                    children: [
                        {
                            name: "componentName",
                        },
                    ],
                },
            ],
            config: {
                structure: {
                    name: "src",
                },
            },
        });

        expect(validateRulesListMock).toBeCalled();
    });

    it("should not call validateChildren when children are empty", () => {
        const validateRulesListMock = jest.fn();

        (validateRulesList as jest.Mock).mockImplementation(
            validateRulesListMock,
        );

        validateChildren({
            pathname: "src/features/ComponentName.tsx",
            nodeName: "src/features",
            children: [],
            config: {
                structure: {
                    name: "src",
                },
            },
        });

        expect(validateRulesListMock).not.toBeCalled();
    });
});
