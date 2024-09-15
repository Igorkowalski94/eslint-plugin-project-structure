import { FinalError } from "errors/FinalError";

import { getBaseError } from "rules/folderStructure/errors/getBaseError";
import { getLocationError } from "rules/folderStructure/errors/getLocationError";
import { getNodeTypeError } from "rules/folderStructure/errors/getNodeTypeError";
import { NodeType } from "rules/folderStructure/folderStructure.types";

describe("getNodeTypeError", () => {
  it.each<{
    nodeType: NodeType;
    expected: FinalError;
  }>([
    {
      nodeType: "File",
      expected: new FinalError(
        `${getBaseError({ nodeName: "nodeName", nodeType: "File" })}According to the structure, the 'FolderName' folder can only contain folders.${getLocationError({ nodePath: "nodePath" })}`,
      ),
    },
    {
      nodeType: "Folder",
      expected: new FinalError(
        `${getBaseError({ nodeName: "nodeName", nodeType: "Folder" })}According to the structure, the 'FolderName' folder can only contain files.${getLocationError({ nodePath: "nodePath" })}`,
      ),
    },
  ])("Should return correct value for %o", ({ expected, nodeType }) => {
    expect(
      getNodeTypeError({
        nodeName: "nodeName",
        nodePath: "nodePath",
        nodeType,
        folderName: "FolderName",
      }),
    ).toEqual(expected);
  });
});
