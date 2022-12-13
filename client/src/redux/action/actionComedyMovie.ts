import {REQUESTCOMEDYMOVIES,REQUESTFAILCOMEDYMOVIES,REQUESTSUCCESSCOMEDYMOVIES} from "../types/types";
import {Movies} from '../../typeing'

interface requestTypeComedyMovie{
  type: "REQUESTCOMEDYMOVIES";
  payload: null;
}
interface successComedyMovie{
  type: "REQUESTSUCCESSCOMEDYMOVIES";
  payload: Movies[];
}
interface failrequestComedyMovie {
  type: "REQUESTFAILCOMEDYMOVIES";
  payload: null;
}

export type Action = requestTypeComedyMovie| successComedyMovie| failrequestComedyMovie;