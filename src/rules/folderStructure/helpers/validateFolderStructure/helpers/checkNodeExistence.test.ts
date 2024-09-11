import fs from "fs";
import path from "path";

import { getInvalidReferenceError } from "errors/getInvalidReferenceError";

import { getNodeExistenceError } from "rules/folderStructure/errors/getNodeExistenceError";
import { NODE_NAME_REFERENCES } from "rules/folderStructure/folderStructure.consts";
import { checkNodeExistence } from "rules/folderStructure/helpers/validateFolderStructure/helpers/checkNodeExistence";

describe("checkNodeExistence", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it("should not throw when nodes exist file", () => {
    jest
      .spyOn(fs, "existsSync")
      .mockImplementation(
        (filepath) =>
          filepath ===
            path.join(
              "...",
              "src",
              "features",
              "Feature1",
              "feature1.stories.tsx",
            ) ||
          filepath ===
            path.join("...", "src", "features", "Feature1", "test.ts"),
      );

    expect(() =>
      checkNodeExistence({
        cwd: "...",
        enforceExistence: ["{nodeName}.stories.tsx", "test.ts"],
        nodeName: "Feature1.tsx",
        nodePath: "src/features/Feature1/Feature1.tsx",
        nodeType: "File",
      }),
    ).not.toThrow();
  });

  it("should throw when reference do not exist", () => {
    jest
      .spyOn(fs, "existsSync")
      .mockImplementation(
        (filepath) =>
          filepath ===
            path.join(
              "...",
              "src",
              "features",
              "Feature1",
              "feature1.stories.tsx",
            ) ||
          filepath ===
            path.join("...", "src", "features", "Feature1", "test.ts"),
      );

    expect(() =>
      checkNodeExistence({
        cwd: "...",
        enforceExistence: ["{nodeName2}.{PascalCase}.stories.tsx", "test.ts"],
        nodeName: "Feature1.tsx",
        nodePath: "src/features/Feature1/Feature1.tsx",
        nodeType: "File",
      }),
    ).toThrow(
      getInvalidReferenceError({
        allowedReferences: Object.keys(NODE_NAME_REFERENCES),
        invalidReferences: ["{nodeName2}", "{PascalCase}"],
        key: "enforceExistence",
      }),
    );
  });

  it("should not throw when nodes exist folder", () => {
    jest
      .spyOn(fs, "existsSync")
      .mockImplementation(
        (filepath) =>
          filepath ===
          path.join("...", "src", "features", "Feature1", "test.ts"),
      );

    expect(() =>
      checkNodeExistence({
        cwd: "...",
        enforceExistence: ["test.ts"],
        nodeName: "Feature1",
        nodePath: "src/features/Feature1",
        nodeType: "Folder",
      }),
    ).not.toThrow();
  });

  it("should throw when node do not exist folder", () => {
    expect(() =>
      checkNodeExistence({
        cwd: "...",
        enforceExistence: ["test.ts", "tests/test.ts"],
        nodeName: "features",
        nodePath: "src/features",
        nodeType: "Folder",
      }),
    ).toThrow(
      getNodeExistenceError({
        enforcedNodeNames: [
          "./src/features/test.ts",
          "./src/features/tests/test.ts",
        ],
        nodeName: "features",
        nodePath: "src/features",
        nodeType: "Folder",
      }),
    );
  });

  it("should throw when node do not exist folder file", () => {
    expect(() =>
      checkNodeExistence({
        cwd: "...",
        enforceExistence: ["test.ts", "tests/test.ts"],
        nodeName: "Feature1.tsx",
        nodePath: "src/features/Feature1/Feature1.tsx",
        nodeType: "File",
      }),
    ).toThrow(
      getNodeExistenceError({
        enforcedNodeNames: [
          "./src/features/Feature1/test.ts",
          "./src/features/Feature1/tests/test.ts",
        ],
        nodeName: "Feature1.tsx",
        nodePath: "src/features/Feature1/Feature1.tsx",
        nodeType: "File",
      }),
    );
  });
});
