import { CostsByKey } from "./costs-by-key";

export interface Response {
    "message"?:string;
    "data": CostsByKey[];
}
