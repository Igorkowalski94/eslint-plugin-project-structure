import { sep } from "path";

import { SharedConfigurationSettings } from "@typescript-eslint/utils/dist/ts-eslint";

import { getInvalidRootError } from "../errors/getInvalidRootError";
import { DEFAULT_ROOT } from "../namingRules.consts";

interface GetFilenamePathWithoutRootProps {
    settings: SharedConfigurationSettings;
    filename: string;
}

export const getFilenamePathWithoutRoot = ({
    settings,
    filename,
}: GetFilenamePathWithoutRootProps): string => {
    const root =
        (settings["project-structure/export-rules-root"] as string) ??
        DEFAULT_ROOT;

    const filenameWithoutRoot = filename.split(`${sep}${root}${sep}`)[1];

    if (!filenameWithoutRoot) throw getInvalidRootError(root);

    return filenameWithoutRoot;
};
