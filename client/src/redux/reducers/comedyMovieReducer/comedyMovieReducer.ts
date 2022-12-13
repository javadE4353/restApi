
import {
REQUESTCOMEDYMOVIES,
REQUESTFAILCOMEDYMOVIES,
REQUESTSUCCESSCOMEDYMOVIES
} from "../../types/types";

import { Action } from "../../action/actionComedyMovie";
import {Movies} from "../../../typeing"

interface MovieType {
  comedymovie: Movies[];
  isloading: boolean;
}

const initialState = {
  comedymovie: [],
  isloading: false,
};

const comedyMovieReducer = (state: MovieType = initialState, action: Action) => {
  const { type, payload } = action;

  switch (type) {
    case REQUESTCOMEDYMOVIES:
      return {
        comedymovie: null,
        isloading: true,
      };
      break;
    case REQUESTSUCCESSCOMEDYMOVIES:
      return {
        comedymovie: payload,
        isloading: true,
      };
      break;
    case REQUESTFAILCOMEDYMOVIES:
      return {
        comedymovie: null,
        isloading: false,
      };
      break;

    default:
      return state;
      break;
  }
};

export default comedyMovieReducer;
