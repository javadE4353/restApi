import { useEffect, useState } from "react";

//module external
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";

//
import{ getAllmovie, getmovies } from "../redux/actionCreator/actionMovie";
import SliderItemHome from "../subcomponents/SliderItemHome";
import { Movies } from "../typeing";

//interface
interface MoviesType {
movies:{ 
  movies: Movies[] | null;
  movie: Movies | null;
  insert: number;
  update: number;
  delete: number;
  isloading: boolean;
  ErrorMessage: string | null;}
}

//component
const SliderHome: React.FC = () => {
  const [movie, setMovie] = useState<Movies | null>(null);
  const dispatch: Dispatch<any> = useDispatch();
  const banner = useSelector((state: MoviesType) => state?.movies.movies);
  useEffect(() => {
    dispatch(getAllmovie());
  }, []);

  useEffect(() => {
     if(banner){
      setMovie(banner?.[Math.floor(Math.random() * banner.length)]);
     }
  }, [banner]);

  return (
    <>
      <SliderItemHome item={movie} />
    </>
  );
};

export default SliderHome;
