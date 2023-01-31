import { Request, Response, NextFunction } from "express";
import { User } from "../models/user";
const client = require("../middleware/redis");


export = {
    verifySession :async (req: Request, res: Response, next: NextFunction) => {
        
    }
}