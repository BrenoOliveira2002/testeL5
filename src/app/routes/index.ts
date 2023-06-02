import { Router } from "express";
import usersRouter from "./user/userRoutes"
import userByGithubRoutes from "./github/userByGitHubRoutes";

const routes = Router();

routes.use("/user", usersRouter);

routes.use("/github", userByGithubRoutes);



export default routes;
