const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.redirect('/login');
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id);
        if (!user) {
            return res.redirect('/login');
        }

        req.user = user;
        next();
    } catch (err) {
        return res.redirect('/login');
    }
};
