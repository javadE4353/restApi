import { useEffect } from "react";

//module external
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import * as timeago from "timeago.js/lib/index";
import { HiTrash, HiMagnifyingGlass } from "react-icons/hi2";
import { HiDocumentDuplicate, HiPencil } from "react-icons/hi";

//
import Pageination from "./Pagination";
import {
  getAllmylist,
  removeMovieMylist,
} from "../redux/actionCreator/actionCreateMylist";
import { Movies, StateTypeAuth } from "../typeing";
import useAxiosPrivate from "../hook/useAxiosPrivate";
import { head } from "../data/dataTableMylist";

//interface
interface Mylist {
  mylist: { mylist: Movies[]; isloading: boolean };
}

//component
const TableMovieMylist = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const user = useSelector((state: StateTypeAuth) => state?.auth);
  const mylist = useSelector((state: Mylist) => state?.mylist);
  const axiosPrivate = useAxiosPrivate();

  const handleDeleteMovie = (movieId: number | null | undefined) => {
    if (user?.userInfo !== null && movieId) {
      dispatch(removeMovieMylist(movieId, user?.userInfo?.id, axiosPrivate));
    }
  };

  useEffect(() => {
    if (user?.userInfo !== null) {
      dispatch(getAllmylist(user?.userInfo?.id, axiosPrivate));
    }
  }, []);

  return (
    <>
      <div className="p-4 overflow-x-auto relative shadow-md bg-[#f7f7f7] h-screen">
        <div className="flex justify-between items-center mb-4 rounded-md  bg-white dark:bg-gray-900">
          <div className="flex justify-between items-center rounded-sm p-4 bg-white dark:bg-gray-900">
            <label form="table-search" className="sr-only">
              جستجو
            </label>
            <div className="relative">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <HiMagnifyingGlass size={20} className="text-blue-500" />
              </div>
              <input
                type="text"
                id="table-search-users"
                className="block p-2 pl-10 w-80 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="جستجو"
              />
            </div>
          </div>
        </div>
        <div className="p-8 h-[100%] bg-white rounded-md">
          <table className="border-collapse border border-slate-400 w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-white uppercase bg-header dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="border border-slate-300 p-4">
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
                  <th
                    key={i}
                    scope="col"
                    className="border border-slate-300 py-3 px-6 text-start"
                  >
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
                  <td className="border border-slate-300 p-4 w-4">
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
                  <td
                    scope="row"
                    className="flex items-center py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <img
                      className="w-10 h-10 rounded-full"
                      src={
                        "https://image.tmdb.org/t/p/original/" +
                          item?.poster_path ||
                        "https://image.tmdb.org/t/p/original/" +
                          item?.backdrop_path
                      }
                      alt=""
                    />
                    <div className="pl-3">
                      <div className="text-base font-semibold">
                        {item?.title}
                      </div>
                      {/* <div className="font-normal text-gray-500">{item?.email}</div> */}
                    </div>
                  </td>
                  <td className="border border-slate-300 py-4 px-6">
                    {item?.vote_count}
                  </td>
                  <td className="border border-slate-300 py-4 px-6">
                    <div className="flex items-center">
                      {timeago.format(item?.createdAt || "2022-10-25")}
                    </div>
                  </td>
                  <td className="border border-slate-300 py-4 px-6">
                    <div className="flex items-center">
                      {item?.original_language}
                    </div>
                  </td>
                  <td className="border border-slate-300 py-4 px-6 ">
                    <div className="flex justify-center items-center  rounded-sm">
                      <button
                        className="text-black border border-red-100 hover:bg-white/[0.15] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-r-sm text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        // onClick={() => showModalEdit(item?.id)}
                        disabled={
                          user?.userInfo?.id === item?.id ? true : false
                        }
                      >
                        <HiPencil size={20} />
                      </button>
                      <button
                        className="text-black border border-red-100 hover:bg-white/[0.15] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        // onClick={() => showModalEdit(item?.id)}
                        disabled={
                          user?.userInfo?.id === item?.id ? true : false
                        }
                      >
                        <HiDocumentDuplicate size={20} />
                      </button>
                      <button
                        className="text-white border border-red-100 bg-red-600 hover:bg-red-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-l-sm  text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        onClick={() => handleDeleteMovie(item?.movieid)}
                        disabled={
                          user?.userInfo?.id === item?.id ? true : false
                        }
                      >
                        <HiTrash size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="w-full flex justify-center items-center">
            <div className="w-[20%] flex justify-around items-center">
              <Pageination
                page={mylist?.mylist?.length}
                moving={1}
                separate={3}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TableMovieMylist;
