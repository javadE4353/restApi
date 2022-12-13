import { REQUESTFAILTOPRATED, REQUESTTOPRATED,REQUESTSUCCESSTOPRATED } from "../types/types";
import {Movies} from '../../typeing'

interface requestTypeToprated {
  type: "REQUESTTOPRATED";
  payload: null;
}
interface successTopRated {
  type: "REQUESTSUCCESSTOPRATED";
  payload: Movies[];
}
interface failrequestRated {
  type: "REQUESTFAILTOPRATED";
  payload: null;
}

export type Action = requestTypeToprated | successTopRated | failrequestRated;