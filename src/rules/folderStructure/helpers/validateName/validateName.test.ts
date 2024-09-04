import { getInvalidRegexError } from "errors/getInvalidRegexError";

import { getNameRegexError } from "rules/folderStructure/errors/getNameRegexError";
import {
  validateName,
  ValidateNameProps,
} from "rules/folderStructure/helpers/validateName/validateName";
import {
  WILDCARD_REGEX,
  DOT_CHARACTER_REGEX,
} from "rules/folderStructure/helpers/validateName/validateName.consts";

describe("validateName", () => {
  it("should throw error when regex is invalid", () => {
    expect(() =>
      validateName({
        nodeName: "componentName.api",
        ruleName: "/^?/*.",
        folderName: "folderName",
      }),
    ).toThrow(
      getInvalidRegexError(`/^?/${WILDCARD_REGEX}${DOT_CHARACTER_REGEX}`),
    );
  });

  it.each<[ValidateNameProps]>([
    [
      {
        nodeName: "folderName",
        folderName: "FolderName",
        ruleName: "folderName",
      },
    ],
    [
      {
        nodeName: "FolderName",
        folderName: "FolderName",
        ruleName: "FolderName",
      },
    ],
    [
      {
        nodeName: "ComponentName",
        folderName: "FolderName",
        ruleName: "{PascalCase}",
      },
    ],
    [
      {
        nodeName: "componentName",
        folderName: "FolderName",
        ruleName: "{camelCase}",
      },
    ],
    [
      {
        nodeName: "component_name",
        folderName: "FolderName",
        ruleName: "{snake_case}",
      },
    ],
    [
      {
        nodeName: "component-name",
        folderName: "FolderName",
        ruleName: "{kebab-case}",
      },
    ],
    [
      {
        nodeName: "useHook.test.ts",
        folderName: "folderName",
        ruleName: "(use){PascalCase}(?:.(test|test.helpers))?.ts",
      },
    ],
    [
      {
        nodeName: "helper.test.ts",
        folderName: "folderName",
        ruleName: "{camelCase}(?:.(test|test.helpers))?.ts",
      },
    ],
    [
      {
        nodeName: "folderName.test.ts",
        folderName: "folderName",
        ruleName: "folderName(?:.(test|test.helpers))?.ts",
      },
    ],
    [
      {
        nodeName: "componentName.ts",
        folderName: "folderName",
        ruleName: "*.ts",
      },
    ],
    [
      {
        nodeName: "componentName,ts",
        folderName: "folderName",
        ruleName: "*..ts",
      },
    ],
    [
      {
        nodeName: "xxx",
        folderName: "folderName",
        ruleName: "*",
      },
    ],
    [
      {
        nodeName: "bbb",
        folderName: "folderName",
        ruleName: "b**",
      },
    ],
  ])(
    "should not throw error when nodeName match regex pattern for args = %s",
    (args) => {
      expect(() => validateName(args)).not.toThrow();
    },
  );

  it.each<[ValidateNameProps]>([
    [
      {
        nodeName: "XparentName",
        folderName: "FolderName",
        ruleName: "folderName",
      },
    ],
    [
      {
        nodeName: "XParentName",
        folderName: "FolderName",
        ruleName: "FolderName",
      },
    ],
    [
      {
        nodeName: "xComponentName",
        folderName: "FolderName",
        ruleName: "{PascalCase}",
      },
    ],
    [
      {
        nodeName: "XcomponentName",
        folderName: "FolderName",
        ruleName: "{camelCase}",
      },
    ],
    [
      {
        nodeName: "Xcomponent_name",
        folderName: "FolderName",
        ruleName: "{snake_case}",
      },
    ],
    [
      {
        nodeName: "Xcomponent-name",
        folderName: "FolderName",
        ruleName: "{kebab-case}",
      },
    ],
    [
      {
        nodeName: "XuseHook.test.ts",
        folderName: "folderName",
        ruleName: "(use){PascalCase}(?:.(test|test.helpers))?.ts",
      },
    ],
    [
      {
        nodeName: "Xhelper.test.ts",
        folderName: "folderName",
        ruleName: "{camelCase}(?:.(test|test.helpers))?.ts",
      },
    ],
    [
      {
        nodeName: "XparentName.test.ts",
        folderName: "folderName",
        ruleName: "folderName(?:.(test|test.helpers))?.ts",
      },
    ],
    [
      {
        nodeName: "componentName,ts",
        folderName: "folderName",
        ruleName: "*.ts",
      },
    ],
    [
      {
        nodeName: "c",
        folderName: "folderName",
        ruleName: "b**",
      },
    ],
  ])(
    "should throw error when nodeName do not match regex pattern for args = %s",
    ({ nodeName, folderName, ruleName }) => {
      expect(() => validateName({ nodeName, folderName, ruleName })).toThrow(
        getNameRegexError(ruleName),
      );
    },
  );
});
