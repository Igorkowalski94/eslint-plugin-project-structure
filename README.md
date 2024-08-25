# eslint-plugin-project-structure

Eslint plugin with rules that will help you achieve a project structure that is scalable, consistent, and well thought out.<br>
Whether you're working alone, with a small or large team, save time by automating the reviews of key principles for a healthy project!

[**Playground**](https://github.com/Igorkowalski94/eslint-plugin-project-structure-playground) for eslint-plugin-project-structure rules.

Become part of the community!<br>
Leave a ⭐ and share the link with your friends.<br>
If you have any questions or need help creating a configuration that meets your requirements **[click here](https://github.com/Igorkowalski94/eslint-plugin-project-structure/discussions)**, issues / an idea for a new functionality **[click here](https://github.com/Igorkowalski94/eslint-plugin-project-structure/issues/new/choose)**.

### Documentation:

- **[Migration guide to 2.2.0.](https://github.com/Igorkowalski94/eslint-plugin-project-structure/blob/main/documentation/migration-to-2.2.0.md)**
- **[project-structure-folder-structure](https://github.com/Igorkowalski94/eslint-plugin-project-structure/blob/main/documentation/project-structure-folder-structure.md)**
- **[project-structure-independent-modules](https://github.com/Igorkowalski94/eslint-plugin-project-structure/blob/main/documentation/project-structure-independent-modules.md)**
- **[project-structure-naming-rules](https://github.com/Igorkowalski94/eslint-plugin-project-structure/blob/main/documentation/project-structure-naming-rules.md)**

### Rules:

## **[project-structure-folder-structure](https://github.com/Igorkowalski94/eslint-plugin-project-structure/blob/main/documentation/project-structure-folder-structure.md)**

Enforce rules on folder structure to keep your project consistent, orderly and well thought out.

#### Features:

✅ Validation of folder structure. Any files/folders outside the structure will be considered an error.<br>
✅ File/Folder name regex validation with features like wildcard `*` and treating `.` as a character, along with other conveniences.<br>
✅ Build in case validation.<br>
✅ Inheriting the folder's name. The file/folder inherits the name of the folder in which it is located. Option of adding your own prefixes/suffixes or changing the case.<br>
✅ Enforcing the existence of a files/folders when a specific file/folder exists. For example, if `./src/Component.tsx` exists, then `./src/Component.test.tsx` and `./src/stories/Component.stories.tsx` must also exist.<br>
✅ Reusable rules for folder structures.<br>
✅ An option to create a separate configuration file with TypeScript support.<br>
✅ Forcing a nested/flat structure for a given folder.<br>
✅ Support for all file extensions.<br>
✅ Folder recursion. You can nest a given folder structure recursively.<br>
✅ Fewer repetitions and precise error messages, even for deeply nested folders (recursion), by representing the folder structure as a tree.<br>

## **[project-structure-independent-modules](https://github.com/Igorkowalski94/eslint-plugin-project-structure/blob/main/documentation/project-structure-independent-modules.md)**

A key principle of a healthy project is to prevent the creation of a massive dependency tree,<br>
where removing or editing one feature triggers a chain reaction that impacts the entire project.<br>
Create independent modules to keep your project scalable and easy to maintain.<br>
Get rid of dependencies between modules and create truly independent functionalities.<br>

#### Features:

✅ Creating independent modules in which you control what can be imported (e.g. types, functions, components of one functionality cannot be imported into another functionality).<br>
✅ Disabling external imports (node_modules) for a given module (Option to add exceptions). <br>
✅ Non-relative/relative imports support. <br>
✅ Support for imports without extension. <br>
✅ Reusable import patterns. <br>
✅ Support for path aliases. The plugin will automatically detect your tsconfig.json and use your settings. There is also an option to enter them manually.<br>
✅ An option to create a separate configuration file with TypeScript support.<br>

## **[project-structure-naming-rules](https://github.com/Igorkowalski94/eslint-plugin-project-structure/blob/main/documentation/project-structure-naming-rules.md)**

Enforce complex naming rules and prohibit the use of given selectors in a given file.<br>
Have full control over what your file can contain and the naming conventions it must follow.<br>

#### Features:

✅ Naming validation.<br>
✅ Supported selectors: `class`, `variable`, `function`, `arrowFunction`, `type`, `interface`, `enum`.<br>
✅ Naming rules for exported selectors, selectors in the root of the file and nested/all selectors in the file. They can be used together in combination.<br>
✅ Prohibit the use of given selectors in a given file. For example, `**/*.consts.ts` files can only contain variables, `**/*.types.ts` files can only contain enums, interfaces and types.<br>
✅ Inheriting the filename as the selector name. Option to add your own prefixes/suffixes, change the case, or remove parts of the filename.<br>
✅ Enforcing a maximum of one main function/class per file.<br>
✅ Different name rules for different files.<br>
✅ Regex validation.<br>
✅ Build in case validation.<br>
✅ An option to create a separate configuration file with TypeScript support.<br>
