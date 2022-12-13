import { useState } from "react";

import baseUrl from "../axios/configApi";
import { useRecoilState } from "recoil";
import { modalState, movieState, showAlert } from "../atoms/modalAtom";
import { Movies, Payment, Userinfo } from "../typeing";
import { FaPlay } from "react-icons/fa";
import { HiOutlineInformationCircle } from "react-icons/hi";
import { useSelector } from "react-redux";

interface Props {
  item: Movies | null;
}

interface Account {
  subscri: {
    payment: Payment[] | null;
    isloading: boolean;
    ErrorMessage: string | null;
  };
}
interface StateTypeAuth {
  auth: {
    accessToken: string | null | undefined;
    userInfo: Userinfo | null;
    isLoading: boolean;
    erroMessage: null | string;
  };
}
const SliderItemHome = ({ item }: Props) => {
  const account = useSelector((state: Account) => state?.subscri);
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState);
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [errorShowMovie, setErrorShowMovie] = useState<string>("");
  const user = useSelector((state: StateTypeAuth) => state?.auth);

  const [showalret, setShowAlert] = useRecoilState(showAlert);
  const handleShowMovie = () => {
    if (user?.userInfo?.username) {
      setCurrentMovie(item);
      setShowModal(true);
      setErrorShowMovie("");
      setShowAlert(false);
    } else {
      setErrorShowMovie(
        "برای مشاهده فیلم باید اشتراک داشته باشید یا در سایت ثبت نام کنید"
      );
      setShowAlert(true);
    }
  };

  return (
    <>
      <div
        className={`fixed top-0 z-[999] bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative ${
          showalret ? "block" : "hidden"
        }`}
      >
        <strong className="font-bold">اشتراک!</strong>
        <span className="block sm:inline">{errorShowMovie}</span>
        <span
          className="absolute top-0 bottom-0 left-0 px-4 py-3"
          onClick={() => setShowAlert(false)}
        >
          <svg
            className="fill-current h-6 w-6 text-red-500"
            role="button"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <title>Close</title>
            <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
          </svg>
        </span>
      </div>

      <div className="flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[65vh] lg:justify-end lg:pb-12">
        <div className="absolute top-0 left-0 -z-10 h-[95vh] w-screen">
          {item ? (
            <img
              src={`${baseUrl.originalImage}${
                item?.backdrop_path || item?.poster_path
              }`}
              className="object-cover"
              alt=""
            />
          ) : (
            <img
              src={`${baseUrl.originalImage}/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg`}
              className="object-cover"
              alt=""
            />
          )}
        </div>
        <h1 className="text-white text- text-2xl font-bold md:text-4xl lg:text-7xl xs:text-sm pr-3">
          {item?.title || item?.original_title}
        </h1>
        <p className=" text-white max-w-xs text-xs text-shadow-md md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl pr-3">
          {item?.overview.slice(0, 100)}
        </p>

        <div className="flex space-x-3 pr-3">
          <button
            className="ml-2 bannerButton bg-transparent text-white border border-red-500 rounded-md"
            onClick={() => handleShowMovie()}
          >
            <FaPlay className="h-4 w-4 text-red md:h-7 md:w-7" />
            نمایش
          </button>

          <button
            className="mr-4 bannerButton bg-transparent border border-red-500 rounded-md "
            onClick={() => {
              setCurrentMovie(item);
              setShowModal(true);
            }}
          >
            <HiOutlineInformationCircle className="h-5 w-5 md:h-8 md:w-8" />
            جزئیات
          </button>
        </div>
      </div>
    </>
  );
};

export default SliderItemHome;
