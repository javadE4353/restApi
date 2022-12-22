import { useState, useEffect, useCallback } from "react";

//module external
import { motion } from "framer-motion";
import { useRecoilState } from "recoil";
import { Dispatch } from "redux";
import * as timeago from "timeago.js/lib/index";
import { HiPencil, HiMinus, HiPlus } from "react-icons/hi2";
import { useSelector, useDispatch } from "react-redux";
import { BsX } from "react-icons/bs";

import {
  HiTrash,
  HiMagnifyingGlass,
  HiOutlineUserPlus,
  HiDocumentDuplicate,
} from "react-icons/hi2";

//
import { pageinationAtom } from "../atoms/modalAtom";

import useAxiosPrivate from "../hook/useAxiosPrivate";

import { deleteUser } from "../redux/actionCreator/actionCreateUsers";
import { Users, StateTypeAuth, Movies } from "../typeing";
import Pageination from "../subcomponents/Pagination";
import { tableMovies } from "../data/dataTableMovies";
import { Link, useNavigate } from "react-router-dom";
import apiConfig, { axiospublic, BASE_URL } from "../axios/configApi";
import axios from "axios";
import getmovies, { deletemovie } from "../redux/actionCreator/actionMovie";
import { filterRow } from "../data/filter";

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
    movies: Movies[];
    movie: Movies;
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
interface User {
  username: string;
  id: number;
}

const TableMovies = () => {
  const [pageinationatom, setPageinationAtom] = useRecoilState(pageinationAtom);
  const navigate = useNavigate();
  const [count, setCount] = useState<number>(1);
  const [filterusername, setfilterusrname] = useState<User[]>([]);
  const [filterow, setfilterRow] = useState<any>(3);
  const [filterCategory, setfilterCategory] = useState<any>();
  const [filterfilterUser, setfilterUser] = useState<any>("");
  const [showFilterCategory, setShowFilterCategory] = useState<boolean>(false);
  const [showFilterRow, setShowFilterRow] = useState<boolean>(false);
  const [showFilterUser, setShowFilterUser] = useState<boolean>(false);
  const [toggleSidebarFilterM, setToggleSidebarFilterM] =
    useState<boolean>(false);
  const dispatch: Dispatch<any> = useDispatch();
  const movies = useSelector((state: MoviesType) => state?.movies?.movies);
  const categorys = useSelector(
    (state: Categorys) => state?.categorys?.categorys
  );
  const axiosPrivate = useAxiosPrivate();

  const countMovie = async () => {
    try {
      const res = await axiospublic.get(`${BASE_URL}/movies/count`);
      if (res.status == 200) {
        setCount(res.data?.data.count);
        setfilterusrname(res.data?.data.username);
      }
    } catch (error) {}
  };


  useEffect(() => {
    setPageinationAtom(1);
  }, []);


const handleShowAllMovie=()=>{
  countMovie()
  dispatch( getmovies(axiosPrivate, {}));
}

  const handleDeleteUser = (id: number, title: string) => {
    dispatch(deletemovie(axiosPrivate, title, id, pageinationatom, filterow));
    countMovie();
  };

  const handleFilter = (id: number, title: string) => {
    setCount(filterow)
    dispatch(
      getmovies(axiosPrivate, {
        page: pageinationatom,
        pageSize: filterow,
        username: filterfilterUser,
        category: filterCategory,
      })
    );
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
          <div>
            <button
              onClick={() => setToggleSidebarFilterM(!toggleSidebarFilterM)}
              className="inline-flex items-center text-white bg-white border border-gray-300 bg-red-600 focus:outline-none hover:bg-red-400 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 lg:hidden"
            >
              فیلتر
              <HiOutlineUserPlus size={20} />
            </button>
          </div>
          <div>
            <button
              onClick={() => handleShowAllMovie()}
              className="inline-flex items-center text-white bg-white border border-gray-300 bg-red-600 focus:outline-none hover:bg-red-400 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 "
            >
               نمایش پیش فرض
              <HiOutlineUserPlus size={20} />
            </button>
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

          <div className="bg-white">
            <div>
              {/* <!--
      Mobile filter dialog

    --> */}
              <div
                className={`relative z-40 lg:hidden ${
                  toggleSidebarFilterM ? "block" : "hidden"
                }`}
                aria-modal="true"
              >
                <div className="fixed inset-0 bg-black bg-opacity-25"></div>

                <div className="fixed inset-0 z-40 flex">
                  <div className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                    <div className="flex items-center justify-between px-4">
                      <h2 className="text-lg font-medium text-gray-900">
                        Filters
                      </h2>
                      <button
                        type="button"
                        className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                        onClick={() =>
                          setToggleSidebarFilterM(!toggleSidebarFilterM)
                        }
                      >
                        <span className="sr-only">Close menu</span>
                        {/* <!-- Heroicon name: outline/x-mark --> */}
                        <BsX />
                      </button>
                    </div>

                    {/* <!-- Filters --> */}
                    <form className="mt-4 border-t border-gray-200">
                      <h3 className="sr-only">فیلتر</h3>

                      <div className="border-t border-gray-200 px-4 py-6">
                        <h3 className="-mx-2 -my-3 flow-root">
                          <button
                            type="button"
                            className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500"
                            aria-controls="filter-section-mobile-0"
                            aria-expanded="false"
                          >
                            <span
                              className="font-medium text-gray-900"
                              onClick={() =>
                                setShowFilterCategory(!showFilterCategory)
                              }
                            >
                              دسته بندی
                            </span>
                            <span className="ml-6 flex items-center">
                              {showFilterCategory ? <HiMinus /> : <HiPlus />}
                            </span>
                          </button>
                        </h3>

                        <div
                          className={`pt-6" id="filter-section-mobile-0 ${
                            showFilterCategory ? "block" : "hidden"
                          }`}
                        >
                          <div className="space-y-6">
                            {categorys?.map((item, i) => (
                              <div key={i} className="flex items-center">
                                <input
                                  id="filter-color-0"
                                  name="category"
                                  value={item.bits}
                                  type="radio"
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                  onChange={(
                                    event: React.ChangeEvent<
                                      | HTMLInputElement
                                      | HTMLTextAreaElement
                                      | HTMLSelectElement
                                    >
                                  ) => setfilterCategory(event.target.value)}
                                />
                                <label
                                  form="filter-color-0"
                                  className="ml-3 min-w-0 flex-1 text-gray-500"
                                >
                                  {item.title}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-gray-200 px-4 py-6">
                        <h3 className="-mx-2 -my-3 flow-root">
                          <button
                            type="button"
                            className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500"
                            aria-controls="filter-section-mobile-1"
                            aria-expanded="false"
                          >
                            <span
                              className="font-medium text-gray-900"
                              onClick={() => setShowFilterRow(!showFilterRow)}
                            >
                              فیلتر سطر
                            </span>
                            <span className="ml-6 flex items-center">
                              {showFilterRow ? <HiMinus /> : <HiPlus />}
                            </span>
                          </button>
                        </h3>
                        <div
                          className={`pt-6" id="filter-section-mobile-0 ${
                            showFilterRow ? "block" : "hidden"
                          }`}
                        >
                          <div className="space-y-6">
                            {filterRow?.map((item, i) => (
                              <div key={i} className="flex items-center">
                                <input
                                  name="filter"
                                  value={item.title}
                                  type="radio"
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                  onChange={(
                                    event: React.ChangeEvent<
                                      | HTMLInputElement
                                      | HTMLTextAreaElement
                                      | HTMLSelectElement
                                    >
                                  ) => setfilterRow(event.target.value)}
                                />
                                <label
                                  form="filter-category-0"
                                  className="ml-3 min-w-0 flex-1 text-gray-500"
                                >
                                  {item.value}{" "}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-gray-200 px-4 py-6">
                        <h3 className="-mx-2 -my-3 flow-root">
                          <button
                            type="button"
                            className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500"
                            aria-controls="filter-section-mobile-2"
                            aria-expanded="false"
                          >
                            <span
                              className="font-medium text-gray-900"
                              onClick={() => setShowFilterUser(!showFilterUser)}
                            >
                              ایجادکننده
                            </span>
                            <span className="ml-6 flex items-center">
                              {showFilterUser ? <HiMinus /> : <HiPlus />}
                            </span>
                          </button>
                        </h3>
                        <div
                          className={`pt-6" id="filter-section-mobile-0 ${
                            showFilterUser ? "block" : "hidden"
                          }`}
                        >
                          <div className="space-y-6">
                            {filterusername?.map((item, i) => (
                              <>
                                {filterusername?.[i - 1]?.username !=
                                  item?.username &&
                                filterusername?.[i - 1]?.id != item?.id ? (
                                  <div key={i} className="flex items-center">
                                    <input
                                      id="filter-size-0"
                                      name="row"
                                      value={item.username}
                                      type="radio"
                                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                      onChange={(
                                        event: React.ChangeEvent<
                                          | HTMLInputElement
                                          | HTMLTextAreaElement
                                          | HTMLSelectElement
                                        >
                                      ) => setfilterUser(event.target.value)}
                                    />
                                    <label
                                      form="filter-size-0"
                                      className="ml-3 min-w-0 flex-1 text-gray-500"
                                    >
                                      {item?.username}
                                    </label>
                                  </div>
                                ) : null}
                              </>
                            ))}
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              <main className="mx-auto">
                <section aria-labelledby="products-heading" className="">
                  <h2 id="products-heading" className="sr-only">
                    Products
                  </h2>

                  <div className="">
                    <form className=" hidden lg:flex">
                      <div className="reletive border-b border-gray-200 py-6">
                        <h3 className="-my-3 flow-root">
                          <button
                            type="button"
                            className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500"
                            aria-controls="filter-section-0"
                            aria-expanded="false"
                          >
                            <span
                              className="font-medium text-gray-900"
                              onClick={() =>
                                setShowFilterCategory(!showFilterCategory)
                              }
                            >
                              دسته بندی
                            </span>
                            <span className="ml-6 flex items-center">
                              {showFilterCategory ? <HiPlus /> : <HiMinus />}
                            </span>
                          </button>
                        </h3>
                        <div
                          className={` absolute bg-white pt-6 px-3 ${
                            showFilterCategory ? "block" : "hidden"
                          }`}
                        >
                          <div className="space-y-4">
                            {categorys?.map((item, i) => (
                              <div key={i} className="flex items-center">
                                <input
                                  id="filter-color-0"
                                  name="category"
                                  value={item.bits}
                                  type="radio"
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                  onChange={(
                                    event: React.ChangeEvent<
                                      | HTMLInputElement
                                      | HTMLTextAreaElement
                                      | HTMLSelectElement
                                    >
                                  ) => setfilterCategory(event?.target.value)}
                                />
                                <label
                                  form="filter-color-0"
                                  className="ml-3 text-sm text-gray-600"
                                >
                                  {item.title}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="reletive border-b border-gray-200 py-6">
                        <h3 className="-my-3 flow-root">
                          <button
                            type="button"
                            className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500"
                            aria-controls="filter-section-1"
                            aria-expanded="false"
                          >
                            <span
                              className="font-medium text-gray-900"
                              onClick={() => setShowFilterRow(!showFilterRow)}
                            >
                              فیلتر سطر
                            </span>
                            <span className="ml-6 flex items-center">
                              {showFilterRow ? <HiMinus /> : <HiPlus />}
                            </span>
                          </button>
                        </h3>
                        <div
                          className={` absolute bg-white pt-6 px-3 ${
                            showFilterRow ? "block" : "hidden"
                          }`}
                        >
                          <div className="space-y-4">
                            {filterRow?.map((item, i) => (
                              <div key={i} className="flex items-center">
                                <input
                                  name="filter"
                                  value={item.title}
                                  type="radio"
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                  onChange={(
                                    event: React.ChangeEvent<
                                      | HTMLInputElement
                                      | HTMLTextAreaElement
                                      | HTMLSelectElement
                                    >
                                  ) => setfilterRow(event?.target.value)}
                                />
                                <label
                                  form="filter-category-0"
                                  className="ml-3 text-sm text-gray-600"
                                >
                                  {item.value}{" "}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="reletive border-b border-gray-200 py-6">
                        <h3 className="-my-3 flow-root">
                          <button
                            type="button"
                            className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500"
                            aria-controls="filter-section-2"
                            aria-expanded="false"
                          >
                            <span
                              className="font-medium text-gray-900"
                              onClick={() => setShowFilterUser(!showFilterUser)}
                            >
                              ایجاد کننده
                            </span>
                            <span className="ml-6 flex items-center">
                              {showFilterUser ? <HiMinus /> : <HiPlus />}
                            </span>
                          </button>
                        </h3>
                        <div
                          className={` absolute bg-white pt-6 px-3 ${
                            showFilterUser ? "block" : "hidden"
                          }`}
                        >
                          <div className="space-y-4 h-20 ">
                            {filterusername?.map((item, i) => (
                              <>
                                {filterusername?.[i - 1]?.username !=
                                  item?.username &&
                                filterusername?.[i - 1]?.id != item?.id ? (
                                  <div key={i} className="flex items-center">
                                    <input
                                      id="filter-size-0"
                                      name="row"
                                      value={item.username}
                                      type="radio"
                                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                      onChange={(
                                        event: React.ChangeEvent<
                                          | HTMLInputElement
                                          | HTMLTextAreaElement
                                          | HTMLSelectElement
                                        >
                                      ) => setfilterUser(event?.target.value)}
                                    />
                                    <label
                                      form="filter-size-0"
                                      className="ml-3 text-sm text-gray-600"
                                    >
                                      {item?.username}
                                    </label>
                                  </div>
                                ) : null}
                              </>
                            ))}
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </section>
              </main>
            </div>
          </div>
        </div>
        <div className="p-8 h-[100%] bg-white rounded-md">
          <table className="rounded-sm border-collapse border border-slate-400 table-auto w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs bg-header text-white uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="border border-slate-300 p-4">
                  <div className="flex items-center">
                    <input
                      id="radio-all-search"
                      type="radio"
                      className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label form="radio-all-search" className="sr-only">
                      radio
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
                        onClick={() => handleDeleteUser(item?.id, item?.title)}
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
              <Pageination page={count} moving={1} separate={filterow} />
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default TableMovies;
