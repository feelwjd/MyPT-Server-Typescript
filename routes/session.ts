const sessionController = require('../controllers/sessionController');

sessionController.post('/check', sessionController.check);

module.exports = sessionController;