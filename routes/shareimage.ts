const shareimageController = require('../controllers/shareimageController');

shareimageController.post('/image', shareimageController.image);

module.exports = shareimageController;