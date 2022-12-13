import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./components/Login";
import RequiredAuth from "./components/requireAuth/RequiredAuth";
import Register from "./components/Register";
import Category from "./components/Category";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Dispatch } from "redux";
import getComedyMovie from "./redux/actionCreator/actionCreateComedyMovie";
import getActionMovie from "./redux/actionCreator/actionCreateAmovie";
import getHorroMovie from "./redux/actionCreator/actionCreateHorroMovie";
import getMovieToprated from "./redux/actionCreator/actionCreateToprated";
import getMoviePopuler from "./redux/actionCreator/actionMovie";
import getRomancMovie from "./redux/actionCreator/actionCreateRomancMovie";
import { Movies } from "./typeing";

import Dashboard from "./components/Dashboard";
import Unauthorized from "./components/unauthorized/Unauthorized";
import Notfount from "./components/Notfount";
import newAccessTokenAction from "./redux/actionCreator/actionCreateAccessToken";
import Account from "./components/Account";
import NewUser from "./components/Newuser";
import ViewTableUser from "./subcomponents/ViewTableUser";
import TableMovieMylist from "./subcomponents/TableMovieMylist";
import EditUser from "./components/EditeUser";
import Profile from "./components/Profile";
interface Roles {
  User: string;
  Admin: string;
}
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

interface Mylist {
  mylist: { mylist: Movies[] };
}
const App: React.FC = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const items = useSelector((state: MovieType) => state);
  const toggle = useSelector((state: togglesidebar) => state?.sidebar?.toggle);
  const mylist = useSelector((state: Mylist) => state?.mylist.mylist);

  useEffect(() => {
    dispatch(newAccessTokenAction(dispatch));
    dispatch(getComedyMovie());
    dispatch(getActionMovie());
    dispatch(getHorroMovie());
    dispatch(getRomancMovie());
    dispatch(getMovieToprated());
    dispatch(getMoviePopuler());
  }, []);
  const ROLES: Roles = {
    User: "user",
    Admin: "admin",
  };
  return (
    <Routes>
      {/* Route default */}
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/" element={<Home />}></Route>
      <Route path="/unauthorized" element={<Unauthorized />}></Route>
      <Route
        path="/comedy"
        element={<Category movie={items?.comedymovie?.comedymovie} />}
      ></Route>
      <Route
        path="/action"
        element={<Category movie={items?.actionmovie?.actionmovie} />}
      ></Route>
      {/* Role Admin */}
      <Route element={<RequiredAuth allowedRoles={[ROLES.Admin]} />}>
        <Route path="/dashboard" element={<Dashboard path={"users"} />}>
          <Route path="users" element={<ViewTableUser />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Route>
      {/* Role User */}
      <Route element={<RequiredAuth allowedRoles={[ROLES.User]} />}>
        <Route path="/dashboard/me" element={<Dashboard path={"me/mylist"} />}>
          <Route path="mylist" element={<TableMovieMylist />}></Route>
          <Route path="profile" element={<Profile />}></Route>
        </Route>
        <Route path="/account" element={<Account />}></Route>
        <Route path="/mylist" element={<Category movie={mylist} />}></Route>
      </Route>
      {/* Route Notfount */}
      <Route path="*" element={<Notfount />}></Route>
    </Routes>
  );
};

export default App;
