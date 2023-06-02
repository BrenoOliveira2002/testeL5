"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserByGithubController_1 = __importDefault(require("../../controller/UserByGithubController"));
const userByGithubRoutes = (0, express_1.Router)();
userByGithubRoutes.get("/users/:username", UserByGithubController_1.default.getUser);
exports.default = userByGithubRoutes;
