import { useState, useEffect, useCallback } from "react";

//module external
import { motion } from "framer-motion";
import { useRecoilState } from "recoil";
import { Dispatch } from "redux";
import * as timeago from "timeago.js/lib/index";
import { HiPencil } from "react-icons/hi2";
import { useSelector, useDispatch } from "react-redux";
import {
  HiTrash,
  HiMagnifyingGlass,
  HiOutlineUserPlus,
  HiDocumentDuplicate,
} from "react-icons/hi2";

//
import {
  pageinationAtom,
} from "../atoms/modalAtom";

import useAxiosPrivate from "../hook/useAxiosPrivate";

import { deleteUser } from "../redux/actionCreator/actionCreateUsers";
import { Users, StateTypeAuth, Movies } from "../typeing";
import Pageination from "../subcomponents/Pagination";
import { tableMovies } from "../data/dataTableMovies";
import { Link, useNavigate } from "react-router-dom";
import apiConfig, { axiospublic, BASE_URL } from "../axios/configApi";
import axios from "axios";

//interface
interface State {
  users: {
    users: Users[] | null;
    count: number;
    isloading: boolean;
    ErrorMessage: string | null;
  };
}
interface MoviesType {
  movies: {
    movies: Movies[] | null;
    movie: Movies | null;
    insert: number;
    update: number;
    delete: number;
    isloading: boolean;
    ErrorMessage: string | null;
  };
}
interface Cat {
  title: string;
  bits: number;
  image: string;
  content: string;
}
interface Categorys {
  categorys: {
    categorys: Cat[];
    update: number;
    delete: number;
    insert: number;
    isloading: boolean;
    ErrorMassege: string | null;
  };
}
const TableCategory = () => {
  const [pageinationatom, setPageinationAtom] = useRecoilState(pageinationAtom);
  const navigate = useNavigate();
  const [count, setCount] = useState<number>(1);
  const dispatch: Dispatch<any> = useDispatch();
  const movies = useSelector((state: MoviesType) => state?.movies?.movies);
  const categorys = useSelector(
    (state: Categorys) => state?.categorys?.categorys
  );
  const axiosPrivate = useAxiosPrivate();

  const getUserFatch = useCallback(() => {}, []);

  useEffect(() => {
    const countMovie = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/movies/count`
        );
        console.log(res)
        if (res.status == 2000) {
          setCount(res.data?.data);
        }
      } catch (error) {}
    };
    countMovie();
  }, []);

  const handleDeleteUser = (id: number) => {
    dispatch(deleteUser(axiosPrivate, id, pageinationatom, 3));
  };
  const showModalEdit = (id: number) => {
    navigate(`/dashboard/editmovie/:${id}`);
  };

  return (
    <>
      <motion.div
        className="p-4 overflow-x-auto relative shadow-md bg-[#f7f7f7] h-screen"
        initial={{ opacity: 0, x: 0 }}
        animate={{ opacity: 1, x: 5, transition: { duration: 0.1 } }}
        exit={{ opacity: 0, x: 0, transition: { duration: 0.1 } }}
      >
        <div className="flex justify-between items-center mb-4 rounded-sm p-4 bg-white dark:bg-gray-900">
          <div>
            <Link
              to="/dashboard/addmovie"
              className="inline-flex items-center text-white bg-white border border-gray-300 bg-red-600 focus:outline-none hover:bg-red-400 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            >
              جدید
              <HiOutlineUserPlus size={20} />
            </Link>
          </div>
          <label form="table-search" className="sr-only">
            جستجو
          </label>
          <div className="relative">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <HiMagnifyingGlass size={25} className="text-blue-500" />
            </div>
            <input
              type="text"
              id="table-search-users"
              className="block p-2 pl-10 w-80 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="جستجو"
            />
          </div>
        </div>
        <div className="p-8 h-[100%] bg-white rounded-md">
          <table className="rounded-sm border-collapse border border-slate-400 table-auto w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs bg-header text-white uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
                {tableMovies?.map((item, i) => (
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
              {movies?.map((item, i) => (
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
                  <th
                    scope="row"
                    className="border border-slate-300 py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <div className=" flex items-center font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      <img
                        className="w-10 h-10 rounded-full"
                        src={
                          item?.backdrop_path
                            ? `${apiConfig?.originalImage}${item?.poster_path}`
                            : "/docs/images/people/profile-picture-4.jpg"
                        }
                        alt=""
                      />
                      <div className="pl-3">
                        <div className="text-base font-semibold">
                          {item?.title}
                        </div>
                        {/* <div className="font-normal text-gray-500">{item?.email}</div> */}
                      </div>
                    </div>
                  </th>
                  <td className="border border-slate-300 py-4 px-6">
                    {item?.adult == true ? "+18" : "+12"}
                  </td>
                  <td className="border border-slate-300 py-4 px-6">
                    <div className="flex items-center">
                      {item?.original_language}
                    </div>
                  </td>
                  <td className="border border-slate-300 py-4 px-6">
                    <div className="flex items-center">{item?.vote_count}</div>
                  </td>
                  <td className="border border-slate-300 py-4 px-6">
                    <div className="flex items-center">{item?.username}</div>
                  </td>
                  <td className="border border-slate-300 py-4 px-6">
                    <div className="flex items-center">
                      {item?.categories && item?.categories?.[0]?.title}
                    </div>
                  </td>
                  <td className="border border-slate-300 py-4 px-6">
                    <div className="flex justfy-center items-center  rounded-sm">
                      <button
                        className="text-black border border-red-100 hover:bg-white/[0.15] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-r-sm text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        onClick={() => showModalEdit(item?.id)}
                      >
                        <HiPencil size={20} />
                      </button>
                      <button
                        className="text-black border border-red-100 hover:bg-white/[0.15] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        onClick={() => showModalEdit(item?.id)}
                        disabled={true}
                      >
                        <HiDocumentDuplicate size={20} />
                      </button>
                      <button
                        className="text-white border border-red-100 bg-red-600 hover:bg-red-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-l-sm  text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        onClick={() => handleDeleteUser(item?.id)}
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
            <div className="w-[20%] flex justify-around items-center mt-4">
              <Pageination page={count} moving={1} separate={3} />
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default TableCategory;
