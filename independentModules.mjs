// @ts-check

import { createIndependentModules } from "eslint-plugin-project-structure";

export const independentModulesConfig = createIndependentModules({
  debugMode: false,
  modules: [
    {
      name: "Rules",
      pattern: "rules/**",
      allowImportsFrom: [
        "{familyImports}",
        "{globalHelpers}",
        "{globalConsts}",
        "{globalErrors}",
      ],
    },
    {
      name: "Global helpers",
      pattern: "helpers/**",
      allowImportsFrom: [
        "{familyImports}",
        "{globalHelpers}",
        "{globalConsts}",
        "{globalErrors}",
      ],
    },
    {
      name: "Global error",
      pattern: "errors/**",
      allowImportsFrom: ["{familyImports}", "{globalErrors}"],
    },
    {
      name: "Globals",
      pattern: "(consts|parser).ts",
      allowImportsFrom: [],
    },
  ],
  reusableImportPatterns: {
    privateFolders: ["(helpers|errors)"],
    privateFiles: ["*.(types|consts).ts"],

    notPrivateFilesAndFolders: [
      "!(**/{privateFiles})",
      "!(**/{privateFolders}/**)",
    ],

    globalConsts: ["consts.ts"],
    globalErrors: ["errors/**"],
    globalHelpers: [["helpers/**", "{notPrivateFilesAndFolders}"]],

    familyImports: [
      ["{family}/*", "!{family}/*.test.ts"],

      [
        "{family}/{privateFolders}/*/*",
        "!{family}/{privateFolders}/*/{privateFiles}",
      ],

      ["{family}/*/*", "!{family}/*/{privateFiles}"],
    ],
  },
});
