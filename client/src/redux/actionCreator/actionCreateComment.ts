import {
    REQUESTCOMMENT,
    SUCCESSCOMENT,
    FAILDCOMMENT,
    INSERTCOMMENT
  } from "../types/types";
  import { BASE_URL } from "../../axios/configApi";
  import { CommentType } from "../../typeing";
  import { AxiosInstance } from "axios";
  


  interface typeState{
    comment:CommentType|null
    insert:number | null
    ErrorMassege:null | string
  }

  type payload = {
    type: string,
    payload?: typeState,
  };
  type DispatchType = (args: payload) => payload;
  
  export const getComments = (movietitle:string,movieid:number,axiosPrivate: AxiosInstance) => {
    return async (dispatch: DispatchType) => {
      dispatch({ type: REQUESTCOMMENT });
      try {
        // console.log("----------------------------------------------comment")
        const response = await axiosPrivate.get(`${BASE_URL}/review?movieid=${movieid}&movietitle=${movietitle}`);
        // console.log(response?.data?.data);
        dispatch({
          type: SUCCESSCOMENT,
          payload:{comment:response?.data?.data,ErrorMassege:null,insert:null}
        });
      } catch (error) {
        let errorMsg="error"
        dispatch({
          type: FAILDCOMMENT,
          payload:{ErrorMassege:errorMsg,comment:null,insert:null}
        });
      }
    };
  };
  export const insertComment = (data:CommentType, axiosPrivate: AxiosInstance) => {
    return async (dispatch: DispatchType) => {
      dispatch({ type: REQUESTCOMMENT });
  
      try {
        const response = await axiosPrivate.post(`${BASE_URL}/review`, data);
        // console.log(response);
        dispatch({
          type: INSERTCOMMENT,
          payload:{insert:response?.status,ErrorMassege:null,comment:null}
        });
      } catch (error) {
        // console.log(error);
        dispatch({
          type: FAILDCOMMENT,
        });
      }
    };
  };
 