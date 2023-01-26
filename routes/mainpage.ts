import express from "express";
import mainpageController from "../controller/mainpageController";
const mainpageRouter = express.Router();

mainpageRouter.post('/calender', mainpageController.calender);

mainpageRouter.post('/todolist', mainpageController.todolist);

module.exports = mainpageRouter;