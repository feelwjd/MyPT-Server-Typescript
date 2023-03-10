import express from "express";
import usersController from "../controller/usersController";
const usersRouter = express.Router();

usersRouter.post('/signin', usersController.signin);

usersRouter.post('/signup', usersController.signup);

usersRouter.post('/signout', usersController.signout);

usersRouter.post('/signdelete', usersController.signdelete);

usersRouter.post('/signupdate', usersController.signupdate);

usersRouter.post('/checkId', usersController.checkId);

usersRouter.post('/checkNickname', usersController.checkNickname);

usersRouter.post('/createNickname', usersController.createNickname);

module.exports = usersRouter;