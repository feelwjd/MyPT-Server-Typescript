const usersController = require('../controllers/usersController');

usersRouter.post('/signin', usersController.signin);

usersRouter.post('/signup', usersController.signup);

usersRouter.post('/signout', usersController.signout);

usersRouter.post('/signdelete', usersController.signdelete);

usersRouter.post('/signupdate', usersController.signupdate);

module.exports = usersRouter;