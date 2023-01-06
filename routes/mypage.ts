const mypageController = require('../controllers/mypageController');

mypageController.post('/beforeafter', mypageController.beforeafter);

mypageController.post('/beforeafterchange', mypageController.beforeafterchange);

module.exports = mypageController;