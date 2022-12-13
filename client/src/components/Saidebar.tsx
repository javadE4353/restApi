import React, { useState, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { HiMenuAlt3 } from "react-icons/hi";
import { BsX } from "react-icons/bs";
import { MdOutlineDashboard } from "react-icons/md";
import { HiOutlineUser } from "react-icons/hi2";
import { RiSettings4Line } from "react-icons/ri";
import { TbReportAnalytics } from "react-icons/tb";
import { AiOutlineUser, AiOutlineHeart } from "react-icons/ai";
import { FiMessageSquare, FiFolder, FiShoppingCart } from "react-icons/fi";
import { Link,useNavigate} from "react-router-dom";
import {
  actionclosesidebar,
  actionopensidebar,
} from "../redux/actionCreator/actionCreateSidebar";
import { axiospublic } from "../axios/configApi";
import { actionLogout } from "../redux/actionCreator/actionCreateAuth";
import { Userinfo } from "../typeing";
import { IconType } from "react-icons/lib";
interface togglesidebar {
  sidebar: { toggle: boolean };
}

interface StateTypeAuth {
  auth: {
    accessToken: string | null | undefined;
    userInfo: Userinfo | null;
    isLoading: boolean;
    erroMessage: null | string;
  };
}

interface Menus{
  name: string;
  link: string;
  icon: IconType;
  margin?: boolean | undefined;
}

const Sidebar = () => {
  const [menus,setMenus]=useState<Menus[]>([])
  const toggle = useSelector((state: togglesidebar) => state?.sidebar?.toggle);
  const user = useSelector((state: StateTypeAuth) => state?.auth);
  const dispatch: Dispatch<any> = useDispatch();
  const navigate=useNavigate()
  const menuAdmin=[
    { name: "پنل کاربری", link: "/dashboard", icon: MdOutlineDashboard },
    { name: "اکشن", link: "/action", icon: FiFolder, margin: true },
    { name: "برترین ها", link: "/comady", icon: FiFolder },
    { name: "سریال", link: "/action", icon: FiFolder },
    { name: "لیست من", link: "/mylist", icon: FiFolder },
    { name: "کاربران", link: "/dashboard/users", icon: FiFolder },
  ]
  const menuUser=[
    { name: "پنل کاربری", link: "/dashboard/me", icon: MdOutlineDashboard },
    { name: "اکشن", link: "/action", icon: FiFolder, margin: true },
    { name: "برترین ها", link: "/comady", icon: FiFolder },
    { name: "سریال", link: "/action", icon: FiFolder },
    { name: "لیست من", link: "/mylist", icon: FiFolder }
  ]
  const [open, setOpen] = useState(true);
  const hanlerLogout = async () => {
    try {
      await axiospublic.get("/auth/logout");
      dispatch(actionLogout())
      navigate("/")
    } catch (error) {}
  };

  useEffect(()=>{
    user?.userInfo?.role === "admin"?setMenus(menuAdmin):setMenus(menuUser);
  },[])

  return (
    <section className="flex sticky top-14 z-[150] heightSidebar gap-6">
      <div
        className={`bg-sidebar min-h-screen ${
          open ? "w-60" : "w-16"
        } duration-500 text-gray-100 px-4`}
      >
        {!open ? (
          <div className="py-3 flex justify-end">
            <BsX
              size={26}
              className="cursor-pointer text-red-400"
              onClick={() => dispatch(actionclosesidebar())}
            />
          </div>
        ) : null}
        <div className="py-3 flex justify-end">
          <HiMenuAlt3
            size={26}
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>
        <div className="mt-4 flex flex-col gap-4 relative">
          {
         user?.userInfo?.username?
         <Link
         to=''
        
         className={`group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
        //  onClick={}
       >
         <div>{React.createElement(HiOutlineUser,{size:"20"})}</div>
         <h2
           style={{
             transitionDelay: `${menus?.length + 3}00ms`,
           }}
           className={`whitespace-pre duration-500 ${
             !open && "opacity-0 translate-x-28 overflow-hidden"
           }`}
         >
           {user?.userInfo?.username}  
         </h2>
         <h2
           className={`${
             open && "hidden"
           } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
         >
            {user?.userInfo?.username}  
         </h2>
       </Link>
        :null

          }
          {menus?.map((menu, i) => (
            <Link
              to={menu?.link}
              key={i}
              className={` ${
                menu?.margin && "mt-5"
              } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
            >
              <div>{React.createElement(menu?.icon, { size: "20" })}</div>
              <h2
                style={{
                  transitionDelay: `${i + 3}00ms`,
                }}
                className={`whitespace-pre duration-500 ${
                  !open && "opacity-0 translate-x-28 overflow-hidden"
                }`}
              >
                {menu?.name}
              </h2>
              <h2
                className={`${
                  open && "hidden"
                } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
              >
                {menu?.name}
              </h2>
            </Link>
          ))}
          <Link
            to=''
           
            className={`group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
            onClick={hanlerLogout}
          >
            <div>{React.createElement(RiSettings4Line,{size:"20"})}</div>
            <h2
              style={{
                transitionDelay: `${menus?.length + 3}00ms`,
              }}
              className={`whitespace-pre duration-500 ${
                !open && "opacity-0 translate-x-28 overflow-hidden"
              }`}
            >
              خروج
            </h2>
            <h2
              className={`${
                open && "hidden"
              } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
            >
              خروج
            </h2>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Sidebar;
