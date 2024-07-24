# project-structure/naming-rules

Enforce naming rules.

### Features

✅ Naming validation. <br>
✅ Support for all name types. Classes, types, interfaces, enums, variables, functions etc.<br>
✅ Inheriting the file name as the name (Option of adding your own prefixes/suffixes or changing the case).<br>
✅ Deleting parts of a file name. <br>
✅ Regex validation<br>
✅ Build in case validation.<br>
✅ Different name rules for different files.<br>

#### [**Playground**](https://github.com/Igorkowalski94/eslint-plugin-project-structure-playground) for eslint-plugin-project-structure rules.

### Go to:

-   [Installation](#installation)
-   [Getting started](#getting-started)
-   [Example](#example)
-   [API](#api)
    -   [filePattern](#file-pattern)
    -   [nameType](#nameType)
    -   [filenamePartsToRemove](#filename-parts-to-remove)
    -   [allowNames](#allow-names)
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
        "project-structure/naming-rules": "error", // warn | error
    },
    "settings": {
        "project-structure/naming-rules-root": "libs", // Optional, only if your root is other than "src".
    },
}
```

#### Example:

```jsonc
{
    "project-structure/naming-rules": [
        "error",
        {
            "filePattern": ["**/*.ts", "!**/index.ts"], // Name rules for all .ts files except index.ts
            "nameType": "VariableDeclarator",
            "allowNames": [
                "/^{filename_camelCase}$/", // Take the filename and convert it to camelCase.
                "/^{filename_PascalCase}Props$/", // Take the filename and convert it to PascalCase and add the 'Props' prefix.
                "/^{filename_snake_case}_return$/", // Take the filename and convert it to snake_case and add the '_return' prefix.
            ],
        },
        {
            "filePattern": "**/*.tsx", // // Name rules for all .tsx files.
            "nameType": ["ArrowFunctionExpression", "FunctionDeclaration"],
            "filenamePartsToRemove": [".react"], // Removing parts of a file name (ComponentName.react.tsx => ComponentName.tsx).
            "allowNames": [
                "/^{filename_PascalCase}$/", // Take the filename and convert it to PascalCase.
                "/^{filename_PascalCase}Props$/", // Take the filename and convert it to PascalCase and add the 'Props' prefix.
            ],
        },
        {
            "filePattern": "**/*.js", // Name rules for all .js files.
            "nameType": "VariableDeclarator",
            "allowNames": [
                // Allow snake_case, camelCase, SNAKE_CASE, and the first capital letter in name.
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
interface TransformUserDataProps {
    name: number;
    surname: number;
    email: string;
}

// Satisfies regex "/^{filename_snake_case}_return$/"
interface transform_user_data_return {
    fullName: string;
    email: string;
}

// Satisfies regex "/^{filename_camelCase}$/"
const getFullName = ({
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
 interface ComponentNameProps {
    title: string;
}

// Satisfies regex "/^{filename_PascalCase}$/"
 const ComponentName: FC<ComponentNameProps> = ({ title }) => (
    <h1>{title}</h1>
);
```

```ts
// File Foo.js

// Satisfies regex "/^{SNAKE_CASE}$/"
const IMPORTANT_VARIABLE_1 = "";

// Satisfies regex "/^{snake_case}$/"
const important_variable_2 = "";

// Satisfies regex "/^{camelCase}$/"
const importantVariable3 = "";

// Satisfies regex "/^[A-Z]/"
const Importantvariable4 = "";
```

## API:

### **`"filePattern"`**: `<string | string[]>` <a id="file-pattern"></a>

Here you define which files should meet the rules. You can use all **[micromatch.every](https://github.com/micromatch/micromatch?tab=readme-ov-file#every)** functionalities.

```jsonc
{
    "filePattern": ["**/*.ts", "!**/index.ts"], // Name rules for all .ts files except index.ts
}
```

### **`"type"`**: `<NameType | NameType[]>` <a id="name-type"></a>

here you define the name type you are interested in.

```jsonc
{
    "type": "VariableDeclarator"
},

```

```jsonc
{
    "type": [
        "ClassDeclaration",
        "VariableDeclarator",
        "FunctionDeclaration",
        "ArrowFunctionExpression",
        "TSTypeAliasDeclaration",
        "TSInterfaceDeclaration",
        "TSEnumDeclaration",
    ],
}
```

### **`"filenamePartsToRemove"`**: `<string[] | undefined>` <a id="filename-parts-to-remove"></a>

Useful if you use prefixes in your filenames and don't want them to be part of the export name.

```jsonc
{
    "filenamePartsToRemove": [".react"], // ComponentName.react.tsx => ComponentName.tsx
}
```

### **`"allowNames"`**: `<string[] | undefined>` <a id="allow-export-names"></a>

If the export name matches at least one regex, it will be considered valid.

> [!NOTE]
> If you do not specify **`"allowNames"`**, the default values ​​are **[{camelCase}](#camel-case)** and **[{PascalCase}](#pascal-case)**.

> [!NOTE]
> Rules with filename will not be taken into account for nested variables, functions, etc.

```jsonc
{
    "allowNames": ["/^{filename_camelCase}$/", "/^{filename_PascalCase}$/"],
}
```

#### References

**`{filename_camelCase}`**<br>
Take the name of the file you are currently in and change it to **`camelCase`**.

> [!NOTE]
> Rules with filename will not be taken into account for nested variables, functions, etc.

```jsonc
{
    "allowNames": ["/^{filename_camelCase}$/"],
}
```

**`{filename_PascalCase}`**<br>
Take the name of the file you are currently in and change it to **`PascalCase`**.

> [!NOTE]
> Rules with filename will not be taken into account for nested variables, functions, etc.

```jsonc
{
    "allowNames": ["/^{filename_PascalCase}$/"],
}
```

**`{filename_snake_case}`**<br>
Take the name of the file you are currently in and change it to **`snake_case`**.

> [!NOTE]
> Rules with filename will not be taken into account for nested variables, functions, etc.

```jsonc
{
    "allowNames": ["/^{filename_snake_case}$/"],
}
```

**`{filename_SNAKE_CASE}`**<br>
Take the name of the file you are currently in and change it to **`SNAKE_CASE`**.

> [!NOTE]
> Rules with filename will not be taken into account for nested variables, functions, etc.

```jsonc
{
    "allowNames": ["/^{filename_SNAKE_CASE}$/"],
}
```

**`{camelCase}`**<a id="camel-case"></a><br>
Add **`camelCase`** validation to your regex.<br>
The added regex is **`[a-z][a-z0-9]*(([A-Z][a-z0-9]+)*[A-Z]?|([a-z0-9]+[A-Z])*|[A-Z])`**.

```jsonc
{
    "allowNames": ["/^{camelCase}$/"],
}
```

**`{PascalCase}`**<a id="pascal-case"></a><br>
Add **`PascalCase`** validation to your regex.<br>
The added regex is **`[A-Z](([a-z0-9]+[A-Z]?)*)`**.

```jsonc
{
    "allowNames": ["/^{PascalCase}$/"],
}
```

**`{snake_case}`**<br>
Add **`snake_case`** validation to your regex.<br>
The added regex is **`((([a-z]|\d)+_)*([a-z]|\d)+)`**.

```jsonc
{
    "allowNames": ["/^{snake_case}$/"],
}
```

**`{SNAKE_CASE}`**<br>
Add **`SNAKE_CASE`** validation to your regex.<br>
The added regex is **`((([A-Z]|\d)+_)*([A-Z]|\d)+)`**.

```jsonc
{
    "allowNames": ["/^{SNAKE_CASE}$/"],
}
```
