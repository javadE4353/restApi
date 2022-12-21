import {useEffect}from "react"

//module external
import { modalSidebarAdmin } from "../atoms/modalAtom";
import { useRecoilState } from "recoil";
import { useSelector } from "react-redux";
import {
  Outlet,
  useNavigate,
  Navigate,
  useLocation,
  Link,
} from "react-router-dom";

//
import SidebarDashboard from "../subcomponents/Sidebardashboard";
import { StateTypeAuth, Userinfo } from "../typeing";

//interface
interface Props{
  path:string
}

//component
const Dashboard = ({path}:Props) => {
  const navigate=useNavigate()
  const [Sidebar, setSidebar] = useRecoilState(modalSidebarAdmin);

  useEffect(()=>{
    // navigate(`/dashboard/profile`)
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
