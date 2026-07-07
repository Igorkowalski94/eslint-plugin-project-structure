import { FinalError } from "errors/FinalError";

import { getLocationError } from "rules/folderStructure/errors/getLocationError";
import { getNodeExistenceError } from "rules/folderStructure/errors/getNodeExistenceError";

describe("getNodeExistenceError", () => {
  it("Should return the default error when no message is provided", () => {
    expect(
      getNodeExistenceError({
        enforcedNodeNames: ["./src/features/test.ts"],
        nodeName: "features",
        nodePath: "nodePath",
        nodeType: "Folder",
      }),
    ).toEqual(
      new FinalError(
        `🔥 Folder 'features' enforces the existence of other folders/files. 🔥\n\nEnforce existence = ./src/features/test.ts${getLocationError({ nodePath: "nodePath" })}`,
      ),
    );
  });

  it("Should append the custom message when provided", () => {
    expect(
      getNodeExistenceError({
        enforcedNodeNames: ["./src/features/test.ts"],
        nodeName: "features",
        nodePath: "nodePath",
        nodeType: "Folder",
        message: "Custom guidance.",
      }),
    ).toEqual(
      new FinalError(
        `🔥 Folder 'features' enforces the existence of other folders/files. 🔥\n\nEnforce existence = ./src/features/test.ts${getLocationError({ nodePath: "nodePath" })}Custom guidance.`,
      ),
    );
  });
});
