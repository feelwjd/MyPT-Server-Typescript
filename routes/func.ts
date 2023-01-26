import express from "express";
import funcController from "../controller/funcController";
const funcRouter = express.Router();

funcRouter.post('/calories', funcController.calories);

funcRouter.post('/createroutine', funcController.createroutine);

funcRouter.post('/updateroutine', funcController.updateroutine);

funcRouter.post('/deleteroutine', funcController.deleteroutine);

module.exports = funcRouter;