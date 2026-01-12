const express = require('express');
const authRouter = express.Router();
const { authMiddleware } = require('../middleware/authmiddleware')
const authController = require('../controllers/authController');

authRouter.get('/',authController.getRegister);
authRouter.get('/register',authController.getRegister);
authRouter.post('/register',authController.postRegister);
authRouter.get('/login',authController.getLogin);
authRouter.post('/login',authController.postLogin);
authRouter.get('/home',authMiddleware,authController.gethome);
authRouter.get('/logout',authController.getLogout);



module.exports = authRouter;