import db from "../model/index.js";
import { responce } from "../util/configResponce.js";
import { validationResult } from "express-validator";
import { Op } from "sequelize";
import { paginate } from "../helper/paginate.js";
export const mylistController = new (class MylistController {
  constructor() {}

  async inserList(req, res) {
    console.log(req.body);
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return responce({
        res,
        code: 401,
        message: "error validate",
        data: error.array(),
      });
    }

    const user = await db.user.findOne({
      where: { username: req.body.username },
    });

    if (!user) {
      return res.status(400).send("");
    }
    const newList = await db.Mylist.create({
      username: req.body.username,
      userId: user.toJSON().id,
      adult: req.body.adult ? req.body.adult : false,
      backdrop_path: req.body.backdrop_path ? req.body.backdrop_path : null,
      genre_ids: req.body.genre_ids?JSON.stringify(req.body.genre_ids):null,
      original_language: req.body.original_language
        ? req.body.original_language
        : null,
      original_title: req.body.original_title ? req.body.original_title : null,
      overview: req.body.overview ? req.body.overview : null,
      popularity: req.body.popularity ? req.body.popularity : null,
      poster_path: req.body.poster_path ? req.body.poster_path : nll,
      release_date: req.body.release_date ? req.body.release_date : nul,
      title: req.body.title ? req.body.title : null,
      video: req.body.video ? req.body.video : false,
      vote_average: req.body.vote_average ? req.body.vote_average : null,
      vote_count: req.body.vote_count ? req.body.vote_count : null,
      media_type: req.body.media_type ? req.body.media_type : null,
      movieid: req.body.id ? req.body.id : null,
    });
console.log("mylist______________________________________")
console.log(newList)
    responce({
      res,
      code: 200,
      message: "ok",
      data: newList,
    });
  }
  async getAllList(req, res) {
    const { id } = req.params;
    const pageSize = Number(req.query.pageSize);
    const page = Number(req.query.page);

   try {
    const mylist = await db.Mylist.findAll(
      paginate(
        { where: { userId: id } },
        {page,pageSize}
      )
      
      );
    if (mylist.length<1) {
      return res.status(403).send("")
    }
    responce({
      res,
      code: 200,
      message: "ok",
      data: mylist,
    });
   } catch (error) {
    
   }
  }
  async removeMovie(req, res) {
    const { userid,movieid } = req.query;
    if (!userid || !movieid) {
      responce({
        res,
        code: 400,
        message: 'fail'
      });
    }
    console.log("USERID:"+userid+"MOVIEID:"+movieid);
    const mylist = await db.Mylist.destroy({ where: {[Op.and]:[{userId:Number(userid)},{movieid:Number(movieid)}]} });
    responce({
      res,
      code: 200,
      message: `remove movie by id ${movieid}`,
    });
  }
})();
