import { getCurrentAllowNames } from "./getCurrentAllowNames";
import { isNameFromFileRoot } from "./isNameFromFileRoot";
import { ValidateNameProps } from "./validateName";
import { NamingRule } from "../namingRules.types";

jest.mock("./isNameFromFileRoot", () => ({
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
