import { getAllowedNamesError } from "rules/folderStructure/errors/getAllowedNamesError";
import { getBaseErrorEnd } from "rules/folderStructure/errors/getBaseErrorEnd";
import { getBaseErrorStart } from "rules/folderStructure/errors/getBaseErrorStart";
import { getIdRuleError } from "rules/folderStructure/errors/getIdRuleError";
import { getNameRegexError } from "rules/folderStructure/errors/getNameRegexError";
import { getNodeTypeError } from "rules/folderStructure/errors/getNodeTypeError";
import {
  FolderStructureConfig,
  Rule,
} from "rules/folderStructure/folderStructure.types";
import { validateRulesList } from "rules/folderStructure/helpers/validateChildren/helpers/validateRulesList";

jest.mock("path", () => ({
  sep: "/",
}));

describe("validateRulesList", () => {
  const config: FolderStructureConfig = {
    structure: {
      name: "src",
      children: [
        {
          name: "features",
          children: [
            {
              name: "{PascalCase}",
              children: [
                {
                  name: "{FolderName}.tsx",
                },
              ],
            },
          ],
        },
      ],
    },
    rules: {},
  };

  const nodesList: Rule[] = [
    {
      name: "{FolderName}(.(context|test|test.helpers)).tsx",
    },
    {
      name: "{folderName}(.(api|types)).ts",
    },
  ];

  const nodesListRuleIdNotExist: Rule[] = [
    {
      ruleId: "test",
    },
  ];

  it("should throw error when rule requires only folders", () => {
    expect(() =>
      validateRulesList({
        pathname: "componentName.api.ts",
        filenameWithoutCwd: "src/componentName.api.ts",
        folderName: "ComponentName",
        nodesList: [],
        cwd: "...",
        config,
      }),
    ).toThrow(
      getNodeTypeError({
        errorMessage: getBaseErrorStart({
          nodeName: "componentName.api.ts",
          nodeType: "File",
        }),
        nodePath: "src/componentName.api.ts",
        nodeType: "File",
      }),
    );
  });

  it("should throw error when rule requires only files", () => {
    expect(() =>
      validateRulesList({
        pathname: "folderName/componentName.api.ts",
        filenameWithoutCwd: "src/folderName/componentName.api.ts",
        folderName: "ComponentName",
        nodesList: [],
        cwd: "...",
        config,
      }),
    ).toThrow(
      getNodeTypeError({
        errorMessage: getBaseErrorStart({
          nodeName: "folderName",
          nodeType: "Folder",
        }),
        nodePath: "src/folderName",
        nodeType: "Folder",
      }),
    );
  });

  it("should not throw error when all rules passed", () => {
    expect(() =>
      validateRulesList({
        pathname: "componentName.api.ts",
        filenameWithoutCwd: "src/componentName.api.ts",
        folderName: "ComponentName",
        nodesList,
        cwd: "...",
        config,
      }),
    ).not.toThrow();
  });

  it("should throw error for all rules", () => {
    expect(() =>
      validateRulesList({
        pathname: "ComponentName.tsx",
        filenameWithoutCwd: "src/ComponentName.tsx",
        folderName: "ComponentName",
        nodesList,
        cwd: "...",
        config,
      }),
    ).toThrow(
      getBaseErrorEnd({
        errorMessage: `${getBaseErrorStart({ nodeName: "ComponentName.tsx", nodeType: "File" })}${getAllowedNamesError({ allowedNamesCount: 0, error: getNameRegexError("ComponentName(.(context|test|test.helpers)).tsx") })}${getAllowedNamesError({ allowedNamesCount: 1, error: getNameRegexError("componentName(.(api|types)).ts") })}`,
        nodePath: "src/ComponentName.tsx",
      }),
    );
  });

  it("should throw final error when ruleId do not exist in rules object", () => {
    expect(() =>
      validateRulesList({
        pathname: "componentName.api.ts",
        filenameWithoutCwd: "src/componentName.api.ts",
        folderName: "ComponentName",
        nodesList: nodesListRuleIdNotExist,
        cwd: "...",
        config,
      }),
    ).toThrow(getIdRuleError("test"));
  });
});
