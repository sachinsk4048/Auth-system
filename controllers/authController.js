//controllers/authControler.js
const mongoose = require('mongoose')
const User = require('../models/userModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

exports.getRegister = (req, res) => {
    res.render('register', {
        error: null
    });
}

exports.postRegister = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const emailExist = await User.findOne({ email })
        if (emailExist) {
            return res.render("register", {
                error: "Email already exists"
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
                    email
                });
            })
        })
    } catch (err) {
        res.render('register', {
            error: "somethig went wrong"
        })
    }

}

exports.getLogin = (req, res) => {
    res.render('login', { email: null, error: null })
}

exports.postLogin = async (req, res) => {
    const { email, password } = req.body;
    const userExist = await User.findOne({ email })
    if (!userExist) {
        return res.render('login', { error: "user not exist", email })
    }
    const isMatch = await bcrypt.compare(password, userExist.password)
    if (isMatch) {

        const token = jwt.sign({ id: userExist._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXP });
        res.cookie('token', token, {
            httpOnly: true
        })
        return res.render('home');
    }
    else {
        res.render('login', { email, error: 'wrong Credential' })
    }


}

