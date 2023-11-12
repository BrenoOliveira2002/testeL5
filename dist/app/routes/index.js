"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userRoutes_1 = __importDefault(require("./produtos/userRoutes"));
const routes = (0, express_1.Router)();
routes.use("/produtos", userRoutes_1.default);
exports.default = routes;
