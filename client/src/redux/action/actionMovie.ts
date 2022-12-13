import { REQUESTSUCCESSMOVIE, REQUESTFAILMOVIE,REQUESTMOVIE } from "../types/types";
import {Movies} from '../../typeing'

interface requestMovie {
  type: "REQUESTMOVIE";
  payload: null;
}
interface success {
  type: "REQUESTSUCCESSMOVIE";
  payload: Movies[];
}
interface failrequest {
  type: "REQUESTFAILMOVIE";
  payload: null;
}

export type Action = requestMovie | success | failrequest;
