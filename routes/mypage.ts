import express from "express";
import mypageController from "../controller/mypageController";
const mypageRouter = express.Router();

mypageRouter.post('/update', mypageController.update);

module.exports = mypageRouter;