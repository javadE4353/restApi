import {
  REQUESTROMANCEMOVIES,
  REQUESTFAILROMANCEMOVIES,
  REQUESTSUCCESSROMANCEMOVIES
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


const getRomancMovie = () => {
  return async (dispatch:DispatchType) => {
    dispatch({ type: REQUESTROMANCEMOVIES,payload:null });
    const url = apiConfig.baseUrl;
    try {
      const response = await axiosClient.get(`${apiConfig.fetchRomanceMovies}`);
      dispatch({
        type: REQUESTSUCCESSROMANCEMOVIES,
        payload:response?.data?.results,
      });
    } catch (error) {
      dispatch({
        type: REQUESTFAILROMANCEMOVIES,
        payload:null
      });
    }
  };
};


export default getRomancMovie;