const funcController = require('../controllers/funcController');

funcController.post('/calories', funcController.calories);

funcController.post('/createroutine', funcController.createroutine);

funcController.post('/updateroutine', funcController.updateroutine);

funcController.post('/deleteroutine', funcController.deleteroutine);

funcController.post('/picshare', funcController.picshare);

module.exports = funcController;