import express from "express";
import shareimageController from "../controller/shareimageController";
import { gmService } from "../middlewares/gmService";
const shareimageRouter = express.Router();

shareimageRouter.post('/image', shareimageController.image);

module.exports = shareimageRouter;