import {REQUESTACTIONMOVIES,REQUESTFAILACTIONMOVIES,REQUESTSUCCESSACTIONMOVIES} from "../types/types";
import {Movies} from '../../typeing'

interface requestTypeToprated {
  type: "REQUESTACTIONMOVIES";
  payload: null;
}
interface successTopRated {
  type: "REQUESTSUCCESSACTIONMOVIES";
  payload: Movies[];
}
interface failrequestRated {
  type: "REQUESTFAILACTIONMOVIES";
  payload: null;
}

export type Action = requestTypeToprated | successTopRated | failrequestRated;