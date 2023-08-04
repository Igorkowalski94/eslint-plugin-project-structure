import { getInvalidChildrenError } from "./helpers/getInvalidChildrenError";
import { validateRulesList } from "./helpers/validateRulesList";
import { validateChildren } from "./validateChildren";
import { Rule } from "../../types";

jest.mock("./helpers/validateRulesList", () => ({
    validateRulesList: jest.fn(),
}));

describe("validateChildren", () => {
    it.each([0, 1, {}, null, undefined, "test", ""])(
        "should throw error when children are invalid, children =  %s",
        (children) => {
            expect(() =>
                validateChildren(
                    "src/features/ComponentName.tsx",
                    "src/features",
                    children as Rule[],
                    {
                        structure: {
                            name: "src",
                        },
                    },
                ),
            ).toThrow(getInvalidChildrenError(children));
        },
    );

    it("should call validateChildren when children are not empty", () => {
        const validateRulesListMock = jest.fn();

        (validateRulesList as jest.Mock).mockImplementation(
            validateRulesListMock,
        );

        validateChildren(
            "src/features/ComponentName.tsx",
            "src/features",
            [
                {
                    children: [
                        {
                            name: "componentName",
                        },
                    ],
                },
            ],
            {
                structure: {
                    name: "src",
                },
            },
        );

        expect(validateRulesListMock).toBeCalled();
    });

    it("should not call validateChildren when children are empty", () => {
        const validateRulesListMock = jest.fn();

        (validateRulesList as jest.Mock).mockImplementation(
            validateRulesListMock,
        );

        validateChildren("src/features/ComponentName.tsx", "src/features", [], {
            structure: {
                name: "src",
            },
        });

        expect(validateRulesListMock).not.toBeCalled();
    });
});
