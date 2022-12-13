import {
  INSERTMYLIST,
  REQUESTFAILDMYLIST,
  REQUESTSECCESSMYLIST,
  REQUESTMYLIST,
} from "../types/types";
import { Movies } from "../../typeing";

interface requestmylist {
  type: "REQUESTMYLIST";
}
interface successmylist {
  type: "REQUESTSECCESSMYLIST";
  payload: Movies[];
}
interface insertmyist {
  type: "INSERTMYLIST";
}
interface faildmylist {
  type: "REQUESTFAILDMYLIST";
}
interface removemylist {
  type: "REMOVEMYLIST";
}

export type Action =
  | requestmylist
  | successmylist
  | faildmylist
  | insertmyist
  | removemylist;
