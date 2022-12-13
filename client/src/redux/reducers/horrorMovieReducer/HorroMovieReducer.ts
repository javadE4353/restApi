
import {
REQUESTHORRORMOVIES,
REQUESTFAILHORRORMOVIES,
REQUESTSUCCESSHORRORMOVIES
} from "../../types/types";

import { Action } from "../../action/actionHorroMovie";
import {Movies} from "../../../typeing"

interface MovieType {
  horrom: Movies[];
  isloading: boolean;
}

const initialState = {
  horrom: [],
  isloading: false,
};

const horroMovieReducer = (state: MovieType = initialState, action: Action) => {
  const { type, payload } = action;

  switch (type) {
    case REQUESTHORRORMOVIES:
      return {
        horrom: null,
        isloading: true,
      };
      break;
    case REQUESTSUCCESSHORRORMOVIES:
      return {
        horrom: payload,
        isloading: true,
      };
      break;
    case REQUESTFAILHORRORMOVIES:
      return {
        horrom: null,
        isloading: false,
      };
      break;

    default:
      return state;
      break;
  }
};

export default horroMovieReducer;
