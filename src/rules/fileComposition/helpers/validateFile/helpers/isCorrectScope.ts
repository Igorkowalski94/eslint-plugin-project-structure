import { Scope, ScopeAll } from "rules/fileComposition/fileComposition.types";

interface IsCorrectScopeProps {
  scope?: ScopeAll | ScopeAll[];
  expect: Scope;
}

export const isCorrectScope = ({
  expect,
  scope,
}: IsCorrectScopeProps): boolean => {
  if (scope === "file" || !scope) return true;

  if (typeof scope === "string") return scope === expect;

  return scope.some((s) => s === expect || s === "file");
};
