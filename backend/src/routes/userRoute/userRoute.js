import express from "express";
import upload from "../../middleware/uploadFile.js";
import { verifyToken } from "../../middleware/verifyToken.js";
import db from "../../model/index.js";
import {
  updateUser,
  deleteuser,
  getUser,
  getAllUser,
  createUser,
  getUserStats,
} from "../../controllers/user.js";
import verifyRoles from "../../middleware/verifyRole.js";

const userRouter = express.Router();

//UPDATE
userRouter.put(
  "/:id",
  verifyToken,
  verifyRoles(db.ROLES),
  upload.single("image"),
  (req, res, next) => {
    if (!req.file) {
      console.log("--------------------------req.file")
      console.log(req.file)
      req.body.image = null;
    } else {
      req.body.image = req.file.filename;
    }
    next();
  },
  updateUser
);

// //create  USER
userRouter.post(
  "/",
  upload.single("image"),
  (req, res, next) => {
    if (!req.file) {
      req.body.image = null;
    } else {
      req.body.image = req.file.filename;
    }
    next();
  },
  createUser
);
// //DELETE
userRouter.delete(
  "/:id",
  verifyToken,
  verifyRoles(db.ROLES),
  deleteuser
);

// //GET USER
userRouter.get("/find/:id", getUser);

// //GET ALL USER
userRouter.get("/", getAllUser);

// //GET USER STATS

userRouter.get("/stats", verifyToken, getUserStats);

export default userRouter;
