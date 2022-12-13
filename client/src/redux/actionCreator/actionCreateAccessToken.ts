import {
  ACCESSTOKEN_REQUEST,
  ACCESSTOKEN_SUCCESS,
  ACCESSTOKEN_FAIL,
  REFRESH_ACCESSTOKEN,
} from "../types/types";

import {Dispatch} from "redux"
import { axiospublic } from "../../axios/configApi";
import { Userinfo } from "../../typeing";

type Payload = {
  errorMessage: string | null;
  accessToken:string | undefined
};

type PayloadRefreshToken = {
  type: string;
  payload?: Payload;
};

type DispatchType = (args: PayloadRefreshToken) => PayloadRefreshToken;
const newAccessTokenAction = (dispaTch:Dispatch) => async (dispatch: DispatchType) => {
  try {
    dispatch({ type: ACCESSTOKEN_REQUEST });

    const response = await axiospublic.get("/auth/refreshtoken");
    
    dispaTch({
      type: REFRESH_ACCESSTOKEN,
      payload: {
        accessToken: response.data.data.accessToken,
        userInfo: response.data.data.userInfo,
      },
    });
    // console.log(response);
    dispatch({ type: ACCESSTOKEN_SUCCESS,payload:{accessToken:response.data.data.accessToken,errorMessage:null} });
  } catch (error:any) {
    // console.log(error);
    let errorMsg = '';
      if (!error?.response) {
        errorMsg = "Server not respond";
      } else {
        errorMsg = "Invalid refresh token";
      }

    dispatch({ type: ACCESSTOKEN_FAIL, payload: { errorMessage: errorMsg,accessToken:undefined } });
  }
};

export default newAccessTokenAction;
