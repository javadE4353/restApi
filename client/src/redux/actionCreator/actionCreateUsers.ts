import {
    REQUESTUSER,
    GETUSERS,
    GETUSER,
    INCERTUSER,
    UPDATEUSER,
    DELETEUSER,
    FAILREQUESTUSER,
  } from "../types/types";
  import {NewUser, Users} from "../../typeing"
import { AxiosInstance } from "axios";
import { BASE_URL } from "../../axios/configApi";

  interface Payload{
   users:Users[] | null,
   user:Users[]| null
   insert?:Users[]| null
   count?:number
   ErrorMessage:string | null
  }

  type UsersDispatch = {
      type: string
      payload?: Payload
    }
  type DispatchType = (args: UsersDispatch) => UsersDispatch
  export const getUsers = (axiosPrivate: AxiosInstance,page?:number,pageSize?:number) => {
    return async (dispatch:DispatchType) => {
      dispatch({ type: REQUESTUSER });
      try {
        const response = await axiosPrivate.get(`${BASE_URL}/users?page=${page}&pageSize=${pageSize}`);
        dispatch({
          type: GETUSERS,
          payload:{users:response?.data?.data?.[0],ErrorMessage:null,count:response?.data?.data?.[1]?.count,user:null}
        });
        console.log(response)
      } catch (error) {
        let ErrorMsg='error'
        dispatch({
          type: FAILREQUESTUSER,
          payload:{users:null,ErrorMessage:ErrorMsg,user:null}
        });
      }
    };
  };
  
  
  export const deleteUser = (axiosPrivate: AxiosInstance,id:number,page=1,pageSize=5) => {
    return async (dispatch:DispatchType) => {
      dispatch({ type: REQUESTUSER });
      try {
        const response = await axiosPrivate.delete(`${BASE_URL}/users/${id}`);
        dispatch({
          type: DELETEUSER,
        });
        if(response?.status === 200){
          const response = await axiosPrivate.get(`${BASE_URL}/users?page=${page}&pageSize=${pageSize}`);
          dispatch({
            type: GETUSERS,
            payload:{users:response?.data?.data?.[0],ErrorMessage:null,count:response?.data?.data?.[1]?.count,user:null}
          });
          // console.log(response)
        }
        // console.log(response)
      } catch (error) {
        let ErrorMsg='error'
        dispatch({
          type: FAILREQUESTUSER,
          payload:{users:null,ErrorMessage:ErrorMsg,user:null}
        });
      }
    };
  };
  export const getUser = (axiosPrivate: AxiosInstance,id:number) => {
    return async (dispatch:DispatchType) => {
      dispatch({ type: REQUESTUSER });
      try {
        const response = await axiosPrivate.get(`${BASE_URL}/users/find/${id}`);
        dispatch({
          type: GETUSER,
          payload:{user:response?.data?.data,ErrorMessage:null,users:null}
        });
        console.log(response)
      } catch (error) {
        let ErrorMsg='error'
        dispatch({
          type: FAILREQUESTUSER,
          payload:{users:null,ErrorMessage:ErrorMsg,user:null}
        });
      }
    };
  };
  
  export const insertUser = (axiosPrivate: AxiosInstance,newUser:FormData) => {
    return async (dispatch:DispatchType) => {
      dispatch({ type: REQUESTUSER });
      try {
        // console.log(newUser)

        const response = await axiosPrivate.post(`${BASE_URL}/users`,newUser);
        dispatch({
          type: INCERTUSER,
          payload:{insert:response?.data?.data,ErrorMessage:null,user:null,users:null}
        });
        // console.log(response)
      } catch (error) {
        let ErrorMsg='error'
        dispatch({
          type: FAILREQUESTUSER,
          payload:{users:null,ErrorMessage:ErrorMsg,user:null}
        });
      }
    };
  };
  export const updateUser = (axiosPrivate: AxiosInstance,newUser:FormData,id:number) => {
    return async (dispatch:DispatchType) => {
      dispatch({ type: REQUESTUSER });
      try {
        // console.log(newUser.get("username"))
        const response = await axiosPrivate.put(`${BASE_URL}/users/${id}`,newUser);
        dispatch({
          type: UPDATEUSER,
        });
        // console.log(response)
      } catch (error:any) {
          let ErrorMessage='';
          if(error?.response?.status === 401){
           ErrorMessage=" اطلاعات وارد شده صحیح نمیباشد"
          }
          if(error?.response?.status === 409){
           ErrorMessage="نام کاربری وجود دارد"
          }
          if(error?.response?.status !== 409 && error?.response?.status !== 401){
           ErrorMessage=" لطفا بعدا دوباره امتحان کنید"
          }
        dispatch({
          type: FAILREQUESTUSER,
          payload:{users:null,ErrorMessage:ErrorMessage,user:null}
        });
      }
    };
  };
  
  
