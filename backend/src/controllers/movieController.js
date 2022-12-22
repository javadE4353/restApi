import { validationResult } from "express-validator";
import db from "../model/index.js";
import { responce } from "../util/configResponce.js";
import { paginate } from "../helper/paginate.js";

export const movieController = new (class MovieController {
  constructor() {}

  // insertMovie
  async insertMovie(req, res) {
    // chack valide movie
    // const error = validationResult(req);
    // if (!error.isEmpty()) {
    //   return responce({
    //     res,
    //     code: 401,
    //     message: "error validate",
    //     data: error.array(),
    //   });
    // }
const dataimg = {};
if (req.file !== undefined && req.file !== null) {
  dataimg.backdrop_path = req.file.path.replace(/\\/g, "/").substring(6);
  req.body.backdrop_path = `http://localhost:7000/${dataimg.backdrop_path}`;
  console.log("not null");
} else {
  req.body.backdrop_path = null;
}
    const data = {
      adult: Boolean(req.body?.adult),
      genre_ids: JSON.stringify([Number(req.body?.genre_ids)]),
      popularity: Number(req.body?.popularity),
      video: Boolean(req.body?.video),
      vote_average: Number(req.body?.vote_average),
      vote_count: Number(req.body?.vote_count),
    };

    const user = await db.user.findOne({
      where: { id: Number(req.query.userid) },
    });

    if (!user) {
      return responce({
        res,
        code: 400,
        message: "error",
      });
    }

    const dublicateMovie = await db.Movies.findOne({
      where: { title: req.body.title },
    });
    if (dublicateMovie) {
      return responce({
        res,
        code: 409,
        message: "already movie",
      });
    }

    let cat = await db.Category.findAll({
      attributes: ["id"],
      where: { bits: Number(req.body.genre_ids) },
    });

    if (!cat) {
      return responce({
        res,
        code: 400,
        message: "error",
      });
    }

    cat = JSON.parse(JSON.stringify(cat));
    const newMovie = await db.Movies.create({
      ...req.body,
      adult: data.adult,
      genre_ids: data.genre_ids,
      popularity: data.popularity,
      video: data.video,
      vote_count: data.vote_count,
      vote_average: data.vote_average,
      username: user.toJSON().username,
      roleuser: req.role,
      userId: user.toJSON().id,
    });

    await db.CategoryHasMovies.create({
      categoryId: cat[0].id,
      movieId: newMovie.toJSON().id,
    });
    console.log(newMovie);
    console.log(cat[0].id);
    console.log("cat----------------------------------------------------");
    return responce({
      res,
      code: 201,
      message: "ok : inser movie",
      data: newMovie,
    });
  }

  async deleteMovie(req, res) {
    const { username, movieid, movietitle } = req.query;
    if (movieid) {
      try {
        const upMovie = await db.Movies.destroy({
          where: { id: movieid },
        });
        console.log(upMovie)
        return responce({
          res,
          code: 200,
          message: `ok : remove movie${movietitle}`,
          data: upMovie,
        });
      } catch (error) {
        console.log(error);
        return responce({
          res,
          code: 400,
          message: "error",
          data: error,
        });
      }
    }
  }
  async getAllmovies(req, res) {
    
      try {
        const Movie = await db.Movies.findAll({});
        return responce({
          res,
          code: 200,
          message: `ok`,
          data: Movie,
        });
      } catch (error) {
        console.log(error);
        return responce({
          res,
          code: 400,
          message: "error",
          data: error,
        });
      }
  }

  async updateMovie(req, res) {
    const { username, movieid, movietitle } = req.query;
    if (movieid) {
      const data = {
        ...req.body,
        genre_ids: JSON.stringify(req.body?.genre_ids),
      };
      try {
        const upMovie = await db.Movies.update(data, {
          where: { id: movieid },
        });
        return responce({
          res,
          code: 200,
          message: `ok : update movie${movietitle}`,
          data: upMovie,
        });
      } catch (error) {
        console.log(error);
        return responce({
          res,
          code: 400,
          message: "error",
          data: error,
        });
      }
    }
  }

  async getCountMovie(req, res) {
    try {
      const contMov = await db.Movies.count();
      const movieusername = await db.Movies.findAll({attributes:["username","id"]});
      console.log(contMov);
      return responce({
        res,
        code: 200,
        message: "ok",
        data: {count:contMov,username:movieusername},
      });
    } catch (error) {
      return responce({
        res,
        code: 500,
        message: "fail",
        data: error,
      });
    }
  }

  async getAllmovie(req, res) {
    // get all movie full option

    if (req.query?.category && req.query?.username && req.query?.all) {
      console.log("moviecategoryfillter1 ____________________________________________________________________________________")
      try {

        const category = req.query?.category;
        const username = req.query?.username;
        const page = 1;
        const pageSize = 1000;
        const movies = await db.Movies.findAll(
          paginate(
            {
              where: {
                [Op.and]: [{ username: username }, { genre_ids: category }],
              },
              include: [{ model: db.Category, where: { bits:category },required: true }],
            },
            { page, pageSize }
          )
        );

        return responce({
          res,
          code: 200,
          message: "ok",
          data: movies,
        });
      } catch (error) {
        return responce({
          res,
          code: 500,
          message: "fail",
          data: error,
        });
      }
      
    }

    // get all movie __remove option.all
    else if (req.query?.category && req.query?.username ) {
      console.log("moviecategoryfillter2 ____________________________________________________________________________________")
      try {

        const category = Number(req.query?.category);
        const username = req.query?.username;
        const pageSize = Number(req.query.pageSize);
        const page = Number(req.query.page);
        const movies = await db.Movies.findAll(
          paginate(
            {
              where:{ username: username },
              include: [{ model: db.Category, where: { bits:category },required: true }],
            },
            { page, pageSize }
          )
        );

        return responce({
          res,
          code: 200,
          message: "ok",
          data: movies,
        });
      } catch (error) {
        return  responce({
          res,
          code: 500,
          message: "fail",
          data: error,
        });
      }
    }
    // get all movie __remove option.all & category
   else if (req.query?.username) {
     console.log("moviecategoryfillter3 ____________________________________________________________________________________")
      try {

        const pageSize = Number(req.query.pageSize);
        const page = Number(req.query.page);
        const username = req.query?.username;
        const movies = await db.Movies.findAll(
          paginate(
            {
              where: { username: username },
              include: [{ model: db.Category }],
            },
            { page, pageSize }
          )
        );

        return responce({
          res,
          code: 200,
          message: "ok",
          data: movies,
        });
      } catch (error) {
        return  responce({
          res,
          code: 500,
          message: "fail",
          data: error,
        });
      }
    }

    // get all movie __remove option.all & username
    else if (req.query?.category) {
      console.log("moviecategoryfillter 4____________________________________________________________________________________")
      try {

        const category = Number(req.query?.category);
        const pageSize = Number(req.query.pageSize);
        const page = Number(req.query.page);
        const movies = await db.Movies.findAll(
          paginate(
            {
              include: [{ model: db.Category, where: { bits:category },required: true }],
            },
            { page, pageSize }
          )
        );
        return  responce({
          res,
          code: 200,
          message: "ok",
          data: movies,
        });
      } catch (error) {
        return  responce({
          res,
          code: 500,
          message: "fail",
          data: error,
        });
      }
    
    }

    // get all movies __ option.username & option.category
    if (req.query.username && req.query?.Category) {
      try {
        console.log("moviecategoryfillter5 ____________________________________________________________________________________")

        const username = Number(req.query.username);
        const category = Number(req.query.category);
        const page = 1;
        const pageSize = 1000;
        const movies = await db.Movies.findAll(
          paginate(
            {
              where: {
                [Op.and]: [{ username: username }, { genre_ids: category }],
              },
              include: [{ model: db.Category, where: { bits:category },required: true }],
            },
            { page, pageSize }
          )
        );

        return responce({
          res,
          code: 200,
          message: "ok",
          data: movies,
        });
      } catch (error) {
        return responce({
          res,
          code: 500,
          message: "fail",
          data: error,
        });
      }
    }

    //  get all movie ___option.category
    if (req.query?.category) {
      const page = 1;
      const pageSize = 1000;
      const category = Number(req.query?.category);
      try {
        console.log("moviecategoryfillter6 ____________________________________________________________________________________")

        const cat=await db.Category.findOne({where:{bits:category}})
        if(!cat){
          return responce({
            res,
            code: 400,
            message: "fail",
            data: error,
          });
        }
        const movies = await db.Movies.findAll(
          paginate(
            {
              include: [{ model: db.Category, where: { bits:category },required: true }],
            },
            { page, pageSize }
          )
        );
        
        // console.log(movies)
        return responce({
          res,
          code: 200,
          message: "ok",
          data: movies,
        });
      } catch (error) {
        return responce({
          res,
          code: 200,
          message: "fail",
          data: error,
        });
      }
    }
    // get all movie __option.username
    if (req.query?.username) {
      try {
        console.log("moviecategoryfillter7 ____________________________________________________________________________________")

        const username = req.query.username;
        const page = 1;
        const pageSize = 1000;
        const movies = await db.Movies.findAll(
          paginate(
            {
              where: { username: username },
              include: [{ model: db.Category }],
            },
            { page, pageSize }
          )
        );

        return responce({
          res,
          code: 200,
          message: "ok",
          data: movies,
        });
      } catch (error) {
        return responce({
          res,
          code: 500,
          message: "fail",
          data: error,
        });
      }
    }

    // get all movie __ option.page & pageSize
    if (req.query.page && req.query?.pageSize) {
      const pageSize = Number(req.query.pageSize);
      const page = Number(req.query.page);
      try {

        const movies = await db.Movies.findAll(
          paginate(
            {
              include: [{ model: db.Category }],
            },
            { page, pageSize }
          )
        );

         responce({
          res,
          code: 200,
          message: "ok",
          data: movies,
        });
      } catch (error) {
         responce({
          res,
          code: 500,
          message: "fail",
          data: error,
        });
      }
      return
    }
    //get all movie ___option.all
    if (req.query?.all) {
      try {
        console.log("moviecategoryfillter9 ____________________________________________________________________________________")

        const page = 1;
        const pageSize = 1000;
        const movies = await db.Movies.findAll(
          paginate(
            {
              include: [{ model: db.Category }],
            },
            { page, pageSize }
          )
        );

        return responce({
          res,
          code: 200,
          message: "ok",
          data: movies,
        });
      } catch (error) {
        return responce({
          res,
          code: 500,
          message: "fail",
          data: error,
        });
      }
    }
    // get all movie __option.page
    // if (req.query?.page) {
    //   try {
    //     console.log("moviecategoryfillter10 ____________________________________________________________________________________")

    //     const page = Number(req.query?.page);
    //     const pageSize = 1000;
    //     const movies = await db.Movies.findAll(
    //       paginate(
    //         {
    //           include: [{ model: db.Category }],
    //         },
    //         { page, pageSize }
    //       )
    //     );

    //      responce({
    //       res,
    //       code: 200,
    //       message: "ok",
    //       data: movies,
    //     });
    //   } catch (error) {
    //      responce({
    //       res,
    //       code: 500,
    //       message: "fail",
    //       data: error,
    //     });
    //   }
    //   return
    // }
    try {
      console.log("moviecategoryfillter12 ____________________________________________________________________________________")

      const movies = await db.Movies.findAll({
        include: [{ model: db.Category }],
      });
       responce({
        res,
        code: 200,
        message: "ok",
        data: movies,
      });
    } catch (error) {
      // console.log(error)
       responce({
        res,
        code: 500,
        message: "fail",
        data: error,
      });
    }
   
  }

  async getMovieByUser(req, res) {}
})();
