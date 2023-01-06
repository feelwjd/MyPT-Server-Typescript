const mainpageController = require('../controllers/mainpageController');

mainpageController.post('/', mainpageController.main);

mainpageController.post('/calender', mainpageController.calender);

mainpageController.post('/todolist', mainpageController.todolist);

module.exports = mainpageController;