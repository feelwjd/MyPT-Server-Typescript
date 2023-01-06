const commuController = require('../controllers/commuController');

commuController.post('/share', commuController.share);

commuController.post('/heart', commuController.heart);

commuController.post('/community', commuController.community);

module.exports = commuController;