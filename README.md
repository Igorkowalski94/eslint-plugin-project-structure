# eslint-plugin-project-structure

Eslint plugin with rules that will help you achieve a project structure that is scalable, consistent, and well thought out.

[**Playground**](https://github.com/Igorkowalski94/eslint-plugin-project-structure-playground) for eslint-plugin-project-structure rules.

Become part of the community!<br>
Leave a ⭐ and share the link with your friends.<br>
If you have any questions **[click here](https://github.com/Igorkowalski94/eslint-plugin-project-structure/discussions)**, issues / an idea for a new functionality **[click here](https://github.com/Igorkowalski94/eslint-plugin-project-structure/issues/new/choose)**.

### Documentation:

-   **[Migration guide to 2.0.0.](https://github.com/Igorkowalski94/eslint-plugin-project-structure/blob/main/documentation/migration-to-2.0.0.md)**
-   **[project-structure-folder-structure](https://github.com/Igorkowalski94/eslint-plugin-project-structure/blob/main/documentation/project-structure-folder-structure.md)**
-   **[project-structure-independent-modules](https://github.com/Igorkowalski94/eslint-plugin-project-structure/blob/main/documentation/project-structure-independent-modules.md)**
-   **[project-structure-naming-rules](https://github.com/Igorkowalski94/eslint-plugin-project-structure/blob/main/documentation/project-structure-naming-rules.md)**

### Rules:

## **[project-structure-folder-structure](https://github.com/Igorkowalski94/eslint-plugin-project-structure/blob/main/documentation/project-structure-folder-structure.md)**

Enforce rules on folder structure to keep your repository consistent, orderly and well thought out.

#### Features:

✅ Validation of folder structure (Any files/folders outside the structure will be considered an error).<br>
✅ Validation of folder and file names.<br>
✅ File/Folders name case validation.<br>
✅ File/Folders name regex validation.<br>
✅ File extension validation (Support for all extensions).<br>
✅ Inheriting the parent's name (The child inherits the name of the folder in which it is located).<br>
✅ Folder recursion (You can nest a given folder structure recursively).<br>
✅ Forcing a nested/flat structure for a given folder.

## **[project-structure-independent-modules](https://github.com/Igorkowalski94/eslint-plugin-project-structure/blob/main/documentation/project-structure-independent-modules.md)**

Create independent modules to keep your repository scalable and easy to maintain.<br>
Get rid of dependencies between modules and create truly independent functionalities.

#### Features:

✅ Creating independent modules in which you control what can be imported.<br>
✅ Disabling external imports (node_modules) for a given module (Option to add exceptions). <br>
✅ Reference {dirname} which allows you to decide about the current directory and its level in the pattern.<br>
✅ Reference {family} which finds the common part between a given import and the current file.<br>
✅ Non-relative/relative imports support. <br>
✅ Support for imports without extension. <br>
✅ Reusable import patterns. <br>

## **[project-structure-naming-rules](https://github.com/Igorkowalski94/eslint-plugin-project-structure/blob/main/documentation/project-structure-naming-rules.md)**

Enforce naming rules.

#### Features:

✅ Naming validation. <br>
✅ Support for classes, types, interfaces, enums, variables, functions, arrow function.<br>
✅ Inheriting the file name as the name (Option of adding your own prefixes/suffixes or changing the case).<br>
✅ Deleting parts of a file name. <br>
✅ Naming rules only for name types located in the root of the file (not nested).<br>
✅ Regex validation<br>
✅ Build in case validation.<br>
✅ Different name rules for different files.<br>
