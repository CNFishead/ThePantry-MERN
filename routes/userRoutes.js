import express from "express";
import { bulkCreate, bulkDestroy } from "../controllers/testControllers.js";
import {
  deleteUser,
  getUsers,
  registerUser,
  updateUser,
} from "../controllers/userController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(registerUser).get(getUsers);
router.route("/:id").delete(deleteUser).put(updateUser);

// These are testing routes only do not use in production. These will
// Destroy all data
router.route("/test").post(bulkCreate).delete(bulkDestroy);

export default router;
