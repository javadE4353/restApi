import {
REQUESTCOMMENT,
SUCCESSCOMENT,
FAILDCOMMENT,
INSERTCOMMENT
  } from "../../types/types";
  
  import { Action } from "../../action/actionComments";
import {CommentType} from "../../../typeing"

 interface typeState{
    comment:CommentType|null
    insert:number | null
    ErrorMassege:null | string
    isLoading:boolean
  }
  const INITIALSTATE={
    comment:null,
    insert:null,
    isLoading:false,
    ErrorMassege:null,
  }

  function commentReducer(state: typeState = INITIALSTATE, action: Action) {
    const { type, payload } = action;
    switch (type) {
      case REQUESTCOMMENT:
        return {
          ...state,
          isLoading: true,
        };
      case SUCCESSCOMENT:
        return {
          comment:payload.comment,
          isLoading: false,
          ErrorMassege: null,
        };
      case FAILDCOMMENT:
        return {
          comment:null,
          isLoading: false,
          ErrorMassege:payload?.ErrorMassege,
        };
  
      case INSERTCOMMENT:
        return {
            comment:null,
            insert:payload?.insert,
            isLoading: false,
            ErrorMassege: null,
        };
      default:
        return state;
    }
  }
  
  export default commentReducer;
  