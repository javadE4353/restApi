import { useCallback, useEffect, useState,CSSProperties } from "react";
import {
  getComments,
  insertComment,
} from "../redux/actionCreator/actionCreateComment";
import { useSelector, useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { useForm, SubmitHandler } from "react-hook-form";
import * as timeago from "timeago.js/lib/index";

import { CommentType, Movies } from "../typeing";
import useAxiosPrivate from "../hook/useAxiosPrivate";
import { axiospublic } from "../axios/configApi";
import MuiModal from "@mui/material/Modal";
import ClipLoader from "react-spinners/ClipLoader";
const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
  position: "absolute",
  top: "50%",
  transform: "translate(-50%, -50%)",
  right: "44%",
};
interface Mylist {
  mylist: { mylist: Movies[] };
}
interface Props {
  items: CommentType[] | null;
  username: string;
  movieid: number;
  movietitle: string;
  ratings: number;
  newratings: number;
  movie: Movies;
}

interface Comment {
  comment: {
    comment: CommentType[] | null;
    insert: number | null;
    ErrorMassege: null | string;
    isLoading: boolean;
  };
}
const Comments = ({
  items,
  username,
  movieid,
  movietitle,
  ratings,
  newratings,
  movie,
}: Props) => {
  let [color, setColor] = useState("#ffffff");
  const [count, setCount] = useState<number>(0);
  const [collaps, setCollaps] = useState<boolean>(false);
  const [id, setId] = useState<number | null>(null);
  const axiosPrivate = useAxiosPrivate();
  const dispatch: Dispatch<any> = useDispatch();
  const comment = useSelector((state: Comment) => state?.comment);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    try {
      const dataComent = {
        movieid,
        username,
        movietitle: movietitle,
        content: data?.textarea,
        ratings: ratings + newratings,
      };
      dispatch(insertComment(dataComent, axiosPrivate));
    } catch (error: any) {
      let ErrorMessage = "";
    }
    // setErrormsg(ErrorMessage)
  };


  const handleOption=(id:number)=>{
    setCollaps(!collaps)
    setId(id)
  }


  useEffect(() => {
    if (movie?.movieid) {
      dispatch(
        getComments(movie?.original_title, movie?.movieid, axiosPrivate)
      );
    } else if (!movie?.movieid && movie?.original_title !== undefined) {
      dispatch(getComments(movie?.original_title, movie?.id, axiosPrivate));
    }
  }, [movie, comment?.insert]);
  return (
    <>
      <MuiModal
        open={comment?.isLoading}
        className="fixed !top-7 left-0 right-0 z-50 mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll rounded-md scrollbar-hide"
      >
        <ClipLoader
          color={color}
          loading={comment?.isLoading}
          cssOverride={override}
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </MuiModal>
      <section className="bg-[#181818] dark:bg-gray-900 py-8 lg:py-16">
        <div className="max-w-2xl mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg lg:text-2xl font-bold text-white dark:text-white">
              نظرات
            </h2>
          </div>
          <form className="mb-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
              <label form="comment" className="sr-only">
                نظر شما
              </label>
              <textarea
                className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                {...register("textarea", {
                  max: 1000,
                  min: 0,
                  maxLength: 1000,
                })}
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800 border border-white border-solid hover:bg-blue-400"
            >
              ثبت کامنت
            </button>
          </form>
          {items?.map((com,i) => (
            <>
              <article key={i} className="p-6 mb-4 text-base bg-white border-t border-gray-200 dark:border-gray-700 dark:bg-gray-900 rounded-md">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white ml-2">
                      <img
                        className="mr-2 w-6 h-6 rounded-full"
                        src="https://flowbite.com/docs/images/people/profile-picture-4.jpg"
                        alt="Helene Engels"
                      />
                      {com?.username}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <span>{timeago.format(com?.createdAt || "2022-10-25")}</span>
                    </p>
                  </div>
                </div>
                <p className=" break-all overflow-hidden text-gray-500 dark:text-gray-400">
                  {com?.content}
                </p>
                <div className="flex items-center justify-between mt-4 space-x-4">
                  <button
                    type="button"
                    className="flex  items-center text-sm text-gray-500 hover:underline dark:text-gray-400"
                  >
                    <svg
                      aria-hidden="true"
                      className="mr-1 w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      ></path>
                    </svg>
                    پاسخ
                  </button>
                  <div className=" flex justify-between z-10 w-36 bg-white divide-y divide-gray-100 dark:bg-gray-700 dark:divide-gray-600">
                    <ul
                      className={`flex absolute translate-x-[-35%] left-1/2 py-1 text-sm text-gray-700 dark:text-gray-200 ${
                        collaps && i===id ? "visible" : "invisible"
                      }`}
                      aria-labelledby="dropdownMenuIconHorizontalButton"
                    >
                      <li>
                        <a
                          href="#"
                          className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          ویرایش
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          حذف
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          گزارش
                        </a>
                      </li>
                    </ul>
                  </div>
                  <button
                    className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                    onClick={() => handleOption(i)}
                  >
                    <svg
                      className="w-5 h-5"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
                    </svg>
                  </button>
                </div>
              </article>
            </>
          ))}
        </div>
      </section>
    </>
  );
};

export default Comments;
