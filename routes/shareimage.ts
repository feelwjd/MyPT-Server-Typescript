import express from "express";
import shareimageController from "../controller/shareimageController";
const shareimageRouter = express.Router();
const multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req: any, file: any, cb: any) {
        cb(null, './public/images/');
    },
    filename: function(req: any, file: any, cb: any){
        cb(null, file.originalname);
    }
});
var upload = multer({ storage: storage }).single('image');

shareimageRouter.post('/image', upload, shareimageController.image);

module.exports = shareimageRouter;