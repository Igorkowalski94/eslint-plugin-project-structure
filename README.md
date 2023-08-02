# eslint-plugin-project-structure

<img width="100%" src="./images/mainImage.jpg"/>

Eslint plugin that allows you to enforce rules on project structure to keep your repository consistent even in large teams.

### Features

-   ✅ Validation of project structure
-   ✅ Validation of folder and file names
-   ✅ Name case validation
-   ✅ Name regex validation
-   ✅ File extension validation
-   ✅ Inheriting the parent's name (the child inherits the name of the folder in which it is located)
-   ✅ Folder recursion

### Go to:

-   [Installation](#installation)
-   [JSON example](#json-example-for-the-structure-below)
-   [YAML example](#yaml-example)
-   [API](#api)
    -   [$schema](#schema-string--undefined)
    -   [ignorePatterns](#ignorepatterns-string--undefined)
    -   [name](#name-name--string--undefined)
    -   [type](#type-file--folder--undefined)
    -   [extension](#extension-string--string--undefined)
    -   [children](#children-rule--undefined)
    -   [structure](#structure-rule)
    -   [rules](#rules-recordstring-rule--undefined)
    -   [ruleId](#ruleid-string--undefined)
-   [Folder recursion](#folder-recursion)

## Installation

```bsh
$ yarn add -D eslint-plugin-project-structure
```

or

```bsh
$ npm i --dev eslint-plugin-project-structure
```

## Getting started

Add the following lines to .eslintrc

```jsonc
{
    "plugins": ["project-structure"],
    "rules": {
        "project-structure/file-structure": "error" // warn | error
    },
    "settings": {
        "project-structure/config-path": ".projectStructurerc"
    }
}
```

Create a `.projectStructurerc` file in the root of your project.

#### JSON example for the structure below:

<p align="center">
<img width="300px" src="./images/example.jpg"/>
</p>

```jsonc
{
    "$schema": "node_modules/eslint-plugin-project-structure/projectStructurerc.schema.json",
    "ignorePatterns": ["src/legacy/*"],
    "structure": {
        "name": "src",
        "type": "folder",
        "children": [
            {
                "name": "features",
                "type": "folder",
                "children": [
                    {
                        "ruleId": "component_folder"
                    }
                ]
            }
        ]
    },
    "rules": {
        "component_folder": {
            "name": {
                "case": "PascalCase"
            },
            "type": "folder",
            "children": [
                // ParentComponent/components/ChildComponent3/components/... (recursion).
                {
                    "name": "components",
                    "type": "folder",
                    "children": [
                        {
                            "ruleId": "component_folder" // This way you can create recursions
                        }
                    ]
                },
                {
                    "name": {
                        "inheritParentName": "firstLetterUppercase",
                        "regex": "/^\\.(context|test)$/"
                    },
                    "type": "file",
                    "extension": [".tsx", "ts"]
                },
                {
                    "name": {
                        "inheritParentName": "firstLetterLowercase",
                        "regex": "/^.*\\.(types|api)$/"
                    },
                    "type": "file",
                    "extension": ".ts"
                },
                {
                    "name": {
                        "inheritParentName": "firstLetterUppercase"
                    },
                    "type": "file",
                    "extension": ".tsx"
                }
            ]
        }
    }
}
```

#### YAML Example

```yaml
ignorePatterns:
    - src/legacy/*
structure:
    name: src
    type: folder
    children:
        - name: features
          type: folder
          children:
              - ruleId: component_folder
rules:
    component_folder:
        name:
            case: PascalCase
        type: folder
        children:
            - name: components
              type: folder
              children:
                  - ruleId: component_folder
            - name:
                  inheritParentName: firstLetterUppercase
                  regex: "/^\\.(context|test)$/"
              type: file
              extension:
                  - ".tsx"
                  - ts
            - name:
                  inheritParentName: firstLetterLowercase
                  regex: "/^.*\\.(types|api)$/"
              type: file
              extension: ".ts"
            - name:
                  inheritParentName: firstLetterUppercase
              type: file
              extension: ".tsx"
```

## API:

#### **`"$schema"`**: `<string | undefined>`

Type checking for your `.projectStructurerc`. It helps to fill configuration correctly.

```jsonc
{
    "$schema": "node_modules/eslint-plugin-project-structure/projectStructurerc.schema.json"
}
```

#### **`"ignorePatterns"`**: `<string[] | undefined>`

Here you can set the paths you want to ignore.

```jsonc
{
    "ignorePatterns": ["src/legacy/*"]
}
```

#### **`"name"`**: `<Name | string | undefined>`

Fixed or dynamic file/folder name.

-   **`"regex"`**: `<string | undefined>` Name regex. Must start and end with `/`.
-   **`"case"`**: `<"PascalCase" | "camelCase" | "snake_case" | "kebab-case" | "dash-case" | undefined>` Name case validation.
-   **`"inheritParentName"`**: `<firstLetterUppercase | firstLetterLowercase | undefined>` The child inherits the name of the folder in which it is
    located and sets its first letter to lowercase or uppercase. When used with a regex, the parent name will be pasted after the first `^` character.

> **Warning**
> When using **`"case"`** together with **`"regex"`** and **`"inheritParentName"`** be aware that they may overlap.

```jsonc
{
    "name": "FixedName"
}
```

```jsonc
{
    "name": {
        "regex": "/^\\.(types|api)$/",
        "case": "PascalCase",
        "inheritParentName": "firstLetterUppercase"
    }
}
```

#### **`"type"`**: `<"file" | "folder" | undefined>`

Type of your rule.

```jsonc
{
    "type": "file"
}
```

#### **`"extension"`**: `<string | string[] | undefined>`

Extension of your file. Not available when **`"type"`** is `"folder"`.

```jsonc
{
    "extension": [".ts", ".tsx", ".js", ".jsx", "..."]
}
```

#### **`"children"`**: `<Rule[] | undefined>`

Folder children rules.
Not available when **`"type"`** is `"file"`.
Required when **`"type"`** is `"folder"`.

```jsonc
{
    "children": [
        {
            "name": "Child",
            "type": "file"
        }
    ]
}
```

#### **`"structure"`**: `<Rule>`

The structure of your project and its rules.

```jsonc
{
    "structure": {
        "name": "src",
        "type": "folder",
        "children": [
            // ...
        ]
    }
}
```

#### **`"rules"`**: `<Record<string, Rule> | undefined>`

A place where you can add your custom rules.
The key in the object will correspond to **`"ruleId"`**, which you can then use in many places.

```jsonc
{
    "rules": {
        "yourCustomRule": {
            "name": "ComponentName",
            "type": "folder",
            "children": [
                // ...
            ]
        }
    }
}
```

#### **`"ruleId"`**: `<string | undefined>`

A reference to your custom rule. Only available when other keys are not used in object.

```jsonc
{
    "ruleId": "yourCustomRule"
}
```

## Folder recursion

You can easily create recursions when you refer to the same **`"ruleId"`** that your rule has.

```jsonc
{
    "rules": {
        "myCustomRule": {
            "type": "folder",
            "children": [
                {
                    "ruleId": "myCustomRule"
                }
            ]
        }
    }
}
```
