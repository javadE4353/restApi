import {
    REQUESTTOPRATED,
    REQUESTSUCCESSTOPRATED,
    REQUESTFAILTOPRATED,
  } from "../types/types";
  import axiosClient from "../../axios/apiClient";
  import apiConfig from "../../axios/configApi";
  import {Movies} from "../../typeing"

  type MoviesAction = {
      type: string
      payload: Movies[] | null
    }
  type DispatchType = (args: MoviesAction) => MoviesAction
  
  
  const getMovieToprated = () => {
    return async (dispatch:DispatchType) => {
      dispatch({ type: REQUESTTOPRATED,payload:null });
      const url = apiConfig.baseUrl;
      try {
        const response = await axiosClient.get(`${apiConfig.fetchTopRated}`);
        dispatch({
          type: REQUESTSUCCESSTOPRATED,
          payload:response?.data?.results,
        });
      } catch (error) {
        dispatch({
          type: REQUESTFAILTOPRATED,
          payload:null
        });
      }
    };
  };
  
  
  export default getMovieToprated;