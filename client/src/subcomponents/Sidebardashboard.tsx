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
import { useRecoilState } from "recoil";
import { modalSidebarAdmin } from "../atoms/modalAtom";
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


const SidebarDashboard = () => {
  const toggle = useSelector((state: togglesidebar) => state?.sidebar?.toggle);
  const user = useSelector((state: StateTypeAuth) => state?.auth);
  const [open, setOpen] = useState(true);
  const [menus, setMenus] = useState<Menus[]>([]);
  const [Sidebar, setSidebar] = useRecoilState(modalSidebarAdmin);

  const dispatch: Dispatch<any> = useDispatch();
  const menusUser = [
    { name: "پروفایل", link: "/dashboard/me/profile", icon: MdOutlineDashboard },
    { name: "لیست من", link: "/dashboard/me/mylist", icon: FiFolder, margin: true },
    { name: "خروج", link: "/", icon: RiSettings4Line, margin: true },
  ];
  const menusAdmin = [
    { name: "پروفایل", link: "/dashboard/profile", icon: MdOutlineDashboard },
    { name: "کاربران", link: "/dashboard/users", icon: MdOutlineDashboard },
    { name: "ویرایش", link: "/dashboard/edit", icon: FiFolder, margin: true },
    { name: "فیلم", link: "/dashboard/product", icon: FiFolder, margin: true },
    { name: "خروج", link: "/", icon: RiSettings4Line, margin: true },

  ];

  useEffect(()=>{
    user?.userInfo?.role === "admin"?setMenus(menusAdmin):setMenus(menusUser)
  },[])

  const handleSidebarCollaps=()=>{
    setOpen(!open)
    setSidebar(!Sidebar)
  }

  return (
    <section className="flex scrollbar-hide flex transition-all gap-6 py-0">
      <div
        className={`bg-sidebar overflow-hidden overflow-y-auto relative h-screen scrollbar-hide ${
          open ? "w-40" : "w-16"
        } duration-500 text-gray-100 px-4`}
      >
        <div className="py-3 flex justify-end">
          <HiMenuAlt3
            size={26}
            className="cursor-pointer"
            onClick={() => handleSidebarCollaps()}
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
        </div>
      </div>
    </section>
  );
};

export default SidebarDashboard;
