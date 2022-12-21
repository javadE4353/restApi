import express from "express";
import { verifyToken } from "../../middleware/verifyToken.js";
import verifyRoles from "../../middleware/verifyRole.js";
import db from "../../model/index.js";

import { movieController } from "../../controllers/movieController.js";
import { validate } from "./validate.js";
import { verifyAdmin } from "../../middleware/verifyAdmin.js";

const movieRouter = express.Router();

movieRouter.post(
  "/",
  // validate.insertValid(),
  // verifyToken,
  // verifyRoles(db.ROLES),
  // verifyAdmin,
  movieController.insertMovie
);
movieRouter.put(
  "/",
  verifyToken,
  verifyRoles(db.ROLES),
  movieController.updateMovie
);
movieRouter.delete(
  "/",
  verifyToken,
  verifyRoles(db.ROLES),
  // verifyAdmin,
  movieController.deleteMovie
);
movieRouter.get(
  "/:userid",
  verifyToken,
  verifyRoles(db.ROLES),
  // verifyAdmin,
  movieController.getMovieByUser
);
movieRouter.get(
  "/count",
  // verifyToken,
  // verifyRoles(db.ROLES),
  // verifyAdmin,
  movieController.getCountMovie
);
movieRouter.get("/", movieController.getAllmovie);

export default movieRouter;
