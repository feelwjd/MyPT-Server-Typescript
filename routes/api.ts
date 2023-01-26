import express from "express";
import apiController from "../controller/apiController";
const apiRouter = express.Router();

apiRouter.post('/users', apiController.users);

apiRouter.post('/userinfo', apiController.userinfo);

apiRouter.post('/workout', apiController.workout);

apiRouter.post('/routineinfo', apiController.routineinfo);

apiRouter.post('/routinerecommand', apiController.routinerecommand);

module.exports = apiRouter;