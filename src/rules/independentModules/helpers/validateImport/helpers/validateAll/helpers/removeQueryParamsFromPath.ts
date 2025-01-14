interface RemoveQueryParamsFromPathProps {
  importPath: string;
}

export const removeQueryParamsFromPath = ({
  importPath,
}: RemoveQueryParamsFromPathProps): string => importPath.replace(/\?.*$/g, "");
