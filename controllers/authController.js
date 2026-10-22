const jwt = require('jsonwebtoken');
const User = require('../models/User');

//generate JWT.
const generateToken = (user) => {
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '2h',
    });
}

//register a new user
exports.registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = await User.create({
            Username: username,
            Email: email,
            Password: password,
        });
        const token = generateToken(user);
        res.status(201).json({
            success: true,
            data: {
                token,
                user: {
                    id: user._id,
                    username: user.Username,
                    email: user.Email,
                },
            },
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

//login a user
exports.loginUser = async (req, res) => {
    try {
        const { Email, Password } = req.body;
        if(!Email || !Password){
            return res.status(400).json({ message: "Please provide email and password" });
        }

        const user = await User.findOne({ Email }).select('+Password');
        if (!user || !(await user.comparePassword(Password))) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const token = generateToken(user);
        res.status(200).json({
            success: true,
            data: {
                token,
                user: {
                    id: user._id,
                    username: user.Username,
                    email: user.Email,
                },
            },
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-Password');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({
            success: true,
            data: {
                id: user._id,
                username: user.Username,
                email: user.Email,
            },
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};