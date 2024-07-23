# eslint-plugin-project-structure

Eslint plugin with rules that will help you achieve a project structure that is scalable, consistent, and well thought out.

If you want to help:<br>
Leave a ⭐ and share the link with your friends. Become part of the community!<br>
If you have any questions **[click here](https://github.com/Igorkowalski94/eslint-plugin-project-structure/discussions)**, issues / an idea for a new functionality **[click here](https://github.com/Igorkowalski94/eslint-plugin-project-structure/issues/new/choose)**.

### [**Migration guide to 2.0.0.**](https://github.com/Igorkowalski94/eslint-plugin-project-structure/blob/main/documentation/migration-to-2.0.0.md)

### [**Playground**](https://github.com/Igorkowalski94/eslint-plugin-project-structure-playground) for eslint-plugin-project-structure rules.

## **[project-structure-folder-structure](https://github.com/Igorkowalski94/eslint-plugin-project-structure/blob/main/documentation/project-structure-folder-structure.md)**

Enforce rules on folder structure to keep your repository consistent, orderly and well thought out.

### Features

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

### Features

✅ Creating independent modules in which you control what can be imported.<br>
✅ Disabling external imports (node_modules) for a given module. <br>
✅ Reference {dirname} which allows you to decide about the current directory and its level in the pattern.<br>
✅ Reference {family} which finds the common part between a given import and the current file.<br>
✅ Non-relative/relative imports support. <br>
✅ Support for imports without extension. <br>
✅ Reusable import patterns. <br>

## **[project-structure-export-rules](https://github.com/Igorkowalski94/eslint-plugin-project-structure/blob/main/documentation/project-structure-export-rules.md)**

Enforce rules on export names.

### Features

✅ Export name validation. <br>
✅ Inheriting the file name as the export name (Option of adding your own prefixes/suffixes or changing the case).<br>
✅ Deleting parts of a file name. <br>
✅ Regex validation<br>
✅ Build in case validation.<br>
✅ Different export name rules for different files.<br>
✅ Support for all export types. Name export or default export for Classes, types, interfaces, variables, functions etc.<br>
