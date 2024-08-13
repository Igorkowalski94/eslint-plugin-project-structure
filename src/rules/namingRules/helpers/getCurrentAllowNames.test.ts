import { getCurrentAllowNames } from "rules/namingRules/helpers/getCurrentAllowNames";
import { isExportName } from "rules/namingRules/helpers/isExportName";
import { isNameFromFileRoot } from "rules/namingRules/helpers/isNameFromFileRoot";
import { ValidateNameProps } from "rules/namingRules/helpers/validateName";
import { NamingRule } from "rules/namingRules/namingRules.types";

jest.mock("rules/namingRules/helpers/isNameFromFileRoot", () => ({
  isNameFromFileRoot: jest.fn(),
}));

jest.mock("rules/namingRules/helpers/isExportName", () => ({
  isExportName: jest.fn(),
}));

describe("getCurrentAllowNames", () => {
  test.each<{
    allowNames?: NamingRule["allowNames"];
    allowNamesFileRoot?: NamingRule["allowNames"];
    allowNamesExport?: NamingRule["allowNamesExport"];
    expected: NamingRule["allowNames"];
    isNameFromFileRootReturn: boolean;
    isExportNameReturn: boolean;
  }>([
    {
      allowNames: ["a"],
      allowNamesExport: ["b"],
      allowNamesFileRoot: ["c"],
      isExportNameReturn: false,
      isNameFromFileRootReturn: false,
      expected: ["a"],
    },
    {
      allowNamesExport: ["b"],
      allowNamesFileRoot: ["c"],
      isExportNameReturn: false,
      isNameFromFileRootReturn: false,
      expected: undefined,
    },

    {
      allowNames: ["a"],
      allowNamesExport: ["b"],
      allowNamesFileRoot: ["c"],
      isExportNameReturn: true,
      isNameFromFileRootReturn: false,
      expected: ["b"],
    },
    {
      allowNames: ["a"],
      allowNamesExport: ["b"],
      allowNamesFileRoot: ["c"],
      isExportNameReturn: false,
      isNameFromFileRootReturn: true,
      expected: ["c"],
    },

    {
      allowNames: ["a"],
      allowNamesExport: ["b"],
      allowNamesFileRoot: ["c"],
      isExportNameReturn: true,
      isNameFromFileRootReturn: true,
      expected: ["b"],
    },
  ])(
    "Should return correct values for %o",
    ({
      allowNames,
      allowNamesFileRoot,
      allowNamesExport,
      isNameFromFileRootReturn,
      isExportNameReturn,
      expected,
    }) => {
      (isNameFromFileRoot as jest.Mock).mockReturnValue(
        isNameFromFileRootReturn,
      );

      (isExportName as jest.Mock).mockReturnValue(isExportNameReturn);

      expect(
        getCurrentAllowNames({
          allowNames,
          allowNamesFileRoot,
          allowNamesExport,
          nameType: "ArrowFunctionExpression",
          node: {} as ValidateNameProps["node"],
        }),
      ).toEqual(expected);
    },
  );
});
