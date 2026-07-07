import { FinalError } from "errors/FinalError";

import { getBaseError } from "rules/folderStructure/errors/getBaseError";
import { getLocationError } from "rules/folderStructure/errors/getLocationError";
import { getNameError } from "rules/folderStructure/errors/getNameError";

describe("getNameError", () => {
  it("Should return the default error when no message is provided", () => {
    expect(
      getNameError({
        nodeName: "nodeName",
        nodePath: "nodePath",
        nodeType: "File",
        allowedNames: ["*.tsx", "*.ts"],
      }),
    ).toEqual(
      new FinalError(
        `${getBaseError({ nodeName: "nodeName", nodeType: "File" })}Allowed names  = *.tsx, *.ts${getLocationError({ nodePath: "nodePath" })}`,
      ),
    );
  });

  it("Should append the custom message when provided", () => {
    expect(
      getNameError({
        nodeName: "nodeName",
        nodePath: "nodePath",
        nodeType: "File",
        allowedNames: ["*.tsx", "*.ts"],
        message: "Custom guidance.",
      }),
    ).toEqual(
      new FinalError(
        `${getBaseError({ nodeName: "nodeName", nodeType: "File" })}Allowed names  = *.tsx, *.ts${getLocationError({ nodePath: "nodePath" })}Custom guidance.`,
      ),
    );
  });
});
