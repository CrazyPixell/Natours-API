const express = require('express');
const usersContoller = require('../controllers/usersController');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);

router
  .route('/')
  .get(usersContoller.getAllUsers)
  .post(usersContoller.createUser);

router
  .route('/:id')
  .get(usersContoller.getUser)
  .patch(usersContoller.updateUser)
  .delete(usersContoller.deleteUser);

module.exports = router;
