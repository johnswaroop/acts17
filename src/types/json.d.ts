import { LBC1689Data } from "./lbc1689";

declare module "*.json" {
  const value: LBC1689Data;
  export default value;
}
