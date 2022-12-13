
import {
REQUESTROMANCEMOVIES,
REQUESTFAILROMANCEMOVIES,
REQUESTSUCCESSROMANCEMOVIES
} from "../../types/types";

import { Action } from "../../action/actionRomanc";
import {Movies} from "../../../typeing"

interface MovieType {
  romanc: Movies[];
  isloading: boolean;
}

const initialState = {
  romanc: [],
  isloading: false,
};

const romancReducer = (state: MovieType = initialState, action: Action) => {
  const { type, payload } = action;

  switch (type) {
    case REQUESTROMANCEMOVIES:
      return {
        romanc: null,
        isloading: true,
      };
      break;
    case REQUESTSUCCESSROMANCEMOVIES:
      return {
        romanc: payload,
        isloading: true,
      };
      break;
    case REQUESTFAILROMANCEMOVIES:
      return {
        romanc: null,
        isloading: false,
      };
      break;

    default:
      return state;
      break;
  }
};

export default romancReducer;
