import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Userinfo, Users } from "../typeing";
import * as timeago from "timeago.js/lib/index";
import EditUser from "./EditeUser";
import { useRecoilState } from "recoil";
import { modalEditUser } from "../atoms/modalAtom";

interface StateTypeAuth {
  auth: {
    accessToken: string | null | undefined;
    userInfo: Userinfo | null;
    isLoading: boolean;
    erroMessage: null | string;
  };
}
interface State {
  users: {
    user: Users | null;
    count: number;
    insert: Users | null;
    isloading: boolean;
    ErrorMessage: string | null;
  };
}
const Profile = () => {
  const [showModal, setShowModal] = useRecoilState(modalEditUser);
  const [showEdit,setShowEdit]=useState<boolean>(false)
  const user = useSelector((state: StateTypeAuth) => state?.auth);
  const stateUsers = useSelector((state: State) => state?.users);

  return (
    <>
      <section className=" bg-[#071e34] flex font-medium items-center justify-center h-screen">
        <section className="w-64 mx-auto bg-[#20354b] rounded-2xl px-8 py-6 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-sm">
              {timeago?.format(stateUsers?.user?.createdAt || "2022-10-25")}
            </span>
            <span className="text-emerald-400" onClick={()=>setShowModal(!showModal)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                />
              </svg>
            </span>
          </div>
          <div className="mt-6 w-fit mx-auto">
            <img
              src={
                stateUsers?.user?.image ||
                "https://api.lorem.space/image/face?w=120&h=120&hash=bart89fe"
              }
              className="rounded-full w-28 "
              alt="profile picture"
            />
          </div>

          <div className="mt-8 ">
            <h2 className="text-white font-bold text-2xl tracking-wide">
              {user?.userInfo?.username}
            </h2>
          </div>
          <p className="text-emerald-400 font-semibold mt-2.5">
            {user?.userInfo?.role}
          </p>

          <div className="h-1 w-full bg-black mt-8 rounded-full">
            <div className="h-1 rounded-full w-2/5 bg-yellow-500 "></div>
          </div>
          <div className="mt-3 text-white text-sm">
            <span className="text-gray-400 font-semibold">Storage:</span>
            <span>40%</span>
          </div>
        </section>
      </section>
      {showModal && user?.userInfo?.id? <EditUser id={user?.userInfo?.id}/>:null}
    </>
  );
};

export default Profile;
