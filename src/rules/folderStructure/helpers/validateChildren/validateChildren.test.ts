import { validateRulesList } from "rules/folderStructure/helpers/validateChildren/helpers/validateRulesList";
import { validateChildren } from "rules/folderStructure/helpers/validateChildren/validateChildren";

jest.mock(
    "rules/folderStructure/helpers/validateChildren/helpers/validateRulesList",
    () => ({
        validateRulesList: jest.fn(),
    }),
);

describe("validateChildren", () => {
    it("should call validateRulesList when children are not empty", () => {
        const validateRulesListMock = jest.fn();

        (validateRulesList as jest.Mock).mockImplementation(
            validateRulesListMock,
        );

        validateChildren({
            pathname: "src/features/ComponentName.tsx",
            filenameWithoutCwd: "src/features/ComponentName.tsx",
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

        expect(validateRulesListMock).toHaveBeenCalled();
    });

    it("should not call validateRulesList when children are empty", () => {
        const validateRulesListMock = jest.fn();

        (validateRulesList as jest.Mock).mockImplementation(
            validateRulesListMock,
        );

        validateChildren({
            pathname: "src/features/ComponentName.tsx",
            filenameWithoutCwd: "src/features/ComponentName.tsx",
            nodeName: "src/features",
            children: [],
            config: {
                structure: {
                    name: "src",
                },
            },
        });

        expect(validateRulesListMock).not.toHaveBeenCalled();
    });
});
