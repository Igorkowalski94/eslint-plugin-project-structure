import { TSESTree } from "@typescript-eslint/utils";

import {
  getCurrentData,
  GetCurrentDataReturn,
} from "rules/namingRules/helpers/validateName/helpers/validateFileRules/helpers/getCurrentData/getCurrentData";
import {
  isExportedName,
  IsExportedNameReturn,
} from "rules/namingRules/helpers/validateName/helpers/validateFileRules/helpers/getCurrentData/helpers/isExportedName/isExportedName";
import { isNameFromFileRoot } from "rules/namingRules/helpers/validateName/helpers/validateFileRules/helpers/getCurrentData/helpers/isNameFromFileRoot";
import { ValidateNameProps } from "rules/namingRules/helpers/validateName/validateName";
import { NamingRule } from "rules/namingRules/namingRules.types";

jest.mock(
  "rules/namingRules/helpers/validateName/helpers/validateFileRules/helpers/getCurrentData/helpers/isNameFromFileRoot",
  () => ({
    isNameFromFileRoot: jest.fn(),
  }),
);

jest.mock(
  "rules/namingRules/helpers/validateName/helpers/validateFileRules/helpers/getCurrentData/helpers/isExportedName/isExportedName",
  () => ({
    isExportedName: jest.fn(),
  }),
);

describe("getCurrentAllowNames", () => {
  test.each<{
    allowNames?: NamingRule["allowNames"];
    allowNamesFileRoot?: NamingRule["allowNames"];
    allowNamesExport?: NamingRule["allowNamesExport"];
    expected: GetCurrentDataReturn;
    isNameFromFileRootReturn: boolean;
    isExportNameReturn: IsExportedNameReturn;
  }>([
    {
      allowNames: ["a"],
      allowNamesExport: ["b"],
      allowNamesFileRoot: ["c"],
      isExportNameReturn: {
        isExportName: false,
        currentName: "",
        currentNode: {} as GetCurrentDataReturn["currentNode"],
      },
      isNameFromFileRootReturn: false,
      expected: {
        currentAllowNames: ["a"],
        currentName: "",
        currentNode: {} as ValidateNameProps["node"],
      },
    },
    {
      allowNames: ["a"],
      allowNamesExport: ["b"],
      allowNamesFileRoot: ["c"],
      isExportNameReturn: {
        isExportName: true,
        currentName: "exportName",
        currentNode: {
          type: TSESTree.AST_NODE_TYPES.ClassDeclaration,
        } as GetCurrentDataReturn["currentNode"],
      },
      isNameFromFileRootReturn: false,
      expected: {
        currentAllowNames: ["b"],
        currentName: "exportName",
        currentNode: {
          type: TSESTree.AST_NODE_TYPES.ClassDeclaration,
        } as ValidateNameProps["node"],
      },
    },
    {
      allowNames: ["a"],
      allowNamesExport: ["b"],
      allowNamesFileRoot: ["c"],
      isExportNameReturn: {
        isExportName: false,
        currentName: "",
        currentNode: {} as GetCurrentDataReturn["currentNode"],
      },
      isNameFromFileRootReturn: true,
      expected: {
        currentAllowNames: ["c"],
        currentName: "",
        currentNode: {} as ValidateNameProps["node"],
      },
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

      (isExportedName as jest.Mock).mockReturnValue(isExportNameReturn);

      expect(
        getCurrentData({
          name: "",
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
