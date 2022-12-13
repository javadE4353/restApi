import {
    REQUESTCOMMENT,
    SUCCESSCOMENT,
    FAILDCOMMENT,
    INSERTCOMMENT
  } from "../types/types";

  import {CommentType} from "../../typeing"
  interface requestComment {
    type: "REQUESTCOMMENT";
    payload:null
  }
  interface successComment {
    type: "SUCCESSCOMENT";
    payload:{comment:CommentType[],ErrorMassege:null}
  }
  interface faildComment {
    type: "FAILDCOMMENT";
    payload:{comment:null[],ErrorMassege:string}
  }
  interface insertComment {
    type: "INSERTCOMMENT";
    payload: {insert:number}
  }
  export type Action = insertComment | faildComment | successComment |requestComment;
  