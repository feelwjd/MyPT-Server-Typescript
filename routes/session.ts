import express from "express";
import sessionController from "../controller/sessionController";
const sessionRouter = express.Router();

sessionRouter.post('/verifySession', sessionController.verifySession);

module.exports = sessionRouter;