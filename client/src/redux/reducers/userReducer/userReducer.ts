import {
  REQUESTUSER,
  GETUSERS,
  GETUSER,
  INCERTUSER,
  UPDATEUSER,
  DELETEUSER,
  FAILREQUESTUSER,
} from "../../types/types";
import { Users } from "../../../typeing";
import { Action } from "../../action/actionUsers";
interface State {
  users: Users[] | null;
  user:Users | null
  insert:Users | null
  count:number | null
  isloading: boolean;
  ErrorMessage: string | null;
}

const initialState = {
  users: null,
  user:null,
  insert:null,
  count:null,
  isloading: false,
  ErrorMessage: null,
};

const usersReducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case REQUESTUSER:
      return {
        isloading: true,
      };
      break;
    case GETUSERS:
      return {
        users: action?.payload?.users,
        count:action?.payload?.count,
        isloading: false,
      };
      break;
    case GETUSER:
      return {
        user: action?.payload?.user,
        isloading: false,
      };
      break;
    case INCERTUSER:
      return {
        insert: action?.payload?.insert,
        isloading: false,
      };
      break;
    case UPDATEUSER:
      return {
        users: action?.payload?.users,
        isloading: false,
      };
      break;
    case DELETEUSER:
      return {
        isloading: false,
      };
      break;
    case FAILREQUESTUSER:
      return {
        users: action?.payload?.ErrorMassege,
        isloading: false,
      };
      break;

    default: {
      return state;
    }
  }
};


export default usersReducer;