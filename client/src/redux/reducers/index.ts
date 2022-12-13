import {combineReducers} from "redux";
import accessTokenReducer from "./accessTokenReducer/accessTokenReducer";
import actionmovieReducer from "./acrionmoviereducer/actionmovie";
import comedyMovieReducer from "./comedyMovieReducer/comedyMovieReducer";
import commentReducer from "./commentsReducer/commentsReducer";
import horroMovieReducer from "./horrorMovieReducer/HorroMovieReducer";
import loginReducer from "./loginReducer/loginReducer";
import movieReducer from "./movieReducer/movieReducer";
import mylistReducer from "./mylistReducer/mylistReducer";
import paymentReducer from "./paymentReducer/paymentReducer";
import ratingsReducer from "./ratingReducer/ratingReducer";
import romancReducer from "./romancmovie/romancReducer";
import sidebarToggle from "./sidebarReducer/sidebarReducer";
import topRadedReducer from "./TopRated/topRatedReducer";
import usersReducer from "./userReducer/userReducer";
const reducer=combineReducers({
    auth:loginReducer,
    accesstoken:accessTokenReducer,
    movies:movieReducer,
    toprated:topRadedReducer,
    actionmovie:actionmovieReducer,
    comedymovie:comedyMovieReducer,
    romanc:romancReducer,
    horrom:horroMovieReducer,
    sidebar:sidebarToggle,
    mylist:mylistReducer,
    comment:commentReducer,
    ratings:ratingsReducer,
    users:usersReducer,
    subscri:paymentReducer,
})


export default reducer

// export type State=ReturnType<typeOf reducer>