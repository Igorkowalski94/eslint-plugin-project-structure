# project-structure/folder-structure

Enforce rules on folder structure to keep your project consistent, orderly and well thought out.

#### Features:

✅ Validation of folder structure (Any files/folders outside the structure will be considered an error).<br>
✅ File/Folders name regex validation.<br>
✅ Build in case validation.<br>
✅ Inheriting the parent's name (The child inherits the name of the folder in which it is located).<br>
✅ Folder recursion (You can nest a given folder structure recursively).<br>
✅ Accurate and detailed error messages even with multiple nested folders (recursion).<br>
✅ Forcing a nested/flat structure for a given folder.
✅ Support for all file extensions.<br>

[**Playground**](https://github.com/Igorkowalski94/eslint-plugin-project-structure-playground) for eslint-plugin-project-structure rules.

Become part of the community!<br>
Leave a ⭐ and share the link with your friends.<br>
If you have any questions **[click here](https://github.com/Igorkowalski94/eslint-plugin-project-structure/discussions)**, issues / an idea for a new functionality **[click here](https://github.com/Igorkowalski94/eslint-plugin-project-structure/issues/new/choose)**.

### Documentation:

-   **[Migration guide to 2.1.0.](https://github.com/Igorkowalski94/eslint-plugin-project-structure/blob/main/documentation/migration-to-2.1.0.md)**
-   **[project-structure-independent-modules](https://github.com/Igorkowalski94/eslint-plugin-project-structure/blob/main/documentation/project-structure-independent-modules.md)**
-   **[project-structure-naming-rules](https://github.com/Igorkowalski94/eslint-plugin-project-structure/blob/main/documentation/project-structure-naming-rules.md)**

### Go to:

-   [Installation](#installation)
-   [Getting started](#getting-started)
-   [Simple example](#simple-example-for-the-structure-below)
-   [Advanced example](#advanced-example-for-the-structure-below-containing-all-key-features)
-   [API](#api)
    -   [$schema](#schema)
    -   [ignorePatterns](#ignore-patterns)
    -   [name](#name)
        -   [Fixed name](#fixed-name)
        -   [Regex](#regex)
    -   [regexParameters](#regex-parameters)
        -   [Built-in regex parameters](#built-in-regex-parameters)
        -   [Regex parameters mix example](#regex-parameters-mix-example)
    -   [children](#children)
    -   [structure](#structure)
    -   [rules](#rules)
    -   [ruleId](#ruleid)
-   [Folder recursion](#folder-recursion)

## Installation

```bsh
yarn add -D eslint-plugin-project-structure
```

```bsh
npm i --dev eslint-plugin-project-structure
```

## Getting started

### Step 1 (optional)

If you want to check extensions that are not supported by **`eslint`** like **`.css`**, **`.sass`**, **`.less`**, **`.svg`**, **`.png`**, **`.jpg`**, **`.ico`**, **`.yml`**, **`.json`** etc., read the step below, if not go to the **[next step](#step-2)**.<br>

Add the following lines to **`.eslintrc`**.

> [!CAUTION]
> Remember to remove comments from the **`.eslintrc`**. file. Otherwise the configuration will be incorrect.<br>
> You can freely use comments inside **`folderStructure`** file.

```jsonc
 {
    "parserOptions": {
        "project": "./tsconfig.json",
    },
    // Plugins rules that work with all parsers.
    "extends": ["plugin:@typescript-eslint/recommended"],
    // Rules that work with all parsers.
    "rules": [],
    "overrides": [
        // Use eslint-plugin-project-structure parser for the following file extensions. You can extend the list of extensions.
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
            "rules":{
                // Here you can disable rules that are not to be executed on additional file extensions or rules that require a different parser.

                // "no-irregular-whitespace": "off",
            },
            "parser": "./node_modules/eslint-plugin-project-structure/dist/parser.js",
        },
         // Use @typescript-eslint/parser for the following file extensions.
        {
            "files": ["*.ts", "*.tsx", "*.js", "*.jsx"],
            "parser": "@typescript-eslint/parser",
            "extends": [
                // If multiple rules from a given plugin require @typescript-eslint/parser,
                // you can extend the entire plugin here instead of disabling individual rules in the eslint-plugin-project-structure parser.

                // "plugin:@typescript-eslint/recommended-requiring-type-checking",
            ],
            "rules": {
                // Here you can add rules that require @typescript-eslint/parser.
                // Then you don't have to disable them for the eslint-plugin-project-structure parser.
            }
        },
    ],
};
```

### Step 2

Add the following lines to **`.eslintrc`**.

> [!CAUTION]
> Remember to remove comments from the **`.eslintrc`**. file. Otherwise the configuration will be incorrect.<br>
> You can freely use comments inside **`folderStructure`** file.

```jsonc
{
    "plugins": ["project-structure"],
    "rules": {
        "project-structure/folder-structure": "error", // warn | error
    },
    "settings": {
        "project-structure/folder-structure-config-path": "folderStructure.json", // json | yaml
    },
}
```

### Step 3

Create a **`folderStructure.json`** or **`folderStructure.yaml`** in the root of your project.<br>

#### Simple example for the structure below:

```
.
├── ...
├── 📄 folderStructure.json
├── 📄 .eslintrc.json
└── 📂 src
    ├── 📄 index.tsx
    └── 📂 components
        ├── ...
        └── 📄 ComponentName.tsx
```

#### folderStructure.json

```jsonc
{
    "structure": {
        "children": [
            {
                // Allow any files in the root of your project, like package.json, .eslintrc, etc. You can add rules for them separately.
                // You can also add exceptions like this: "(?!folderStructure)*"
                "name": "*",
            },
            {
                "name": "src",
                "children": [
                    {
                        "name": "index.tsx",
                    },
                    {
                        "name": "components",
                        "children": [
                            {
                                "name": "{PascalCase}.tsx",
                            },
                        ],
                    },
                ],
            },
        ],
    },
}
```

#### folderStructure.yaml

```yaml
structure:
    children:
        - name: "*"
        - name: src
          children:
              - name: index.tsx
              - name: components
                children:
                    - name: "{PascalCase}.tsx"
```

#### Advanced example for the structure below, containing all key features:

```
.
├── ...
├── 📄 folderStructure.json
├── 📄 .eslintrc.json
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

#### folderStructure.json

```jsonc
{
    "$schema": "node_modules/eslint-plugin-project-structure/folderStructure.schema.json",
    "ignorePatterns": ["src/legacy/**"],
    "structure": {
        "children": [
            {
                // Allow any files in the root of your project, like package.json, .eslintrc, etc. You can add rules for them separately.
                // You can also add exceptions like this: "(?!folderStructure)*"
                "name": "*",
            },
            {
                "name": "src",
                "children": [
                    {
                        "ruleId": "hooks_folder",
                    },
                    {
                        "ruleId": "components_folder",
                    },
                ],
            },
        ],
    },
    "rules": {
        "hooks_folder": {
            "name": "hooks",
            "children": [
                {
                    "name": "use{PascalCase}",
                    "children": [
                        {
                            "ruleId": "hooks_folder",
                        },
                        {
                            "name": "{parentName}(.(test|api|types))?.ts",
                        },
                    ],
                },
                {
                    "name": "use{PascalCase}(.test)?.ts",
                },
            ],
        },
        "components_folder": {
            "name": "components",
            "children": [
                {
                    "ruleId": "component_folder",
                },
            ],
        },
        "component_folder": {
            "name": "{PascalCase}",
            "children": [
                {
                    "ruleId": "components_folder",
                },
                {
                    "ruleId": "hooks_folder",
                },
                {
                    "name": "{parentName}{yourCustomRegexParameter}.ts",
                },
                {
                    "name": "{ParentName}(.test)?.tsx",
                },
            ],
        },
    },
    "regexParameters": {
        "yourCustomRegexParameter": ".(types|api)",
    },
}
```

#### folderStructure.yaml

```yaml
ignorePatterns:
    - src/legacy/**
structure:
    children:
        - name: "*"
        - name: src
          children:
              - ruleId: hooks_folder
              - ruleId: components_folder
rules:
    components_folder:
        name: components
        children:
            - ruleId: component_folder
    hooks_folder:
        name: hooks
        children:
            - name: "use{PascalCase}"
              children:
                  - ruleId: hooks_folder
                  - name: "{parentName}(.(test|api|types))?.ts"
            - name: "use{PascalCase}(.test)?.ts"
    component_folder:
        name: "{PascalCase}"
        children:
            - ruleId: components_folder
            - ruleId: hooks_folder
            - name: "{parentName}{yourCustomRegexParameter}.ts"
            - name: "{ParentName}(.(context|test))?.tsx"
regexParameters:
    yourCustomRegexParameter: ".(types|api)"
```

## API:

### **`"$schema"`**: `<string | undefined>` <a id="schema"></a>

Type checking for your **`folderStructure.json`**. It helps to fill configuration correctly.

```jsonc
{
    "$schema": "node_modules/eslint-plugin-project-structure/folderStructure.schema.json",
    // ...
}
```

### **`"ignorePatterns"`**: `<string[] | undefined>` <a id="ignore-patterns"></a>

Here you can set the paths you want to ignore. You can use all **[micromatch.some](https://github.com/micromatch/micromatch?tab=readme-ov-file#some)** functionalities.

```jsonc
{
    "ignorePatterns": ["src/legacy/**"],
    // ...
}
```

### **`"name"`**: `<string | undefined>` <a id="name"></a>

The name is treated as a `regex`.

The following improvements are automatically added to the regex:

-   The name is wrapped in `^$`.
-   All `.` characters (any character except newline) will be converted to `\\.` (dot as a character).
    If you want original behavior, use the following notation `..`.
-   All `*` characters will be converted to `(([^/]*)+)` (wildcard).
    If you want original behavior, use the following notation `**`.

When used with **[children](#children)** this will be the name of **`folder`**.<br>
When used without **[children](#children)** this will be the name of **`file`**.<br>

> [!NOTE]
> If you only care about the name of the **`folder`** without rules for its **[children](#children)**, leave the **[children](#children)** as **`[]`**.

```jsonc
{
    "name": "fileName.*",
}
```

```jsonc
{
    "name": "folderName",
    "children": [],
}
```

### **`"regexParameters"`**: `<Record<string, string> | undefined>` <a id="regex-parameters"></a>

A place where you can add your own regex parameters.<br>
You can use **[built-in regex parameters](#built-in-regex-parameters)**. You can overwrite them with your logic, exceptions are **[parentName](#parent-name-lower)** and **[ParentName](#parent-name-upper)** overwriting them will be ignored.<br>
You can freely mix regex parameters together see **[example](#regex-parameters-mix-example)**.

```jsonc
{
    "regexParameters": {
        "yourCustomRegexParameter": "(Regex logic)",
        "camelCase": "(Regex logic)", // Override built-in camelCase.
        "parentName": "(Regex logic)", // Overwriting will be ignored.
        "ParentName": "(Regex logic)", // Overwriting will be ignored.
        // ...
    },
    // ...
}
```

Then you can use them in **[name](#name)** with the following notation **`{yourCustomRegexParameter}`**.

```jsonc
{
    "name": "{yourCustomRegexParameter}",
    // ...
}
```

#### Built-in regex parameters

**`{parentName}`**<a id="parent-name-lower"></a><br>
The child inherits the name of the **`folder`** in which it is located and sets its **first letter** to **`lowercase`**.

```jsonc
{
    "name": "{parentName}",
}
```

**`{ParentName}`**<a id="parent-name-upper"></a><br>
The child inherits the name of the **`folder`** in which it is located and sets its **first letter** to **`uppercase`**.

```jsonc
{
    "name": "{ParentName}",
}
```

**`{PascalCase}`**<br>
Add **`PascalCase`** validation to your regex.<br>
The added regex is **`[A-Z](([a-z0-9]+[A-Z]?)*)`**.

```jsonc
{
    "name": "{PascalCase}",
}
```

**`{camelCase}`**<br>
Add **`camelCase`** validation to your regex.<br>
The added regex is **`[a-z][a-z0-9]*(([A-Z][a-z0-9]+)*[A-Z]?|([a-z0-9]+[A-Z])*|[A-Z])`**.

```jsonc
{
    "name": "{camelCase}",
}
```

**`{snake_case}`**<br>
Add **`snake_case`** validation to your regex.<br>
The added regex is **`((([a-z]|\d)+_)*([a-z]|\d)+)`**.

```jsonc
{
    "name": "{snake_case}",
}
```

**`{SNAKE_CASE}`**<br>
Add **`SNAKE_CASE`** validation to your regex.<br>
The added regex is **`((([A-Z]|\d)+_)*([A-Z]|\d)+)`**.

```jsonc
{
    "name": "{SNAKE_CASE}",
}
```

**`{kebab-case}`**<br>
Add **`kebab-case`** validation to your regex.<br>
The added regex is **`((([a-z]|\d)+-)*([a-z]|\d)+)`**.

```jsonc
{
    "name": "{kebab-case}",
}
```

#### Regex parameters mix example <a id="regex-parameters-mix-example"></a>

Here are some examples of how easy it is to combine **[regex parameters](#regex-parameters)**.

```jsonc
{
    // useNiceHook.ts
    // useNiceHook.api.ts
    // useNiceHook.test.ts
    "name": "use{PascalCase}(.(test|api))?.ts",
}
```

```jsonc
{
    // YourParentName.hello_world.ts
    // YourParentName.hello_world.test.ts
    // YourParentName.hello_world.api.ts
    "name": "{ParentName}.{snake_case}(.(test|api))?.ts",
}
```

### **`"children"`**: `<Rule[] | undefined>` <a id="children"></a>

**`Folder`** children rules.<br>

```jsonc
{
    "children": [
        {
            "name": "Child",
            // ...
        },
        // ...
    ],
    // ...
}
```

### **`"structure"`**: `<Rule>` <a id="structure"></a>

The structure of your project and its rules.

```
.
├── 📂 libs
├── 📂 src
├── 📂 yourCoolFolderName
└── 📄 ...
```

```jsonc
{
    "structure": {
        "children": [
            {
                "name": "libs",
                "children": [
                    // ...
                ],
            },
            {
                "name": "src",
                "children": [
                    // ...
                ],
            },
            {
                "name": "yourCoolFolderName",
                "children": [
                    // ...
                ],
            },
            {
                // Allow any files in the root of your project, like package.json, .eslintrc, etc. You can add rules for them separately.
                // You can also add exceptions like this: "(?!folderStructure)*"
                "name": "*",
            },
            // ...
        ],
    },
    // ...
}
```

> [!WARNING]
> Make sure your **`tsconfig`**/**`.eslintrc`** contains all the **`files`**/**`folders`** you want to validate. Otherwise **`eslint`** will not take them into account.

### **`"rules"`**: `<Record<string, Rule> | undefined>` <a id="rules"></a>

A place where you can add your custom rules. This is useful when you want to avoid a lot of repetition in your **[structure](#structure)** or use **[folder recursion](#folder-recursion)** feature.<br>
The key in the object will correspond to **[ruleId](#ruleid)**, which you can then use in many places.

```jsonc
{
    "rules": {
        "yourCustomRule": {
            "name": "ComponentName",
            "children": [
                // ...
            ],
        },
        // ...
    },
    // ...
}
```

### **`"ruleId"`**: `<string | undefined>` <a id="ruleid"></a>

A reference to your custom rule.

```jsonc
{
    "ruleId": "yourCustomRule",
    // ...
}
```

You can use it with other keys like **[name](#name)** and **[children](#children)** but remember that they will **override** the keys from your custom rule.<br>
This is useful if you want to get rid of a lot of repetition in your structure, for example, **`folders`** have different **[name](#name)**, but the same **[children](#children)**.

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
    "structure": {
        "children": [
            {
                "name": "src",
                "children": [
                    {
                        "name": "folder1",
                        "children": [
                            {
                                "name": "{PascalCase}",
                                "ruleId": "shared_children",
                            },
                        ],
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
            // ...
        ],
    },
    "rules": {
        "shared_children": {
            "children": [
                {
                    "name": "{PascalCase}.tsx",
                },
                {
                    "name": "{camelCase}.ts",
                },
            ],
        },
        // ...
    },
    // ...
}
```

## Folder recursion

You can easily create recursions when you refer to the same **[ruleId](#ruleid)** that your rule has.<br><br>
Suppose your **`folder`** is named **`ComponentFolder`** which satisfies the rule **`{PascalCase}`** and your next **`folder`** will be
**`NextComponentFolder`** which also satisfies the rule **`{PascalCase}`**. In this case, the recursion will look like this:

```
.
├── ...
└── 📂 src
    └── 📂 ComponentFolder
        ├── ...
        └── 📂 components
            ├── ...
            └── 📁 NextComponentFolder
                ├── ...
                └── 📂 components
                    └── ... (recursion)
```

```jsonc
{
    "structure": {
        "children": [
            {
                "name": "src",
                "children": [
                    {
                        "ruleId": "yourCustomRule",
                    },
                ],
            },
            // ...
        ],
    },
    "rules": {
        "yourCustomRule": {
            "name": "{PascalCase}",
            "children": [
                {
                    "name": "components",
                    "children": [
                        {
                            "ruleId": "yourCustomRule",
                        },
                        // ...
                    ],
                },
                // ...
            ],
        },
        // ...
    },
    // ...
}
```
