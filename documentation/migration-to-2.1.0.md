# Migration guide to 2.1.0

Version 2.1.0 introduces two new rules and minor configuration improvements.

A minor configuration fix will be required for version <= 1.4.7.

### General changes:

-   The entire documentation has been rewritten for ESLint's new config system. Examples with the old ESLint configuration can be found in the [**playground**](https://github.com/Igorkowalski94/eslint-plugin-project-structure-playground) for eslint-plugin-project-structure rules.
-   New option for creating a configuration file in an .mjs file with TypeScript support.
-   You can now use comments in folderStructure.json and independentModules.json files.
-   Improved error messages for folder-structure.
-   Easier configuration of folder-structure. The "extension" key has been removed, now the file extension will be part of the "name". You don't need to add /^$/ to your regex, they will be added automatically and other improvements.

### Changes for the file .eslintrc

From:

```jsonc
{
    "rules": {
        "project-structure/file-structure": "error", // warn | error
    },
    "settings": {
        "project-structure/config-path": "projectStructure.json", // json | yaml
    },
}
```

To:

```jsonc
{
    "rules": {
        "project-structure/folder-structure": "error", // warn | error
    },
    "settings": {
        "project-structure/folder-structure-config-path": "folderStructure.json", // json | yaml
    },
}
```

If you used additional file extensions:

From:

```jsonc
{
    "overrides": [
        {
            "files": [
                "*.css",
                "*.sass",
                "*.less",
                "*.svg",
                "*.png",
                "*.jpg",
                "*.ico",
                "*.yml",
                "*.json",
            ],
            "parser": "./node_modules/eslint-plugin-project-structure/dist/parser.js",
        },
    ],
}
```

To:

```jsonc
{
    "overrides": [
        {
            "files": [
                "*.css",
                "*.sass",
                "*.less",
                "*.svg",
                "*.png",
                "*.jpg",
                "*.ico",
                "*.yml",
                "*.json",
            ],
            "parser": "eslint-plugin-project-structure/parser",
        },
    ],
}
```

### Changes for the projectStructure.json => folderStructure.json

From:

```jsonc
{
    "$schema": "node_modules/eslint-plugin-project-structure/projectStructure.schema.json",
}
```

To:

```jsonc
{
    "$schema": "node_modules/eslint-plugin-project-structure/folderStructure.schema.json",
}
```

### Changes for the regexParameters and name.

The name is treated as a `regex`.

The following improvements are automatically added to the regex:

-   The name is wrapped in `^$`.
-   All `.` characters (any character except newline) will be converted to `\\.` (dot as a character).
    If you want original behavior, use the following notation `..`.
-   All `*` characters will be converted to `(([^/]*)+)` (wildcard).
    If you want original behavior, use the following notation `**`.

From: ${{key}}

```jsonc
{
    "name": "/^${{parentName}}$/",
}
```

To: {key}

```jsonc
{
    "name": "{parentName}",
}
```

### Changes for build-in PascalCase

Allowed before: Component, ComponentName, ComponentName1, ComponenTTName, COMPONENTNAME.<br>
Allowed now: Component, ComponentName, ComponentName1<br>

From: `((([A-Z]|\d){1}([a-z]|\d)*)*([A-Z]|\d){1}([a-z]|\d)*)`<br>
To: `[A-Z](([a-z0-9]+[A-Z]?)*)`<br>

### Changes for build-in camelCase

Allowed before: component, componentName, componentName1, componenTTName, cOMPONENTNAME.<br>
Allowed now: component, componentName, componentName1.<br>

From: `(([a-z]|\d)+(([A-Z]|\d){1}([a-z]|\d)*)*)`<br>
To: `[a-z][a-z0-9]*(([A-Z][a-z0-9]+)*[A-Z]?|([a-z0-9]+[A-Z])*|[A-Z])`<br>

You can go back to the old settings via [regexParameters](https://github.com/Igorkowalski94/eslint-plugin-project-structure/blob/main/documentation/project-structure-folder-structure.md#regex-parameters).

```jsonc
{
    "regexParameters": {
        "PascalCase": "((([A-Z]|\\d){1}([a-z]|\\d)*)*([A-Z]|\\d){1}([a-z]|\\d)*)",
        "camelCase": "(([a-z]|\\d)+(([A-Z]|\\d){1}([a-z]|\\d)*)*)",
    },
}
```

### New build-in SNAKE_CASE

**`{SNAKE_CASE}`**<br>
Add **`SNAKE_CASE`** validation to your regex.<br>
The added regex is **`((([A-Z]|\d)+_)*([A-Z]|\d)+)`**.

```jsonc
{
    "name": "{SNAKE_CASE}",
}
```

### New rules:

[**Playground**](https://github.com/Igorkowalski94/eslint-plugin-project-structure-playground) for eslint-plugin-project-structure rules.

## **[project-structure-independent-modules](https://github.com/Igorkowalski94/eslint-plugin-project-structure/blob/main/documentation/project-structure-independent-modules.md)**

A key principle of a healthy project is to prevent the creation of a massive dependency tree,<br>
where removing or editing one feature triggers a chain reaction that impacts the entire project.<br>
Create independent modules to keep your project scalable and easy to maintain.<br>
Get rid of dependencies between modules and create truly independent functionalities.<br>

#### Features:

✅ Creating independent modules in which you control what can be imported (e.g. types, functions, components of one functionality cannot be imported into another functionality).<br>
✅ Disabling external imports (node_modules) for a given module (Option to add exceptions). <br>
✅ Reference {dirname} which allows you to decide about the current directory and its level in the pattern.<br>
✅ Reference {family} which finds the common part between a given import and the current file.<br>
✅ Non-relative/relative imports support. <br>
✅ Support for imports without extension. <br>
✅ Reusable import patterns. <br>

## **[project-structure-naming-rules](https://github.com/Igorkowalski94/eslint-plugin-project-structure/blob/main/documentation/project-structure-naming-rules.md)**

Enforce complex naming rules.

#### Features:

✅ Naming validation. <br>
✅ Support for classes, types, interfaces, enums, variables, functions, arrow function.<br>
✅ Naming rules only for name types located in the root of the file (not nested).<br>
✅ Inheriting the file name as the name (Option of adding your own prefixes/suffixes or changing the case).<br>
✅ Deleting parts of a file name. <br>
✅ Different name rules for different files.<br>
✅ Regex validation<br>
✅ Build in case validation.<br>
