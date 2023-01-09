const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const cryptos = require('crypto');
const cors = require('cors');
const dotenv = require('dotenv');
const { sequelize } = require('./models');
const fs = require('fs');
const gm = require('gm').subClass({imageMagick: true});
const multer = require('multer');
dotenv.config();

/* Router Setting */
const usersRouter = require('./routes/users');
const mainpageRouter = require('./routes/mainpage');
const funcRouter = require('./routes/func');
const mypageRouter = require('./routes/mypage');
const commuRouter = require('./routes/commu');
const apiRouter = require('./routes/api');
const shareimageRouter = require('./routes/shareimage');
const sessionRouter = require('./routes/session');


const app = express();
const port = process.env.PORT || 8000;

sequelize.sync({alter: false, force: false})
    .then(()=>{
        console.log("✅ Connected to the database!");
    })
    .catch((error: string | undefined) =>{
        throw new Error(error);
    });

const whitelist: Array<String> = [];

// CORS 설정
const corsOptions = {
  origin: function (origin : any, callback : any) { 
    if (whitelist.indexOf(origin) !== -1) { // 만일 whitelist 배열에 origin인자가 있을 경우
      callback(null, true); // cors 허용
    } else {
      callback(new Error("Not Allowed Origin!")); // cors 비허용
    }
  },
};
 
app.use(cors(corsOptions)); // 옵션을 추가한 CORS 미들웨어 추가

//Use Session
app.use(session({
  key: 'sid',
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 2000 * 60 * 60 // 쿠키 유효기간 2시간
  }
}));

// setup
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));  

// routes setup
app.use('/images', express.static('images')); 
app.use('/shareimage', express.static('shareimage')); 
app.use('/users', usersRouter);
app.use('/main', mainpageRouter);
app.use('/func', funcRouter);
app.use('/mypage', mypageRouter);
app.use('/commu', commuRouter);
app.use('/api', apiRouter);
app.use('/shareimage', shareimageRouter);
app.use('/session', sessionRouter);

app.listen(process.env.PORT,()=>{
    console.log(`
    ############################################
        🛡️  Server listening on port: ${process.env.PORT}🛡️
    ############################################
    `);
});

module.exports = app;