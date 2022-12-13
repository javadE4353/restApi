import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import getMoviePopuler from "../redux/actionCreator/actionMovie";
import SliderItemHome from "../subcomponents/SliderItemHome";
import { Movies } from "../typeing";

interface MovieType {
  movies: { movie: Movies[]; isloading: boolean };
}
interface Movie {
  movie: MovieType;
  isloading: boolean;
}
const SliderHome: React.FC = () => {
  const [movie, setMovie] = useState<Movies | null>(null);
  const dispatch: Dispatch<any> = useDispatch();
  const banner = useSelector((state: MovieType) => state?.movies.movie);
  const banner1 = useSelector((state: MovieType) => state?.movies);
  useEffect(() => {
    dispatch(getMoviePopuler());
  }, []);

  useEffect(() => {
    setMovie(banner?.[Math.floor(Math.random() * banner.length)]);
  }, [banner]);

  // console.log(banner1);
  return (
    <>
      <SliderItemHome item={movie} />
    </>
  );
};

export default SliderHome;
