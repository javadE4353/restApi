import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import loginAction from "../redux/actionCreator/actionCreateAuth";
import { Userinfo } from "../typeing";
import newAccessTokenAction from "../redux/actionCreator/actionCreateAccessToken";
interface Inputs {
  username: string;
  password: string;
}
interface typePayload {
  auth: {
    accessToken: string | null;
    userInfo: Userinfo | null;
    errorMessage: null | string;
  };
}

function Login() {
  const [login, setLogin] = useState<boolean>(false);
  const settime = useRef<NodeJS.Timeout | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const dispatch: Dispatch<any> = useDispatch();
  const loginState = useSelector((state: typePayload) => state?.auth);
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    try {
      setLogin(true);
      dispatch(loginAction(data?.username, data?.password));
    } catch (error) {
      // console.log(error)
    }
  };
  useEffect(() => {
    if (loginState?.errorMessage !== null && loginState?.accessToken === null) {
      setErrorMsg(loginState?.errorMessage);
      settime.current = setTimeout(() => {
        setErrorMsg("");
        setLogin(false);
      }, 2000);
    } else if (
      loginState?.errorMessage === null && loginState?.accessToken !== null) {
      navigate("/");
      setErrorMsg("");
    }
    return ()=>clearTimeout(settime?.current as NodeJS.Timeout);
  }, [loginState?.errorMessage]);
  useEffect(() => {
   if (
      loginState?.errorMessage === null && loginState?.accessToken !== null ) {
      navigate("/");
      setErrorMsg("");
      dispatch(newAccessTokenAction(dispatch));
    }
    return ()=>clearTimeout(settime?.current as NodeJS.Timeout);
  }, [loginState?.accessToken]);
  return (
    <div className="relative flex h-screen w-screen flex-col md:items-center md:justify-center">
      <form
        className="relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14"
        onSubmit={handleSubmit(onSubmit)}
      >
        <span className="">{errorMsg}</span>
        <h1 className="text-4xl font-semibold">ورود</h1>
        <div className="space-y-4">
          <label className="inline-block w-full">
            <input
              type="text"
              placeholder="Username"
              className="input"
              {...register("username", { required: true })}
            />
            {errors.username && (
              <p className="text-sm  text-orange-500">
                نام کاربری خود را وارد کنید
              </p>
            )}
          </label>
          <label className="inline-block w-full">
            <input
              type="password"
              {...register("password", { required: true })}
              placeholder="Password"
              className="input"
            />
            {errors.password && (
              <p className="text-sm  text-orange-500">
                پسورد نمیتواند کمتر از 4 کاراکتر باشد
              </p>
            )}
          </label>
        </div>
        <button
          className="w-full rounded bg-[#E50914] py-3 font-semibold"
          // onClick={() => setLogin(true)}
          type="submit"
        >
          ورود
        </button>
        <div className="text-[gray]">
          اکانت جدید?{" "}
          <Link
            to="/register"
            className="cursor-pointer text-white hover:underline"
          >
            ثبت نام
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
