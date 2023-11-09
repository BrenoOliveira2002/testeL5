import { Request, Response, NextFunction } from "express";

class ProductValidator {

  validateID(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    if (!Number.isInteger(Number(id))) {
      return res.status(400).json({ error: "ID inválido." });
    }

    next();
  }

}

console.log("teste")
export default new ProductValidator();
