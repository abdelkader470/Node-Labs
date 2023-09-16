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
import {
  signInValidationSchema,
  signUpValidationSchema,
} from "./user.validation.js";
import validation from "../../middleware/validation.js";

const userRoutes = express.Router();

userRoutes.get("/users", getAllUser);
userRoutes.post("/user/signUp", validation(signUpValidationSchema), signUp);
userRoutes.post("/user/signIn", validation(signInValidationSchema), signIn);
userRoutes.patch("/:id", updateUser);
userRoutes.delete("/:id", deleteUser);
userRoutes.get("/:minAge/:maxAge", searchByAge);
userRoutes.get("/search/:nameStart/:age", searchByNameAndAge);

export default userRoutes;
