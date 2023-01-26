import { Request, Response } from "express";
import { User } from "../models/user";
import statusCode from "../middlewares/statusCode";
import { createHashedPassword, checkPassword } from "../middlewares/crypto";
import jwtService from "../middlewares/jwtService";
import message from "../middlewares/message";
const client = require('../middlewares/redis');

export = {
    signin : async (req: Request, res: Response) => {
        const {userid, userpw} = req.body;
        if(!userid || !userpw) {
            return res
                .status(statusCode.BAD_REQUEST)
                .send(message.fail(statusCode.BAD_REQUEST, "아이디 또는 비밀번호가 입력되지 않았습니다."));
        }else{
            try{
                //사용자 정보 조회
                const user = await User.findOne({
                    where : { userid : userid }
                });
                if(!user){
                    return res
                        .status(statusCode.NOT_FOUND)
                        .send(message.fail(statusCode.NOT_FOUND, "아이디가 존재하지 않습니다."));
                }else{
                    //비밀번호 확인
                    const checkPw = await checkPassword(userpw, user!.salt, user!.userpw);
                    if(!checkPw){
                        return res
                            .status(statusCode.UNAUTHORIZED)
                            .send(message.fail(statusCode.UNAUTHORIZED, "비밀번호가 일치하지 않습니다."));
                    }else{
                        //JWT 토큰 발급
                        const accessToken = await jwtService.sign(user!);
                        client.set(user!.userid, accessToken.accessToken, 'EX', 60*60*2);
                        return res
                            .status(statusCode.OK)
                            .send(message.success(statusCode.OK, "로그인 성공", {isSigned: true, userdata: user, accessToken: accessToken}));
                    }
                }
            }catch(err){
                console.error(err);
                return res
                    .status(statusCode.INTERNAL_SERVER_ERROR)
                    .send(message.fail(statusCode.INTERNAL_SERVER_ERROR, "서버 오류"));
            }
        }
    },
    signup : async (req: Request, res: Response) => {
        const {nickname, userid, userpw, age, address, name, sex, height, weight, profileimage} = req.body;
        if(!nickname||!userid||!userpw||!age||!name||!height||!weight) {
            console.log(req.body)
            return res
                .status(statusCode.BAD_REQUEST)
                .send(message.fail(statusCode.BAD_REQUEST, "입력되지 않은 정보가 있습니다."));
        }else{
            try{
                const checkUser = await User.findOne({
                    where : { userid : userid }
                });
                if(checkUser){
                    return res
                        .status(statusCode.CONFLICT)
                        .send(message.fail(statusCode.CONFLICT, "이미 존재하는 아이디입니다."));
                }else{
                    const encryptedPw = createHashedPassword(userpw);
                    const user = await User.create({
                        nickname : nickname,
                        userid : userid,
                        userpw : (await encryptedPw!).hashedPassword,
                        salt : (await encryptedPw!).salt,
                        age : age,
                        address : address,
                        name : name,
                        sex : sex,
                        height : height,
                        weight : weight,
                        profileimage : profileimage
                    });
                    await user.save();
                    const userinfo = await User.findOne({
                        where : { userid : userid }
                    });
                    return res
                        .status(statusCode.CREATED)
                        .send(message.success(statusCode.CREATED, "회원가입 성공", {userdata: userinfo}));
                }
                
            }catch(err){
                console.error(err);
                return res
                    .status(statusCode.INTERNAL_SERVER_ERROR)
                    .send(message.fail(statusCode.INTERNAL_SERVER_ERROR, "서버 오류"));
            }
        }
    },
    signout : async (req: Request, res: Response) => {
        const {userid} = req.body;
        if(!userid) {
            return res
                .status(statusCode.BAD_REQUEST)
                .send(message.fail(statusCode.BAD_REQUEST, "잘못된 접근입니다."));
        }else{
            try{
                // 로그아웃 처리
                const jwt = client.get(userid);
                jwtService.verify(jwt);
                if(jwt){
                    client.del(userid);
                    jwtService.destroy(jwt);
                    return res
                        .status(statusCode.OK)
                        .send(message.success(statusCode.OK, "로그아웃 성공", {isSigned: false}));
                }else{
                    return res
                        .status(statusCode.NOT_FOUND)
                        .send(message.fail(statusCode.NOT_FOUND, "로그인되어 있지 않습니다."));
                }
            }catch(err){
                console.error(err);
                return res
                    .status(statusCode.INTERNAL_SERVER_ERROR)
                    .send(message.fail(statusCode.INTERNAL_SERVER_ERROR, "서버 오류"));
            }
        }
    },
    signdelete : async (req: Request, res: Response) => {

    },
    signupdate : async (req: Request, res: Response) => {

    }
}