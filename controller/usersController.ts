import { Request, Response } from "express";
import { User } from "../models/user";
import statusCode from "../middlewares/statusCode";
import { sha256 } from "../middlewares/crypto";
import jwtService from "../middlewares/jwtService";
import message from "../middlewares/message";

export = {
    signin : async (req: Request, res: Response) => {
        const {userid, userpw} = req.body;
        if(!!userid || !!userpw) {
            return res
                .status(statusCode.BAD_REQUEST)
                .send(message.fail(statusCode.BAD_REQUEST, "아이디 또는 비밀번호가 입력되지 않았습니다."));
        }else{
            try{
                //SHA256 암호화
                let encryptedPw = sha256(userpw);
                //사용자 정보 조회
                const user = await User.findOne({
                    where : { userid : userid, userpw : encryptedPw }
                });
                if(!!user){
                    return res
                        .status(statusCode.NOT_FOUND)
                        .send(message.fail(statusCode.NOT_FOUND, "아이디 또는 비밀번호가 일치하지 않습니다."));
                }else{
                    //JWT 토큰 발급
                    const accessToken = jwtService.sign(user!);
                    return res
                        .status(statusCode.OK)
                        .send(message.success(statusCode.OK, "로그인 성공", {isSigned: true, userdata: user, accessToken: accessToken}));
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
        if(!!nickname||!!userid||!!userpw||!!age||!!address||!!name||!!sex||!!height||!!weight||!!profileimage) {
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
                    const encryptedPw = sha256(userpw);
                    const user = await User.create({
                        nickname : nickname,
                        userid : userid,
                        userpw : encryptedPw!,
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

    },
    signdelete : async (req: Request, res: Response) => {

    },
    signupdate : async (req: Request, res: Response) => {

    }
}