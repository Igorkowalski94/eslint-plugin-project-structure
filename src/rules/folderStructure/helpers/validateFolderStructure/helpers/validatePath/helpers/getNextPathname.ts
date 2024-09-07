interface GetNextPathnameProps {
  pathname: string;
  nodeName: string;
}
export const getNextPathname = ({
  nodeName,
  pathname,
}: GetNextPathnameProps): string => pathname.replace(`${nodeName}/`, "");
