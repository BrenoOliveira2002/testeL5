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

export default new ProductValidator();
