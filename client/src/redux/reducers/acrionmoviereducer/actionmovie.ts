import {
  REQUESTACTIONMOVIES,
  REQUESTFAILACTIONMOVIES,
  REQUESTSUCCESSACTIONMOVIES,
} from "../../types/types";

import { Action } from "../../action/actionAmovie";
import { Movies } from "../../../typeing";

interface MovieType {
  actionmovie: Movies[];
  isloading: boolean;
}

const initialState = {
  actionmovie: [],
  isloading: false,
};

const actionmovieReducer = (
  state: MovieType = initialState,
  action: Action
) => {
  const { type, payload } = action;

  switch (type) {
    case REQUESTACTIONMOVIES:
      return {
        actionmovie: null,
        isloading: true,
      };
      break;
    case REQUESTSUCCESSACTIONMOVIES:
      return {
        actionmovie: payload,
        isloading: true,
      };
      break;
    case REQUESTFAILACTIONMOVIES:
      return {
        actionmovie: null,
        isloading: false,
      };
      break;

    default:
      return state;
      break;
  }
};

export default actionmovieReducer;
