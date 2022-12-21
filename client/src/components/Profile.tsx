import {useEffect} from "react"

//module external
import { useSelector } from "react-redux";
import EditUser from "./EditeUser";
import { useRecoilState } from "recoil";
import { modalEditUser } from "../atoms/modalAtom";
import { HiEllipsisVertical } from "react-icons/hi2";
import { motion } from "framer-motion";
import * as timeago from "timeago.js/lib/index";

//
import { StateTypeAuth, Users } from "../typeing";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import useAxiosPrivate from "../hook/useAxiosPrivate";
import {getUser } from "../redux/actionCreator/actionCreateUsers";

//interface
interface State {
  users: {
    user: Users | null;
    count: number;
    insert: number;
    isloading: boolean;
    ErrorMessage: string | null;
  };
}

//component
const Profile = () => {
  const [showModal, setShowModal] = useRecoilState(modalEditUser);
  const user = useSelector((state: StateTypeAuth) => state?.auth);
  const stateUsers = useSelector((state: State) => state?.users);
  const dispatch: Dispatch<any> = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  useEffect(() => {
      if(user?.userInfo?.id){
        dispatch(getUser(axiosPrivate,user?.userInfo?.id));
      }
  }, [])
  
  return (
    <motion.div
      initial={{ opacity: 0,}}
      animate={{ opacity: 1, transition: { duration: 0.2 } }}
      exit={{ opacity: 0, transition: { duration: 0.1 } }}
    >
      <section className=" bg-[#071e34] flex font-medium items-center justify-center h-screen">
        <section className="w-64 mx-auto bg-[#20354b] rounded-2xl px-8 py-6 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-sm">
              {timeago?.format(stateUsers?.user?.createdAt || "2022-10-25")}
            </span>
            <span
              className="text-emerald-400"
              onClick={() => setShowModal(!showModal)}
            >
              <HiEllipsisVertical size={25} />
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

           {/* <div className="h-1 w-full bg-black mt-8 rounded-full">
            <div className="h-1 rounded-full w-2/5 bg-yellow-500 "></div>
          </div> */}
          {
            timeago.format(stateUsers?.user?.updatedAt || "").includes("just")?
          <div className="mt-3 text-white text-sm text-center">
            <span className="text-gray-400 font-semibold">ویرایش انجام شد</span>
          </div> 
            :
            null
          }
        </section>
      </section>
      {showModal && user?.userInfo?.id ? (
        <EditUser id={user?.userInfo?.id} />
      ) : null}
    </motion.div>
  );
};

export default Profile;
