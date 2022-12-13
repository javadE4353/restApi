import {REQUESTHORRORMOVIES,REQUESTFAILHORRORMOVIES,REQUESTSUCCESSHORRORMOVIES} from "../types/types";
import {Movies} from '../../typeing'

interface requestTypeHorroMovie {
  type: "REQUESTHORRORMOVIES";
  payload: null;
}
interface successHorroMovie {
  type: "REQUESTSUCCESSHORRORMOVIES";
  payload: Movies[];
}
interface failrequestHorro {
  type: "REQUESTFAILHORRORMOVIES";
  payload: null;
}

export type Action = requestTypeHorroMovie | successHorroMovie | failrequestHorro;