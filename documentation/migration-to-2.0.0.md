# Migration guide to 2.0.0

Version 2.0.0 introduces two new rules and minor configuration improvements.

A minor configuration fix will be required for version <= 1.4.7.

### Changes for the file .eslintrc

From:

```jsonc
{
    "rules": {
        "project-structure/file-structure": "error", // warn | error
    },
    "settings": {
        "project-structure/config-path": "projectStructure.json", // json | jsonc | yaml
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
        "project-structure/folder-structure-config-path": "folderStructure.json", // json | jsonc | yaml
    },
}
```

### Changes for the projectStructure.json

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

### Changes for the regexParameters

From: ${{key}}

```jsonc
{
    "name": "/^${{parentName}}$/",
}
```

To: {key}

```jsonc
{
    "name": "/^{parentName}$/",
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
    "name": "/^{SNAKE_CASE}$/",
}
```

### New rules:

#### [**Playground**](https://github.com/Igorkowalski94/eslint-plugin-project-structure-playground) for eslint-plugin-project-structure rules.

## **[project-structure-independent-modules](https://github.com/Igorkowalski94/eslint-plugin-project-structure/blob/main/documentation/project-structure-independent-modules.md)**

Create independent modules to keep your repository scalable and easy to maintain.<br>
Get rid of dependencies between modules and create truly independent functionalities.

### Features

✅ Creating independent modules in which you control what can be imported.<br>
✅ Disabling external imports (node_modules) for a given module (Option to add exceptions). <br>
✅ Reference {dirname} which allows you to decide about the current directory and its level in the pattern.<br>
✅ Reference {family} which finds the common part between a given import and the current file.<br>
✅ Non-relative/relative imports support. <br>
✅ Support for imports without extension. <br>
✅ Reusable import patterns. <br>

## **[project-structure-naming-rules](https://github.com/Igorkowalski94/eslint-plugin-project-structure/blob/main/documentation/project-structure-naming-rules.md)**

Enforce naming rules.

### Features

✅ Naming validation. <br>
✅ Support for classes, types, interfaces, enums, variables, functions, arrow function.<br>
✅ Inheriting the file name as the name (Option of adding your own prefixes/suffixes or changing the case).<br>
✅ Deleting parts of a file name. <br>
✅ Naming rules only for name types located in the root of the file (not nested).<br>
✅ Regex validation<br>
✅ Build in case validation.<br>
✅ Different name rules for different files.<br>
