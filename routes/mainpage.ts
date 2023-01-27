import express from "express";
import mainpageController from "../controller/mainpageController";
const mainpageRouter = express.Router();

mainpageRouter.post('/calender', mainpageController.calender);

mainpageRouter.post('/dashboard', mainpageController.dashboard);

mainpageRouter.post('/community', mainpageController.community);

mainpageRouter.post('/mypage', mainpageController.mypage);

module.exports = mainpageRouter;