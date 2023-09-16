import express from "express";
import {
  getAllUser,
  signUp,
  signIn,
  updateUser,
  deleteUser,
  searchByAge,
  searchByNameAndAge,
} from "./user.controller.js";

const userRoutes = express.Router();

userRoutes.get("/users", getAllUser);
userRoutes.post("/signUp", signUp);
userRoutes.post("/signIn", signIn);
userRoutes.patch("/:id", updateUser);
userRoutes.delete("/:id", deleteUser);
userRoutes.post("/:minAge/:maxAge", searchByAge);
userRoutes.post("/search/:nameStart/:age", searchByNameAndAge);

export default userRoutes;
