import { useState, useEffect, useCallback } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { Dispatch } from "redux";
import { modalCreateUser, modalEditUser } from "../atoms/modalAtom";
import EditUser from "../components/EditeUser";
import NewUser from "../components/Newuser";
import useAxiosPrivate from "../hook/useAxiosPrivate";
import * as timeago from "timeago.js/lib/index";
import { HiPencil } from "react-icons/hi2";
import { HiTrash } from "react-icons/hi2";
import { deleteUser, getUsers } from "../redux/actionCreator/actionCreateUsers";
import { Users, Userinfo } from "../typeing";

interface State {
  users: {
    users: Users[] | null;
    count: number;
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
const ViewTableUser = () => {
  const [showModal, setShowModal] = useRecoilState(modalEditUser);
  const [showModalCreateUser, setShowModalCreateUser] =
    useRecoilState(modalCreateUser);
  const user = useSelector((state: StateTypeAuth) => state?.auth);

  const dispatch: Dispatch<any> = useDispatch();
  const stateUsers = useSelector((state: State) => state?.users);
  const [page, setPage] = useState<number>(1);
  const [id, setId] = useState<number | null>(null);
  const [dropDown, setDropdown] = useState<boolean>(false);
  const [pageSize, setPageSize] = useState<number>(5);
  const axiosPrivate = useAxiosPrivate();

  const getUserFatch = useCallback(() => {
    if (showModal === false) {
      dispatch(getUsers(axiosPrivate, page, pageSize));
    }
  }, [showModal, showModalCreateUser]);

  useEffect(() => {
    getUserFatch();
  }, [showModal, showModalCreateUser]);

  const nextPaginate = () => {
    setPage(page + 1);
    setPageSize(pageSize + 5);
  };
  const prevPaginate = () => {
    setPage(page - 1);
    setPageSize(pageSize - 5);
  };

  const head = [
    { name: "نام" },
    { name: "ایمیل" },
    { name: "تاریخ" },
    { name: "موبایل" },
    { name: "دسترسی" },
    { name: "ویرایش" },
    { name: "حذف" },
  ];

  const handleDeleteUser = (id: number) => {
    dispatch(deleteUser(axiosPrivate, id, page, pageSize));
  };
  const showModalEdit = (id: number) => {
    setId(id);
    setShowModal(!showModal);
  };

  return (
    <>
      <div className="overflow-x-auto relative shadow-md bg-white h-screen">
        <div className="p-8 h-[100%] bg-white">
          <div className="flex justify-between items-center pb-4 bg-white dark:bg-gray-900">
            <div>
              <button
                className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                type="button"
                onClick={() => setDropdown(!dropDown)}
              >
                Action
                <svg
                  className="ml-2 w-3 h-3"
                  aria-hidden="true"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>
              {/* Dropdown menu */}
              <div
                className={` reletive z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600 ${
                  dropDown ? "block" : "hidden"
                }`}
              >
                <ul className="absolute bg-white py-1 shadow-md text-sm text-gray-700 dark:text-gray-200 w-20">
                  <li>
                    <a
                      href="#"
                      className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      ویرایش
                    </a>
                  </li>
                  <li>
                    <button
                      onClick={() =>
                        setShowModalCreateUser(!showModalCreateUser)
                      }
                      className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      جدید
                    </button>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      حذف
                    </a>
                  </li>
                </ul>
                {/* <div className="py-1">
                    <a href="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">حذف کاربر</a>
                </div> */}
              </div>
            </div>
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
          <table className="table-auto w-full text-sm text-left text-gray-500 dark:text-gray-400">
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
                  <th key={i} scope="col" className="py-3 px-6 text-start">
                    {item?.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {stateUsers?.users?.map((item, i) => (
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
                        item?.image
                          ? item?.image
                          : "/docs/images/people/profile-picture-4.jpg"
                      }
                      alt=""
                    />
                    <div className="pl-3">
                      <div className="text-base font-semibold">
                        {item?.username}
                      </div>
                      {/* <div className="font-normal text-gray-500">{item?.email}</div> */}
                    </div>
                  </th>
                  <td className="py-4 px-6">{item?.email}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      {timeago.format(item?.createdAt || "2022-10-25")}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center">{item?.mobile}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      {item?.roles?.[0]?.name}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <button
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      onClick={() => showModalEdit(item?.id)}
                      disabled={user?.userInfo?.id === item?.id ? true : false}
                    >
                      <HiPencil />
                      ویرایش
                    </button>
                  </td>
                  <td className="py-4 px-6">
                    <button
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      onClick={() => handleDeleteUser(item?.id)}
                      disabled={user?.userInfo?.id === item?.id ? true : false}
                    >
                      <HiTrash />
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
      {showModal ? <EditUser id={id} /> : null}
      {showModalCreateUser ? <NewUser /> : null}
    </>
  );
};

export default ViewTableUser;
