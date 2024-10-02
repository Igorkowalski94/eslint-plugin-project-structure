<a id="root"></a>

<div>&nbsp;</div>

<p align="right">
  <picture><img src="https://raw.githubusercontent.com/Igorkowalski94/eslint-plugin-project-structure/main/images/Cloud.png" alt="Cloud" width="35" height="35" /></picture>
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/Igorkowalski94/eslint-plugin-project-structure/main/images/Crescent%20Moon.png">
    <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/Igorkowalski94/eslint-plugin-project-structure/main/images/Sun.png">
    <img alt="Shows an illustrated sun in light mode and a moon with stars in dark mode." src="https://raw.githubusercontent.com/Igorkowalski94/eslint-plugin-project-structure/main/images/Sun.png" width="30" height="30" />
  </picture>
  <picture><img src="https://raw.githubusercontent.com/Igorkowalski94/eslint-plugin-project-structure/main/images/Cloud.png" alt="Cloud" width="19" height="19" /></picture>
</p>
<h1 align="center"><picture><img src="https://raw.githubusercontent.com/Igorkowalski94/eslint-plugin-project-structure/main/images/File%20Folder.png" alt="Folder" width="60" height="60" /></picture><picture><img src="https://raw.githubusercontent.com/Igorkowalski94/eslint-plugin-project-structure/main/images/Owl.png" alt="Owl" width="60" height="60" /></picture><br>eslint&#8209;plugin-project&#8209;structure</h1>

<p align="center">Powerful ESLint plugin with rules to help you achieve a scalable, consistent, and well-structured project.</p>
<p align="center">Create your own framework! Define your folder structure, file composition, advanced naming conventions, and create independent modules.</p>
<p align="center">Take your project to the next level and save time by automating the review of key principles of a healthy project!</p>

<div align="center">

[![npm](https://img.shields.io/npm/v/eslint-plugin-project-structure.svg?&logo=nodedotjs&color=%231f6feb&labelColor=%23212830)](https://www.npmjs.com/package/eslint-plugin-project-structure#root)
[![npm downloads](https://img.shields.io/npm/dy/eslint-plugin-project-structure.svg?&logo=nodedotjs&label=Downloads&color=%238957e5&labelColor=%23212830)](https://www.npmjs.com/package/eslint-plugin-project-structure#root)
[![Check, test, build](https://img.shields.io/github/actions/workflow/status/Igorkowalski94/eslint-plugin-project-structure/check.yml?&logo=github&color=%23238636&label=Check%2C%20test%2C%20build&labelColor=%23212830)](https://github.com/Igorkowalski94/eslint-plugin-project-structure/actions/workflows/check.yml)
[![Sponsor](https://img.shields.io/badge/Sponsor-grey?logo=githubsponsors&style=flat&color=%23212830)](https://github.com/sponsors/Igorkowalski94)
[![GitHub Repo stars](https://img.shields.io/github/stars/igorkowalski94/eslint-plugin-project-structure?label=Star)](https://github.com/Igorkowalski94/eslint-plugin-project-structure)

</div>

## 📋 General information

🎮[Playground](https://github.com/Igorkowalski94/eslint-plugin-project-structure-playground#root) for eslint-plugin-project-structure rules.

Check the latest [releases](https://github.com/Igorkowalski94/eslint-plugin-project-structure/releases) and stay updated with new features and changes.

Become part of the community!<br>
Leave a ⭐ and share the link with your friends.<br>

- If you have any questions or need help creating a configuration that meets your requirements, [help](https://github.com/Igorkowalski94/eslint-plugin-project-structure/discussions/new?category=help).
- If you have found a bug or an error in the documentation, [report issues](https://github.com/Igorkowalski94/eslint-plugin-project-structure/issues/new?assignees=Igorkowalski94&labels=bug&projects=&template=bug_report.md&title=%5BBUG%5D).
- If you have an idea for a new feature or an improvement to an existing one, [ideas](https://github.com/Igorkowalski94/eslint-plugin-project-structure/discussions/new?category=ideas).
- If you're interested in discussing project structures across different frameworks or want to vote on a proposed idea, [discussions](https://github.com/Igorkowalski94/eslint-plugin-project-structure/discussions?discussions_q=).

## 📚 Documentation

- [project-structure/folder-structure](https://github.com/Igorkowalski94/eslint-plugin-project-structure/wiki/project%E2%80%91structure-%E2%80%8Bfolder%E2%80%91structure#root)
- [project-structure/independent-modules](https://github.com/Igorkowalski94/eslint-plugin-project-structure/wiki/project%E2%80%91structure-%E2%80%8Bindependent%E2%80%91modules#root)
- [project-structure/file-composition](https://github.com/Igorkowalski94/eslint-plugin-project-structure/wiki/project%E2%80%91structure-%E2%80%8Bfile%E2%80%91composition#root)

<h2 align="center"><a href="https://github.com/Igorkowalski94/eslint-plugin-project-structure/wiki/project%E2%80%91structure-%E2%80%8Bfolder%E2%80%91structure#root">project&#8209;structure/&#8203;folder&#8209;structure</a></h2>
<p align="center">Enforce rules on folder structure to keep your project consistent, orderly and well thought out.</p>

<h4><picture><img src="https://raw.githubusercontent.com/Igorkowalski94/eslint-plugin-project-structure/main/images/Rocket.png" alt="Rocket" width="35" height="35" /></picture> Features:</h4>

- Validation of folder structure. Any files/folders outside the structure will be considered an error.
- File/Folder name regex validation with features like wildcard `*` and treating `.` as a character, along with other conveniences.
- Build in case validation.
- Inheriting the folder's name. The file/folder inherits the name of the folder in which it is located. Option of adding your own prefixes/suffixes or changing the case.
- Enforcing the existence of a files/folders when a specific file/folder exists. For example, if `./src/Component.tsx` exists, then `./src/Component.test.tsx` and `./src/stories/Component.stories.tsx` must also exist.
- Reusable rules for folder structures.
- An option to create a separate configuration file with TypeScript support.
- Forcing a nested/flat structure for a given folder.
- Support for all file extensions.
- Folder recursion. You can repeatedly nest a folder structure and set a limit on the nesting depth. There is also an option to change the rule at the final level, such as flattening the folder structure.
- Fewer repetitions and precise error messages, even for deeply nested folders (recursion), by representing the folder structure as a tree.
- Checking the length of paths and notifying when the limit is exceeded.

<h2 align="center"><a href="https://github.com/Igorkowalski94/eslint-plugin-project-structure/wiki/project%E2%80%91structure-%E2%80%8Bindependent%E2%80%91modules#root">project&#8209;structure/&#8203;independent&#8209;modules</a></h2>
<p align="center">A key principle of a healthy project is to prevent the creation of a massive dependency tree,
where removing or editing one feature triggers a chain reaction that impacts the entire project.</p>
<p align="center">Create independent modules to keep your project scalable and easy to maintain. Get rid of dependencies between modules and create truly independent functionalities.</p>

<h4><picture><img src="https://raw.githubusercontent.com/Igorkowalski94/eslint-plugin-project-structure/main/images/Rocket.png" alt="Rocket" width="35" height="35" /></picture> Features:</h4>

- Creating independent modules in which you control what can be imported (e.g. types, functions, components of one functionality cannot be imported into another functionality).
- The ability to create very detailed rules, even for nested folder structures. Whether it's a large module, a sub-module, or a single file, there are no limitations.
- Support for all types of imports, including `require()`, `import()`, `jest.mock()`, and `jest.requireActual()`, as well as `ExportAllDeclaration` and `ExportNamedDeclaration`.
- Disabling external imports (node_modules) for a given module (Option to add exceptions).
- Non-relative/relative imports support.
- Support for imports without extension.
- Reusable import patterns.
- Support for path aliases. The plugin will automatically detect your tsconfig.json and use your settings. There is also an option to enter them manually.
- An option to create a separate configuration file with TypeScript support.

<h2 align="center"><a href="https://github.com/Igorkowalski94/eslint-plugin-project-structure/wiki/project%E2%80%91structure-%E2%80%8Bfile%E2%80%91composition#root">project&#8209;structure/&#8203;file&#8209;composition</a></h2>
<p align="center">Compose your ideal files!</p>
<p align="center">Have full control over the order and quantity of selectors.</p>
<p align="center">Define advanced naming conventions and prohibit the use of specific selectors in given files.</p>

<h4><picture><img src="https://raw.githubusercontent.com/Igorkowalski94/eslint-plugin-project-structure/main/images/Rocket.png" alt="Rocket" width="35" height="35" /></picture> Features:</h4>

- File composition validation.
- Supported selectors: `class`, `function`, `arrowFunction`, `type`, `interface`, `enum`, `variable`, `variableExpression`.
- Inheriting the filename as the selector name. Option to add your own prefixes/suffixes, change the case, or remove parts of the filename.
- Prohibit the use of given selectors in a given file. For example, `**/*.consts.ts` files can only contain variables, `**/*.types.ts` files can only contain interfaces and types.
- Define the order in which your selectors should appear in a given file. Support for `--fix` to automatically correct the order.
- Rules for exported selectors, selectors in the root of the file and nested/all selectors in the file. They can be used together in combination.
- Enforcing a maximum of one main function/class per file.
- The ability to set a specific limit on the occurrence of certain selectors in the root of a given file.
- Selector name regex validation.
- Build in case validation.
- Different rules for different files.
- An option to create a separate configuration file with TypeScript support.

<h2><picture><img src="https://raw.githubusercontent.com/Igorkowalski94/eslint-plugin-project-structure/main/images/Party%20Popper.png" alt="Party Popper" width="35" height="35" /></picture> Sponsors</h2>

<p align="center">A big thank you to all the <a href="https://github.com/sponsors/Igorkowalski94">sponsors</a> for your support! You give me the strength and motivation to keep going!</p>
<p align="center"> Thanks to you, I can help others create their ideal projects!</p>
<p align="center"><picture><img src="https://raw.githubusercontent.com/Igorkowalski94/eslint-plugin-project-structure/main/images/Love-You%20Gesture.png" alt="Love-You Gesture" width="60px" height="60px" /></picture><p>

<!--
  conventions,
  architecture,
  file,
  folder,
  project,
  structure,
  filename,
  path,
  validation,
  rules,
  clean,
  frontend,
  backend,
  import,
  boundaries,
  eslint,
  eslint-plugin,

  naming-conventions,
  file-composition,
  independent-modules,

  project architecture,
  project structure,
  folder structure,
  file structure,

  react,
  react folder structure,
  react file structure,
  react project structure,
  react architecture,
  react conventions,

  react native,
  react native folder structure,
  react native file structure,
  react native project structure,
  react native architecture,
  react native conventions,

  nextjs
  nextjs folder structure,
  nextjs file structure,
  nextjs project structure,
  nextjs architecture,
  nextjs conventions,

  remix,
  remix folder structure,
  remix file structure,
  remix project structure,
  remix architecture,
  remix conventions,

  angular,
  angular folder structure,
  angular file structure,
  angular project structure,
  angular architecture,
  angular conventions,

  vue,
  vue folder structure,
  vue file structure,
  vue project structure,
  vue architecture,
  vue conventions,

  node,
  node folder structure,
  node file structure,
  node project structure,
  node architecture,
  node conventions,

  express,
  express folder structure,
  express file structure,
  express project structure,
  express architecture,
  express conventions,

  nestjs,
  nestjs folder structure,
  nestjs file structure,
  nestjs project structure,
  nestjs architecture,
  nestjs conventions,

  solid,
  solid folder structure,
  solid file structure,
  solid project structure,
  solid architecture,
  solid conventions,

  svelte,
  svelte folder structure,
  svelte file structure,
  svelte project structure,
  svelte architecture,
  svelte conventions
 -->
