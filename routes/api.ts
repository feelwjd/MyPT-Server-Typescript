const apiController = require('../controllers/apiController');

apiController.post('/routine', apiController.routine);

apiController.post('/users', apiController.users);

apiController.post('/user', apiController.user);

apiController.post('/workout', apiController.workout);

apiController.post('/urw', apiController.urw);

apiController.post('/routineinfo', apiController.routineinfo);

apiController.post('/routinerecommand', apiController.routinerecommand);

module.exports = apiController;