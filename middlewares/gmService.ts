import gm from 'gm';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import express from 'express';

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'assets/images');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
export var gmService = {
    upload: multer({ storage: storage }).single('image'),

    imageMiddleware: async (workoutlist : string, description : string) => {
      gmService.upload = function(req: any) {
        const jpgname = req.file.originalname;
        const filePath = 'assets/shareimage/' + jpgname;
        gm(req.file.path)
          .resize(1080, 1080)
          .fill('#ffffff')
          .font('assets/font/BMJUA_otf.otf', 100)
          .drawText(105, 105, 'MyPT')
          .font('assets/font/BMJUA_otf.otf', 65)
          .drawText(105, 850, description)
          .font('public/font/BMJUA_otf.otf', 40)
          .drawText(105, 900, workoutlist)
          .write(filePath, (err) => {
            if (err) {
              return {"message" : "error", "data" : "error"}
            }else{
              fs.readFile(filePath, (err, data) => {
                let message = "";
                err ? message = "error" : message = "success";
                return {message,data};
              });
            }
          });
      };
    }
}
module.exports = gmService;