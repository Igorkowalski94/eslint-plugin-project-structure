export const getInvalidRootError = (root: string): Error =>
    new Error(
        `🔥 Root: "${root}" does not exist. Make sure you specify the correct root in "project-structure/export-rules-root". 🔥`,
    );
