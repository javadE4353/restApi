import {
  REQUESTMOVIE,
  REQUESTSUCCESSMOVIE,
  REQUESTFAILMOVIE,
} from "../types/types";
import { Dispatch } from "redux";
import axiosClient from "../../axios/apiClient";
import apiConfig from "../../axios/configApi";
import {Action} from "../action/actionMovie"

interface Movies {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
  }
  
type MoviesAction = {
    type: string
    payload: Movies[] | null
  }
type DispatchType = (args: MoviesAction) => MoviesAction


const getMoviePopuler = () => {
  return async (dispatch:DispatchType) => {
    dispatch({ type: REQUESTMOVIE,payload:null });
    const url = apiConfig.baseUrl;
    try {
      const response = await axiosClient.get(url+"movie/popular?"+`api_key=${apiConfig.apiKey}&page=1`);
      dispatch({
        type: REQUESTSUCCESSMOVIE,
        payload:response?.data?.results,
      });
    } catch (error) {
      dispatch({
        type: REQUESTFAILMOVIE,
        payload:null
      });
    }
  };
};


export default getMoviePopuler;