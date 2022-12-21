import db from "../model/index.js";
import { responce } from "../util/configResponce.js";
import { validationResult } from "express-validator";
import { Op } from "sequelize";
import { paginate } from "../helper/paginate.js";

export const categoryController = new (class CategoryController {
  constructor() {}

  async insertCategory(req, res) {}
  async getCategory(req, res) {
    if (req.query?.name) {
      try {
        const cat = await db.Category.findAll({
          where: { name: req.query?.name },
        });
        responce({
          res,
          message: "ok",
          code: 200,
          data: cat,
        });
      } catch (error) {
        responce({
          res,
          message: "error",
          code: 500,
        });
      }
    }
    if (req.query?.moviename) {
      try {
        const movie = await db.Movies.findOne({
          where: { title: req.query?.moviename },
        });
        if (!movie) {
          return responce({
            res,
            message: "notfund",
            code: 400,
          });
        }
        const cat=movie.toJSON().gener_ids;
        const movieBycategory=await db.Category.findAll({where:{bits:cat}})
        responce({
          res,
          message: "ok",
          code: 200,
          data: movieBycategory,
        });
      } catch (error) {
        responce({
          res,
          message: "error",
          code: 500,
        });
      }
    }

    try {
        const cat=await db.Category.findAll({})
        responce({
          res,
          message: "ok",
          code: 200,
          data: cat,
        });
      } catch (error) {
        responce({
          res,
          message: "error",
          code: 500,
        });
      }


  }
  async removeCategory(req, res) {}
  async updateCategory(req, res) {}
})();
