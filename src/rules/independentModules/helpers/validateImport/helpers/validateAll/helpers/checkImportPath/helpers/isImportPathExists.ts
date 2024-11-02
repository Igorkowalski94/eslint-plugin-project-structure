import fs from "fs";
import path from "path";

interface IsImportPathExistsProps {
  projectRoot: string;
  importPath: string;
  baseUrl: string;
}

export const isImportPathExists = ({
  importPath,
  projectRoot,
  baseUrl,
}: IsImportPathExistsProps): boolean =>
  fs.existsSync(path.join(projectRoot, baseUrl, importPath));
