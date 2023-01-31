import { Request, Response, NextFunction } from "express";
import { User } from "../models/user";
const client = require('../middlewares/redis');


export = {
    verifySession :async (req: Request, res: Response, next: NextFunction) => {

    }
}