
import {
REQUESTTOPRATED,
REQUESTSUCCESSTOPRATED,
REQUESTFAILTOPRATED
} from "../../types/types";

import { Action } from "../../action/actionToprated";
import {Movies} from "../../../typeing"

interface MovieType {
  topRated: Movies[];
  isloading: boolean;
}

const initialState = {
  topRated: [],
  isloading: false,
};

const topRadedReducer = (state: MovieType = initialState, action: Action) => {
  const { type, payload } = action;

  switch (type) {
    case REQUESTTOPRATED:
      return {
        topRated: null,
        isloading: true,
      };
      break;
    case REQUESTSUCCESSTOPRATED:
      return {
        topRated: payload,
        isloading: true,
      };
      break;
    case REQUESTFAILTOPRATED:
      return {
        topRated: null,
        isloading: false,
      };
      break;

    default:
      return state;
      break;
  }
};

export default topRadedReducer;
