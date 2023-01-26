import express from "express";
import sessionController from "../controller/sessionController";
const sessionRouter = express.Router();

sessionRouter.post('/check', sessionController.check);

module.exports = sessionRouter;