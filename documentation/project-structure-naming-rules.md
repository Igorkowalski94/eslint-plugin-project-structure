# project-structure/naming-rules

Enforce complex naming rules.

#### Features:

✅ Naming validation. <br>
✅ Support for classes, types, interfaces, enums, variables, functions, arrow function.<br>
✅ Naming rules only for name types located in the root of the file (not nested).<br>
✅ Inheriting the file name as the name. Option of adding your own prefixes/suffixes, changing the case or deleting parts of a file name.<br>
✅ Different name rules for different files.<br>
✅ Regex validation<br>
✅ Build in case validation.<br>
✅ An option to create a separate configuration file with TypeScript support.<br>

[**Playground**](https://github.com/Igorkowalski94/eslint-plugin-project-structure-playground) for eslint-plugin-project-structure rules.

Become part of the community!<br>
Leave a ⭐ and share the link with your friends.<br>
If you have any questions or need help creating a configuration that meets your requirements, **[click here](https://github.com/Igorkowalski94/eslint-plugin-project-structure/discussions)**, issues / an idea for a new functionality **[click here](https://github.com/Igorkowalski94/eslint-plugin-project-structure/issues/new/choose)**.

### Documentation:

- **[project-structure-folder-structure](https://github.com/Igorkowalski94/eslint-plugin-project-structure/blob/main/documentation/project-structure-folder-structure.md)**
- **[project-structure-independent-modules](https://github.com/Igorkowalski94/eslint-plugin-project-structure/blob/main/documentation/project-structure-independent-modules.md)**

### Go to:

- [Installation](#installation)
- [Getting started](#getting-started)
- [Example](#example)
- [API](#api)
  - [filePattern](#file-pattern)
  - [rules](#rules)
    - [nameType](#name-type)
    - [filenamePartsToRemove](#filename-parts-to-remove)
    - [allowNames](#allow-names)
    - [allowNamesFileRoot](#allow-names-file-root)
    - [references](#references)

## Installation

```bsh
yarn add -D eslint-plugin-project-structure
```

```bsh
npm i --dev eslint-plugin-project-structure
```

## Getting started

Add the following lines to **`eslint.config.mjs`**.

> [!NOTE]  
>  The examples in the documentation refer to ESLint's new config system. If you're interested in examples for the old ESLint config, you can find them in the [**playground**](https://github.com/Igorkowalski94/eslint-plugin-project-structure-playground) for eslint-plugin-project-structure rules.

```mjs
// @ts-check

import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import { projectStructurePlugin } from "eslint-plugin-project-structure";
import { namingRulesConfig } from "./namingRules.mjs";

export default tseslint.config({
  extends: [...tseslint.configs.recommended],
  files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],
  plugins: {
    "project-structure": projectStructurePlugin,
  },
  rules: {
    ...eslint.configs.recommended.rules,
    // If you have many rules in a separate file.
    "project-structure/naming-rules": ["error", ...namingRulesConfig],
    // If you have only a few rules.
    "project-structure/naming-rules": [
      "error",
      {
        // Rule1
      },
      {
        // Rule2
      },
    ],
  },
});
```

#### Example:

Create a **`namingRules.mjs`** in the root of your project.<br>

> [!WARNING]  
> Remember to include `// @ts-check`, otherwise type checking won't be enabled.

```mjs
// @ts-check

import { createNamingRules } from "eslint-plugin-project-structure";

export const namingRulesConfig = createNamingRules([
  {
    filePattern: "**/*consts.ts", // Name rules for all files ending with .const.ts.
    rules: [
      {
        // nameTypes we are interested in.
        nameType: "variable",
        allowNames: [
          // All variables in the file should match SNAKE_CASE.
          "{SNAKE_CASE}",

          // or

          // All variables must have six uppercase letters.
          "[A-Z]{6}",
        ],
      },
    ],
  },
  {
    filePattern: ["**/*.ts", "!(**/index.ts)"], // Name rules for all .ts files except index.ts files.
    rules: [
      {
        // nameTypes we are interested in.
        nameType: ["arrowFunction", "function"],
        // Functions located at the root of the file (non-nested) should be named: Filename as camelCase.
        allowNamesFileRoot: ["{filename_camelCase}"],
        // Nested functions in the file should match camelCase.
        allowNames: ["{camelCase}"],
      },
      {
        // nameTypes we are interested in.
        nameType: ["interface", "type"],
        allowNamesFileRoot: [
          // Interface or type located at the root of the file (non-nested) should be named: Filename as PascalCase + Props.
          "{filename_PascalCase}Props",

          //or

          // Interface or type located at the root of the file (non-nested) should be named: Filename as SNAKE_CASE + _Return.
          "{filename_SNAKE_CASE}_Return",
        ],
      },
    ],
  },
]);
```

```ts
// File transformUserData.ts

// Satisfies regex "{filename_PascalCase}Props"
interface TransformUserDataProps {
  name: number;
  surname: number;
  email: string;
}

// Satisfies regex "{filename_snake_case}_return"
interface transform_user_data_return {
  fullName: string;
  email: string;
}

// Satisfies regex "{filename_camelCase}"
const transformUserData = ({
  name,
  surname,
  email,
}: TransformUserDataProps): transform_user_data_return => {
  // Satisfies regex "{camelCase}",
  const nestedFunction = () => {};

  return {
    fullName: `${name} ${surname}`,
    email,
  };
};
```

```ts
// File transformUserData.consts.ts

// Satisfies regex "{SNAKE_CASE}"
const IMPORTANT_VARIABLE_1 = "";

// Satisfies regex "[A-Z]{6}"
const MYNAME = "";
```

## API:

### **`filePattern`**: `<string | string[]>` <a id="file-pattern"></a>

Here you define which files should meet the rules. You can use all **[micromatch.every](https://github.com/micromatch/micromatch?tab=readme-ov-file#every)** functionalities.

```jsonc
// Name rules for all .ts files except index.ts
{ "filePattern": ["**/*.ts", "!(**/index.ts)"] }
```

### **`rules`**: `<NamingRule[]>` <a id="rules"></a>

The place where you define the naming rules for a given file.

```jsonc
{ "rules": [] }
```

### **`nameType`**: `<NameType | NameType[]>` <a id="name-type"></a>

Here you define the name type you are interested in.<br>

Available types:<br>

- **`"class"`**<br>
- **`"variable"`**<br>
- **`"function"`**<br>
- **`"arrowFunction"`**<br>
- **`"type"`**<br>
- **`"interface"`**<br>
- **`"enum"`**<br>

```jsonc
{
  "filePattern": "**/*.tsx",
  "rules": [
    {
      "nameType": ["function", "arrowFunction"],
      "allowNames": [],
    },
    {
      "nameType": "variable",
      "allowNames": [],
    },
  ],
}
```

### **`filenamePartsToRemove`**: `<string[] | undefined>` <a id="filename-parts-to-remove"></a>

Useful if you use prefixes in your filenames and don't want them to be part of the name.

> [!NOTE]
> Only taken into account when using [**`references`**](#references) with filename.

```jsonc
{
  "filePattern": "**/*.tsx",
  "rules": [
    {
      "nameType": "arrowFunction",
      "filenamePartsToRemove": [".react"], // ComponentName.react.tsx => ComponentName.tsx
      "allowNamesFileRoot": ["{filename_PascalCase}"], // const ComponentName = () => {}
    },
  ],
}
```

### **`allowNames`**: `<string[] | undefined>` <a id="allow-names"></a>

If the name matches at least one regex, it will be considered valid.

The following improvements are automatically added to the regex:

- The name is wrapped in `^$`.

> [!NOTE]
> If you do not specify **`allowNames`**, the default values ​​are **[{camelCase}](#camel-case)** and **[{PascalCase}](#pascal-case)**.

```jsonc
{
  "filePattern": "**/*.tsx",
  "rules": [
    {
      "nameType": "arrowFunction",
      // Arrow functions in .tsx files should meet camelCase or PascalCase.
      "allowNames": ["{camelCase}", "{PascalCase}"],
    },
    {
      "nameType": "variable",
      // Variables in .tsx files should meet SNAKE_CASE.
      "allowNames": ["{SNAKE_CASE}"],
    },
  ],
}
```

### **`allowNamesFileRoot`**: `<string[] | undefined>` <a id="allow-names-file-root"></a>

**`allowNamesFileRoot`** only takes into account [**`nameTypes`**](#name-type) that are in the root of a given file (not nested).

If the name matches at least one regex, it will be considered valid.

The following improvements are automatically added to the regex:

- The name is wrapped in `^$`.

> [!NOTE]
> If you do not specify **`allowNamesFileRoot`**, the default values ​​are **[{camelCase}](#camel-case)** and **[{PascalCase}](#pascal-case)**.

```jsonc
{
  "filePattern": "**/*.tsx",
  "rules": [
    {
      "nameType": ["arrowFunction", "function"],
      // Arrow function or function located at the root of the file (not nested) should meet the name: filename as PascalCase.
      "allowNamesFileRoot": ["{filename_PascalCase}"],
    },
    {
      "nameType": ["interface", "type"],
      "allowNamesFileRoot": [
        // Interface or type located at the root of the file (non-nested) should meet the name: filename as PascalCase + Props.
        "{filename_PascalCase}Props",

        // or

        // Interface or type located at the root of the file (non-nested) should meet the name: filename as PascalCase + Return
        "{filename_PascalCase}Return",
      ],
    },
  ],
}
```

#### References

**`{filename_camelCase}`**<br>
Take the name of the file you are currently in and change it to **`camelCase`**.

```jsonc
{
  "allowNames": ["{filename_camelCase}"],
  "allowNamesFileRoot": ["{filename_camelCase}"],
}
```

**`{filename_PascalCase}`**<br>
Take the name of the file you are currently in and change it to **`PascalCase`**.

```jsonc
{
  "allowNames": ["{filename_PascalCase}"],
  "allowNamesFileRoot": ["{filename_PascalCase}"],
}
```

**`{filename_snake_case}`**<br>
Take the name of the file you are currently in and change it to **`snake_case`**.

```jsonc
{
  "allowNames": ["{filename_snake_case}"],
  "allowNamesFileRoot": ["{filename_snake_case}"],
}
```

**`{filename_SNAKE_CASE}`**<br>
Take the name of the file you are currently in and change it to **`SNAKE_CASE`**.

```jsonc
{
  "allowNames": ["{filename_SNAKE_CASE}"],
  "allowNamesFileRoot": ["{filename_SNAKE_CASE}"],
}
```

**`{camelCase}`**<a id="camel-case"></a><br>
Add **`camelCase`** validation to your regex.<br>
The added regex is **`[a-z][a-z0-9]*(([A-Z][a-z0-9]+)*[A-Z]?|([a-z0-9]+[A-Z])*|[A-Z])`**.

```jsonc
{
  "allowNames": ["{camelCase}"],
  "allowNamesFileRoot": ["{camelCase}"],
}
```

**`{PascalCase}`**<a id="pascal-case"></a><br>
Add **`PascalCase`** validation to your regex.<br>
The added regex is **`[A-Z](([a-z0-9]+[A-Z]?)*)`**.

```jsonc
{
  "allowNames": ["{PascalCase}"],
  "allowNamesFileRoot": ["{PascalCase}"],
}
```

**`{snake_case}`**<br>
Add **`snake_case`** validation to your regex.<br>
The added regex is **`((([a-z]|\d)+_)*([a-z]|\d)+)`**.

```jsonc
{
  "allowNames": ["{snake_case}"],
  "allowNamesFileRoot": ["{snake_case}"],
}
```

**`{SNAKE_CASE}`**<br>
Add **`SNAKE_CASE`** validation to your regex.<br>
The added regex is **`((([A-Z]|\d)+_)*([A-Z]|\d)+)`**.

```jsonc
{
  "allowNames": ["{SNAKE_CASE}"],
  "allowNamesFileRoot": ["{SNAKE_CASE}"],
}
```
