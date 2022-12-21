import { validationResult } from "express-validator";
import db from "../model/index.js";
import { responce } from "../util/configResponce.js";
import { paginate } from "../helper/paginate.js";

export const movieController = new (class MovieController {
  constructor() {}

  // insertMovie
  async insertMovie(req, res) {
    // chack valide movie
    console.log(req.body)
    // const error = validationResult(req);
    // if (!error.isEmpty()) {
    //   return responce({
    //     res,
    //     code: 401,
    //     message: "error validate",
    //     data: error.array(),
    //   });
    // }
    console.log("movieinsert----------------------------------------------------")
    // const user = await db.user.findOne({ where: { id: Number(req.query.id) } });

    // if(!user){
    //   return responce({
    //     res,
    //     code: 400,
    //     message: "error",
    //   });
    // }

    // const dublicateMovie=await db.Movies.findOne({where:{title:req.title}})
    // console.log(dublicateMovie)
    // console.log("dublicateMovie----------------------------------------------------")
    // if(dublicateMovie){
    //   return responce({
    //     res,
    //     code: 409,
    //     message: "already movie",
    //   });
    // }

    // let cat = await db.Category.findAll({
    //   attributes: ["id"],
    //   where: { bits: req.body.gener_ids },
    // });

    // if (!cat) {
    //   return responce({
    //     res,
    //     code: 400,
    //     message: "error",
    //   });
    // }

    // cat = JSON.parse(JSON.stringify(cat));    
    // const newMovie = await db.Movies.create(
    //   { ...req.body, username: user.toJSON().username, roleuser: req.role,userId:user.toJSON().id},
    //   {
    //     include: db.user,
    //   }
    // );
    // console.log(cat)
    // console.log("cat----------------------------------------------------")

    // await db.CategoryHasMovies.create({
    //   categoryId:item,
    //   movieId:newMovie.toJSON().id
    // })

    // return responce({
    //   res,
    //   code: 201,
    //   message: "ok : inser movie",
    //   data: newMovie,
    // });
  }

  async deleteMovie(req, res) {

    const { username, movieid, movietitle } = req.query;
    if (movieid) {
      try {
        const upMovie = await db.Movies.destroy({
          where: { id: movieid },
        });
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


  async getCountMovie(){
    const contMov= await db.Movies.count()
    return responce({
      res,
      code: 200,
      message: "ok",
      data: contMov
    });
  }


  async getAllmovie(req, res) {
    // get all movie full option
    if (
      req.query?.page &&
      req.query?.pageSize &&
      req.query?.Category &&
      req.query?.username &&
      req.query?.all
    ) {
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

    // get all movie __remove option.all
    if (
      req.query?.page &&
      req.query?.pageSize &&
      req.query?.Category &&
      req.query?.username
    ) {
      try {
        const category = req.query?.category;
        const username = req.query?.username;
        const pageSize = Number(req.query.pageSize);
        const page = Number(req.query.page);
        const movies = await db.Movies.findAll(
          paginate(
            {
              where: {
                [Op.and]: [{ username: username }, { genre_ids: category }],
              },
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
    // get all movie __remove option.all & category
    if (req.query?.page && req.query?.pageSize && req.query?.username) {
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
        return responce({
          res,
          code: 500,
          message: "fail",
          data: error,
        });
      }
    }

    // get all movie __remove option.all & username
    if (req.query.page && req.query?.pageSize && req.query?.Category) {
      try {
        const category = req.query?.category;
        const pageSize = Number(req.query.pageSize);
        const page = Number(req.query.page);
        const movies = await db.Movies.findAll(
          paginate(
            {
              where: { genre_ids: category },
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

    // get all movies __ option.username & option.category
    if (req.query.username && req.query?.Category) {
      try {
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

    //  get all movie ___option.category
    if (req.query?.category) {
      const page = 1;
      const pageSize = 1000;
      const category = req.query?.category;
      try {
        const movies = await db.Movies.findAll(
          paginate(
            {
              where: { genre_ids: category },
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
          code: 200,
          message: "fail",
          data: error,
        });
      }
    }
    // get all movie __option.username
    if (req.query?.username) {
      try {
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

    //get all movie __ option.page & pageSize
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
    //get all movie ___option.all
    if (req.query?.all) {
      try {
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
    if (req.query?.page) {
      try {
        const page = Number(req.query?.page);
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
    try {
      const movies = await db.Movies.findAll({
        include: [{ model: db.Category }],
      });
      return responce({
        res,
        code: 200,
        message: "ok",
        data: movies,
      });
    } catch (error) {
      // console.log(error)
      return responce({
        res,
        code: 500,
        message: "fail",
        data: error,
      });
    }
  }

  async getMovieByUser(req, res) {}
})();
