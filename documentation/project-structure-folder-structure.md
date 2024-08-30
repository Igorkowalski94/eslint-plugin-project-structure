<h1 align="center">📁🦉project-structure/folder-structure</h1>
<p align="center">Enforce rules on folder structure to keep your project consistent, orderly and well thought out.</p>

#### 🚀 Features:

- Validation of folder structure. Any files/folders outside the structure will be considered an error.
- File/Folder name regex validation with features like wildcard `*` and treating `.` as a character, along with other conveniences.
- Build in case validation.
- Inheriting the folder's name. The file/folder inherits the name of the folder in which it is located. Option of adding your own prefixes/suffixes or changing the case.
- Enforcing the existence of a files/folders when a specific file/folder exists. For example, if `./src/Component.tsx` exists, then `./src/Component.test.tsx` and `./src/stories/Component.stories.tsx` must also exist.
- Reusable rules for folder structures.
- An option to create a separate configuration file with TypeScript support.
- Forcing a nested/flat structure for a given folder.
- Support for all file extensions.
- Folder recursion. You can nest a given folder structure recursively.
- Fewer repetitions and precise error messages, even for deeply nested folders (recursion), by representing the folder structure as a tree.

## 📋 General information

🕹️[Playground](https://github.com/Igorkowalski94/eslint-plugin-project-structure-playground#readme) for eslint-plugin-project-structure rules.

Become part of the community!<br>
Leave a ⭐ and share the link with your friends.<br>
If you have any questions or need help creating a configuration that meets your requirements, [click here](https://github.com/Igorkowalski94/eslint-plugin-project-structure/discussions), issues / an idea for a new functionality [click here](https://github.com/Igorkowalski94/eslint-plugin-project-structure/issues/new/choose).

## 📚 Documentation

- [Migration guide to 2.2.0.](https://github.com/Igorkowalski94/eslint-plugin-project-structure/blob/main/documentation/migration-to-2.2.0.md)
- [project-structure-independent-modules](https://github.com/Igorkowalski94/eslint-plugin-project-structure/blob/main/documentation/project-structure-independent-modules.md)
- [project-structure-naming-rules](https://github.com/Igorkowalski94/eslint-plugin-project-structure/blob/main/documentation/project-structure-naming-rules.md)

## ✈️ Go to

- [Installation](#installation)
- [Getting started](#getting-started)
  - [Simple example](#simple-example-for-the-structure-below)
  - [Advanced example](#advanced-example-for-the-structure-below)
- [API](#api)
  - [ignorePatterns](#ignore-patterns)
  - [name](#name)
  - [regexParameters](#regex-parameters)
    - [Built-in regex parameters](#built-in-regex-parameters)
    - [Regex parameters mix example](#regex-parameters-mix-example)
  - [children](#children)
  - [enforceExistence](#enforce-existence)
  - [structure](#structure)
  - [rules](#rules)
  - [ruleId](#ruleid)
  - [Folder recursion](#folder-recursion)

## 💾 Installation <a id="installation"></a>

```bsh
yarn add -D eslint-plugin-project-structure
```

```bsh
npm i --dev eslint-plugin-project-structure
```

## 🏁 Getting started <a id="getting-started"></a>

### Step 1

Add the following lines to `eslint.config.mjs`.

> [!NOTE]  
>  The examples in the documentation refer to ESLint's new config system. If you're interested in examples for the old ESLint config, you can find them in the 🕹️[playground](https://github.com/Igorkowalski94/eslint-plugin-project-structure-playground#readme) for eslint-plugin-project-structure rules.

```mjs
// @ts-check

import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import {
  projectStructureParser,
  projectStructurePlugin,
} from "eslint-plugin-project-structure";
import { folderStructureConfig } from "./folderStructure.mjs";

export default tseslint.config(
  /**
   *  Only for the project-structure/folder-structure rule,
   *  which must use the projectStructureParser to check all file extensions not supported by ESLint.
   *  If you don't care about validating other file extensions, you can remove this section.
   */
  {
    files: [
      // You can expand the list with the file extensions you use.
      "**/*.css",
      "**/*.sass",
      "**/*.less",
      "**/*.svg",
      "**/*.png",
      "**/*.jpg",
      "**/*.ico",
      "**/*.yml",
      "**/*.json",
    ],
    languageOptions: { parser: projectStructureParser },
    plugins: {
      "project-structure": projectStructurePlugin,
    },
    rules: {
      "project-structure/folder-structure": ["error", folderStructureConfig],
    },
  },

  /**
   *  Here you will add your normal rules, which use the default parser.
   */
  {
    extends: [...tseslint.configs.recommended],
    files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],
    plugins: {
      "project-structure": projectStructurePlugin,
    },
    rules: {
      ...eslint.configs.recommended.rules,
      // If you have many rules in a separate file.
      "project-structure/folder-structure": ["error", folderStructureConfig],
      // If you have only a few rules.
      "project-structure/folder-structure": [
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

Create a `folderStructure.mjs` in the root of your project.<br>

> [!WARNING]  
> Remember to include `// @ts-check`, otherwise type checking won't be enabled.

> [!NOTE]  
>  `folderStructure.json` and `folderStructure.yaml` are also supported. See an example in the 🕹️[playground](https://github.com/Igorkowalski94/eslint-plugin-project-structure-playground#readme) for eslint-plugin-project-structure rules.

#### Simple example for the structure below:

```
.
├── ...
├── 📄 folderStructure.mjs
├── 📄 eslint.config.mjs
└── 📂 src
    ├── 📄 index.tsx
    └── 📂 components
        ├── ...
        └── 📄 ComponentName.tsx
```

```mjs
// @ts-check

import { createFolderStructure } from "eslint-plugin-project-structure";

export const folderStructureConfig = createFolderStructure({
  structure: [
    // Allow any files in the root of your project, like package.json, eslint.config.mjs, etc.
    // You can add rules for them separately.
    // You can also add exceptions like this: "(?!folderStructure)*"
    { name: "*" },
    {
      name: "src",
      children: [
        // src/index.tsx
        { name: "index.tsx" },
        // src/components/ComponentName.tsx
        { name: "components", children: [{ name: "{PascalCase}.tsx" }] },
      ],
    },
  ],
});
```

#### Advanced example for the structure below:

```
.
├── ...
├── 📄 folderStructure.mjs
├── 📄 eslint.config.mjs
└── 📂 src
    ├── 📂 hooks
    │   ├── ...
    │   ├── 📄 useSimpleGlobalHook.test.ts
    │   ├── 📄 useSimpleGlobalHook.ts
    │   └── 📂 useComplexGlobalHook
    │       ├── 📁 hooks (recursion)
    │       ├── 📄 useComplexGlobalHook.api.ts
    │       ├── 📄 useComplexGlobalHook.types.ts
    │       ├── 📄 useComplexGlobalHook.test.ts
    │       └── 📄 useComplexGlobalHook.ts
    └── 📂 components
        ├── ...
        └── 📂 ParentComponent
            ├── 📄 parentComponent.api.ts
            ├── 📄 parentComponent.types.ts
            ├── 📄 ParentComponent.test.tsx
            ├── 📄 ParentComponent.tsx
            ├── 📂 components
            │   ├── ...
            │   └── 📂 ChildComponent
            │       ├── 📁 components (recursion)
            │       ├── 📁 hooks (recursion)
            │       ├── 📄 childComponent.types.ts
            │       ├── 📄 childComponent.api.ts
            │       ├── 📄 ChildComponent.test.tsx
            │       └── 📄 ChildComponent.tsx
            └── 📂 hooks
                ├── ...
                ├── 📄 useSimpleParentComponentHook.test.ts
                ├── 📄 useSimpleParentComponentHook.ts
                └── 📂 useComplexParentComponentHook
                    ├── 📁 hooks (recursion)
                    ├── 📄 useComplexParentComponentHook.api.ts
                    ├── 📄 useComplexParentComponentHook.types.ts
                    ├── 📄 useComplexParentComponentHook.test.ts
                    └── 📄 useComplexParentComponentHook.ts
```

```mjs
// @ts-check

import { createFolderStructure } from "eslint-plugin-project-structure";

export const folderStructureConfig = createFolderStructure({
  structure: [
    // Allow any files in the root of your project, like package.json, eslint.config.mjs, etc.
    // You can add rules for them separately.
    // You can also add exceptions like this: "(?!folderStructure)*"
    { name: "*" },
    {
      name: "src",
      children: [
        // src/hooks/... All files and folders of the hooks_folder rule.
        { ruleId: "hooks_folder" },
        // src/components/... All files and folders of the components_folder rule.
        { ruleId: "components_folder" },
      ],
    },
  ],
  rules: {
    // hooks/useHookName1/... All files and folders of the hook_folder rule.
    // hooks/useHookName2.test.ts
    // hooks/useHookName2.ts
    hooks_folder: {
      name: "hooks",
      children: [
        { ruleId: "hook_folder" },
        { name: "use{PascalCase}(.test)?.ts" },
      ],
    },

    // useHookName/hooks/... All files and folders of the hooks_folder rule.
    // useHookName/useHookName.test.ts
    // useHookName/useHookName.api.ts
    // useHookName/useHookName.types.ts
    // useHookName/useHookName.ts
    hook_folder: {
      name: "use{PascalCase}",
      children: [
        { ruleId: "hooks_folder" },
        { name: "{parentName}(.(test|api|types))?.ts" },
      ],
    },

    // components/ComponentName/... All files and folders of the component_folder rule.
    components_folder: {
      name: "components",
      children: [{ ruleId: "component_folder" }],
    },

    // ComponentName/components/... All files and folders of the components_folder rule.
    // ComponentName/hooks/... All files and folders of the hooks_folder rule.
    // ComponentName/componentName.types.ts
    // ComponentName/componentName.api.ts
    // ComponentName/ComponentName.test.tsx
    // ComponentName/ComponentName.tsx
    component_folder: {
      name: "{PascalCase}",
      children: [
        { ruleId: "components_folder" },
        { ruleId: "hooks_folder" },
        { name: "{parentName}.(types|api).ts" },
        { name: "{ParentName}(.test)?.tsx" },
      ],
    },
  },
});
```

## ⚙️ API <a id="api"></a>

### `ignorePatterns`: `string[] | undefined` <a id="ignore-patterns"></a>

Here you can set the paths you want to ignore. You can use all [micromatch.some](https://github.com/micromatch/micromatch?tab=readme-ov-file#some) functionalities.

```jsonc
{ "ignorePatterns": ["src/legacy/**"] }
```

### `name`: `string | undefined` <a id="name"></a>

The name is treated as a `regex`.

The following improvements are automatically added to the regex:

- The name is wrapped in `^$`.
- All `.` characters (any character except newline) will be converted to `\\.` (dot as a character).
  If you want original behavior, use the following notation `..`.
- All `*` characters will be converted to `(([^/]*)+)` (wildcard).
  If you want original behavior, use the following notation `**`.

When used with [children](#children) this will be the name of `folder`.<br>
When used without [children](#children) this will be the name of `file`.<br>

> [!NOTE]
> If you only care about the name of the `folder` without rules for its [children](#children), leave the [children](#children) as `[]`.

```jsonc
{ "name": "fileName.*" }
```

```jsonc
{ "name": "folderName", "children": [] }
```

### `regexParameters`: `Record<string, string> | undefined` <a id="regex-parameters"></a>

A place where you can add your own regex parameters.<br>
You can use [built-in regex parameters](#built-in-regex-parameters). You can overwrite them with your logic, exceptions are [parentName](#parent-name-lower) and [ParentName](#parent-name-upper) overwriting them will be ignored.<br>
You can freely mix regex parameters together see [example](#regex-parameters-mix-example).

```jsonc
{
  "regexParameters": {
    "yourRegexParameter": "(Regex logic)",
    "camelCase": "(Regex logic)", // Override built-in camelCase.
    "parentName": "(Regex logic)", // Overwriting will be ignored.
    "ParentName": "(Regex logic)", // Overwriting will be ignored.
  },
}
```

Then you can use them in [name](#name) with the following notation `{yourRegexParameter}`.

```jsonc
{ "name": "{yourRegexParameter}" }
```

#### Built-in regex parameters

`{parentName}`<a id="parent-name-lower"></a><br>
The file/folder inherits the name of the `folder` in which it is located and sets its **first letter** to `lowercase`.

```jsonc
{ "name": "{parentName}" }
```

`{ParentName}`<a id="parent-name-upper"></a><br>
The file/folder inherits the name of the `folder` in which it is located and sets its **first letter** to `uppercase`.

```jsonc
{ "name": "{ParentName}" }
```

`{PascalCase}`<br>
Add `PascalCase` validation to your regex.<br>
The added regex is `[A-Z](([a-z0-9]+[A-Z]?)*)`.

```jsonc
{ "name": "{PascalCase}" }
```

`{camelCase}`<br>
Add `camelCase` validation to your regex.<br>
The added regex is `[a-z][a-z0-9]*(([A-Z][a-z0-9]+)*[A-Z]?|([a-z0-9]+[A-Z])*|[A-Z])`.

```jsonc
{ "name": "{camelCase}" }
```

`{snake_case}`<br>
Add `snake_case` validation to your regex.<br>
The added regex is `((([a-z]|\d)+_)*([a-z]|\d)+)`.

```jsonc
{ "name": "{snake_case}" }
```

`{SNAKE_CASE}`<br>
Add `SNAKE_CASE` validation to your regex.<br>
The added regex is `((([A-Z]|\d)+_)*([A-Z]|\d)+)`.

```jsonc
{ "name": "{SNAKE_CASE}" }
```

`{kebab-case}`<br>
Add `kebab-case` validation to your regex.<br>
The added regex is `((([a-z]|\d)+-)*([a-z]|\d)+)`.

```jsonc
{ "name": "{kebab-case}" }
```

#### Regex parameters mix example <a id="regex-parameters-mix-example"></a>

Here are some examples of how easy it is to combine [regex parameters](#regex-parameters).

```jsonc
// useNiceHook.ts
// useNiceHook.api.ts
// useNiceHook.test.ts
{ "name": "use{PascalCase}(.(test|api))?.ts" }
```

```jsonc
// FileParentName.hello_world.ts
// FileParentName.hello_world.test.ts
// FileParentName.hello_world.api.ts
{ "name": "{ParentName}.{snake_case}(.(test|api))?.ts" }
```

### `children`: `Rule[] | undefined` <a id="children"></a>

`Folder` children rules.<br>

> [!WARNING]
> Folder needs to contain at least one file/subfolder with file to be validated. ESLint and Git ignore empty folders, so they won’t be pushed to the repository and will only remain visible locally.

```jsonc
{ "children": [{ "name": "Child" }] }
```

### `enforceExistence`: `string[] | undefined` <a id="enforce-existence"></a>

Enforce the existence of other folders/files when a given folder/file exists.

In `enforceExistence`, two references are available for use:

- `{name}` - Take the name of the current file or folder and change its first letter to lowercase.
- `{Name}` - Take the name of the current file or folder and change its first letter to uppercase.

> [!WARNING]
> Folder needs to contain at least one file/subfolder with file to be validated. ESLint and Git ignore empty folders, so they won’t be pushed to the repository and will only remain visible locally.

```jsonc
{
  "structure": {
    // If root directory exists.
    "enforceExistence": [
      "src", // ./src must exist.
      "src/components", // ./src/components must exist.
    ],
    "children": [
      { "name": "*" },
      {
        "name": "src",
        "children": [
          { "name": "stories", "children": [{ "name": "{camelCase}.tsx" }] },
          { "name": "{PascalCase}.test.tsx" },
          { "name": "components", "children": [] },
          {
            "name": "{PascalCase}.tsx",
            // If ./src/ComponentName.tsx exist:
            "enforceExistence": [
              "{Name}.test.tsx", // ./src/ComponentName.test.tsx must exist.
              "stories/{name}.stories.tsx", // ./src/stories/componentName.stories.tsx must exist.
              "../cats.ts", // ./cats.ts must exist.
            ],
          },
        ],
      },
    ],
  },
}
```

### `structure`: `Rule | Rule[]` <a id="structure"></a>

The structure of your project and its rules.

> [!WARNING]
> Make sure your `tsconfig`/`eslint.config.mjs` and the script to run ESLint, contains all the `files`/`folders` you want to validate. Otherwise `eslint` will not take them into account.

> [!TIP]
> I recommend creating reusable [rules](#rules) for each folder and using the [ruleId](#ruleid) in the [structure](#structure) for better readability. See the [example](https://github.com/Igorkowalski94/eslint-plugin-project-structure-playground#readme/blob/main/folderStructure.mjs).

```
.
├── 📂 libs
├── 📂 src
├── 📂 yourCoolFolderName
└── 📄 ...
```

```jsonc
{
  "structure": [
    { "name": "libs", "children": [] },
    { "name": "src", "children": [] },
    { "name": "yourCoolFolderName", "children": [] },
    // Allow any files in the root of your project, like package.json, eslint.config.mjs, etc.
    // You can add rules for them separately.
    // You can also add exceptions like this: "(?!folderStructure)*"
    { "name": "*" },
  ],
}
```

or

```jsonc
{
  "structure": {
    "enforceExistence": ["src"],
    "children": [
      { "name": "libs", "children": [] },
      { "name": "src", "children": [] },
      { "name": "yourCoolFolderName", "children": [] },
      // Allow any files in the root of your project, like package.json, eslint.config.mjs, etc.
      // You can add rules for them separately.
      // You can also add exceptions like this: "(?!folderStructure)*"
      { "name": "*" },
    ],
  },
}
```

### `rules`: `Record<string, Rule> | undefined` <a id="rules"></a>

A place where you can add your reusable rules. This is useful when you want to avoid a lot of repetition in your [structure](#structure) or use [folder recursion](#folder-recursion) feature.<br>
The key in the object will correspond to [ruleId](#ruleid), which you can then use in many places.

```jsonc
{
  "rules": {
    "yourReusableRule": { "name": "ComponentName", "children": [] },
  },
}
```

### `ruleId`: `string | undefined` <a id="ruleid"></a>

A reference to your reusable rule.

```jsonc
{ "ruleId": "yourReusableRule" }
```

You can use it with other keys like [name](#name) and [children](#children) but remember that they will **override** the keys from your reusable rule.<br>
This is useful if you want to get rid of a lot of repetition in your structure, for example, `folders` have different [name](#name), but the same [children](#children).

```
.
├── ...
└── 📂 src
    ├── 📂 folder1
    │   ├── ...
    │   └── 📂 NestedFolder
    │       ├── ...
    │       ├── 📄 File1.tsx
    │       └── 📄 file2.ts
    └── 📂 folder2
        ├── 📂 subFolder1
        │    ├── ...
        │    ├── 📄 File1.tsx
        │    └── 📄 file2.ts
        └── 📂 subFolder2
            ├── ...
            ├── 📄 File1.tsx
            └── 📄 file2.ts
```

```jsonc
{
  "structure": [
    {
      "name": "src",
      "children": [
        {
          "name": "folder1",
          "children": [{ "name": "{PascalCase}", "ruleId": "shared_children" }],
        },
        {
          "name": "folder2",
          "children": [
            {
              "name": "(subFolder1|subFolder2)",
              "ruleId": "shared_children",
            },
          ],
        },
      ],
    },
  ],
  "rules": {
    "shared_children": {
      "children": [
        { "name": "{PascalCase}.tsx" },
        { "name": "{camelCase}.ts" },
      ],
    },
  },
}
```

### Folder recursion

You can easily create recursions when you refer to the same [ruleId](#ruleid) that your rule has.<br>
Let's assume you want all files in the `src` folder to follow `{PascalCase}` with any file extension, and all folders to follow `{camelCase}`.<br>
In this case, the recursion will look like this:<br>

```
.
├── ...
└── 📂 src
    ├── ...
    ├── 📄 File1.tsx
    └── 📂 folder1
        ├── ...
        ├── 📄 File2.ts
        └── 📂 folder2
            ├── ...
            ├── 📄 File3.js
            └── 📁 folder3
                ├── ...
                ├── 📄 File4.jsx
                └── 📂 folder4
                    └── ... (recursion)
```

```jsonc
{
  "structure": [{ "name": "src", "ruleId": "folderRule" }],
  "rules": {
    "folderRule": {
      "name": "{camelCase}",
      "children": [{ "name": "{PascalCase}.*" }, { "ruleId": "folderRule" }],
    },
  },
}
```
