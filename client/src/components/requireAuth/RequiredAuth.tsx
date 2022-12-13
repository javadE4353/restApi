import { Outlet, useNavigate, Navigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import newAccessTokenAction from "../../redux/actionCreator/actionCreateAccessToken";

import { useEffect,useState } from "react";

import {Userinfo} from "../../typeing"
import { Dispatch } from "redux";

//loader

interface StateTypeAuth {
  auth:{accessToken: string | null | undefined;
  userInfo: Userinfo;
  isLoading: boolean;
  erroMessage: null;}
}

interface accessToken{
  isLoading:boolean,
  errorMessage:null,
}

interface Props{
  allowedRoles:string[]
}

const RequiredAuth = ({ allowedRoles }:Props) => {
  const user = useSelector((state:StateTypeAuth) => state?.auth);
  const newAccessToken = useSelector((state:accessToken) => state);
  const [role,setRole]=useState<string>('')
  const location = useLocation();
  const dispatch: Dispatch<any> = useDispatch();
  const navigate = useNavigate();
  // console.log(user)
  // useEffect(() => {
  //   if (!user?.accessToken) {
  //     console.log(user)
  //     dispatch(newAccessTokenAction())
  //   }
  //   // if (!user?.accessToken) dispatch(newAccessTokenAction());
  // }, []);
 
  // if (newAccessToken?.errorMessage) {
  //   // navigate("./login");
  //   console.log(newAccessToken?.errorMessage)
  // }
 
  return allowedRoles?.includes(user?.userInfo !== null?user?.userInfo.role:'') ? (
    <>
      <div className="">
        <Outlet />
      </div>
    </>
  ) : user?.accessToken ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequiredAuth;
