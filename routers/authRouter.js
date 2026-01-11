const express = require('express');
const authRouter = express.Router();

const authController = require('../controllers/authController');

authRouter.get('/',authController.getRegister);
authRouter.post('/register',authController.postRegister);
authRouter.get('/login',authController.getLogin);
authRouter.post('/login',authController.postLogin);



module.exports = authRouter;