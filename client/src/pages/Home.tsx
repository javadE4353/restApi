import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  CSSProperties,
} from "react";

//module external
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import MuiModal from "@mui/material/Modal";
import { motion } from "framer-motion";
import { BsX } from "react-icons/bs";
import {
  Movies,
  StateAccessToken,
  StateTypeAuth,
  Userinfo,
} from "../typeing";
import ClipLoader from "react-spinners/ClipLoader";
import { Outlet } from "react-router-dom";

//
import Header from "../components/Header";
import Modal from "../components/Modal";
import Row from "../components/Row";
import Sidebar from "../components/Saidebar";
import SliderHome from "../components/slider";
import useAxiosPrivate from "../hook/useAxiosPrivate";
import { getAllmylist } from "../redux/actionCreator/actionCreateMylist";
import NavigationBottom from "../subcomponents/NavigationBottom";


// interface
const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
  position: "absolute",
  top: "50%",
  transform: "translate(-50%, -50%)",
  right: "44%",
};

interface togglesidebar {
  sidebar: { toggle: boolean };
}
interface MoviesType {
  movies:{ 
    movieAll: Movies[];
    movie: Movies;
    insert: number;
    update: number;
    delete: number;
    isloading: boolean;
    ErrorMessage: string ;}
  }
interface Mylist {
  mylist: { mylist: Movies[]; isloading: boolean };
}

interface Cat{
  title:string,
  bits:number,
  image:string,
  content:string 
}

interface Categorys {
 categorys:{
  categorys: Cat[] ;
  update:number
  delete:number
  insert:number
  isloading: boolean;
  ErrorMassege:string | null
 }
}

const Home: React.FC = () => {
  let [color, setColor] = useState("#ffffff");
  let [showalret, setShowAlert] = useState(true);

  const mylist = useSelector((state: Mylist) => state?.mylist);
  const user = useSelector((state: StateTypeAuth) => state?.auth);

  const dispatch: Dispatch<any> = useDispatch();
  const accesstoken = useSelector(
    (state: StateAccessToken) => state?.accesstoken
  );
  const movies = useSelector((state: MoviesType) => state?.movies?.movieAll);
  const categorys = useSelector((state: Categorys) => state?.categorys?.categorys);
  const toggle = useSelector((state: togglesidebar) => state?.sidebar?.toggle);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    if (user?.accessToken && user?.userInfo?.id) {
      dispatch(getAllmylist(user?.userInfo?.id, axiosPrivate));
    }
  }, []);

  return (
    <div
      className="relative h-screen bg-gradient-to-b from-gray-900/10 to-[#010511] lg:h-[140vh] "
      // initial={{width:0}}
      // animate={{width:"100%"}}
      // exit={{x:window.innerWidth}}
    >
      <Header />
      <div
        className={`fixed top-0 z-[999] bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative ${
          showalret ? "block" : "hidden"
        }`}
      >
        <strong className="font-bold">رمز ورود و نام کاربری:ادمین</strong>
        <span className="block sm:inline">
          <span className="mx-2">نام کاربری:golren</span>
          <span>رمز ورود:%$@G1234</span>
        </span>
        <span
          className="absolute top-0 bottom-0 left-0 px-4 py-3"
          onClick={() => setShowAlert(false)}
        >
          <BsX className="text-red-400"/>
        </span>
      </div>
      <main className="relative pl-4 pb-16 sm:pb-0 lg:space-y-24 lg:pl-16">
        <MuiModal
          open={user?.userInfo?.username ? accesstoken?.isLoading : false}
          className="fixed !top-7 left-0 right-0 z-50 mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll rounded-md scrollbar-hide"
        >
          <ClipLoader
            color={color}
            loading={user?.userInfo?.username ? accesstoken?.isLoading : false}
            cssOverride={override}
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </MuiModal>
        <>
          <div className={`${toggle ? "block" : "hidden"}`}>
            <Sidebar />
          </div>
          <SliderHome />
          <section className="md:space-y-24">
            {
              categorys?.length>0?categorys?.map((item,i)=>(
              item?.bits !==1 && <Row key={i} title={item?.title} movies={movies} category={item?.bits}/>
              )):null
            }
            {user?.accessToken ? (
              <>
                {mylist?.mylist?.length > 0 ?categorys?.map((item,i)=>(
                   <>
                 {
                 item?.bits === 1 && <Row title={item?.title} movies={mylist?.mylist} category={item?.bits}/>
                  }
                   </>
                )):null

                }
              </>
            ) : null}
          </section>
        </>
      </main>
      {user?.accessToken ? <Outlet /> : null}
      <NavigationBottom />
    </div>
  );
};

export default Home;
