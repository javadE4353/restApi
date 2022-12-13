import {
REQUESTCOMEDYMOVIES,
REQUESTFAILCOMEDYMOVIES,
REQUESTSUCCESSCOMEDYMOVIES
} from "../types/types";
import axiosClient from "../../axios/apiClient";
import apiConfig from "../../axios/configApi";
import { Movies } from "../../typeing";

type MoviesAction = {
  type: string;
  payload: Movies[] | null;
};
type DispatchType = (args: MoviesAction) => MoviesAction;

const getComedyMovie = () => {
  return async (dispatch: DispatchType) => {
    dispatch({ type: REQUESTCOMEDYMOVIES, payload: null });
    const url = apiConfig.baseUrl;
    try {
      const response = await axiosClient.get(
        `${apiConfig.fetchComedyMovies}`
      );
      dispatch({
        type: REQUESTFAILCOMEDYMOVIES,
        payload: response?.data?.results,
      });
    } catch (error) {
      dispatch({
        type: REQUESTSUCCESSCOMEDYMOVIES,
        payload: null,
      });
    }
  };
};

export default getComedyMovie;
