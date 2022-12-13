import {
  REQUESTMOVIE,
  REQUESTSUCCESSMOVIE,
  REQUESTFAILMOVIE,
} from "../../types/types";

import { Action } from "../../action/actionMovie";
import {Movies} from "../../../typeing"

interface MovieType {
  movie: Movies[];
  isloading: boolean;
}

const initialState = {
  movie: [],
  isloading: false,
};

const movieReducer = (state: MovieType = initialState, action: Action) => {
  const { type, payload } = action;

  switch (type) {
    case REQUESTMOVIE:
      return {
        movie: null,
        isloading: true,
      };
      break;
    case REQUESTSUCCESSMOVIE:
      return {
        movie: payload,
        isloading: true,
      };
      break;
    case REQUESTFAILMOVIE:
      return {
        movie: null,
        isloading: false,
      };
      break;

    default:
      return state;
      break;
  }
};

export default movieReducer;
