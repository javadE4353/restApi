import {
  REQUESTMOVIES,
  REQUESTGETMOVIES,
  REQUESTDELETEMOVIES,
  REQUESTUPDATEMOVIES,
  REQUESTINSERTMOVIE,
  REQUESTFAILMOVIES,
} from "../types/types";
import apiConfig, { axiospublic, BASE_URL } from "../../axios/configApi";
import { Movies } from "../../typeing";
import { AxiosInstance } from "axios";

interface Payload {
  movies: Movies[] | null;
  insert: number;
  update: number;
  delete: number;
  ErrorMessage: string | null;
}

interface Option {
  page?: number;
  pageSize?: number;
  category?: number;
  username?: string;
  all?: boolean;
}

type MoviesAction = {
  type: string;
  payload?: Payload;
};
type DispatchType = (args: MoviesAction) => MoviesAction;

export const getmovies = (option: Option) => {
  let url = `${BASE_URL}/movies`;
  let baseUrl = ``;
  if (
    option?.page &&
    option.pageSize &&
    option?.all &&
    option?.category &&
    option?.username
  ) {
    baseUrl = `${url}?page=${option?.page}&pageSize=${option?.pageSize}&category=${option?.category}&username=${option?.username}&all=${option.all}`;
  } else if (
    option?.page &&
    option.pageSize &&
    option?.category &&
    option?.username
  ) {
    baseUrl = `${url}?page=${option?.page}&pageSize=${option?.pageSize}`;
  } else if (option?.page && option.pageSize && option?.category) {
    baseUrl = `${url}?page=${option?.page}&pageSize=${option?.pageSize}`;
  } else if (option?.category && option?.username) {
    baseUrl = `${url}?category=${option?.category}&username=${option?.username}`;
  } else if (option?.page && option.pageSize) {
    baseUrl = `${url}?page=${option?.page}&pageSize=${option?.pageSize}`;
  } else if (option?.page) {
    baseUrl = `${url}?page=${option?.page}&pageSize=${1000}`;
  } else if (option?.username) {
    baseUrl = `${url}?username=${option?.username}`;
  } else if (option?.category) {
    baseUrl = `${url}?category=${option?.category}`;
  } else if (option?.all) {
    baseUrl = `${url}?all=true`;
  } else if (
    Object.keys(option).length < 1 ||
    option == null ||
    option == undefined
  ) {
    baseUrl = `${url}`;
  }
  return async (dispatch: DispatchType) => {
    dispatch({ type: REQUESTMOVIES });
    try {
      const response = await axiospublic.get(`${baseUrl}`);
      dispatch({
        type: REQUESTGETMOVIES,
        payload: {
          movies: response?.data.data,
          update: 0,
          insert: 0,
          delete: 0,
          ErrorMessage: null,
        },
      });
      console.log(response?.data.data);
    } catch (error) {
      let ErrorMsg = "error";
      dispatch({
        type: REQUESTFAILMOVIES,
        payload: {
          movies: null,
          update: 0,
          insert: 0,
          delete: 0,
          ErrorMessage: ErrorMsg,
        },
      });
    }
  };
};

// get movie single movie action

interface Payloadgetmovie {
  movie: Movies | null;
  insert: number;
  update: number;
  delete: number;
  ErrorMessage: string | null;
}

type MovieAction = {
  type: string;
  payload?: Payloadgetmovie;
};
type DispatchTypemovie = (args: MovieAction) => MovieAction;

export const getmovie = (
  axiosPrivate: AxiosInstance,
  category: string,
  title: string
) => {
  return async (dispatch: DispatchTypemovie) => {
    dispatch({ type: REQUESTMOVIES });
    try {
      const response = await axiosPrivate.get(
        `${BASE_URL}/movies?&category=${category}&title?page=${title}`
      );
      dispatch({
        type: REQUESTGETMOVIES,
        payload: {
          movie: response?.data.data,
          update: 0,
          insert: 0,
          delete: 0,
          ErrorMessage: null,
        },
      });
      // console.log(response?.data?.data)
    } catch (error) {
      let ErrorMsg = "error";
      dispatch({
        type: REQUESTFAILMOVIES,
        payload: {
          movie: null,
          update: 0,
          insert: 0,
          delete: 0,
          ErrorMessage: ErrorMsg,
        },
      });
    }
  };
};

// insert movie

interface Payloadinsert {
  insert: number;
  ErrorMessage: string | null;
}

type MovieActioninsert = {
  type: string;
  payload?: Payloadinsert;
};
type DispatchTypeinsert = (args: MovieActioninsert) => MovieActioninsert;

export const insertmovie = (
  axiosPrivate: AxiosInstance,
  data: FormData,
  userid: number
) => {
  return async (dispatch: DispatchTypeinsert) => {
    dispatch({ type: REQUESTMOVIES });
    try {
     console.log( data?.get("genre_ids"))
      const response = await axiosPrivate.post(
        `${BASE_URL}/movies?userid=${userid}`,
        data
      );
      dispatch({
        type: REQUESTINSERTMOVIE,
        payload: { insert: response?.data?.data[0], ErrorMessage: null },
      });
      // console.log(response?.data?.data)
    } catch (error) {
      let ErrorMsg = "error";
      dispatch({
        type: REQUESTFAILMOVIES,
        payload: { insert: 0, ErrorMessage: ErrorMsg },
      });
    }
  };
};

// delete movie

interface Payloaddelete {
  delete: number;
  ErrorMessage: string | null;
}

type MovieActiondelete = {
  type: string;
  payload?: Payloaddelete;
};
type DispatchTypedelete = (args: MovieActiondelete) => MovieActiondelete;

export const deletemovie = (
  axiosPrivate: AxiosInstance,
  title: string,
  movieid: number,
  username: string
) => {
  return async (dispatch: DispatchTypedelete) => {
    dispatch({ type: REQUESTMOVIES });
    try {
      const response = await axiosPrivate.delete(
        `${BASE_URL}/movies?title${title}&movieid${movieid}&username${username}`
      );
      dispatch({
        type: REQUESTDELETEMOVIES,
        payload: { delete: response?.data?.data[0], ErrorMessage: null },
      });
      // console.log(response?.data?.data)
    } catch (error) {
      let ErrorMsg = "error";
      dispatch({
        type: REQUESTFAILMOVIES,
        payload: { delete: 0, ErrorMessage: ErrorMsg },
      });
    }
  };
};

// update movie

interface Payloadupdate {
  update: number;
  ErrorMessage: string | null;
}

type MovieActionupdate = {
  type: string;
  payload?: Payloadupdate;
};
type DispatchTypeupdate = (args: MovieActionupdate) => MovieActionupdate;

export const updatemovie = (
  axiosPrivate: AxiosInstance,
  data: Movies,
  title: string,
  movieid?: number,
  username?: string
) => {
  return async (dispatch: DispatchTypeupdate) => {
    dispatch({ type: REQUESTMOVIES });
    try {
      const response = await axiosPrivate.put(
        `${BASE_URL}/movies?title=${title}&movieid=${movieid}&username=${username}`,
        data
      );
      dispatch({
        type: REQUESTUPDATEMOVIES,
        payload: { update: response?.data?.data[0], ErrorMessage: null },
      });
      console.log(response?.data?.data);
    } catch (error) {
      let ErrorMsg = "error";
      dispatch({
        type: REQUESTFAILMOVIES,
        payload: { update: 0, ErrorMessage: ErrorMsg },
      });
    }
  };
};

export default getmovies;
