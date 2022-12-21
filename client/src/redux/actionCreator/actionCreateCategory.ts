import {
  REQUESCATEGORY,
  GETCATEGORY,
  INSERTCATEGORY,
  UPDATECATEGORY,
  DELETECATEGORY,
  FAILCATEGORY,
} from "../types/types";
import { axiospublic, BASE_URL } from "../../axios/configApi";
import { AxiosInstance } from "axios";

interface Cat {
  name: string;
  bits: number;
  image: string;
  content: string;
}
interface payload {
  categorys: Cat[] | null;
  update: number;
  delete: number;
  insert: number;
  ErrorMassege: string | null;
}

type Categorys = {
  type: string;
  payload?: payload;
};
type DispatchType = (args: Categorys) => Categorys;

const getCategorys = (name?: string, movieName?: string) => {
  const url = `${BASE_URL}/category`;
  let baseUrl = "";

  if (name && movieName) {
    baseUrl = `${url}?name=${name}&moviename=${movieName}`;
  } else if (name) {
    baseUrl = `${url}?name=${name}`;
  } else if (movieName) {
    baseUrl = `${url}?moviename=${movieName}`;
  } else {
    baseUrl = `${url}`;
  }
  return async (dispatch: DispatchType) => {
    dispatch({ type: REQUESCATEGORY });
    try {
      const response = await axiospublic.get(`${baseUrl}`);
      dispatch({
        type: GETCATEGORY,
        payload: {
          insert: 0,
          update: 0,
          delete: 0,
          categorys: response?.data?.data,
          ErrorMassege: null,
        },
      });
      // console.log(response)
    } catch (error) {
      let ErrorMsg = "error";
      dispatch({
        type: FAILCATEGORY,
        payload: {
          insert: 0,
          update: 0,
          delete: 0,
          categorys: null,
          ErrorMassege: ErrorMsg,
        },
      });
    }
  };
};



// insert category


interface payloadInsert {
  insert: number;
  ErrorMassege: string | null;
}

type CategorysInsert = {
  type: string;
  payload?: payloadInsert;
};
type DispatchTypeInsert = (args: CategorysInsert) => CategorysInsert;

export const insertCaegory = (axiosPrivate:AxiosInstance,data:FormData,userid:number) => {
  
  return async (dispatch: DispatchTypeInsert) => {
    dispatch({ type: REQUESCATEGORY });
    try {
      const response = await axiosPrivate.post(`${BASE_URL}/category?userid=${userid}`,data);
      if(response?.status === 201){
        dispatch({
          type: GETCATEGORY,
          payload: {
            insert: 0,
            ErrorMassege: null,
          },
        });
      }
      // console.log(response)
    } catch (error) {
      let ErrorMsg = "error";
      dispatch({
        type: FAILCATEGORY,
        payload: {
          insert: 0,
          ErrorMassege: ErrorMsg,
        },
      });
    }
  };
};
// update category


interface payloadUpdate {
  update: number;
  ErrorMassege: string | null;
}

type CategoryUpdate = {
  type: string;
  payload?: payloadUpdate;
};
type DispatchTypeUpdate = (args: CategoryUpdate) => CategoryUpdate;

export const updateCategory = (axiosPrivate:AxiosInstance,data:FormData,userid:number) => {
  
  return async (dispatch: DispatchTypeUpdate) => {
    dispatch({ type: REQUESCATEGORY });
    try {
      const response = await axiosPrivate.put(`${BASE_URL}/category?userid=${userid}`,data);
      if(response?.status === 201){
        dispatch({
          type: GETCATEGORY,
          payload: {
            update: 0,
            ErrorMassege: null,
          },
        });
      }
      // console.log(response)
    } catch (error) {
      let ErrorMsg = "error";
      dispatch({
        type: FAILCATEGORY,
        payload: {
          update: 0,
          ErrorMassege: ErrorMsg,
        },
      });
    }
  };
};
// delete category


interface payloadDelete {
  delete: number;
  ErrorMassege: string | null;
}

type CategoryDelete = {
  type: string;
  payload?: payloadDelete;
};
type DispatchTypeDelete = (args: CategoryDelete) => CategoryDelete;

export const deleteCatgory = (axiosPrivate:AxiosInstance,bits:number,userid:number) => {

  return async (dispatch: DispatchTypeDelete) => {
    dispatch({ type: REQUESCATEGORY });
    try {
      const response = await axiosPrivate.delete(`${BASE_URL}/category?userid=${userid}&bits=${bits}`);
      if(response?.status === 201){
        dispatch({
          type: GETCATEGORY,
          payload: {
            delete: 0,
            ErrorMassege: null,
          },
        });
      }
      // console.log(response)
    } catch (error) {
      let ErrorMsg = "error";
      dispatch({
        type: FAILCATEGORY,
        payload: {
          delete: 0,
          ErrorMassege: ErrorMsg,
        },
      });
    }
  };
};









export default getCategorys;
