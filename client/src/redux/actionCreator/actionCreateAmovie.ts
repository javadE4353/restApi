import {
  REQUESTACTIONMOVIES,
  REQUESTSUCCESSACTIONMOVIES,
  REQUESTFAILACTIONMOVIES,
} from "../types/types";
import axiosClient from "../../axios/apiClient";
import apiConfig from "../../axios/configApi";
import { Movies } from "../../typeing";

type MoviesAction = {
  type: string;
  payload: Movies[] | null;
};
type DispatchType = (args: MoviesAction) => MoviesAction;

const getActionMovie = () => {
  return async (dispatch: DispatchType) => {
    dispatch({ type: REQUESTACTIONMOVIES, payload: null });
    const url = apiConfig.baseUrl;
    try {
      const response = await axiosClient.get(
      `${apiConfig.fetchActionMovies}`
      );
      dispatch({
        type: REQUESTSUCCESSACTIONMOVIES,
        payload: response?.data?.results,
      });
    } catch (error) {
      dispatch({
        type: REQUESTFAILACTIONMOVIES,
        payload: null,
      });
    }
  };
};

export default getActionMovie;
