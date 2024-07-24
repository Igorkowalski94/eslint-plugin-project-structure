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

From: ${{parentName}}

```jsonc
{
    "name": "/^${{parentName}}$/",
}
```

To: {parentName}

```jsonc
{
    "name": "/^{parentName}$/",
}
```

### New rules:

#### [**Playground**](https://github.com/Igorkowalski94/eslint-plugin-project-structure-playground) for eslint-plugin-project-structure rules.

## **[project-structure-independent-modules](https://github.com/Igorkowalski94/eslint-plugin-project-structure/blob/main/documentation/project-structure-independent-modules.md)**

Create independent modules to keep your repository scalable and easy to maintain.<br>
Get rid of dependencies between modules and create truly independent functionalities.

### Features

✅ Creating independent modules in which you control what can be imported.<br>
✅ Disabling external imports (node_modules) for a given module. <br>
✅ Reference {dirname} which allows you to decide about the current directory and its level in the pattern.<br>
✅ Reference {family} which finds the common part between a given import and the current file.<br>
✅ Non-relative/relative imports support. <br>
✅ Support for imports without extension. <br>
✅ Reusable import patterns. <br>

## **[project-structure-export-rules](https://github.com/Igorkowalski94/eslint-plugin-project-structure/blob/main/documentation/project-structure-export-rules.md)**

Enforce rules on export.

### Features

✅ Export name validation. <br>
✅ Inheriting the file name as the export name (Option of adding your own prefixes/suffixes or changing the case).<br>
✅ Deleting parts of a file name. <br>
✅ Regex validation<br>
✅ Build in case validation.<br>
✅ Different export name rules for different files.<br>
✅ Support for all export types. Name export or default export for Classes, types, interfaces, variables, functions etc.<br>
