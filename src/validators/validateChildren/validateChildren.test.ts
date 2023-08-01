import { validateRulesList } from "./helpers/validateRulesList";
import { validateChildren } from "./validateChildren";

jest.mock("./helpers/validateRulesList", () => ({
    validateRulesList: jest.fn(),
}));

describe("validateChildren", () => {
    it("should call validateChildren when children are not empty", () => {
        const validateRulesListMock = jest.fn();

        (validateRulesList as jest.Mock).mockImplementation(
            validateRulesListMock,
        );

        validateChildren(
            "src/features/ComponentName.tsx",
            "src/features",
            {
                children: [
                    {
                        name: "componentName",
                    },
                ],
            },
            { structure: {} },
        );

        expect(validateRulesListMock).toBeCalled();
    });

    it("should not call validateChildren when children are empty", () => {
        const validateRulesListMock = jest.fn();

        (validateRulesList as jest.Mock).mockImplementation(
            validateRulesListMock,
        );

        validateChildren(
            "src/features/ComponentName.tsx",
            "src/features",
            {
                children: [],
            },
            { structure: {} },
        );

        expect(validateRulesListMock).not.toBeCalled();
    });
});
