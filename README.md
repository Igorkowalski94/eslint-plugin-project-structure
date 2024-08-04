# eslint-plugin-project-structure

Eslint plugin with rules that will help you achieve a project structure that is scalable, consistent, and well thought out.

[**Playground**](https://github.com/Igorkowalski94/eslint-plugin-project-structure-playground) for eslint-plugin-project-structure rules.

Become part of the community!<br>
Leave a ⭐ and share the link with your friends.<br>
If you have any questions **[click here](https://github.com/Igorkowalski94/eslint-plugin-project-structure/discussions)**, issues / an idea for a new functionality **[click here](https://github.com/Igorkowalski94/eslint-plugin-project-structure/issues/new/choose)**.

### Documentation:

-   **[Migration guide to 2.1.0.](https://github.com/Igorkowalski94/eslint-plugin-project-structure/blob/main/documentation/migration-to-2.1.0.md)**
-   **[project-structure-folder-structure](https://github.com/Igorkowalski94/eslint-plugin-project-structure/blob/main/documentation/project-structure-folder-structure.md)**
-   **[project-structure-independent-modules](https://github.com/Igorkowalski94/eslint-plugin-project-structure/blob/main/documentation/project-structure-independent-modules.md)**
-   **[project-structure-naming-rules](https://github.com/Igorkowalski94/eslint-plugin-project-structure/blob/main/documentation/project-structure-naming-rules.md)**

### Rules:

## **[project-structure-folder-structure](https://github.com/Igorkowalski94/eslint-plugin-project-structure/blob/main/documentation/project-structure-folder-structure.md)**

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

## **[project-structure-independent-modules](https://github.com/Igorkowalski94/eslint-plugin-project-structure/blob/main/documentation/project-structure-independent-modules.md)**

A key principle of a healthy project is to prevent the creation of a massive dependency tree,<br> where removing or editing one feature triggers a chain reaction that impacts the entire project.<br>
Create independent modules to keep your project scalable and easy to maintain.<br>
Get rid of dependencies between modules and create truly independent functionalities.<br>

#### Features:

✅ Creating independent modules in which you control what can be imported (e.g. types, functions, components etc. of one functionality cannot be imported into another functionality).<br>
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
✅ Deleting parts of a file name.<br>
✅ Different name rules for different files.<br>
✅ Regex validation<br>
✅ Build in case validation.<br>
