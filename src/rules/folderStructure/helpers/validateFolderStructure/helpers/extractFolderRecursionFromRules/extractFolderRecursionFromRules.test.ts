import { RECURSION_LIMIT } from "consts";

import { getInvalidFolderRecursionLimitError } from "rules/folderStructure/errors/getInvalidFolderRecursionLimitError";
import { extractFolderRecursionFromRules } from "rules/folderStructure/helpers/validateFolderStructure/helpers/extractFolderRecursionFromRules/extractFolderRecursionFromRules";

describe("extractFolderRecursionFromRules", () => {
  it("should return undefined when !rules", () => {
    expect(extractFolderRecursionFromRules(undefined)).toEqual(undefined);
  });

  it("should throw getInvalidFolderRecursionLimitError ", () => {
    expect(() =>
      extractFolderRecursionFromRules({
        elo: {
          name: "test",
          folderRecursionLimit: RECURSION_LIMIT + 1,
        },
      }),
    ).toThrow(getInvalidFolderRecursionLimitError());
  });

  it("should return correct rules for folder recursion length 1", () => {
    expect(
      extractFolderRecursionFromRules({
        folderRule: {
          name: "{camelCase}",
          folderRecursionLimit: 3,
          children: [{ name: "{PascalCase}.*" }, { ruleId: "folderRule" }],
        },
        folderRule2: {
          name: "{camelCase}",
          folderRecursionLimit: -20,
          children: [{ name: "{PascalCase}.*" }, { ruleId: "folderRule" }],
        },
      }),
    ).toEqual({
      folderRule: {
        name: "{camelCase}",
        children: [
          { name: "{PascalCase}.*" },
          {
            name: "{camelCase}",
            children: [
              { name: "{PascalCase}.*" },
              {
                name: "{camelCase}",
                children: [{ name: "{PascalCase}.*" }],
              },
            ],
          },
        ],
      },
      folderRule2: {
        name: "{camelCase}",
        children: [{ name: "{PascalCase}.*" }, { ruleId: "folderRule" }],
      },
    });
  });

  it("should return correct rules for folder recursion length 2", () => {
    expect(
      extractFolderRecursionFromRules({
        hook_folder: {
          name: "use{PascalCase}",
          children: [{ ruleId: "hooks_folder" }, { name: "{folderName}.ts" }],
        },
        hooks_folder: {
          name: "hooks",
          children: [{ ruleId: "hook_folder" }, { name: "use{PascalCase}.ts" }],
        },

        component_folder: {
          name: "{PascalCase}",
          children: [
            { ruleId: "components_folder" },
            { ruleId: "hooks_folder" },
            { name: "{FolderName}.tsx" },
          ],
        },
        components_folder: {
          name: "components",
          folderRecursionLimit: 2,
          children: [
            { ruleId: "component_folder" },
            { name: "{PascalCase}.tsx" },
          ],
        },
      }),
    ).toEqual({
      hook_folder: {
        name: "use{PascalCase}",
        children: [{ ruleId: "hooks_folder" }, { name: "{folderName}.ts" }],
      },
      hooks_folder: {
        name: "hooks",
        children: [{ ruleId: "hook_folder" }, { name: "use{PascalCase}.ts" }],
      },
      component_folder: {
        name: "{PascalCase}",
        children: [
          { ruleId: "components_folder" },
          { ruleId: "hooks_folder" },
          { name: "{FolderName}.tsx" },
        ],
      },
      components_folder: {
        name: "components",
        children: [
          {
            name: "{PascalCase}",
            children: [
              {
                name: "components",
                children: [
                  {
                    name: "{PascalCase}",
                    children: [
                      { ruleId: "hooks_folder" },
                      { name: "{FolderName}.tsx" },
                    ],
                  },
                  { name: "{PascalCase}.tsx" },
                ],
              },
              { ruleId: "hooks_folder" },
              { name: "{FolderName}.tsx" },
            ],
          },
          { name: "{PascalCase}.tsx" },
        ],
      },
    });
  });

  it("should return correct rules for folder recursion length 3", () => {
    expect(
      extractFolderRecursionFromRules({
        hook_folder: {
          name: "use{PascalCase}",
          children: [{ ruleId: "hooks_folder" }, { name: "{folderName}.ts" }],
        },
        hooks_folder: {
          name: "hooks",
          children: [{ ruleId: "hook_folder" }, { name: "use{PascalCase}.ts" }],
        },

        component_folder: {
          name: "{PascalCase}",
          children: [
            { name: "category", children: [{ ruleId: "components_folder" }] },
            { ruleId: "hooks_folder" },
            { name: "{FolderName}.tsx" },
          ],
        },
        components_folder: {
          name: "components",
          folderRecursionLimit: 2,
          children: [
            { ruleId: "component_folder" },
            { name: "{PascalCase}.tsx" },
          ],
        },
      }),
    ).toEqual({
      hook_folder: {
        name: "use{PascalCase}",
        children: [{ ruleId: "hooks_folder" }, { name: "{folderName}.ts" }],
      },
      hooks_folder: {
        name: "hooks",
        children: [{ ruleId: "hook_folder" }, { name: "use{PascalCase}.ts" }],
      },
      component_folder: {
        name: "{PascalCase}",
        children: [
          { name: "category", children: [{ ruleId: "components_folder" }] },
          { ruleId: "hooks_folder" },
          { name: "{FolderName}.tsx" },
        ],
      },
      components_folder: {
        name: "components",
        children: [
          {
            name: "{PascalCase}",
            children: [
              {
                name: "category",
                children: [
                  {
                    name: "components",
                    children: [
                      {
                        name: "{PascalCase}",
                        children: [
                          { name: "category", children: [] },
                          { ruleId: "hooks_folder" },
                          { name: "{FolderName}.tsx" },
                        ],
                      },
                      { name: "{PascalCase}.tsx" },
                    ],
                  },
                ],
              },
              { ruleId: "hooks_folder" },
              { name: "{FolderName}.tsx" },
            ],
          },
          { name: "{PascalCase}.tsx" },
        ],
      },
    });
  });
});
