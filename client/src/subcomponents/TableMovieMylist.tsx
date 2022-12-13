import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import useAxiosPrivate from "../hook/useAxiosPrivate";
import { getAllmylist, removeMovieMylist } from "../redux/actionCreator/actionCreateMylist";
import * as timeago from "timeago.js/lib/index";
import { HiTrash } from "react-icons/hi2";
import { Userinfo,Movies } from "../typeing";
interface StateTypeAuth {
    auth: {
      accessToken: string | null | undefined;
      userInfo: Userinfo | null;
      isLoading: boolean;
      erroMessage: null | string;
    };
  }
  interface Mylist {
    mylist: { mylist: Movies[],isloading:boolean };
  }
const TableMovieMylist = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const user = useSelector((state: StateTypeAuth) => state?.auth);
  const mylist = useSelector((state: Mylist) => state?.mylist);
 const [getmovie,setGetmovie]=useState< boolean>(false)
  const axiosPrivate = useAxiosPrivate();
  const head = [
    { name: "نام" },
    { name: "امتیاز" },
    { name: "تاریخ" },
    { name: "زبان" },
    { name: "حذف" },
  ];

  const handleDeleteUser=(movieId:number | null | undefined)=>{
    if (user?.userInfo !== null && movieId) {
        dispatch(removeMovieMylist(movieId,user?.userInfo?.id,axiosPrivate))
    }
  }

  useEffect(()=>{
    if (user?.userInfo !== null) {
        dispatch(getAllmylist(user?.userInfo?.id,axiosPrivate))
    }
  },[])

console.log(mylist)
  return (
    <>
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg bg-white h-screen">
        <div className="p-8 h-[100%] bg-white">
          <div className="flex justify-between items-center pb-4 bg-white dark:bg-gray-900">
            <label form="table-search" className="sr-only">
              جستجو
            </label>
            <div className="relative">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
              <input
                type="text"
                id="table-search-users"
                className="block p-2 pl-10 w-80 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="جستجو"
              />
            </div>
          </div>
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="p-4">
                  <div className="flex items-center">
                    <input
                      id="checkbox-all-search"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label form="checkbox-all-search" className="sr-only">
                      checkbox
                    </label>
                  </div>
                </th>
                {head?.map((item, i) => (
                  <th scope="col" className="py-3 px-6 text-start">
                    {item?.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {mylist?.mylist?.map((item, i) => (
                <tr
                  key={i}
                  className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="p-4 w-4">
                    <div className="flex items-center">
                      <input
                        id="checkbox-table-search-3"
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label form="checkbox-table-search-3" className="sr-only">
                        checkbox
                      </label>
                    </div>
                  </td>
                  <th
                    scope="row"
                    className="flex items-center py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <img
                      className="w-10 h-10 rounded-full"
                      src={
                        "https://image.tmdb.org/t/p/original/" + item?.poster_path  ||"https://image.tmdb.org/t/p/original/" + item?.backdrop_path
                          
                      }
                      alt=""
                    />
                    <div className="pl-3">
                      <div className="text-base font-semibold">
                        {item?.title}
                      </div>
                      {/* <div className="font-normal text-gray-500">{item?.email}</div> */}
                    </div>
                  </th>
                  <td className="py-4 px-6">{item?.vote_count}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center">{timeago.format(item?.createdAt || "2022-10-25")}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center">{item?.original_language}</div>
                  </td>
                  <td className="py-4 px-6 flex justify-start">
                    <button
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      onClick={()=>handleDeleteUser(item?.movieid)}
                    >
                      <HiTrash/>
                      حذف
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="w-full flex justify-center items-center">
            <div className="w-[20%] flex justify-around items-center">
              <button className="text-black">بعد</button>
              <button className="text-black">قبل</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TableMovieMylist;
