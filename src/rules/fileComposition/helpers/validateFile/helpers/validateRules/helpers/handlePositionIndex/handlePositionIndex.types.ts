import { Selector } from "rules/fileComposition/fileComposition.types";

export interface PositionIndexRule {
  positionIndex: number;
  format: string[];
  selector: Selector | Selector[];
  expressionName?: string;
  range?: string;
}
