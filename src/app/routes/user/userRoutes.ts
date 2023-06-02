import { Router } from "express";
import userController from "../../controller/UserController";
import UserValidation from "../../../validation/UserValidation";

const usersRouter = Router();

usersRouter
  .post(
    "/users",
    UserValidation.validateUserCreation,
    userController.createUser
  )
  .get("/users", userController.getAllUsers)
  .patch(
    "/users/:id",
    UserValidation.validateID,
    UserValidation.validateUserUpdate,
    userController.updateUser
  )
  .delete("/users/:id", UserValidation.validateID, userController.deleteUser)

  .get(
    "/users/media/:id",
    UserValidation.validateID,
    userController.getMediaByID
  )
  .post(
    "/users/media",
    UserValidation.validateMediaUser,
    userController.uploadFile
  );

export default usersRouter;
