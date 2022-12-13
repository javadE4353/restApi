import {
  INSERTMYLIST,
  REQUESTFAILDMYLIST,
  REQUESTSECCESSMYLIST,
  REQUESTMYLIST,
  REMOVEMYLIST,
} from "../../types/types";

import { Action } from "../../action/actionMylist";
import { Movies } from "../../../typeing";

interface MovieType {
  mylist: Movies[];
  isloading: boolean;
}

const initialState = {
  mylist: [],
  isloading: false,
};

const mylistReducer = (state: MovieType = initialState, action: Action) => {
  const { type } = action;

  switch (type) {
    case REQUESTMYLIST:
      return {
        isloading: true,
      };
      break;
    case REQUESTSECCESSMYLIST:
      return {
        mylist: action?.payload,
        isloading: false,
      };
      break;
    case INSERTMYLIST:
      return {
        isloading: false,
      };
      break;
    case REMOVEMYLIST:
      return {
        isloading: false,
      };
      break;
    case REQUESTFAILDMYLIST:
      return {
        isloading: false,
      };
      break;

    default:
      return state;
      break;
  }
};

export default mylistReducer;
