import express from "express";
import commuController from "../controller/commuController";
const commuRouter = express.Router();

commuRouter.post('/post', commuController.post);

commuRouter.post('/heart', commuController.heart);

commuRouter.post('/community', commuController.community);

commuRouter.post('/save', commuController.save);

module.exports = commuRouter;