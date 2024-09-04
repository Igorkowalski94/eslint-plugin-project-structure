<p align="right">
  <picture><img src="https://raw.githubusercontent.com/Igorkowalski94/eslint-plugin-project-structure/main/images/Cloud.png" alt="Cloud" width="35" height="35" /></picture>
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/Igorkowalski94/eslint-plugin-project-structure/main/images/Crescent%20Moon.png">
    <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/Igorkowalski94/eslint-plugin-project-structure/main/images/Sun.png">
    <img alt="Shows an illustrated sun in light mode and a moon with stars in dark mode." src="https://raw.githubusercontent.com/Igorkowalski94/eslint-plugin-project-structure/main/images/Sun.png" width="30" height="30" />
  </picture>
  <picture><img src="https://raw.githubusercontent.com/Igorkowalski94/eslint-plugin-project-structure/main/images/Cloud.png" alt="Cloud" width="19" height="19" /></picture>
</p>
<h1 align="center"><picture><img src="https://raw.githubusercontent.com/Igorkowalski94/eslint-plugin-project-structure/main/images/File%20Folder.png" alt="Folder" width="60" height="60" /></picture><picture><img src="https://raw.githubusercontent.com/Igorkowalski94/eslint-plugin-project-structure/main/images/Owl.png" alt="Owl" width="60" height="60" /></picture></br>project&#8209;structure/&#8203;independent&#8209;modules</h1>
<p align="center">A key principle of a healthy project is to prevent the creation of a massive dependency tree,
where removing or editing one feature triggers a chain reaction that impacts the entire project.</p>
<p align="center">Create independent modules to keep your project scalable and easy to maintain. Get rid of dependencies between modules and create truly independent functionalities.</p>

<h4><picture><img src="https://raw.githubusercontent.com/Igorkowalski94/eslint-plugin-project-structure/main/images/Rocket.png" alt="Rocket" width="35" height="35" /></picture> Features:</h4>

- Creating independent modules in which you control what can be imported (e.g. types, functions, components of one functionality cannot be imported into another functionality).
- The ability to create very detailed rules, even for nested folder structures. Whether it's a large module, a sub-module, or a single file, there are no limitations.
- Disabling external imports (node_modules) for a given module (Option to add exceptions).
- Non-relative/relative imports support.
- Support for imports without extension.
- Reusable import patterns.
- Support for path aliases. The plugin will automatically detect your tsconfig.json and use your settings. There is also an option to enter them manually.
- An option to create a separate configuration file with TypeScript support.

## 📋 General information

🎮[Playground](https://github.com/Igorkowalski94/eslint-plugin-project-structure-playground#readme) for eslint-plugin-project-structure rules.

Become part of the community!<br>
Leave a ⭐ and share the link with your friends.<br>

- If you have any questions or need help creating a configuration that meets your requirements, [click here](https://github.com/Igorkowalski94/eslint-plugin-project-structure/discussions/new?category=help).
- If you have found a bug or an error in the documentation, [click here](https://github.com/Igorkowalski94/eslint-plugin-project-structure/issues/new?assignees=Igorkowalski94&labels=bug&projects=&template=bug_report.md&title=%5BBUG%5D).
- If you have an idea for a new feature or an improvement to an existing one, [click here](https://github.com/Igorkowalski94/eslint-plugin-project-structure/discussions/new?category=ideas).
- If you're interested in discussing project structures across different frameworks or want to vote on a proposed new feature, [click here](https://github.com/Igorkowalski94/eslint-plugin-project-structure/discussions).

## 📚 Documentation

- [project-structure/folder-structure](https://github.com/Igorkowalski94/eslint-plugin-project-structure/blob/main/documentation/project-structure-folder-structure.md)
- [project-structure/naming-rules](https://github.com/Igorkowalski94/eslint-plugin-project-structure/blob/main/documentation/project-structure-naming-rules.md)

## ✈️ Go to

- [Plugin homepage](https://github.com/Igorkowalski94/eslint-plugin-project-structure#readme)
- [Installation](#installation)
- [Getting started](#getting-started)
  - [Simple example](#simple-example-for-the-folder-structure-below)
  - [Advanced example](#advanced-example-for-the-folder-structure-below)
- [API](#api)
  - [modules](#modules)
    - [name](#name)
    - [pattern](#pattern)
    - [allowImportsFrom](#allow-imports-from)
    - [allowExternalImports](#allow-external-imports)
    - [errorMessage](#error-message)
  - [reusableImportPatterns](#reusable-import-patterns)
  - [{family}](#family)
  - [{dirname}](#dirname)
  - [tsconfigPath](#tsconfig-path)
  - [pathAliases](#path-aliases)
  - [extensions](#extensions)
  - [debugMode](#debug-mode)

## 💾 Installation <a id="installation"></a>

```bsh
npm install --save-dev eslint-plugin-project-structure
```

```bsh
yarn add --dev eslint-plugin-project-structure
```

```bsh
pnpm add --save-dev eslint-plugin-project-structure
```

## 🏁 Getting started <a id="getting-started"></a>

### Step 1

Add the following lines to `eslint.config.mjs`.

> [!NOTE]  
>  The examples in the documentation refer to ESLint's new config system. If you're interested in examples for the old ESLint config, you can find them in the 🎮[playground](https://github.com/Igorkowalski94/eslint-plugin-project-structure-playground#readme) for eslint-plugin-project-structure rules.

```mjs
// @ts-check

import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import { projectStructurePlugin } from "eslint-plugin-project-structure";
import { independentModulesConfig } from "./independentModules.mjs";

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],
    plugins: {
      "project-structure": projectStructurePlugin,
    },
    rules: {
      // If you have many rules in a separate file.
      "project-structure/independent-modules": [
        "error",
        independentModulesConfig,
      ],
      // If you have only a few rules.
      "project-structure/independent-modules": [
        "error",
        {
          // Config
        },
      ],
    },
  },
);
```

### Step 2

Create a `independentModules.mjs` in the root of your project.<br>

> [!WARNING]  
> Remember to include `// @ts-check`, otherwise type checking won't be enabled.

> [!NOTE]  
>  `independentModules.json` and `independentModules.yaml` are also supported. See an example in the 🎮[playground](https://github.com/Igorkowalski94/eslint-plugin-project-structure-playground#readme) for eslint-plugin-project-structure rules.

#### Simple example for the folder structure below:

```
.
├── ...
├── 📄 independentModules.mjs
└── 📂 src
    └── 📂 features
        ├── ...
        ├── 📂 Feature1                    Feature1 family.
        │   ├── 📁 components
        │   │   └── 📄 SimpleComponent.tsx  Private / Public for Feature1 family.
        │   ├── 📄 feature1.api.ts          Private / Public for Feature1 family.
        │   ├── 📄 feature1.types.ts        Private / Public for Feature1 family.
        │   └── 📄 Feature1.tsx             Public.
        │
        └── 📂 Feature2                    Feature2 family.
            ├── 📁 components
            │   └── 📄 SimpleComponent.tsx  Private / Public for Feature2 family.
            ├── 📄 feature2.api.ts          Private / Public for Feature2 family.
            ├── 📄 feature2.types.ts        Private / Public for Feature2 family.
            └── 📄 Feature2.tsx             Public.
```

```mjs
// @ts-check

import { createIndependentModules } from "eslint-plugin-project-structure";

export const independentModulesConfig = createIndependentModules({
  modules: [
    {
      name: "Features",
      pattern: "features/**",
      allowImportsFrom: [
        // /*  = wildcard.
        // /*/  = wildcard for current directory.
        // /**/ = wildcard for nested directories.

        "features/*/*.tsx",
        // Let's assume we are in the "features/Feature1/Feature1.tsx".
        // In this case we will be able to import:
        // "features/Feature2/Feature2.tsx"
        // But we won't be able to import Feature1 private files and folders.

        // {family} reference finds the common part between the import and the current file.
        // By default, at least two common path parts are required, baseUrl is not taken into account.
        // This will make your rule work recursively/apply to all nestings.
        // You can change the number of common path parts required, {family_1} at least 1, {family_3} at least 3 common part etc.

        "{family}/**",
        // Let's assume we are in the "features/Feature1/Feature1.tsx".
        // In this case we will be able to import:
        // "features/Feature1/feature1.types.ts"             ({family} === "features/Feature1")
        // "features/Feature1/feature1.api.ts"               ({family} === "features/Feature1")
        // "features/Feature1/components/SimpleComponent.tsx" ({family} === "features/Feature1")
      ],
    },
  ],
});
```

#### Advanced example for the folder structure below:

```
.
├── ...
├── 📄 independentModules.mjs
└── 📂 src
    └── 📂 features
        ├── ...
        ├── 📂 Feature1              Feature1 family. Same structure as Feature2.
        └── 📂 Feature2              Feature2 family.
            ├── 📄 feature2.api.ts    Private / Public for Feature2 family.
            ├── 📄 feature2.types.ts  Private / Public for Feature2 family.
            ├── 📄 Feature2.tsx       Public.
            └── 📂 components
                ├── 📄 SimpleComponent.tsx          Private / Public for Feature2 family / Public for ComplexComponent family.
                └── 📂 ComplexComponent             ComplexComponent family.
                    ├── 📁 components               Private / Public for ComplexComponent family.
                    ├── 📄 complexComponent.api.ts   Private / Public for ComplexComponent family.
                    ├── 📄 complexComponent.types.ts Private / Public for ComplexComponent family.
                    └── 📄 ComplexComponent.tsx      Private / Public for ComplexComponent family / Public for Feature2 family / Public for SimpleComponent.tsx.

```

```mjs
// @ts-check

import { createIndependentModules } from "eslint-plugin-project-structure";

export const independentModulesConfig = createIndependentModules({
  modules: [
    {
      name: "Features",
      pattern: "features/**",
      allowImportsFrom: [
        // /*  = wildcard.
        // /*/  = wildcard for current directory.
        // /**/ = wildcard for nested directories.

        "features/*/*.tsx",
        // Let's assume we are in the "features/Feature2/Feature2.tsx"
        // In this case we will be able to import:
        // "feature/Feature1/Feature1.tsx"
        // But we won't be able to import Feature1 private files and folders.

        // {family} reference finds the common part between the import and the current file.
        // By default, at least two common path parts are required, baseUrl is not taken into account.
        // This will make your rule work recursively/apply to all nestings.
        // You can change the number of common path parts required, {family_1} at least 1, {family_3} at least 3 common part etc.

        "{family}/*",
        // Let's assume we are in the "features/Feature2/Feature2.tsx"
        // In this case we will be able to import:
        // "features/Feature2/feature2.api.ts"      ({family} === "features/Feature2")
        // "features/Feature2/feature2.types.ts"    ({family} === "features/Feature2")

        [
          "{family}/components/*/*",
          "!{family}/components/*/*.(types|api|types).ts",
        ],
        // Let's assume we are in the "features/Feature2/Feature2.tsx"
        // In this case we will be able to import:
        // "features/Feature2/components/ComplexComponent/ComplexComponent.tsx  ({family} === "features/Feature2")
        // But we won't be able to import ComplexComponent private files.

        ["{family}/*/*", "!{family}/*/*.(types|api|types).ts"],
        // Let's assume we are in the "features/Feature2/Feature2.tsx"
        // In this case we will be able to import:
        // "features/Feature2/components/SimpleComponent.tsx  ({family} === "features/Feature2")
      ],
    },
  ],
});
```

## ⚙️ API <a id="api"></a>

### `modules: Module[]` <a id="modules"></a>

A place where you can add your modules.<br>

After creation, each module will not be able to import anything except external imports (these are allowed by default, can also be disabled).

> [!WARNING]
> The order of modules matters! Module patterns are checked in order from top to bottom.

```jsonc
{
  "modules": [
    {
      "name": "Module 1",
      "pattern": "*",
      "allowImportsFrom": [],
    },
    // Module 2 with "features/**" will not be taken into account because Module 1 with "*" meets the condition.
    {
      "name": "Module 2",
      "pattern": "features/**",
      "allowImportsFrom": [],
    },
  ],
}
```

```jsonc
{
  "modules": [
    // Module 2 with "features/**" will be taken into account because Module 1 with "*" is below Module 2.
    {
      "name": "Module 2",
      "pattern": "features/**",
      "allowImportsFrom": [],
    },
    {
      "name": "Module 1",
      "pattern": "*",
      "allowImportsFrom": [],
    },
  ],
}
```

```jsonc
{
  "modules": [
    {
      "name": "Module 1",
      "pattern": ["*", "!features/**"],
      "allowImportsFrom": [],
    },
    // Module 2 with "features/**" will be taken into account because Module 1 with ["*", "!features/**"] ignores "features/**" pattern.
    {
      "name": "Module 2",
      "pattern": "features/**",
      "allowImportsFrom": [],
    },
  ],
}
```

### `name: string` <a id="name"></a>

The name of your module.

```jsonc
{ "modules": [{ "name": "features" }] }
```

### `pattern: string | string[]` <a id="pattern"></a>

Your module's pattern.<br>

You can use all [micromatch.every](https://github.com/micromatch/micromatch?tab=readme-ov-file#every) functionalities.

```jsonc
{
  "modules": [
    { "pattern": "features/**" },
    // Everything from the helpers folder except the index.ts and .js files.
    { "pattern": ["helpers/**", "!(**/index.ts)", "!(**/*.js)"] },
  ],
}
```

### `allowImportsFrom: (string | string[])[]` <a id="allow-imports-from"></a>

The place where you specify what can be imported into your module.<br>

You can use all [micromatch.every](https://github.com/micromatch/micromatch?tab=readme-ov-file#every) functionalities.<br>

If at least **one** pattern in `allowImportsFrom` meets the condition, the import is considered allowed.<br>

> [!WARNING]
> The order of patterns matters! They are checked from top to bottom.

```jsonc
{
  "modules": [
    {
      "allowImportsFrom": [
        // All files from the first directory of the helpers folder.
        "helpers/*",

        // All files from the types folder. All directories/nestings.
        "types/**",

        // All nested files in hooks folder except *.types.ts
        ["hooks/**", "!hooks/**/*.types.ts"],

        // All nested files in the components folder except files in the helpers folders.
        ["components/**", "!components/**/helpers/**"],

        // All nested .js files in the helpers folder except index.js
        ["helpers/**/*.js", "!helpers/**/index.js"],
      ],
    },
    {
      "allowImportsFrom": [
        // All nested .js files in the helpers folder
        "helpers/**/*.js",

        // It will not be taken into account because "helpers/**/*.js" met the condition.
        // Not index.js files in the helpers folder.
        "!helpers/**/index.js",
      ],
    },
  ],
}
```

### `allowExternalImports?: boolean` <a id="allow-external-imports"></a>

Here you can enable/disable the ability to import external imports (node_modules) in a given module.<br>

The default value is true.

```jsonc
{
  "modules": [
    {
      "allowExternalImports": false,
      //You can specify exceptions via allowImportsFrom.
      "allowImportsFrom": ["react"],
    },
  ],
}
```

### `errorMessage?: string` <a id="error-message"></a>

Here, you can set your custom error for a given module.

```jsonc
{ "modules": [{ "errorMessage": "My custom module error." }] }
```

### `reusableImportPatterns?: Record<string, (string | string[])[]>` <a id="reusable-import-patterns"></a>

To avoid repetitions, you can create reusable import patterns. <br>
By writing `{yourKey}` you refer to a particular key in the `reusableImportPatterns` object,<br>
you can use this reference in `reusableImportPatterns` and in [`allowImportsFrom`](#allow-imports-from).<br>

The library will automatically inform you about all usage errors such as: Infinite recursion, too many array nests. e.t.c.

```jsonc
{
  "reusableImportPatterns": {
    "pattern1": ["pattern1_a"],
    "pattern2": ["pattern2_a", "pattern2_b"],
    "pattern3": ["pattern3_a", "pattern3_b", ["pattern3_c", "pattern3_d"]],

    "pattern4": ["pattern4_a", "{pattern1}"],
    //          ["pattern4_a", "pattern1_a"]

    "pattern5": ["pattern5_a", ["{pattern1}"]],
    //          ["pattern5_a", ["pattern1_a"]]

    "pattern6": ["pattern6_a", "**/{pattern1}/**"],
    //          ["pattern6_a", "**/pattern1_a/**"]

    "pattern7": ["pattern7_a", "{pattern2}"],
    //          ["pattern7_a", "pattern2_a", "pattern2_b"]

    "pattern8": ["pattern8_a", ["{pattern2}"]],
    //          ["pattern8_a", ["pattern2_a", "pattern2_b"]]

    "pattern9": ["pattern9_a", "{pattern3}"],
    //          ["pattern9_a", "pattern3_a", "pattern3_b", ["pattern3_c", "pattern3_d"]]
  },
  "modules": [
    {
      "name": "Some Module",
      "pattern": "*",
      "allowImportsFrom": ["{pattern1}/*.ts", "{pattern9}"],
      //                  ["pattern1_a/*.ts", "pattern9_a", "pattern3_a", "pattern3_b", ["pattern3_c", "pattern3_d"]]
    },
  ],
}
```

### `{family}` <a id="family"></a>

`{family}` reference finds the common part between the import and the current file. <br>
By default, at least **two** common parts are required, [`baseUrl`](#path-aliases) is not taken into account.<br>
This will make your rule work **recursively**/apply to all nestings.<br>
You can change the number of parts required, `{family_1}` at least one, `{family_3}` at least three common part etc.<br>

```
Example 1
Current file    = "features/Feature1/Feature1.tsx"
Import          = "features/Feature1/Feature1.types.ts"
{family}        = "features/Feature1"

Example 2
Current file    = "features/Feature1/Feature1.tsx"
Import          = "features/Feature1/Feature1.types.ts"
{family_3}      = "NO_FAMILY"

Example 3
Current file    = "features/Feature1/Child1/Child1.tsx"
Import          = "features/Feature1/Child1/hooks/useComplexHook/useComplexHook.ts"
{family}        = "features/Feature1/Child1"


Example 4
Current file    = "features/Feature1/Child1/hooks/useComplexHook1/useComplexHook1.ts"
import          = "features/Feature1/Child1/hooks/useComplexHook2/useComplexHook2.ts"
{family}        = "features/Feature1/Child1/hooks"

Example 5
Current file    = "features/Feature1/Feature1.tsx"
Import          = "features/Feature2/Feature2.types.ts"
{family}        = "NO_FAMILY"

Example 6
Current file    = "features/Feature1/Feature1.tsx"
Import          = "features/Feature2/Feature2.types.ts"
{family_1}      = "features"
```

### `{dirname}` <a id="dirname"></a>

Reference to the directory of the file you are currently in.

By default, `{dirname}` will refer to the nearest directory of the given file you are in.
You can determine the directory lvl by the following notation `{dirname_2}`, `{dirname_3}` and so on.

```
Example 1
Current file    = "features/Feature1/Feature1.tsx"
{dirname}       = "features/Feature1"

Example 2
Current file    = "features/Feature1/Child1/Child1.tsx"
{dirname}       = "features/Feature1/Child1"

Example 3
Current file    = "features/Feature1/Feature1.tsx"
{dirname_2}     = "features"

Example 4
Current file    = "features/Feature1/Child1/hooks/useComplexHook1/useComplexHook1.ts"
{dirname_5}     = "features"
```

### `tsconfigPath?: string` <a id="tsconfig-path"></a>

The path to your `tsconfig.json`.<br>
If your `tsconfig` is located in the root of your project, the plugin will automatically detect it.<br>
If your `tsconfig` is located elsewhere, you can specify its location here.

```jsonc
{ "tsconfigPath": "./tsconfig.json" }
```

### `pathAliases?: { baseUrl: string; paths: Record<string, string[]>; }` <a id="path-aliases"></a>

The plugin automatically takes `baseUrl` and `paths` from your `tsconfig.json`.<br>
However, if you are using another tool for path aliases, such as `Webpack` or `Babel`, you can configure the appropriate path aliases here.

```ts
// "src/components/Component.tsx"
import { Component } from "@components/Component";
```

```jsonc
{
  "pathAliases": {
    "baseUrl": ".",
    "paths": {
      "@components/*": ["src/components/*"],
    },
  },
}
```

### `extensions?: string[]` <a id="extensions"></a>

If you use shortened imports without a file extension, the plugin will automatically assign the correct extension from the list of available extensions.

```ts
// "helpers/myHelper.ts"
import { myHelper } from "helpers/myHelper"; // The plugin will recognize the file as a .ts file and consider this when validating the glob pattern.
```

Available extensions: `".js"`, `".jsx"`, `".mjs"`, `".cjs"` `".d.ts"`, `".ts"`, `".tsx"`, `".vue"`, `".svelte"`, `".json"`, `".jsonc"`, `".yml"`, `".yaml"`, `".svg"`, `".png"`, `".jpg"`, `".ico"`, `".css"`, `".sass"`, `".scss"`, `".less"`, `".html"`,

If the extension you are using is not on the list, you can extend it.

```jsonc
{ "extensions": [".yourFancyExtension"] }
```

### `debugMode?: boolean` <a id="debug-mode"></a>

Debug mode showing the current [`allowImportsFrom`](#allow-imports-from), [`{family}`](#family), and [`{dirname}`](#dirname) for a given import.<br>
The default value is `false`.

```jsonc
{ "debugMode": true }
```

<h2><picture><img src="https://raw.githubusercontent.com/Igorkowalski94/eslint-plugin-project-structure/main/images/Party%20Popper.png" alt="Party Popper" width="35" height="35" /></picture> Sponsors</h2>

<p align="center">A big thank you to all the <a href="https://github.com/sponsors/Igorkowalski94" target=”_blank”>sponsors</a> for your support! You give me the strength and motivation to keep going!</p>
<p align="center"> Thanks to you, I can help others create their ideal projects!</p>
<p align="center"><picture><img src="https://raw.githubusercontent.com/Igorkowalski94/eslint-plugin-project-structure/main/images/Love-You%20Gesture.png" alt="Love-You Gesture" width="60px" height="60px" /></picture><p>
