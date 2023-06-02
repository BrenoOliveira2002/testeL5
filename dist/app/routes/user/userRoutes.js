"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = __importDefault(require("../../controller/UserController"));
const UserValidation_1 = __importDefault(require("../../../validation/UserValidation"));
const usersRouter = (0, express_1.Router)();
usersRouter
    .post("/users", UserValidation_1.default.validateUserCreation, UserController_1.default.createUser)
    .get("/users", UserController_1.default.getAllUsers)
    .patch("/users/:id", UserValidation_1.default.validateID, UserValidation_1.default.validateUserUpdate, UserController_1.default.updateUser)
    .delete("/users/:id", UserValidation_1.default.validateID, UserController_1.default.deleteUser)
    .get("/users/media/:id", UserValidation_1.default.validateID, UserController_1.default.getMediaByID)
    .post("/users/media", UserValidation_1.default.validateMediaUser, UserController_1.default.uploadFile);
exports.default = usersRouter;
