import {REQUESTRATING,SUCCESSRATING,FAILDRATING,INSERTRATING} from "../types/types";
import {Ratings} from '../../typeing'


interface requestRatings{
  type: "REQUESTRATING";
}
interface successRatings{
  type: "SUCCESSRATING";
  payload: Ratings[];
}
interface insertRatings {
  type: "INSERTRATING";
}
interface faildRatings {
  type: "FAILDRATING";
}

export type Action = requestRatings| successRatings| faildRatings | insertRatings;