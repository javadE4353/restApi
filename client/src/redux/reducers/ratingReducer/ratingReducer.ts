
import {REQUESTRATING,SUCCESSRATING,FAILDRATING,INSERTRATING} from "../../types/types";

    
import { Action } from "../../action/actionRatings";
import {Ratings} from "../../../typeing"

interface ratings {
  ratings: Ratings[] | null;
  isloading: boolean;
}

const initialState = {
    ratings: null,
  isloading: false,
};

const ratingsReducer = (state: ratings = initialState, action: Action) => {
  const { type} = action;

  switch (type) {
    case REQUESTRATING:
      return {
        isloading: true,
      };
      break;
    case SUCCESSRATING:
      return {
        ratings: action?.payload,
        isloading: false,
      };
      break;
    case INSERTRATING:
      return {
        isloading: false,
      };
      break;
    case FAILDRATING:
      return {
        isloading: false,
      };
      break;
    default:
      return state;
      break;
  }
};

export default ratingsReducer;
