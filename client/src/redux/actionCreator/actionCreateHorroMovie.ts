import {
REQUESTHORRORMOVIES,
REQUESTFAILHORRORMOVIES,
REQUESTSUCCESSHORRORMOVIES
} from "../types/types";
import axiosClient from "../../axios/apiClient";
import apiConfig from "../../axios/configApi";
import { Movies } from "../../typeing";

type MoviesAction = {
  type: string;
  payload: Movies[] | null;
};
type DispatchType = (args: MoviesAction) => MoviesAction;

const getHorroMovie = () => {
  return async (dispatch: DispatchType) => {
    dispatch({ type: REQUESTHORRORMOVIES, payload: null });
    const url = apiConfig.baseUrl;
    try {
      const response = await axiosClient.get(
        `${apiConfig.fetchHorrorMovies}`
      );
      dispatch({
        type: REQUESTSUCCESSHORRORMOVIES,
        payload: response?.data?.results,
      });
    } catch (error) {
      dispatch({
        type: REQUESTFAILHORRORMOVIES,
        payload: null,
      });
    }
  };
};

export default getHorroMovie;
