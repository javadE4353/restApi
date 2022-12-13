import {useEffect}from "react"
import { useDispatch, useSelector } from "react-redux";
import {
  Outlet,
  useNavigate,
  Navigate,
  useLocation,
  Link,
} from "react-router-dom";
import { useRecoilState } from "recoil";
import { Dispatch } from "redux";
import { modalSidebarAdmin, modalState } from "../atoms/modalAtom";
import SidebarDashboard from "../subcomponents/Sidebardashboard";
import { Userinfo } from "../typeing";
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

interface Props{
  path:string
}

const Dashboard = ({path}:Props) => {
  const navigate=useNavigate()
  const [Sidebar, setSidebar] = useRecoilState(modalSidebarAdmin);

  const user = useSelector((state: StateTypeAuth) => state?.auth?.userInfo);

  useEffect(()=>{
    navigate(`/dashboard/${path}`)
  },[])
  return (
    <section>
      <div className="flex">
        <div
          className={`transition-all ${
            Sidebar ? "grow-0 shrink" : "grow-0 shrink	"
          }`}
        >
          <SidebarDashboard />
        </div>
        <div className={`${
            Sidebar ? "grow" : "grow"
          }`}>
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
