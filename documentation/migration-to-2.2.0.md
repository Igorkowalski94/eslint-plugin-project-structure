# Migration guide to 2.2.0

Version 2.2.0 introduces two new rules and minor configuration improvements.

A minor configuration fix will be required for version <= 1.4.7.

## General changes

- A shorter notation option for [structure](https://github.com/Igorkowalski94/eslint-plugin-project-structure/blob/main/documentation/project-structure-folder-structure.md#structure).
- New build-in {SNAKE_CASE} regexParameter.
- Improvements for {PascalCase} and {camelCase} regexParameters.
- The entire documentation has been rewritten for ESLint's new config system. Examples with the old ESLint configuration can be found in the [playground](https://github.com/Igorkowalski94/eslint-plugin-project-structure-playground) for eslint-plugin-project-structure rules.
- New option for creating a configuration file in an .mjs file with TypeScript support.
- [Enforcing the existence](https://github.com/Igorkowalski94/eslint-plugin-project-structure/blob/main/documentation/project-structure-folder-structure.md#enforce-existence) of a files/folders when a specific file/folder exists. For example, if `src/Component.tsx` exists, then `src/Component.test.tsx` and `src/stories/Component.stories.tsx` must also exist.
- You can now use comments in folderStructure.json, independentModules.json and namingRules.json files.
- Improved error messages for folder-structure.
- Easier configuration of folder-structure. The "extension" key has been removed, now the file extension will be part of the "name". You don't need to add /^$/ to your regex, they will be added automatically and other improvements.

## Changes for the file .eslintrc

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

## Changes for the projectStructure.json => folderStructure.json

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

## Changes for the regexParameters and name.

The name is treated as a `regex`.

The following improvements are automatically added to the regex:

- The name is wrapped in `^$`.
- All `.` characters (any character except newline) will be converted to `\\.` (dot as a character).
  If you want original behavior, use the following notation `..`.
- All `*` characters will be converted to `(([^/]*)+)` (wildcard).
  If you want original behavior, use the following notation `**`.

From: ${{key}}

```jsonc
{ "name": "/^${{parentName}}$/" }
```

To: {key}

```jsonc
{ "name": "{parentName}" }
```

## Changes for build-in PascalCase

Allowed before: Component, ComponentName, ComponentName1, ComponenTTName, COMPONENTNAME.<br>
Allowed now: Component, ComponentName, ComponentName1<br>

From: `((([A-Z]|\d){1}([a-z]|\d)*)*([A-Z]|\d){1}([a-z]|\d)*)`<br>
To: `[A-Z](([a-z0-9]+[A-Z]?)*)`<br>

## Changes for build-in camelCase

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

## New build-in SNAKE_CASE

`{SNAKE_CASE}`<br>
Add `SNAKE_CASE` validation to your regex.<br>
The added regex is `((([A-Z]|\d)+_)*([A-Z]|\d)+)`.

```jsonc
{ "name": "{SNAKE_CASE}" }
```

## New rules

🕹️[Playground](https://github.com/Igorkowalski94/eslint-plugin-project-structure-playground) for eslint-plugin-project-structure rules.

<h2 align="center"><a href="https://github.com/Igorkowalski94/eslint-plugin-project-structure/blob/main/documentation/project-structure-independent-modules.md"> project-structure-independent-modules</a></h2>
<p align="center">A key principle of a healthy project is to prevent the creation of a massive dependency tree,
where removing or editing one feature triggers a chain reaction that impacts the entire project.</p>
<p align="center">Create independent modules to keep your project scalable and easy to maintain. Get rid of dependencies between modules and create truly independent functionalities.</p>

#### 🚀 Features:

- Creating independent modules in which you control what can be imported (e.g. types, functions, components of one functionality cannot be imported into another functionality).
- Disabling external imports (node_modules) for a given module (Option to add exceptions).
- Non-relative/relative imports support.
- Support for imports without extension.
- Reusable import patterns.
- Support for path aliases. The plugin will automatically detect your tsconfig.json and use your settings. There is also an option to enter them manually.
- An option to create a separate configuration file with TypeScript support.

<h2 align="center"><a href="https://github.com/Igorkowalski94/eslint-plugin-project-structure/blob/main/documentation/project-structure-naming-rules.md"> project-structure-naming-rules</a></h2>
<p align="center">Enforce complex naming rules and prohibit the use of given selectors in a given file.</p>
<p align="center">Have full control over what your file can contain and the naming conventions it must follow.</p>

#### 🚀 Features:

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
