import path from "path";

interface GetFullImportPathVariantsProps {
  importPath: string;
  projectRoot: string;
  projectRootWithBaseUrl: string;
}

interface GetFullImportPathVariantsReturn {
  fullImportPath: string;
  fullImportPathIndex: string;

  fullImportPathExternal: string;
  fullImportPathExternalIndex: string;

  fullImportPathExternalTypes: string;
  fullImportPathExternalTypesIndex: string;

  fullImportPathExternalNode: string;
  fullImportPathExternalNodeIndex: string;

  fullImportPathExternalTypesNode: string;
  fullImportPathExternalTypesNodeIndex: string;
}

export const getFullImportPathVariants = ({
  importPath,
  projectRoot,
  projectRootWithBaseUrl,
}: GetFullImportPathVariantsProps): GetFullImportPathVariantsReturn => {
  const fullImportPath = path.join(projectRootWithBaseUrl, importPath);
  const fullImportPathIndex = path.join(fullImportPath, "index");

  const fullImportPathExternal = path.join(
    projectRoot,
    "node_modules",
    importPath,
  );
  const fullImportPathExternalIndex = path.join(
    fullImportPathExternal,
    "index",
  );

  const fullImportPathExternalTypes = path.join(
    projectRoot,
    "node_modules",
    "@types",
    importPath,
  );
  const fullImportPathExternalTypesIndex = path.join(
    fullImportPathExternalTypes,
    "index",
  );

  const fullImportPathExternalNode = path.join(
    projectRoot,
    "node_modules",
    "node",
    importPath,
  );
  const fullImportPathExternalNodeIndex = path.join(
    fullImportPathExternalTypes,
    "index",
  );

  const fullImportPathExternalTypesNode = path.join(
    projectRoot,
    "node_modules",
    "@types",
    "node",
    importPath,
  );
  const fullImportPathExternalTypesNodeIndex = path.join(
    fullImportPathExternalTypes,
    "index",
  );

  return {
    fullImportPath,
    fullImportPathIndex,
    fullImportPathExternal,
    fullImportPathExternalIndex,
    fullImportPathExternalTypes,
    fullImportPathExternalTypesIndex,
    fullImportPathExternalNode,
    fullImportPathExternalNodeIndex,
    fullImportPathExternalTypesNode,
    fullImportPathExternalTypesNodeIndex,
  };
};
