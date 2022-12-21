import {
  REQUESCATEGORY,
  GETCATEGORY,
  INSERTCATEGORY,
  UPDATECATEGORY,
  DELETECATEGORY,
  FAILCATEGORY,
} from "../../types/types";

import { Action } from "../../action/actionCategory";

interface Cat{
  name:string,
  bits:number,
  image:string,
  content:string 
}

interface Categorys {
  categorys: Cat[] | null;
  update:number
  delete:number
  insert:number
  isloading: boolean;
  ErrorMassege:string | null
}

const initialState = {
  categorys: null,
  update:0,
  delete:0,
  insert:0,
  isloading: false,
  ErrorMassege: null

};

const categoryReducer = (state: Categorys = initialState, action: Action) => {
  const { type } = action;

  switch (type) {
    case REQUESCATEGORY:
      return {
        topRated: null,
        isloading: true,
      };
      break;
    case GETCATEGORY:
      return {
        categorys: action?.payload?.categorys,
        isloading: true,
      };
      break;
    case INSERTCATEGORY:
      return {
        insert: action?.payload?.insert,
        isloading: false,
      };
      break;
    case UPDATECATEGORY:
      return {
        update: action?.payload?.update,
        isloading: false,
      };
      break;
    case DELETECATEGORY:
      return {
        delete: action?.payload?.delete,
        isloading: false,
      };
      break;
    case FAILCATEGORY:
      return {
        ErrorMassege: action?.payload?.ErrorMassege,
        isloading: false,
      };
      break;

    default:
      return state;
      break;
  }
};

export default categoryReducer;
