const User = require('../models/User');

exports.GetUser = async (req, res) => {
    try {
        const users = await User.find().sort({ createdAt: -1});
        res.status(200).json({success: true, data: users});
    } catch (error) {
        res.status(500).json({success: false, message: 'Server Error'});
    }
};


// Create An Author

exports.createAuthor = async (req, res) => {
    try {
        const {username, email, password} = req.body;

        // Check if the user already exists.
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ sucess: false, message: 'User already exists.'})
        }

        //Create the user
        const user = await User.create({
            username,
            email,
            password,
            role: 'author'
        });
        res.status(201).json({
            success: true,
            message: 'Author account created successfully',
            data: {id: user._id, username: user.username, email: user.email, role: user.role},
        });
    } catch (error) {
        res.status(500).json({success: false, message: 'Server Error'});
    }
};