import { Request, Response, NextFunction } from "express";
import {gmService} from '../middlewares/gmService';
import message from "../middlewares/message";
import statusCode from "../middlewares/statusCode";
import { Routine } from "../models/routine";
import { RoutineDetail } from "../models/routinedetail";


export = {
    image :async (req: Request, res: Response, next: NextFunction) => {
        const { userid, routineid, description } = req.body;
        const routinedetail = RoutineDetail.findAll({where: {routineid: routineid}});
        return res
            .status(statusCode.CREATED)
            .send(message.success(statusCode.CREATED, "루틴정보 호출", {data: routinedetail}));
    }
}