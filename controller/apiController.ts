import { Request, Response, NextFunction } from "express";
import jwtService from "../middlewares/jwtService";
import message from "../middlewares/message";
import statusCode from "../middlewares/statusCode";
import { User } from "../models/user";
import { Workout } from "../models/workout";
const client = require('../middlewares/redis');


export = {
    userinfo :async (req: Request, res: Response, next: NextFunction) => {
        const { userid } = req.body;
        const auth = await client.get(userid);
        const verify = await jwtService.verify(auth);
        if(verify === -2||verify === -3){
            return res
                .status(statusCode.UNAUTHORIZED)
                .send(message.fail(statusCode.UNAUTHORIZED, "로그인이 필요합니다."));
        }else{
            const user = await User.findOne({ where : { userid }});
            if(!user) {
                return res
                    .status(statusCode.INTERNAL_SERVER_ERROR)
                    .send(message.fail(statusCode.INTERNAL_SERVER_ERROR, "서버 에러."));
            }else{
                return res
                    .status(statusCode.OK)
                    .send(message.success(statusCode.OK, "사용자 정보 API", { userinfo : user}));
            }
        }
    },

    users : async (req: Request, res: Response, next: NextFunction) => {
        const user = await User.findAll();
        if(!user) {
            return res
                .status(statusCode.INTERNAL_SERVER_ERROR)
                .send(message.fail(statusCode.INTERNAL_SERVER_ERROR, "서버 에러."));
        }else{
            return res
                .status(statusCode.OK)
                .send(message.success(statusCode.OK, "사용자 정보 API", { userinfo : user}));
        }
    },

    workout : async (req: Request, res: Response, next: NextFunction) => {
        const workout = await Workout.findAll();
        return res
            .status(statusCode.OK)
            .send(message.success(statusCode.OK, "운동 정보 API", { workoutinfo : workout}));
    },

    routineinfo : async (req: Request, res: Response, next: NextFunction) => {

    },

    routinerecommand : async (req: Request, res: Response, next: NextFunction) => {

    },
}