<h1 align="center">eslint-plugin-project-structure</h1>
<p align="center">ESLint plugin with rules to help you achieve a scalable, consistent, and well-structured project.</p>
<p align="center">Create your own framework! Define your folder structure, advanced naming conventions, file composition, and create independent modules.</p>
<p align="center">Take your project to the next level and save time by automating the review of key principles for a healthy project!</p>

<p align="center">
    <a href="https://www.npmjs.com/package/eslint-plugin-project-structure"><img src="https://img.shields.io/npm/v/eslint-plugin-project-structure.svg" alt="npm" /></a>
    <a href="https://www.npmjs.com/package/eslint-plugin-project-structure"><img src="https://img.shields.io/npm/dy/eslint-plugin-project-structure.svg" alt="npm downloads" /></a>
    <a href="https://github.com/Igorkowalski94/eslint-plugin-project-structure/actions/workflows/check.yml"><img src="https://github.com/Igorkowalski94/eslint-plugin-project-structure/actions/workflows/check.yml/badge.svg" alt="Check code, test and build" /></a>
    <a href="https://github.com/sponsors/Igorkowalski94"><img src="https://img.shields.io/badge/Sponsor-%E2%9D%A4-red" alt="Sponsor" /></a>
</p>

### General information:

[Playground](https://github.com/Igorkowalski94/eslint-plugin-project-structure-playground) for eslint-plugin-project-structure rules.

Become part of the community!<br>
Leave a ⭐ and share the link with your friends.<br>
If you have any questions or need help creating a configuration that meets your requirements [click here](https://github.com/Igorkowalski94/eslint-plugin-project-structure/discussions), issues / an idea for a new functionality [click here](https://github.com/Igorkowalski94/eslint-plugin-project-structure/issues/new/choose).

### Documentation:

- [Migration guide to 2.2.0.](https://github.com/Igorkowalski94/eslint-plugin-project-structure/blob/main/documentation/migration-to-2.2.0.md)
- [project-structure-folder-structure](https://github.com/Igorkowalski94/eslint-plugin-project-structure/blob/main/documentation/project-structure-folder-structure.md)
- [project-structure-independent-modules](https://github.com/Igorkowalski94/eslint-plugin-project-structure/blob/main/documentation/project-structure-independent-modules.md)
- [project-structure-naming-rules](https://github.com/Igorkowalski94/eslint-plugin-project-structure/blob/main/documentation/project-structure-naming-rules.md)

### Rules:

<h2 align="center"><a href="https://github.com/Igorkowalski94/eslint-plugin-project-structure/blob/main/documentation/project-structure-folder-structure.md">project-structure-folder-structure</a></h2>
<p align="center">Enforce rules on folder structure to keep your project consistent, orderly and well thought out.</p>

#### 🚀 Features:

- Validation of folder structure. Any files/folders outside the structure will be considered an error.
- File/Folder name regex validation with features like wildcard `*` and treating `.` as a character, along with other conveniences.
- Build in case validation.
- Inheriting the folder's name. The file/folder inherits the name of the folder in which it is located. Option of adding your own prefixes/suffixes or changing the case.
- Enforcing the existence of a files/folders when a specific file/folder exists. For example, if `./src/Component.tsx` exists, then `./src/Component.test.tsx` and `./src/stories/Component.stories.tsx` must also exist.
- Reusable rules for folder structures.
- An option to create a separate configuration file with TypeScript support.
- Forcing a nested/flat structure for a given folder.
- Support for all file extensions.
- Folder recursion. You can nest a given folder structure recursively.
- Fewer repetitions and precise error messages, even for deeply nested folders (recursion), by representing the folder structure as a tree.

<h2 align="center"><a href="https://github.com/Igorkowalski94/eslint-plugin-project-structure/blob/main/documentation/project-structure-independent-modules.md">project-structure-independent-modules</a></h2>
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

<h2 align="center"><a href="https://github.com/Igorkowalski94/eslint-plugin-project-structure/blob/main/documentation/project-structure-naming-rules.md">project-structure-naming-rules</a></h2>
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
