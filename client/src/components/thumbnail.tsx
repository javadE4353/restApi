import { Movies, Userinfo } from "../typeing";
import { useRecoilState } from "recoil";
import { modalState, movieState, showAlert } from "../atoms/modalAtom";
import { useSelector } from "react-redux";
interface Props {
  movie: Movies | null;
}

interface ItemsCard {
  img: string;
}
interface StateTypeAuth {
  auth: {
    accessToken: string | null | undefined;
    userInfo: Userinfo | null;
    isLoading: boolean;
    erroMessage: null | string;
  };
}
const Items: ItemsCard[] = [
  { img: "https://image.tmdb.org/t/p/w500/tlin6STxxVoln0f818sEQYH7PyC.jpg" },
  { img: "https://image.tmdb.org/t/p/w500/eyiSLRh44SKKWIJ6bxWq8z1sscB.jpg" },
  { img: "https://image.tmdb.org/t/p/w500/53BC9F2tpZnsGno2cLhzvGprDYS.jpg" },
  { img: "https://image.tmdb.org/t/p/w500/tIX6j3NzadlwGcJ52nuWdmtOQkg.jpg" },
  { img: "https://image.tmdb.org/t/p/w500/jCY35GkjwWUmoPO9EV1lWL6kuyj.jpg" },
  { img: "https://image.tmdb.org/t/p/w500/jHKNqz0LjM2dOUv5XDPmcSoYPEW.jpg" },
  { img: "https://image.tmdb.org/t/p/w500/kmzppWh7ljL6K9fXW72bPN3gKwu.jpg" },
  { img: "https://image.tmdb.org/t/p/w500/tlin6STxxVoln0f818sEQYH7PyC.jpg" },
];

function Thumbnail({ movie }: Props) {
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState);
  const [showalret, setShowAlert] = useRecoilState(showAlert);
  const [showModal, setShowModal] = useRecoilState(modalState);
  const user = useSelector((state: StateTypeAuth) => state?.auth);

  const handleShowMovie=()=>{
    if(user?.userInfo?.username){
      setCurrentMovie(movie);
      setShowModal(true);
      setShowAlert(false)
    }else{
      setShowAlert(true)
    }
  }



  return (
    <>
      {movie ? (
        <div
          className={`relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105`}
          onClick={() => handleShowMovie()}
        >
            <img
              src={`https://image.tmdb.org/t/p/w500${
                movie?.backdrop_path || movie?.poster_path
              }`}
              className="rounded-sm object-cover md:rounded"
            />
        </div>
      ) : (
        <>
          {Items?.map((item) => (
            <div
              className={`relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105`}
              onClick={() =>handleShowMovie()}
            >
                <img
                  src={`${item?.img}`}
                  className="rounded-sm object-cover md:rounded"
                />
            </div>
          ))}
        </>
      )}
    </>
  );
}

export default Thumbnail;
