import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  CSSProperties,
} from "react";

import { useDispatch, useSelector } from "react-redux";
import { useRecoilState } from "recoil";
import { Dispatch } from "redux";
import { modalMylist, modalState } from "../atoms/modalAtom";
import MuiModal from "@mui/material/Modal";

import Header from "../components/Header";
import Modal from "../components/Modal";
import Row from "../components/Row";
import Sidebar from "../components/Saidebar";
import SliderHome from "../components/slider";
import useAxiosPrivate from "../hook/useAxiosPrivate";
import { getAllmylist } from "../redux/actionCreator/actionCreateMylist";
import NavigationBottom from "../subcomponents/NavigationBottom";
import { Movies, Userinfo } from "../typeing";
import ClipLoader from "react-spinners/ClipLoader";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
  position: "absolute",
  top: "50%",
  transform: "translate(-50%, -50%)",
  right: "44%",
};
interface MovieType {
  movies?: { movie: Movies[]; isloading: boolean };
  actionmovie?: { actionmovie: Movies[]; isloading: boolean };
  comedymovie?: { comedymovie: Movies[]; isloading: boolean };
  horrom?: { horrom: Movies[]; isloading: boolean };
  romanc?: { romanc: Movies[]; isloading: boolean };
  toprated?: { toprated: Movies[]; isloading: boolean };
}

interface togglesidebar {
  sidebar: { toggle: boolean };
}

interface StateAccessToken {
  accesstoken: {
    accessToken: string | undefined;
    isLoading: boolean;
    erroMessage: null | string;
  };
}
interface Mylist {
  mylist: { mylist: Movies[]; isloading: boolean };
}

interface StateTypeAuth {
  auth: {
    accessToken: string | null | undefined;
    userInfo: Userinfo | null;
    isLoading: boolean;
    erroMessage: null | string;
  };
}

const Home: React.FC = () => {
  let [color, setColor] = useState("#ffffff");

  const mylist = useSelector((state: Mylist) => state?.mylist);
  const user = useSelector((state: StateTypeAuth) => state?.auth);
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [showmylist, setShowMylist] = useRecoilState(modalMylist);

  const dispatch: Dispatch<any> = useDispatch();
  const accesstoken = useSelector(
    (state: StateAccessToken) => state?.accesstoken
  );
  const items = useSelector((state: MovieType) => state);
  const toggle = useSelector((state: togglesidebar) => state?.sidebar?.toggle);
  const axiosPrivate = useAxiosPrivate();

  const mylistdata = useCallback(() => {
    if (user?.accessToken && user?.userInfo?.id) {
      dispatch(getAllmylist(user?.userInfo?.id, axiosPrivate));
    }
  }, [showModal]);

  useEffect(() => {
    mylistdata();
  }, [showModal]);
  return (
    <div className="relative h-screen bg-gradient-to-b from-gray-900/10 to-[#010511] lg:h-[140vh] ">
      <Header />
      <main className="relative pl-4 pb-16 sm:pb-0 lg:space-y-24 lg:pl-16">
        <MuiModal
          open={user?.userInfo?.username?accesstoken?.isLoading:false}
          className="fixed !top-7 left-0 right-0 z-50 mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll rounded-md scrollbar-hide"
        >
          <ClipLoader
            color={color}
            loading={user?.userInfo?.username?accesstoken?.isLoading:false}
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
            <Row
              title="جدید ترین ها"
              movies={items?.actionmovie?.actionmovie}
            />
            <Row title="برترین ها" movies={items?.actionmovie?.actionmovie} />
            <Row title="اکشن" movies={items?.actionmovie?.actionmovie} />
            {user?.accessToken ? (
              <>
                {mylist?.mylist?.length > 0 && (
                  <Row title="لیست من" movies={mylist?.mylist} />
                )}
              </>
            ) : null}
            <Row title="مستند" movies={items?.horrom?.horrom} />
            <Row title="عاشقانه" movies={items?.actionmovie?.actionmovie} />
            <Row title="سریال ها" movies={items?.actionmovie?.actionmovie} />
          </section>
        </>
      </main>

      {user?.accessToken && showModal === true ? <Modal /> : null}
      <NavigationBottom />
    </div>
  );
};

export default Home;
