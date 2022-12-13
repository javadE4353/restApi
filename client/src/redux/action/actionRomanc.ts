import {REQUESTROMANCEMOVIES,REQUESTFAILROMANCEMOVIES,REQUESTSUCCESSROMANCEMOVIES} from "../types/types";
import {Movies} from '../../typeing'

interface requestTypeRomanc{
  type: "REQUESTROMANCEMOVIES";
  payload: null;
}
interface successRomanc{
  type: "REQUESTSUCCESSROMANCEMOVIES";
  payload: Movies[];
}
interface failrequestRomanc {
  type: "REQUESTFAILROMANCEMOVIES";
  payload: null;
}

export type Action = requestTypeRomanc| successRomanc| failrequestRomanc;