import { Rule } from "rules/folderStructure/folderStructure.types";
import { sortChildrenByNameType } from "rules/folderStructure/helpers/validateFolderStructure/helpers/validatePath/helpers/getChildren/helpers/sortChildrenByNameType";

describe("sortChildrenByNameType", () => {
  const children: Rule[] = [
    { name: "*", children: [] },
    { ruleId: "ruleId" },
    { name: "*_{FolderName}.ts" },
    { name: "*" },
    { name: "*" },
    { name: "use*.ts" },
    { name: "FixedName1.ts" },
    { name: "*_{camelCase}.ts" },
    { name: "use*", children: [] },
    { name: "*", children: [] },
    { name: "use*.ts" },
    { name: "{FolderName}.ts" },
    { name: "FixedName2.ts" },
    { ruleId: "ruleId" },
    { name: "use*", children: [] },
    { name: "{camelCase}.ts" },
    { name: "FixedName3.ts" },
  ];

  const childrenSorted: Rule[] = [
    { name: "FixedName3.ts" },
    { name: "FixedName2.ts" },
    { name: "FixedName1.ts" },

    { name: "{camelCase}.ts" },
    { name: "{FolderName}.ts" },

    { name: "use*.ts" },
    { name: "*_{camelCase}.ts" },
    { name: "use*.ts" },
    { name: "*_{FolderName}.ts" },

    { name: "*" },
    { name: "*" },

    { name: "use*", children: [] },
    { name: "use*", children: [] },
    { name: "*", children: [] },
    { name: "*", children: [] },

    { ruleId: "ruleId" },
    { ruleId: "ruleId" },
  ];

  it("should sort children by name type", () => {
    expect(sortChildrenByNameType(children)).toEqual(childrenSorted);
  });
});
