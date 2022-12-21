import {
  REQUESTMYLIST,
  REQUESTSECCESSMYLIST,
  INSERTMYLIST,
  REQUESTFAILDMYLIST,
  REMOVEMYLIST,
} from "../types/types";
import { BASE_URL } from "../../axios/configApi";
import { Movies } from "../../typeing";
import { AxiosInstance } from "axios";

type MoviesAction = {
  type: string;
  payload: Movies[] | null;
};
type DispatchType = (args: MoviesAction) => MoviesAction;

export const getAllmylist = (userid: number,axiosPrivate: AxiosInstance,page=1,pageSize=5) => {
  // console.log(userid);
  return async (dispatch: DispatchType) => {
    dispatch({ type: REQUESTMYLIST,payload:null });
    try {
      const response = await axiosPrivate.get(`${BASE_URL}/mylist/${userid}?page=${page}&pageSize=${pageSize}`);
      console.log(response);
      dispatch({
        type: REQUESTSECCESSMYLIST,
        payload: response?.data?.data,
      });
    } catch (error) {
      dispatch({
        type: REQUESTFAILDMYLIST,
        payload:null
      });
    }
  };
};
export const insertmylist = (movie: Movies, axiosPrivate: AxiosInstance) => {
  return async (dispatch: DispatchType) => {
    dispatch({ type: REQUESTMYLIST, payload:null});

    try {
      const response = await axiosPrivate.post(`${BASE_URL}/mylist`, movie);
      // console.log(movie);
      // console.log(response);
      dispatch({
        type: INSERTMYLIST,
        payload:null
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: REQUESTFAILDMYLIST,
        payload:null
      });
    }
  };
};
export const removeMovieMylist = (
  userid: number,
  movieid: number,
  axiosPrivate: AxiosInstance
) => {
  return async (dispatch: DispatchType) => {
    dispatch({ type: REQUESTMYLIST,payload:null });

    try {
      const response = await axiosPrivate.delete(
        `${BASE_URL}/mylist?userid=${userid}&movieid=${movieid}`
      );
      console.log(response);
      dispatch({
        type: REMOVEMYLIST,
        payload:null
      });
      if (response?.status === 200) {
        const response = await axiosPrivate.get(`${BASE_URL}/mylist/${userid}`);
        console.log(response);
        dispatch({
          type: REQUESTSECCESSMYLIST,
          payload: response?.data?.data,
        });
        console.log(response?.data?.data);
      }
    } catch (error) {
      // console.log(error);
      dispatch({
        type: REQUESTFAILDMYLIST,
        payload:null
      });
    }
  };
};
