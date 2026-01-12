//controllers/authControler.js
const mongoose = require('mongoose')
const User = require('../models/userModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {authMiddleware} = require('../middleware/authmiddleware')

exports.getRegister = (req, res) => {
    res.render('register', {
        error: null,
        title : 'Register',
        user: req.user 
    });
}

exports.postRegister = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const emailExist = await User.findOne({ email })
        if (emailExist) {
            return res.render("register", {
                error: "Email already exists",
                title : 'Register',
                user: req.user
            });
        }
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                let newUser = await User.create({
                    name,
                    email,
                    password: hash
                })
                res.render('login', {
                    email,
                    title : 'Log In',
                    user: req.user
                });
            })
        })
    } catch (err) {
        res.render('register', {
            error: "somethig went wrong",
            title : 'Register',
            user: req.user
        })
    }

}

exports.getLogin = (req, res) => {
    res.render('login', { email: null, error: null,title : 'Login In',user: req.user })
}

exports.postLogin = async (req, res) => {
    const { email, password } = req.body;
    const userExist = await User.findOne({ email })
    if (!userExist) {
        return res.render('login', { error: "user not exist", email ,title : 'Login In',user: req.user})
    }
    const isMatch = await bcrypt.compare(password, userExist.password)
    if (isMatch) {

        const token = jwt.sign({ id: userExist._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXP });
        res.cookie('token', token, {
            httpOnly: true
        })
        return res.redirect('/home');
    }
    else {
        res.render('login', { email, error: 'wrong Credential' ,title : 'Login In',user: req.user})
    }
}

exports.gethome = (req,res)=>{
    res.render('home',{user : req.user,title : 'Home',user: req.user});
};

exports.getLogout = (req, res) => {
   res.clearCookie("token");
   return res.redirect("/login");
};


