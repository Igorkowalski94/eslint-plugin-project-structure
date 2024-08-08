import { getCurrentAllowNames } from "rules/namingRules/helpers/getCurrentAllowNames";
import { isNameFromFileRoot } from "rules/namingRules/helpers/isNameFromFileRoot";
import { ValidateNameProps } from "rules/namingRules/helpers/validateName";
import { NamingRule } from "rules/namingRules/namingRules.types";

jest.mock("rules/namingRules/helpers/isNameFromFileRoot", () => ({
    isNameFromFileRoot: jest.fn(),
}));

describe("getCurrentAllowNames", () => {
    test.each<{
        allowNames?: NamingRule["allowNames"];
        allowNamesFileRoot?: NamingRule["allowNames"];
        expected: NamingRule["allowNames"];
        isNameFromFileRootReturn: boolean;
    }>([
        {
            allowNames: ["a"],
            isNameFromFileRootReturn: true,
            expected: ["a"],
        },
        {
            allowNamesFileRoot: ["b"],
            isNameFromFileRootReturn: false,
            expected: undefined,
        },

        {
            allowNames: ["a"],
            allowNamesFileRoot: ["b"],
            isNameFromFileRootReturn: true,
            expected: ["b"],
        },
        {
            allowNames: ["a"],
            allowNamesFileRoot: ["b"],
            isNameFromFileRootReturn: false,
            expected: ["a"],
        },
    ])(
        "Should return correct values for %o",
        ({
            allowNames,
            allowNamesFileRoot,
            isNameFromFileRootReturn,
            expected,
        }) => {
            (isNameFromFileRoot as jest.Mock).mockReturnValue(
                isNameFromFileRootReturn,
            );

            expect(
                getCurrentAllowNames({
                    allowNames,
                    allowNamesFileRoot,
                    nameType: "ArrowFunctionExpression",
                    node: {} as ValidateNameProps["node"],
                }),
            ).toEqual(expected);
        },
    );
});
