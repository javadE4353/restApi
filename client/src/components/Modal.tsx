import { useCallback, useEffect, useState, CSSProperties } from "react";
import { useRecoilState } from "recoil";
import { modalMylist, modalState, movieState } from "../atoms/modalAtom";
import ReactPlayer from "react-player/lazy";
import { FaPlay } from "react-icons/fa";
import { HiOutlineCheck } from "react-icons/hi";
import { BsPlus } from "react-icons/bs";
import { BsHandThumbsUpFill } from "react-icons/bs";
import { BsFillVolumeMuteFill } from "react-icons/bs";
import { BsFillVolumeUpFill } from "react-icons/bs";
import {
  Element,
  Genre,
  Movies,
  Userinfo,
  CommentType,
  Ratings,
} from "../typeing";
import MuiModal from "@mui/material/Modal";
import toast, { Toaster } from "react-hot-toast";
import { Dispatch } from "redux";
import { useSelector, useDispatch } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";

import {
  insertmylist,
  getAllmylist,
  removeMovieMylist,
} from "../redux/actionCreator/actionCreateMylist";
import apiConfig from "../axios/configApi";
import { BsX } from "react-icons/bs";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import useAxiosPrivate from "../hook/useAxiosPrivate";
import Comments from "../subcomponents/Comments";
import { getComments } from "../redux/actionCreator/actionCreateComment";
import {
  getRatings,
  insertRatings,
} from "../redux/actionCreator/actionCreateRatings";
const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
  position: "absolute",
  top: "50%",
  transform: "translate(-50%, -50%)",
  right: "44%",
};
interface Mylist {
  mylist: { mylist: Movies[] , isloading: boolean};
 
}
interface StateTypeAuth {
  auth: {
    accessToken: string | null | undefined;
    userInfo: Userinfo | null;
    isLoading: boolean;
    erroMessage: null | string;
  };
}

interface Comment {
  comment: {
    comment: CommentType[] | null;
    insert: number | null;
    ErrorMassege: null | string;
    isLoading: boolean;
  };
}
interface RatingsState {
  ratings: {
    ratings: Ratings[] | null;
    isloading: boolean;
  };
}
function Modal() {
  let [color, setColor] = useState("#ffffff");

  const [showmylist, setShowMylist] = useRecoilState(modalMylist);
  const [movie, setMovie] = useRecoilState(movieState);
  const [trailer, setTrailer] = useState("");
  const [rated, setRated] = useState<boolean>(false);
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [muted, setMuted] = useState(true);
  const [ratings, setRatings] = useState<number>(0);
  const [showCament, setShowCament] = useState<boolean>(false);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [addedToList, setAddedToList] = useState(false);
  const [movies, setMovies] = useState<null | Movies>(null);
  const axiosPrivate = useAxiosPrivate();
  const mylist = useSelector((state: Mylist) => state?.mylist);
  const user = useSelector((state: StateTypeAuth) => state?.auth);
  const comment = useSelector((state: Comment) => state?.comment);
  const stateRatings = useSelector((state: RatingsState) => state?.ratings);
  const dispatch: Dispatch<any> = useDispatch();
  // setMovies(mylist)
  const toastStyle = {
    background: "white",
    color: "black",
    fontWeight: "bold",
    fontSize: "16px",
    padding: "15px",
    borderRadius: "9999px",
    maxWidth: "1000px",
  };
  useEffect(() => {
    if (!movie) return;

    async function fetchMovie() {
      const data = await fetch(
        `https://api.themoviedb.org/3/${
          movie?.media_type === "tv" ? "tv" : "movie"
        }/${movie?.id}?api_key=${
          apiConfig.apiKey
        }&language=en-US&append_to_response=videos`
      ).then((response) => response.json());
      if (data?.videos) {
        console.log(data?.videos?.results);
        const index = data.videos.results.findIndex(
          (element: Element) => element.type === "Trailer"
        );
        setTrailer(data.videos?.results[index]?.key);
      }
      if (data?.genres) {
        setGenres(data.genres);
      }
    }

    fetchMovie();
  }, [movie?.id]);

  const handleClose = () => {
    setShowModal(false);
    setMovie(null);
    setShowMylist(!showmylist);
    toast.dismiss();
  };

  //   // Find all the movies in the user's list
  const mylistdata = useCallback(() => {
    if (user?.accessToken && user?.userInfo?.id) {
      const dublicate = mylist?.mylist?.find(
        (item: Movies) =>
          item.movieid === movie?.id || item.movieid === movie?.movieid
      );
      console.log(dublicate);
      if (dublicate !== undefined) {
        setMovies(dublicate);
        setAddedToList(true);
      } else {
        setAddedToList(false);
        setMovies(null);
      }
    }
  }, [movie]);
  const handlechakRatings = useCallback(() => {
    if (user?.accessToken && user?.userInfo?.id) {
      const dublicate = stateRatings?.ratings?.find(
        (item: Ratings) =>
          item.movietitle === movie?.original_title ||
          item.movietitle === movie?.title
      );
      if (dublicate !== undefined && dublicate?.ratings !== null) {
        setRatings(dublicate?.ratings);
        setRated(true);
      } else {
        setRated(false);
      }
    }
  }, [movie, rated]);
  const getRatingsAll = useCallback(() => {
    if (movie?.original_title) {
      console.log(movie)
      dispatch(getRatings(movie?.original_title, axiosPrivate));
    }
  }, [movie, rated]);
  //   // Check if the movie is already in the user's list

  const handleList = () => {
    if (
      movies !== null &&
      user?.userInfo?.id !== undefined &&
      addedToList === true
    ) {
      console.log(movies?.id);
      if (movies?.movieid) {
        dispatch(
          removeMovieMylist(user?.userInfo?.id, movies?.movieid, axiosPrivate)
        );
      }
      if (!movies?.movieid) {
        dispatch(
          removeMovieMylist(user?.userInfo?.id, movies?.id, axiosPrivate)
        );
      }
      setAddedToList(false);
      toast(`${movie?.title || movie?.original_title} از لیست شما حذف شد`, {
        duration: 8000,
        style: toastStyle,
      });
      setAddedToList(false);
    } else if (movie && addedToList === false) {
      const movieAdd = { ...movie, username: user?.userInfo?.username };
      setAddedToList(true);
      dispatch(insertmylist(movieAdd, axiosPrivate));
      toast(`${movie?.title || movie?.original_title} به لیست شما اضافه شد`, {
        duration: 8000,
        style: toastStyle,
      });
    }
  };

  const handleRatings = () => {
    if (movie?.original_title && rated === false) {
      const Ratings = {
        username: user?.userInfo?.username,
        movietitle: movie?.original_title,
        ratings: movie?.vote_count + 1,
      };
      dispatch(insertRatings(Ratings,movie?.original_title, axiosPrivate));
      setRatings(Ratings?.ratings);
      setRated(!rated);
    } else if (movie?.original_title && rated === true) {
      const Ratings = {
        username: user?.userInfo?.username,
        movietitle: movie?.original_title,
        ratings: movie?.vote_count - 1,
      };
      dispatch(insertRatings(Ratings,movie?.original_title, axiosPrivate));
      setRatings(Ratings?.ratings);
      setRated(!rated);
    }
  };

  useEffect(() => {
    mylistdata();
    getRatingsAll();
    handlechakRatings();
  }, [movie]);

  console.log(stateRatings)

  return (
    <>
      <MuiModal
        open={stateRatings?.isloading}
        className="fixed !top-7 left-0 right-0 z-50 mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll rounded-md scrollbar-hide"
      >
        <ClipLoader
          color={color}
          loading={stateRatings?.isloading}
          cssOverride={override}
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </MuiModal>

      <MuiModal
        open={showModal}
        onClose={handleClose}
        className="fixed !top-7 left-0 right-0 z-50 mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll rounded-md scrollbar-hide"
      >
        <>
          <Toaster position="bottom-center" />
          <button
            className="modalButton absolute right-5 top-5 !z-40 h-9 w-9 border-none bg-[#181818] hover:bg-[#181818]"
            onClick={handleClose}
          >
            <BsX className="h-6 w-6" />
          </button>

          <div className="relative pt-[56.25%]">
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${trailer}`}
              width="100%"
              height="100%"
              style={{ position: "absolute", top: "0", left: "0" }}
              playing
              loop
              controls
              volume={1}
              light={true}
              muted={muted}
            />
            <div className="absolute bottom-10 flex w-full items-center justify-between px-10"></div>
          </div>
          <div className="flex flex-col space-x-16 rounded-b-md bg-[#181818] px-10 py-8">
            <div className="space-y-6 text-lg">
              <div className="p-2">
                <h3>{movie?.title || movie?.original_title}</h3>
              </div>
              <div>
                <div className="flex justify-around space-x-2 p-4 border border-white border-solid rounded-md justify-center w-auto lg:w-[30%] md:w-[50%]">
                  <button className="flex border border-blue-400 items-center gap-x-2 rounded pl-8 text-xl font-bold text-white transition hover:bg-[#e6e6e6]">
                    <FaPlay className="h-7 w-7 text-black" />
                    نمایش
                  </button>
                  <button
                    className="mr-4 modalButton"
                    onClick={() => handleList()}
                  >
                    {addedToList ? (
                      <HiOutlineCheck className="h-7 w-7" />
                    ) : (
                      <BsPlus className="h-7 w-7" />
                    )}
                  </button>
                  <button
                    className="modalButton"
                    onClick={() => handleRatings()}
                  >
                    <BsHandThumbsUpFill
                      className={`h-6 w-6 ${rated ? "text-blue-400" : null}`}
                    />
                  </button>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                {/* <p className="font-semibold text-green-400">
                {movie!.vote_average * 10}% Match
              </p> */}
                <div className="flex h-4 items-center justify-center rounded border border-white/40 px-1.5 text-xs">
                  تاریخ:<p className="font-light">{movie?.release_date}</p>
                </div>
              </div>
              <div className="p-4 rounded-md border border-white border-solid	">
                <p className="w-full">{movie?.overview}</p>
              </div>
              <div className="flex flex-col gap-x-10 gap-y-4 font-light md:flex-row">
                <div className="flex flex-col space-y-3 text-sm">
                  <div>
                    <span className="text-[gray]">ژانر:</span>{" "}
                    {genres.map((genre) => genre.name).join(", ")}
                  </div>

                  <div>
                    <span className="text-[gray]">زبان:</span>{" "}
                    {movie?.original_language}
                  </div>

                  <div>
                    <span className="text-[gray]">امتیاز:</span>{" "}
                    {ratings > 0 ? ratings : movie?.vote_count}
                  </div>
                </div>
              </div>
            </div>
            <div>
              <button onClick={() => setShowCament(!showCament)}>
                نمایش نظرات
              </button>

              {movie && user?.userInfo && showCament ? (
                <Comments
                  movie={movie}
                  items={comment?.comment}
                  username={user?.userInfo?.username}
                  movieid={movie?.movieid || movie?.id}
                  movietitle={movie?.original_title}
                  ratings={movie?.vote_count}
                  newratings={ratings}
                />
              ) : null}
            </div>
          </div>
        </>
      </MuiModal>
      <MuiModal
        open={mylist?.isloading}
        className="fixed !top-7 left-0 right-0 z-50 mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll rounded-md scrollbar-hide"
      >
        <ClipLoader
          color={color}
          loading={mylist?.isloading}
          cssOverride={override}
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </MuiModal>
    </>
  );
}

export default Modal;
