import { Request, Response } from "express";
import axios from "axios";

class GithubApiController {
  public async getUser(req: Request, res: Response) {
    const username = req.params.username;

    try {
      console.log(username)
      const apiUrl = `https://api.github.com/users/${username}`;
      const user = await axios.get(apiUrl);

      const data = user.data;
      const { login, name } = data;

      res.json({ login, name });
    } catch (error) {
      console.error("Erro ao consultar a API do GitHub:", error);
      res.status(500).json({ error: "Erro ao consultar a API do GitHub" });
    }
  }
}

export default new GithubApiController();
