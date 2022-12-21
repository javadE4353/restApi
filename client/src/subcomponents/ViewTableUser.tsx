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
  modalCreateUser,
  modalEditUser,
  pageinationAtom,
} from "../atoms/modalAtom";
import EditUser from "../components/EditeUser";
import NewUser from "../components/Newuser";
import useAxiosPrivate from "../hook/useAxiosPrivate";

import { deleteUser, getUsers } from "../redux/actionCreator/actionCreateUsers";
import { Users, StateTypeAuth } from "../typeing";
import Pageination from "./Pagination";
import { head } from "../data/tableViewUsers";

//interface
interface State {
  users: {
    users: Users[] | null;
    count: number;
    isloading: boolean;
    ErrorMessage: string | null;
  };
}

const ViewTableUser = () => {
  const [showModal, setShowModal] = useRecoilState(modalEditUser);
  const [showModalCreateUser, setShowModalCreateUser] =
    useRecoilState(modalCreateUser);
  const user = useSelector((state: StateTypeAuth) => state?.auth);
  const [pageinationatom, setPageinationAtom] = useRecoilState(pageinationAtom);

  const dispatch: Dispatch<any> = useDispatch();
  const stateUsers = useSelector((state: State) => state?.users);
  const [id, setId] = useState<number | null>(null);
  const [users, setusers] = useState<Users[] | null>();
  const axiosPrivate = useAxiosPrivate();

  const getUserFatch = useCallback(() => {
    if (showModal === false) {
      dispatch(getUsers(axiosPrivate, pageinationatom, 3));
    }
  }, [showModal, showModalCreateUser, pageinationatom]);

  useEffect(() => {
    getUserFatch();
  }, [showModal, showModalCreateUser, pageinationatom]);

  useEffect(() => {
    if (stateUsers?.isloading === false) {
      setusers(stateUsers?.users);
    }
  }, [stateUsers?.users]);

  const handleDeleteUser = (id: number) => {
    dispatch(deleteUser(axiosPrivate, id, pageinationatom, 3));
  };
  const showModalEdit = (id: number) => {
    setId(id);
    setShowModal(!showModal);
  };

  return (
    <>
      <motion.div
        className="p-4 overflow-x-auto relative shadow-md bg-[#f7f7f7] h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1,  transition: { duration: 0.3 } }}
        exit={{ opacity: 0, transition: { duration: 0.1 } }}
      >
        <div className="flex justify-between items-center mb-4 rounded-sm p-4 bg-white dark:bg-gray-900">
          <div>
            <button
              className="inline-flex items-center text-white bg-white border border-gray-300 bg-red-600 focus:outline-none hover:bg-red-400 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              type="button"
              onClick={() => setShowModalCreateUser(!showModalCreateUser)}
            >
              جدید
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
              {users?.map((item, i) => (
                <tr
                  key={i}
                  className={` hover:bg-gray-50 dark:hover:bg-gray-600 ${timeago.format(item?.createdAt).includes("just") || timeago.format(item?.createdAt).includes("just")?"bg-green-400":"bg-white"}`}
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
                    </div>
                  </th>
                  <td className="border border-slate-300 py-4 px-6">
                    {item?.email}
                  </td>
                  <td className="border border-slate-300 py-4 px-6">
                    <div className="flex items-center">
                      {timeago.format(item?.createdAt || "2022-10-25")}
                    </div>
                  </td>
                  <td className="border border-slate-300 py-4 px-6">
                    <div className="flex items-center">{item?.mobile}</div>
                  </td>
                  <td className="border border-slate-300 py-4 px-6">
                    <div className="flex items-center">
                      {item?.roles?.[0]?.name}
                    </div>
                  </td>
                  <td className="border border-slate-300 py-4 px-6">
                    <div className="flex justfy-center items-center  rounded-sm">
                      <button
                        className="text-black border border-red-100 hover:bg-white/[0.15] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-r-sm text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        onClick={() => showModalEdit(item?.id)}
                        disabled={
                          user?.userInfo?.id === item?.id ? true : false
                        }
                      >
                        <HiPencil size={20} />
                      </button>
                      <button
                        className="text-black border border-red-100 hover:bg-white/[0.15] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        onClick={() => showModalEdit(item?.id)}
                        disabled={
                          user?.userInfo?.id === item?.id ? true : false
                        }
                      >
                        <HiDocumentDuplicate size={20} />
                      </button>
                      <button
                        className="text-white border border-red-100 bg-red-600 hover:bg-red-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-l-sm  text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        onClick={() => handleDeleteUser(item?.id)}
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
            <div className="w-[20%] flex justify-around items-center mt-4">
              <Pageination page={stateUsers?.count} moving={1} separate={3} />
            </div>
          </div>
        </div>
      </motion.div>
      {showModal ? <EditUser id={id} /> : null}
      {showModalCreateUser ? <NewUser /> : null}
    </>
  );
};

export default ViewTableUser;
