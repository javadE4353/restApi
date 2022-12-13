import {useState}from "react"


import { Link } from "react-router-dom";
import { Movies, Userinfo } from "../typeing";
import { useRecoilState } from "recoil";
import { modalState, movieState, showAlert } from "../atoms/modalAtom";
import Modal from "../components/Modal";
import { useSelector } from "react-redux";
interface Props {
  movie: Movies | null;
}

interface StateTypeAuth {
  auth: {
    accessToken: string | null;
    userInfo: Userinfo | null;
    isLoading: boolean;
    erroMessage: null | string;
  };
}
const Card = ({ movie }: Props) => {
  const accesstoken = useSelector((state: StateTypeAuth) => state?.auth);
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState);
  const [showModal, setShowModal] = useRecoilState(modalState);

  const [showalret, setShowAlert] = useRecoilState(showAlert);
  const user = useSelector((state: StateTypeAuth) => state?.auth);
  const [errorShowMovie, setErrorShowMovie] = useState<string>("");

  const handleShowMovie = () => {
    if (user?.userInfo?.username) {
      setCurrentMovie(movie);
      setShowModal(true);
      setErrorShowMovie("");
      setShowAlert(false);
    } else {
      setErrorShowMovie(
        "برای مشاهده فیلم باید اشتراک داشته باشید یا در سایت ثبت نام کنید"
      );
      setShowAlert(true);
    }
  };



  return (
    <>
  <div
        onClick={() => handleShowMovie()}
      >
        <div className="w-[21rem] max-w-[100%] bg-black rounded-xl p-3 text-white m-5 flex flex-col  cursor-pointer text-xl hover:scale-110">
          <img
            className="w-full self-center rounded-lg h-[476px]"
            src={"https://image.tmdb.org/t/p/original/" + movie?.poster_path}
            alt="poster"
          />
          <h3 className="my-1">{movie?.title}</h3>
          <h3 className="my-1">⭐{movie?.vote_average}/10</h3>
        </div>
      </div>
      {accesstoken?.accessToken && showModal === true ? <Modal /> : null}
    </>
  );
};

export default Card;
