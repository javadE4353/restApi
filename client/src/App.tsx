import { useEffect, useState } from "react";

//module external
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { motion } from "framer-motion";

//
import { getmovies } from "./redux/actionCreator/actionMovie";
import baseUrl from "./axios/configApi";
import newAccessTokenAction from "./redux/actionCreator/actionCreateAccessToken";
import ConfigPages from "./configPages/ConfigPages";
import { Movies, StateAccessToken } from "./typeing";
import useAxiosPrivate from "./hook/useAxiosPrivate";

import getCategorys from "./redux/actionCreator/actionCreateCategory";
interface MoviesType {
  movies: {
    movies: Movies[];
    movie: Movies | null;
    insert: number;
    update: number;
    delete: number;
    isloading: boolean;
    ErrorMessage: string | null;
  };
}
const App: React.FC = () => {
  const [movie, setMovie] = useState<Movies[]>([]);
  const accesstoken = useSelector(
    (state: StateAccessToken) => state?.accesstoken
  );
  const movies = useSelector((state: MoviesType) => state?.movies?.movies);

  const dispatch: Dispatch<any> = useDispatch();
  useEffect(() => {
    dispatch(getmovies({}));
    dispatch(getCategorys());
    if (accesstoken?.accessToken) {
      dispatch(newAccessTokenAction(dispatch));
    }
  }, []);

  useEffect(() => {
    if (movies) {
      setMovie(movies);
    }
  }, [movies]);
  return (
    <>
      {movie.length > 0 ? (
        <ConfigPages />
      ) : (
        <motion.div
          className="h-140 w-screen"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          exit={{ x: window.innerWidth }}
        >
          <img
            src={`${baseUrl.originalImage}/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg`}
            className="object-cover h-auto w-full "
            alt=""
          />
        </motion.div>
      )}
    </>
  );
};

export default App;
