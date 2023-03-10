import { Request, Response } from "express";
import { User } from "../models/user";
import statusCode from "../middlewares/statusCode";
import { createHashedPassword, checkPassword } from "../middlewares/crypto";
import jwtService from "../middlewares/jwtService";
import message from "../middlewares/message";
import * as fs from "fs";
import _ from "lodash";
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
                const jwt = await client.get(userid);
                const verify = await jwtService.verify(jwt);
                if(verify === -2||verify === -3){
                    return res
                        .status(statusCode.NOT_FOUND)
                        .send(message.fail(statusCode.UNAUTHORIZED, "로그인되어 있지 않습니다."));
                }else{
                    client.del(userid);
                    return res
                        .status(statusCode.OK)
                        .send(message.success(statusCode.OK, "로그아웃 성공", {isSigned: false}));
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
        const {userid} = req.body;
        if(!userid) {
            return res
                .status(statusCode.BAD_REQUEST)
                .send(message.fail(statusCode.BAD_REQUEST, "잘못된 접근입니다."));
        }else{
            try{
                // 회원탈퇴 처리
                const jwt = await client.get(userid);
                const verify = await jwtService.verify(jwt);
                if(verify === -2||verify === -3){
                    return res
                        .status(statusCode.NOT_FOUND)
                        .send(message.fail(statusCode.UNAUTHORIZED, "로그인되어 있지 않습니다."));
                }else{
                    client.del(userid);
                    await User.destroy({
                        where : { userid : userid }
                    });
                    return res
                        .status(statusCode.OK)
                        .send(message.success(statusCode.OK, "회원탈퇴 성공", {isSigned: false}));
                }
            }catch(err){
                console.error(err);
                return res
                    .status(statusCode.INTERNAL_SERVER_ERROR)
                    .send(message.fail(statusCode.INTERNAL_SERVER_ERROR, "서버 오류"));
            }
        }
    },
    signupdate : async (req: Request, res: Response) => {
        const { userid } = req.body;
        if(!userid) {
            return res
                .status(statusCode.BAD_REQUEST)
                .send(message.fail(statusCode.BAD_REQUEST, "잘못된 접근입니다."));
        }else{
            try{
                // 회원정보 수정 처리
                const jwt = client.get(userid);
                jwtService.verify(jwt);
                if(jwt){
                    await User.update({
                        nickname : req.body.nickname,
                        age : req.body.age,
                        address : req.body.address,
                        name : req.body.name,
                        profileimage : req.body.profileimage,
                        height : req.body.height,
                        weight : req.body.weight
                    }, {
                        where : { userid : userid }
                    });
                    const userinfo = await User.findOne({
                        where : { userid : userid }
                    });
                    return res
                        .status(statusCode.OK)
                        .send(message.success(statusCode.OK, "회원정보 수정 성공", {userdata: userinfo}));
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
    changePassword : async (req: Request, res: Response) => {
        const { userid, userpw } = req.body;
        if(!userid || !userpw) {
            return res
                .status(statusCode.BAD_REQUEST)
                .send(message.fail(statusCode.BAD_REQUEST, "잘못된 접근입니다."));
        }else{
            try{
                // 비밀번호 변경 처리
                const jwt = client.get(userid);
                jwtService.verify(jwt);
                if(jwt){
                    // 비밀번호 확인
                    const encryptedPw = createHashedPassword(userpw);
                    const user = await User.findOne({
                        where : { userid : userid }
                    });
                    const checkPw = await checkPassword(userpw, user!.salt, user!.userpw);
                    if(!checkPw){
                        return res
                            .status(statusCode.BAD_REQUEST)
                            .send(message.fail(statusCode.BAD_REQUEST, "비밀번호가 일치하지 않습니다."));
                    }else{
                        await User.update({
                            userpw : (await encryptedPw).hashedPassword,
                            salt : (await encryptedPw).salt
                        }, {
                            where : { userid : userid }
                        });
                        return res
                            .status(statusCode.OK)
                            .send(message.success(statusCode.OK, "비밀번호 변경 성공", {isSigned: true}));
                    }
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
    checkId : async (req: Request, res: Response) => {
        const { userid } = req.body;
        if(!userid) {
            return res
                .status(statusCode.BAD_REQUEST)
                .send(message.fail(statusCode.BAD_REQUEST, "잘못된 접근입니다."));
        }else{
            await User.findOne({
                where : { userid : userid }
            }).then((user) => {
                if(user){
                    return res
                        .status(statusCode.OK)
                        .send(message.success(statusCode.OK, "사용 가능한 아이디입니다.", {isAvailable: true}));
                }else{
                    return res
                        .status(statusCode.OK)
                        .send(message.success(statusCode.OK, "사용 불가능한 아이디입니다.", {isAvailable: false}));
                }
            }).catch((err) => {
                console.error(err);
                return res
                    .status(statusCode.INTERNAL_SERVER_ERROR)
                    .send(message.fail(statusCode.INTERNAL_SERVER_ERROR, "서버 오류"));
            });
        }
    },
    checkNickname : async (req: Request, res: Response) => {
        const { nickname } = req.body;
        if(!nickname) {
            return res
                .status(statusCode.BAD_REQUEST)
                .send(message.fail(statusCode.BAD_REQUEST, "잘못된 접근입니다."));
        }else{
            await User.findOne({
                where : { nickname : nickname }
            }).then((user) => {
                if(user){
                    return res
                        .status(statusCode.OK)
                        .send(message.success(statusCode.OK, "사용 가능한 닉네임입니다.", {isAvailable: true}));
                }else{
                    return res
                        .status(statusCode.OK)
                        .send(message.success(statusCode.OK, "사용 불가능한 닉네임입니다.", {isAvailable: false}));
                }
            }).catch((err) => {
                console.error(err);
                return res
                    .status(statusCode.INTERNAL_SERVER_ERROR)
                    .send(message.fail(statusCode.INTERNAL_SERVER_ERROR, "서버 오류"));
            });
        }
    },
    createNickname : async (req: Request, res: Response) => {
        //닉네임 자동 생성기
        fs.readFile("./assets/word.txt", 'utf8', (err, data) => {
            if(!data){
                return res
                    .status(statusCode.INTERNAL_SERVER_ERROR)
                    .send(message.fail(statusCode.INTERNAL_SERVER_ERROR, "서버 오류"));
            }else{
                let word = (data).split(',');
                const part = ['유산소', '하체', '코어', '등', '가슴', '어깨', '삼두', '이두', '전완근'];
                let nickname = word[Math.floor(Math.random() * word.length)]+'한 '+part[Math.floor(Math.random() * part.length)];
                return res
                    .status(statusCode.OK)
                    .send(message.success(statusCode.OK, "닉네임 생성 성공", {nickname: nickname}));
            }
        });
    },
}