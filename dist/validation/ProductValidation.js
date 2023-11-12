"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ProductValidator {
    validateID(req, res, next) {
        const { id } = req.params;
        if (!Number.isInteger(Number(id))) {
            return res.status(400).json({ error: "ID inválido." });
        }
        next();
    }
}
console.log("teste");
exports.default = new ProductValidator();
