"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userRoutes_1 = __importDefault(require("./user/userRoutes"));
const userByGitHubRoutes_1 = __importDefault(require("./github/userByGitHubRoutes"));
const routes = (0, express_1.Router)();
routes.use("/user", userRoutes_1.default);
routes.use("/github", userByGitHubRoutes_1.default);
exports.default = routes;
