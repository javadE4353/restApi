import { useRef, useState,CSSProperties  } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link,useNavigate } from "react-router-dom";
import { axiospublic, BASE_URL } from "../axios/configApi";
import ClipLoader from "react-spinners/ClipLoader";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

interface Inputs {
  email: string;
  username: string;
  mobile: string;
  password: string;
}

function Register() {
  let [color, setColor] = useState("#ffffff");
  const [login, setLogin] = useState(false);
  const [isloading, setIsloading] = useState(false);
  const [Errormsg, setErrormsg] = useState<string>('');
  const navigate=useNavigate()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
     try {
       if (!Errormsg) {
        setIsloading(true)
        const res = await axiospublic.post<Inputs>(`/auth/regeister`, data);
          setIsloading(false)
          navigate("/login")
       }
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
     setIsloading(false)
     setErrormsg(ErrorMessage)
     }
  };

  return (
    <div className="relative flex h-screen w-screen flex-col md:items-center md:justify-center">
      <form
        className="relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="text-red-400">{Errormsg}</div>
        <h1 className="text-4xl font-semibold">ثبت نام</h1>
        <div className="space-y-4">
          <label className="inline-block w-full">
            <input
              type="text"
              placeholder="Username"
              className="input"
              {...register("username", { required: true,maxLength:20 })}
            />
            {errors.username && (
              <p className="text-sm  text-orange-500">
                نام کاربری خود را وارد کنید
              </p>
            )}
          </label>
          <label className="inline-block w-full">
            <input
              type="mobile"
              placeholder="Mobile"
              className="input"
              {...register("mobile", { required: true,maxLength:11 })}
            />
            {errors.mobile && (
              <p className="text-sm  text-orange-500">
                شماره موبایل خود را وارد کنید
              </p>
            )}
          </label>
          <label className="inline-block w-full">
            <input
              type="email"
              placeholder="Email"
              className="input"
              {...register("email", { required: true,maxLength:50 })}
            />
            {errors.email && (
              <p className="text-sm  text-orange-500">ایمیل خود را وارد کنید</p>
            )}
          </label>
          <label className="inline-block w-full">
            <input
              type="password"
              {...register("password", { required: true,maxLength:16 })}
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
          {
            isloading?
            <ClipLoader
            color={color}
            loading={isloading}
            cssOverride={override}
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
            :
            <button
            className="w-full rounded bg-[#E50914] py-3 font-semibold"
            onClick={() => setErrormsg('')}
            type="submit"
          >
            ثبت نام
          </button>
          }
        <div className="text-[gray]">
          قبلا ثبت نام کردم?{" "}
          <Link
            to="/login"
            className="cursor-pointer text-white hover:underline"
          >
            وارد شوید
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Register;
