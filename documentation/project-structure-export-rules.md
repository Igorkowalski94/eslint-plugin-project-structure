# project-structure/export-rules

Enforce rules on export.

### Features

✅ Export name validation. <br>
✅ Inheriting the file name as the export name (Option of adding your own prefixes/suffixes or changing the case).<br>
✅ Deleting parts of a file name. <br>
✅ Regex validation<br>
✅ Build in case validation.<br>
✅ Different export name rules for different files.<br>
✅ Support for all export types. Name export or default export for Classes, types, interfaces, variables, functions etc.<br>

#### [**Playground**](https://github.com/Igorkowalski94/eslint-plugin-project-structure-playground) for eslint-plugin-project-structure rules.

### Go to:

-   [Installation](#installation)
-   [Getting started](#getting-started)
-   [Example](#example)
-   [API](#api)
    -   [filePattern](#file-pattern)
    -   [filenamePartsToRemove](#filename-parts-to-remove)
    -   [allowExportNames](#allow-export-names)
        -   [references](#references)

## Installation

```bsh
yarn add -D eslint-plugin-project-structure
```

```bsh
npm i --dev eslint-plugin-project-structure
```

## Getting started

Add the following lines to **`.eslintrc`**.

If you want to help:<br>
Leave a ⭐ and share the link with your friends. Become part of the community!<br>
If you have any questions **[click here](https://github.com/Igorkowalski94/eslint-plugin-project-structure/discussions)**, issues / an idea for a new functionality **[click here](https://github.com/Igorkowalski94/eslint-plugin-project-structure/issues/new/choose)**.

```jsonc
{
    "plugins": ["project-structure"],
    "rules": {
        "project-structure/export-rules": "error", // warn | error
    },
}
```

#### Example:

```jsonc
{
    "project-structure/export-rules": [
        "error",
        {
            "filePattern": ["**/*.ts", "!**/index.ts"], // Export name rules for all .ts files except index.ts
            "allowExportNames": [
                "/^{filename_camelCase}$/", // Take the filename and convert it to camelCase.
                "/^{filename_PascalCase}Props$/", // Take the filename and convert it to PascalCase and add the 'Props' prefix.
                "/^{filename_snake_case}_return$/", // Take the filename and convert it to snake_case and add the '_return' prefix.
            ],
        },
        {
            "filePattern": "**/*.tsx", // // Export name rules for all .tsx files.
            "filenamePartsToRemove": [".react"], // Removing parts of a file name (ComponentName.react.tsx => ComponentName.tsx).
            "allowExportNames": [
                "/^{filename_PascalCase}$/", // Take the filename and convert it to PascalCase.
                "/^{filename_PascalCase}Props$/", // Take the filename and convert it to PascalCase and add the 'Props' prefix.
            ],
        },
        {
            "filePattern": "**/*.js", // Export name rules for all .js files.
            "allowExportNames": [
                // Allow snake_case, camelCase, SNAKE_CASE, and the first capital letter in export name.
                "/^{snake_case}$/",
                "/^{SNAKE_CASE}$/",
                "/^{camelCase}$/",
                "/^[A-Z]/", // You can also use your own regex.
            ],
        },
    ],
}
```

```ts
// File TransformUserData.ts

// Satisfies regex "/^{filename_PascalCase}Props$/"
export interface TransformUserDataProps {
    name: number;
    surname: number;
    email: string;
}

// Satisfies regex "/^{filename_snake_case}_return$/"
export interface transform_user_data_return {
    fullName: string;
    email: string;
}

// Satisfies regex "/^{filename_camelCase}$/"
export const getFullName = ({
    name,
    surname,
    email,
}: TransformUserDataProps): transform_user_data_return => ({
    fullName: `${name} ${surname}`,
    email,
});
```

```ts
// File ComponentName.tsx

import { FC } from "react";

// Satisfies regex "/^{filename_PascalCase}Props$/"
export interface ComponentNameProps {
    title: string;
}

// Satisfies regex "/^{filename_PascalCase}$/"
export const ComponentName: FC<ComponentNameProps> = ({ title }) => (
    <h1>{title}</h1>
);
```

```ts
// File Foo.js

// Satisfies regex "/^{SNAKE_CASE}$/"
export const IMPORTANT_VARIABLE_1 = "";

// Satisfies regex "/^{snake_case}$/"
export const important_variable_2 = "";

// Satisfies regex "/^{camelCase}$/"
export const importantVariable3 = "";

// Satisfies regex "/^[A-Z]/"
export const Importantvariable4 = "";
```

## API:

### **`"filePattern"`**: `<string | string[]>` <a id="file-pattern"></a>

Here you define which files should meet the rules. You can use all **[micromatch.isMatch](https://github.com/micromatch/micromatch?tab=readme-ov-file#ismatch)** functionalities.

```jsonc
{
    "filePattern": ["**/*.ts", "!**/index.ts"], // Export name rules for all .ts files except index.ts
}
```

### **`"filenamePartsToRemove"`**: `<string[] | undefined>` <a id="filename-parts-to-remove"></a>

Useful if you use prefixes in your filenames and don't want them to be part of the export name.

```jsonc
{
    "filenamePartsToRemove": [".react"], // ComponentName.react.tsx => ComponentName.tsx
}
```

### **`"allowExportNames"`**: `<string[] | undefined>` <a id="allow-export-names"></a>

If the export name matches at least one regex, it will be considered valid.

> [!NOTE]
> If you do not specify **`"allowExportNames"`**, the default values ​​are **[{camelCase}](#camel-case)** and **[{PascalCase}](#pascal-case)**.

```jsonc
{
    "allowExportNames": [
        "/^{filename_camelCase}$/",
        "/^{filename_PascalCase}$/",
    ],
}
```

#### References

**`{filename_camelCase}`**<br>
Take the name of the file you are currently in and change it to **`camelCase`**.

```jsonc
{
    "allowExportNames": ["/^{filename_camelCase}$/"],
}
```

**`{filename_PascalCase}`**<br>
Take the name of the file you are currently in and change it to **`PascalCase`**.

```jsonc
{
    "allowExportNames": ["/^{filename_PascalCase}$/"],
}
```

**`{filename_snake_case}`**<br>
Take the name of the file you are currently in and change it to **`snake_case`**.

```jsonc
{
    "allowExportNames": ["/^{filename_snake_case}$/"],
}
```

**`{filename_SNAKE_CASE}`**<br>
Take the name of the file you are currently in and change it to **`SNAKE_CASE`**.

```jsonc
{
    "allowExportNames": ["/^{filename_SNAKE_CASE}$/"],
}
```

**`{camelCase}`**<a id="camel-case"></a><br>
Add **`camelCase`** validation to your regex.<br>
The added regex is **`[a-z][a-z0-9]*(([A-Z][a-z0-9]+)*[A-Z]?|([a-z0-9]+[A-Z])*|[A-Z])`**.

```jsonc
{
    "allowExportNames": ["/^{camelCase}$/"],
}
```

**`{PascalCase}`**<a id="pascal-case"></a><br>
Add **`PascalCase`** validation to your regex.<br>
The added regex is **`[A-Z](([a-z0-9]+[A-Z]?)*)`**.

```jsonc
{
    "allowExportNames": ["/^{PascalCase}$/"],
}
```

**`{snake_case}`**<br>
Add **`snake_case`** validation to your regex.<br>
The added regex is **`((([a-z]|\d)+_)*([a-z]|\d)+)`**.

```jsonc
{
    "allowExportNames": ["/^{snake_case}$/"],
}
```

**`{SNAKE_CASE}`**<br>
Add **`SNAKE_CASE`** validation to your regex.<br>
The added regex is **`((([A-Z]|\d)+_)*([A-Z]|\d)+)`**.

```jsonc
{
    "allowExportNames": ["/^{SNAKE_CASE}$/"],
}
```
