import { Router } from "express";
import UserByGithubController from "../../controller/UserByGithubController";

const userByGithubRoutes = Router();

userByGithubRoutes.get("/users/:username", UserByGithubController.getUser);

export default userByGithubRoutes;
