import fs from "fs";
import path, { sep } from "path";

import { getNodeExistenceError } from "rules/folderStructure/errors/getNodeExistenceError";
import { REFERENCES } from "rules/folderStructure/folderStructure.consts";
import { NodeType } from "rules/folderStructure/folderStructure.types";
import { getLowerCaseFirstLetter } from "rules/folderStructure/helpers/getLowerCaseFirstLetter";
import { getUpperCaseFirstLetter } from "rules/folderStructure/helpers/getUpperCaseFirstLetter";

interface CheckNodeExistenceProps {
    cwd: string;
    nodeName: string;
    enforceExistence: string[];
    filenameWithoutCwd: string;
}

export const checkNodeExistence = ({
    enforceExistence,
    filenameWithoutCwd,
    nodeName,
    cwd,
}: CheckNodeExistenceProps): void => {
    const nodeNameType: NodeType = nodeName.includes(".") ? "File" : "Folder";
    const nodeNamePathIndex = filenameWithoutCwd.split("/").indexOf(nodeName);
    const nodeNamePath = filenameWithoutCwd
        .split("/")
        .slice(0, nodeNamePathIndex + 1)
        .join("/");
    const nodeNameDirname = path.dirname(nodeNamePath);
    const nodeNameWithoutExtension = nodeName.substring(
        0,
        nodeName.lastIndexOf("."),
    );

    const enforcedNodeNames = enforceExistence
        .map((enforcedNodeName) => {
            const enforcedNodeNameWithoutRef = enforcedNodeName
                .replace(
                    REFERENCES.Name,
                    getUpperCaseFirstLetter(nodeNameWithoutExtension),
                )
                .replace(
                    REFERENCES.name,
                    getLowerCaseFirstLetter(nodeNameWithoutExtension),
                );

            const enforcedNodeFullPath = path.join(
                cwd,
                nodeNameDirname,
                enforcedNodeNameWithoutRef,
            );

            if (fs.existsSync(enforcedNodeFullPath)) return;

            const currentDirname =
                nodeNameType === "File" ? nodeNameDirname : nodeNamePath;

            return (
                "./" +
                path
                    .join(currentDirname, enforcedNodeNameWithoutRef)
                    .replaceAll(sep, "/")
            );
        })
        .filter((v): v is string => v !== undefined);

    if (!enforcedNodeNames.length) return;

    throw getNodeExistenceError({
        enforcedNodeNames,
        nodeName,
        nodeNamePath,
    });
};
