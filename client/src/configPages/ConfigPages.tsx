import {useEffect,useState} from "react"


//module external
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { AnimatePresence } from "framer-motion";

//type
import { Movies } from "../typeing";
//components
import Dashboard from "../components/Dashboard";
import Unauthorized from "../components/unauthorized/Unauthorized";
import Notfount from "../components/Notfount";
import Account from "../components/Account";
import ViewTableUser from "../subcomponents/ViewTableUser";
import TableMovieMylist from "../subcomponents/TableMovieMylist";
import Profile from "../components/Profile";
import Home from "../pages/Home";
import RequiredAuth from "../components/requireAuth/RequiredAuth";
import Category from "../components/Category";
import Modal from "../components/Modal";
import Login from "../pages/Login";
import Register from "../pages/Register";
import TableMovies from "../components/TableMovies";
import { categoryMovies } from "../data/category";
import InsertMovie from "../components/InsertMovie";
import InsertCategoryModal from "../subcomponents/ModalCategoryInsert";
import UpdateMovie from "../components/UpdateMovie";
import UpdateCategoryModal from "../subcomponents/ModalCategoryupdate";
import TableCategory from "../components/TableCategory";

// interface
interface Roles {
  User: string;
  Admin: string;
}

interface Mylist {
  mylist: { mylist: Movies[] };
}
interface MoviesType {
  movie: Movies[] | null;
  Allmovie: Movies[] | null;
  insert: number;
  update: number;
  delete: number;
  isloading: boolean;
  ErrorMessage: string | null;
}
interface Cat{
  name:string,
  bits:number,
  image:string,
  content:string 
}

interface Categorys {
 categorys:{
  categorys: Cat[];
  update:number
  delete:number
  insert:number
  isloading: boolean;
  ErrorMassege:string | null
 }
}
const ConfigPages = () => {

  const [comedy,setComedy]=useState<number>(0)
  const [action,setAction]=useState<number>(0)

  const movies = useSelector((state: MoviesType) => state?.Allmovie);
  const mylist = useSelector((state: Mylist) => state?.mylist.mylist);
  const categorys = useSelector((state: Categorys) => state?.categorys?.categorys);

  const location = useLocation();
  const ROLES: Roles = {
    User: "user",
    Admin: "admin",
  };

  useEffect(() => {
    categorys?.map((item)=>{
     if( item.bits == 28)setComedy(item.bits);
     if( item.bits == 80)setComedy(item.bits);
    })
  }, [])
  
  return (
    <AnimatePresence exitBeforeEnter>
      <Routes location={location} key={location.pathname}>
        {/* Route default */}
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/" element={<Home />}>
          <Route path="movie" element={<Modal />} />
        </Route>
        <Route path="/unauthorized" element={<Unauthorized />}></Route>
        <Route
          path="/comedy"
          element={<Category movie={movies} gener={comedy}/>}
        ></Route>
        <Route
          path="/action"
          element={<Category movie={movies} gener={action}/>}
        ></Route>
        {/* Role Admin */}
        <Route element={<RequiredAuth allowedRoles={[ROLES.Admin]} />}>
          <Route path="/dashboard" element={<Dashboard path={"users"} />}>
            <Route path="users" element={<ViewTableUser />} />
            <Route path="profile" element={<Profile />} />
            <Route path="movies" element={<TableMovies />} />
            <Route path="editmovie" element={<UpdateMovie />} >
              <Route path="editcategory" element={<UpdateCategoryModal />} />
            </Route>
            <Route path="updatemovie" element={<UpdateMovie />} />
            <Route path="category" element={<TableCategory />} />
            <Route path="addmovie" element={<InsertMovie />} >
            <Route path="newcategory" element={<InsertCategoryModal />} />
            </Route>
            <Route path="*" element={<Notfount />}></Route>
          </Route>
          <Route path="/account" element={<Account />}></Route>
          <Route path="/mylist" element={<Category movie={mylist} gener={categoryMovies?.mylist}/>}></Route>
        </Route>
        {/* Role User */}
        <Route element={<RequiredAuth allowedRoles={[ROLES.User]} />}>
          <Route
            path="/dashboard/me"
            element={<Dashboard path={"me/profile"} />}
          >
            <Route path="mylist" element={<TableMovieMylist />}></Route>
            <Route path="profile" element={<ViewTableUser />}></Route>
            <Route path="*" element={<Notfount />}></Route>
          </Route>
          <Route path="/account" element={<Account />}></Route>
          <Route path="/mylist" element={<Category movie={mylist} gener={categoryMovies?.mylist}/>}></Route>
        </Route>
        {/* Route Notfount */}
        <Route path="*" element={<Notfount />}></Route>
      </Routes>
    </AnimatePresence>
  );
};

export default ConfigPages;
