# eslint-plugin-project-structure

<img width="100%" src="./images/mainImage.jpg"/>

Eslint plugin that allows you to enforce rules on project structure to keep your repository consistent even in large teams.

### Features

-   ✅ Validation of folder and file names
-   ✅ Name case validation
-   ✅ Name regex validation
-   ✅ File extension validation
-   ✅ Inheriting the parent's name (the child inherits the name of the folder in which it is located)
-   ✅ Folder recursion

### Go to:

-   [Installation](#installation)
-   [JSON example](#example-json)
-   [YAML exemple](#example-yaml)
-   [API details](#api)

### Installation

```bsh
$ yarn add -D eslint-plugin-project-structure
```

or

```bsh
$ npm i --dev eslint-plugin-project-structure
```

### Getting started

1. Add the following lines to .eslintrc

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

2. Create a `.projectStructurerc` file in the root of your project.

#### Example json:

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
                // ParentName/components/ChildComponent/ChildComponent/components/... (recursion).
                {
                    "name": "components",
                    "type": "folder",
                    "children": [
                        {
                            "ruleId": "component_folder" // This way you can create recursions
                        }
                    ]
                },

                // With 'inheritParentName' it will be ParentName.context.tsx or ParentName.context.ts
                // ParentName.test.tsx or ParentName.test.ts
                {
                    "name": {
                        "inheritParentName": "firstLetterUppercase",
                        "regex": "/^\\.(context|test)$/"
                    },
                    "type": "file",
                    "extension": [".tsx", "ts"]
                },

                // For example componentName.types.ts or ComponentName.api.ts,
                {
                    "name": {
                        "regex": "/^.*\\.(types|api)$/"
                    },
                    "type": "file",
                    "extension": ".ts"
                },

                // For example ComponentName.tsx
                {
                    "name": {
                        "case": "PascalCase"
                    },
                    "type": "file",
                    "extension": ".tsx"
                }
            ]
        }
    }
}
```

#### Example yaml:

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
                  regex: "/^.*\\.(types|api)$/"
              type: file
              extension: ".ts"
            - name:
                  case: PascalCase
              type: file
              extension: ".tsx"
```

### API:

```jsonc
{
    // Type checking for your .projectStructurerc
    // Optional.
    "$schema": "node_modules/eslint-plugin-project-structure/projectStructurerc.schema.json",

    // string[]
    // Optional.
    "ignorePatterns": ["src/legacy/*"],

    // Structure of your project.
    // Required.
    "structure": {
        // Fixed name or name object.
        // Optional.
        "name": "src",

        // folder or file.
        // Optional.
        "type": "folder",

        // Children of your folder.
        // Optional.
        // Only available when 'type' is folder/not set.
        // Required when 'type' is folder.
        "children": [
            {
                // Fixed name or name object.
                // Optional.
                "name": {
                    // Name regex.
                    // Only available when 'case' not used. Must start and end with /
                    // Optional.
                    "regex": "/^\\.(types|api)$/",

                    // "PascalCase" or "camelCase" or "snake_case" or "kebab-case" or "dash-case".
                    // Only available when 'regex' and 'inheritParentName' not used.
                    // Optional.
                    "case": "PascalCase",

                    // firstLetterUppercase or firstLetterLowercase.
                    // The child inherits the name of the folder in which it is located and sets its first letter to lowercase or uppercase.
                    // When used with a regex, the parent name will be pasted after the ^ character.
                    // Only available when 'case' not used.
                    // Optional.
                    "inheritParentName": "firstLetterUppercase"
                },

                // folder or file.
                // Optional.
                "type": "file",

                // string or string[]
                // Optional.
                "extension": [".ts", ".tsx", ".js", ".jsx", "..."]
            },

            // A reference to your custom rule.
            // Only available when other keys are not used in object.
            // Optional.
            { "ruleId": "myCustomRule" }
        ]
    },
    // Our custom reusable rules.
    // Optional.
    "rules": {
        // Your custom rule.
        // Optional.
        "myCustomRule": {
            //...
        }
    }
}
```
