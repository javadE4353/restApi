import express from "express";
import { verifyToken } from "../../middleware/verifyToken.js";
import verifyRoles from "../../middleware/verifyRole.js";
import db from "../../model/index.js";
import { categoryController } from "../../controllers/categoryController.js";
const cateRouter = express.Router();

cateRouter.post(
  "/",
  verifyToken,
  verifyRoles(db.ROLES),
  categoryController.insertCategory
);
cateRouter.get(
  "/",
  categoryController.getCategory
);
cateRouter.put(
  "/",
  verifyToken,
  verifyRoles(db.ROLES),
  categoryController.updateCategory
);
cateRouter.delete(
  "/",
  verifyToken,
  verifyRoles(db.ROLES),
  categoryController.removeCategory
);

export default cateRouter;
