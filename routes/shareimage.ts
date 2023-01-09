const shareimageController = require('../controllers/shareimageController');

var storage = multer.diskStorage({
    destination: function (req: any, file: any, cb: any) {
        cb(null, './public/images/');
    },
    filename: function(req: any, file: any, cb: any){
        cb(null, file.originalname);
    }
});
var upload = multer({ storage: storage }).single('image');

shareimageController.post('/image', upload, shareimageController.image);

module.exports = shareimageController;