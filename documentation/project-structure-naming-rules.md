<p align="right">
  <picture><img src="https://raw.githubusercontent.com/Igorkowalski94/eslint-plugin-project-structure/main/images/Cloud.png" alt="Cloud" width="35" height="35" /></picture>
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/Igorkowalski94/eslint-plugin-project-structure/main/images/Crescent%20Moon.png">
    <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/Igorkowalski94/eslint-plugin-project-structure/main/images/Sun.png">
    <img alt="Shows an illustrated sun in light mode and a moon with stars in dark mode." src="https://raw.githubusercontent.com/Igorkowalski94/eslint-plugin-project-structure/main/images/Sun.png" width="30" height="30" />
  </picture>
  <picture><img src="https://raw.githubusercontent.com/Igorkowalski94/eslint-plugin-project-structure/main/images/Cloud.png" alt="Cloud" width="19" height="19" /></picture>
</p>
<h1 align="center"><picture><img src="https://raw.githubusercontent.com/Igorkowalski94/eslint-plugin-project-structure/main/images/File%20Folder.png" alt="Folder" width="60" height="60" /></picture><picture><img src="https://raw.githubusercontent.com/Igorkowalski94/eslint-plugin-project-structure/main/images/Owl.png" alt="Owl" width="60" height="60" /></picture></br>project&#8209;structure/&#8203;naming&#8209;rules</h1>
<p align="center">Enforce advanced naming rules and prohibit the use of given selectors in a given file.</p>
<p align="center">Have full control over what your file can contain and the naming conventions it must follow.</p>

<h4><picture><img src="https://raw.githubusercontent.com/Igorkowalski94/eslint-plugin-project-structure/main/images/Rocket.png" alt="Rocket" width="35" height="35" /></picture> Features:</h4>

- Naming validation.
- Supported selectors: `class`, `variable`, `function`, `arrowFunction`, `type`, `interface`, `enum`.
- Naming rules for exported selectors, selectors in the root of the file and nested/all selectors in the file. They can be used together in combination.
- Prohibit the use of given selectors in a given file. For example, `**/*.consts.ts` files can only contain variables, `**/*.types.ts` files can only contain enums, interfaces and types.
- Inheriting the filename as the selector name. Option to add your own prefixes/suffixes, change the case, or remove parts of the filename.
- Enforcing a maximum of one main function/class per file.
- Different name rules for different files.
- Regex validation.
- Build in case validation.
- An option to create a separate configuration file with TypeScript support.

## 📋 General information

🎮[Playground](https://github.com/Igorkowalski94/eslint-plugin-project-structure-playground#readme) for eslint-plugin-project-structure rules.

Become part of the community!<br>
Leave a ⭐ and share the link with your friends.<br>

- If you have any questions or need help creating a configuration that meets your requirements, [click here](https://github.com/Igorkowalski94/eslint-plugin-project-structure/discussions/new?category=help).
- If you have found a bug or an error in the documentation, [click here](https://github.com/Igorkowalski94/eslint-plugin-project-structure/issues/new?assignees=Igorkowalski94&labels=bug&projects=&template=bug_report.md&title=%5BBUG%5D).
- If you have an idea for a new feature or an improvement to an existing one, [click here](https://github.com/Igorkowalski94/eslint-plugin-project-structure/discussions/new?category=ideas).
- If you're interested in discussing project structures across different frameworks or want to vote on a proposed new feature, [click here](https://github.com/Igorkowalski94/eslint-plugin-project-structure/discussions?discussions_q=).

## 📚 Documentation

- [project-structure/folder-structure](https://github.com/Igorkowalski94/eslint-plugin-project-structure/blob/main/documentation/project-structure-folder-structure.md)
- [project-structure/independent-modules](https://github.com/Igorkowalski94/eslint-plugin-project-structure/blob/main/documentation/project-structure-independent-modules.md)

## ✈️ Go to

- [Plugin homepage](https://github.com/Igorkowalski94/eslint-plugin-project-structure#readme)
- [Installation](#installation)
- [Getting started](#getting-started)
  - [Example](#example)
- [API](#api)
  - [filesRules](#files-rules)
    - [filePattern](#file-pattern)
    - [fileExportsRules, fileRootRules, fileRules](#file-rules)
      - [allowOnlySpecifiedSelectors](#allow-only-specified-selectors)
      - [errors](#errors)
      - [selector](#selector)
      - [filenamePartsToRemove](#filename-parts-to-remove)
      - [format](#format)
  - [regexParameters](#regex-parameters)
    - [Built-in regex parameters](#built-in-regex-parameters)
    - [Regex parameters mix example](#regex-parameters-mix-example)

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
import { namingRulesConfig } from "./namingRules.mjs";

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
      "project-structure/naming-rules": ["error", namingRulesConfig],
      // If you have only a few rules.
      "project-structure/naming-rules": [
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

Create a `namingRules.mjs` in the root of your project.<br>

> [!WARNING]  
> Remember to include `// @ts-check`, otherwise type checking won't be enabled.

> [!NOTE]  
>  `namingRules.json` and `namingRules.yaml` are also supported. See an example in the 🎮[playground](https://github.com/Igorkowalski94/eslint-plugin-project-structure-playground#readme) for eslint-plugin-project-structure rules.

#### Example:

```mjs
// @ts-check

import { createNamingRules } from "eslint-plugin-project-structure";

export const namingRulesConfig = createNamingRules([
  // In this example, we want all `.consts.ts` files to adhere to the following rules:
  // - They may only export variables that adhere to `{SNAKE_CASE}`.
  // - The file may contain all other selectors, but non-exported variables must adhere to `{camelCase}`.
  {
    filePattern: "**/*.consts.ts",
    fileExportsRules: {
      allowOnlySpecifiedSelectors: true,
      rules: [
        {
          selector: "variable",
          format: "{SNAKE_CASE}",
        },
      ],
    },
    fileRules: [
      {
        selector: "variable",
        format: "{camelCase}",
      },
    ],
  },
  // In this example, we want all `.ts` files, except `index.ts`, to adhere to the following rules:
  // - They may contain at most one arrowFunction that follows `{fileName}`.
  // - They may include at most two types or interfaces that match `{FileName}Props` or `{file_name}_return`.
  // - All nested arrowFunctions and variables must follow `{camelCase}`.
  // - If a variable is used at the root of our file, an error will appear indicating that it should be moved to a `.consts.ts` file.
  // - All other selectors not specified in the rules for this file are prohibited.
  {
    filePattern: ["**/*.ts", "!(**/index.ts)"],
    fileRootRules: {
      allowOnlySpecifiedSelectors: true,
      errors: {
        variable: "Move all variables to .consts.ts file.",
      },
      rules: [
        {
          selector: "arrowFunction",
          format: "{fileName}",
        },
        {
          selector: ["interface", "type"],
          format: ["{FileName}Props", "{file_name}_return"],
        },
      ],
    },
    fileRules: {
      allowOnlySpecifiedSelectors: true,
      rules: [
        {
          selector: "arrowFunction",
          format: "{camelCase}",
        },

        {
          selector: "variable",
          format: "{camelCase}",
        },
      ],
    },
  },
]);
```

```ts
// File transformUserData.consts.ts

// Satisfies fileRules format = "{camelCase}"
const variable1 = "";

// Satisfies fileExportsRules format = "{SNAKE_CASE}"
export const VARIABLE_2 = "";
```

```ts
// File transformUserData.ts

// Satisfies fileRootRules format = "{FileName}Props"
interface TransformUserDataProps {
  name: number;
  surname: number;
  email: string;
}

// Satisfies fileRootRules format = "{file_name}_return"
interface transform_user_data_return {
  fullName: string;
  email: string;
}

// Satisfies fileRootRules format = "{fileName}"
const transformUserData = ({
  name,
  surname,
  email,
}: TransformUserDataProps): transform_user_data_return => {
  // Satisfies fileRules format = "{camelCase}"
  const nestedFunction = () => {};

  return {
    fullName: `${name} ${surname}`,
    email,
  };
};
```

## ⚙️ API <a id="api"></a>

### `filesRules: FileNamingRules[]` <a id="files-rules"></a>

A place where you can add rules for a given file.

This way, you can ignore specific folders/files:

```jsonc
{
  "filesRules": [
    { "filePattern": "legacy/**" },
    {
      "filePattern": "*",
      "fileRootRules": [
        {
          "selector": "variable",
          "format": "{SNAKE_CASE}",
        },
      ],
    },
  ],
}
```

> [!WARNING]
> The order of rules matters! Rules are checked in order from top to bottom.

```jsonc
{
  "filesRules": [
    {
      "filePattern": "*",
      "fileRootRules": [
        {
          "selector": "variable",
          "format": "{SNAKE_CASE}",
        },
      ],
    },
    // File rule with "**/*.consts.ts" will not be taken into account because file rule with "*" meets the condition.
    {
      "filePattern": "**/*.consts.ts",
      "fileRootRules": [
        {
          "selector": "variable",
          "format": "{snake_case}",
        },
      ],
    },
  ],
}
```

```jsonc
{
  "filesRules": [
    // File rule with "**/*.consts.ts" will be taken into account because file rule with "*" is below file rule with "**/*.consts.ts".
    {
      "filePattern": "**/*.consts.ts",
      "fileRootRules": [
        {
          "selector": "variable",
          "format": "{snake_case}",
        },
      ],
    },
    {
      "filePattern": "*",
      "fileRootRules": [
        {
          "selector": "variable",
          "format": "{SNAKE_CASE}",
        },
      ],
    },
  ],
}
```

```jsonc
{
  "filesRules": [
    {
      "filePattern": ["*", "!(**/*.consts.ts)"],
      "fileRootRules": [
        {
          "selector": "variable",
          "format": "{SNAKE_CASE}",
        },
      ],
    },
    // File rule with "**/*.consts.ts" will be taken into account because file rule with ["*", "!(**/*.consts.ts)"] ignores "**/*.consts.ts" pattern.
    {
      "filePattern": "**/*.consts.ts",
      "fileRootRules": [
        {
          "selector": "variable",
          "format": "{snake_case}",
        },
      ],
    },
  ],
}
```

### `filePattern: string | string[]` <a id="file-pattern"></a>

Here you define which files should meet the rules. You can use all [micromatch.every](https://github.com/micromatch/micromatch?tab=readme-ov-file#every) functionalities.

```jsonc
// Name rules for all .ts files except index.ts
{ "filePattern": ["**/*.ts", "!(**/index.ts)"] }
```

### `fileExportRules, fileRootRules, fileRules?: NamingRule[] | NamingRuleObject` <a id="file-rules"></a>

The plugin allows setting rules for exported [selectors](#selector) via `fileExportsRules`, [selectors](#selector) in the root of the file via `fileRootRules` and nested/all [selectors](#selector) in the file via `fileRules`. They can be used together in combination.

There are two types of notations available:

- An object if you need additional options such as [allowOnlySpecifiedSelectors](#allow-only-specified-selectors), [errors](#errors).
- An array if you don't need the additional options.

```jsonc
{
  "filePattern": "*",
  "fileExportsRules": {
    "allowOnlySpecifiedSelectors": true,
    "errors": {},
    "rules": [],
  },
  "fileRootRules": {
    "allowOnlySpecifiedSelectors": true,
    "errors": {},
    "rules": [],
  },
  "fileRules": {
    "allowOnlySpecifiedSelectors": true,
    "errors": {},
    "rules": [],
  },
}
```

```jsonc
{
  "filePattern": "*",
  "fileExportsRules": [],
  "fileRootRules": [],
  "fileRules": [],
}
```

### `allowOnlySpecifiedSelectors?: boolean` <a id="allow-only-specified-selectors"></a>

With `allowOnlySpecifiedSelectors`, you can prohibit the use of selectors that you haven’t explicitly specified for the file.

```jsonc
{
  "filePattern": "*",
  "fileRules": {
    "allowOnlySpecifiedSelectors": true,
    "rules": [],
  },
}
```

### `errors?: Record<Selector, string>` <a id="errors"></a>

Additional errors for individual selectors. Useful if you want to provide more information to your team members and explain why a particular selector is prohibited in a given file.

Available only when [allowOnlySpecifiedSelectors](#allow-only-specified-selectors) is set to `true`.

```jsonc
{
  "filePattern": "*",
  "fileRules": {
    "allowOnlySpecifiedSelectors": true,
    "errors": {
      "variable": "We keep all variables in .consts.ts files to maintain organization and readability ...",
      "enum": "We keep all enums in .types.ts files ...",
      "arrowFunction": "We keep all utility functions in the helpers folder ...",
      "class": "...",
      "function": "...",
      "interface": "...",
      "type": "...",
    },
    "rules": [],
  },
}
```

### `selector: Selector | Selector[]` <a id="selector"></a>

Here you define the selector or selectors you are interested in.<br>

Available selectors:<br>

- `"class"`<br>
- `"variable"`<br>
- `"function"`<br>
- `"arrowFunction"`<br>
- `"type"`<br>
- `"interface"`<br>
- `"enum"`<br>

```jsonc
{
  "filePattern": "**/*.tsx",
  "fileRules": [
    { "selector": ["function", "arrowFunction"] },
    { "selector": "variable" },
  ],
}
```

### `filenamePartsToRemove?: string[]` <a id="filename-parts-to-remove"></a>

Useful if you use prefixes in your filenames and don't want them to be part of the [selector](#selector) name.

> [!NOTE]
> Only taken into account when using [`references`](#references) with filename.

```jsonc
{
  "filePattern": "**/*.tsx",
  "fileRules": [
    {
      "selector": "arrowFunction",
      "filenamePartsToRemove": [".react"], // ComponentName.react.tsx => ComponentName.tsx
      "format": "{FileName}", // const ComponentName = () => {}
    },
  ],
}
```

### `format?: string[] | string` <a id="format"></a>

The format that the given [selector](#selector) must adhere to.<br>
It is treated as a regular expression. If the [selector](#selector) name matches at least one regular expression, it will be considered valid.<br>

The following improvements are automatically added to the regular expression:

- regular expression is automatically wrapped in `^$`.

> [!NOTE]
> If you do not specify `format`, the default value is [{camelCase}](#camel-case).

```jsonc
{
  "filePattern": "**/*.tsx",
  "fileRules": [
    {
      "selector": "arrowFunction",
      // Arrow functions in .tsx files should meet camelCase or PascalCase.
      "format": ["{camelCase}", "{PascalCase}"],
    },
    {
      "selector": "variable",
      // Variables in .tsx files should meet SNAKE_CASE.
      "format": "{SNAKE_CASE}",
    },
  ],
}
```

### `regexParameters?: Record<string, string>` <a id="regex-parameters"></a>

A place where you can add your own regex parameters.<br>
You can use [built-in regex parameters](#built-in-regex-parameters). You can overwrite them with your logic, exceptions are filename references.<br>
You can freely mix regex parameters together see [example](#regex-parameters-mix-example).

```jsonc
{
  "regexParameters": {
    "yourRegexParameter": "(Regex logic)",
    "camelCase": "(Regex logic)", // Override built-in camelCase.
    "fileName": "(Regex logic)", // Overwriting will be ignored.
    "FileName": "(Regex logic)", // Overwriting will be ignored.
  },
}
```

Then you can use them in [format](#format) with the following notation `{yourRegexParameter}`.

```jsonc
{ "format": "{yourRegexParameter}" }
```

#### Built-in regex parameters

`{fileName}`<br>
Take the name of the file you are currently in and change it to `camelCase`.

```jsonc
{ "format": "{fileName}" }
```

`{FileName}`<br>
Take the name of the file you are currently in and change it to `PascalCase`.

```jsonc
{ "format": "{FileName}" }
```

`{file_name}`<br>
Take the name of the file you are currently in and change it to `snake_case`.

```jsonc
{ "format": "{file_name}" }
```

`{FILE_NAME}`<br>
Take the name of the file you are currently in and change it to `SNAKE_CASE`.

```jsonc
{ "format": "{FILE_NAME}" }
```

`{camelCase}`<br>
Add `camelCase` validation to your regex.<br>
The added regex is `([a-z]+[A-Z0-9]*[A-Z0-9]*)*`.

Examples: `component`, `componentName`, `componentName1`, `componentXYZName`, `cOMPONENTNAME`.

```jsonc
{ "name": "{camelCase}" }
```

`{PascalCase}`<br>
Add `PascalCase` validation to your regex.<br>
The added regex is `([A-Z]+[a-z0-9]*[A-Z0-9]*)*`.

Examples: `Component`, `ComponentName`, `ComponentName1`, `ComponentXYZName`, `COMPONENTNAME`.

```jsonc
{ "name": "{PascalCase}" }
```

`{strictCamelCase}`<br>
Add `strictCamelCase` validation to your regex.<br>
The added regex is `[a-z][a-z0-9]*(([A-Z][a-z0-9]+)*[A-Z]?|([a-z0-9]+[A-Z])*|[A-Z])`.

Examples: `component`, `componentName`, `componentName1`.

```jsonc
{ "name": "{strictCamelCase}" }
```

`{StrictPascalCase}`<br>
Add `StrictPascalCase` validation to your regex.<br>
The added regex is `[A-Z](([a-z0-9]+[A-Z]?)*)`.

Examples: `Component`, `ComponentName`, `ComponentName1`.

```jsonc
{ "name": "{StrictPascalCase}" }
```

`{snake_case}`<br>
Add `snake_case` validation to your regex.<br>
The added regex is `((([a-z]|\d)+_)*([a-z]|\d)+)`.

Examples: `component`, `component_name`, `component_name_1`.

```jsonc
{ "format": "{snake_case}" }
```

`{SNAKE_CASE}`<br>
Add `SNAKE_CASE` validation to your regex.<br>
The added regex is `((([A-Z]|\d)+_)*([A-Z]|\d)+)`.

Examples: `COMPONENT`, `COMPONENT_NAME`, `COMPONENT_NAME_1`.

```jsonc
{ "format": "{SNAKE_CASE}" }
```

#### Regex parameters mix example <a id="regex-parameters-mix-example"></a>

Here are some examples of how easy it is to combine [regex parameters](#regex-parameters).

```jsonc
// useNiceHook
// useNiceHook_api
// useNiceHook_test
{ "format": "use{PascalCase}(_(test|api))?" }
```

```jsonc
// someFileName_hello_world
// someFileName_hello_world_test
// someFileName_hello_world_api
{ "format": "{fileName}_{snake_case}(_(test|api))?" }
```

<h2><picture><img src="https://raw.githubusercontent.com/Igorkowalski94/eslint-plugin-project-structure/main/images/Party%20Popper.png" alt="Party Popper" width="35" height="35" /></picture> Sponsors</h2>

<p align="center">A big thank you to all the <a href="https://github.com/sponsors/Igorkowalski94" target=”_blank”>sponsors</a> for your support! You give me the strength and motivation to keep going!</p>
<p align="center"> Thanks to you, I can help others create their ideal projects!</p>
<p align="center"><picture><img src="https://raw.githubusercontent.com/Igorkowalski94/eslint-plugin-project-structure/main/images/Love-You%20Gesture.png" alt="Love-You Gesture" width="60px" height="60px" /></picture><p>
