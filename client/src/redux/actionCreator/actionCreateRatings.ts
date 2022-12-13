import {
  REQUESTRATING,
  SUCCESSRATING,
  FAILDRATING,
  INSERTRATING,
} from "../types/types";
import { BASE_URL } from "../../axios/configApi";
import { Ratings } from "../../typeing";
import { AxiosInstance } from "axios";

type Ratingdispatch = {
  type: string;
  payload: Ratings[] | null;
};
type DispatchType = (args: Ratingdispatch) => Ratingdispatch;

export const getRatings = (movietitle:string,axiosPrivate: AxiosInstance) => {
  return async (dispatch: DispatchType) => {
    dispatch({ type: REQUESTRATING ,payload:null});
    try {
      const response = await axiosPrivate.get(`${BASE_URL}/ratings?movietitle=${movietitle}`);
      // console.log(response?.data?.data);
      dispatch({
        type: SUCCESSRATING,
        payload: response?.data?.data,
      });
    } catch (error) {
      dispatch({
        type: FAILDRATING,
        payload:null
      });
    }
  };
};
export const insertRatings = (rated: Ratings,movietitle:string, axiosPrivate: AxiosInstance) => {
  return async (dispatch: DispatchType) => {
    dispatch({ type: REQUESTRATING ,payload:null});

    try {
      const response = await axiosPrivate.post(`${BASE_URL}/ratings`, rated);
      // console.log(rated);
      console.log(response);
      dispatch({
        type: INSERTRATING,
        payload:null
      });
      if(response?.status === 200){
        const response = await axiosPrivate.get(`${BASE_URL}/ratings?movietitle=${movietitle}`);
      console.log(response?.data?.data);
      dispatch({
        type: SUCCESSRATING,
        payload: response?.data?.data,
      });
      }
    } catch (error) {
      // console.log(rated);
      dispatch({
        type: FAILDRATING,
        payload:null
      });
    }
  };
};
