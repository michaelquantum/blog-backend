const mongoose = require('mongoose');
const dotenv = require('dotenv');
const user = require('../models/user');

dotenv.config();

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        const existingAdmin = await user.findOne({email})
        if (existingAdmin) {
            console.log('Admin user already registered')
            process.exit()
        }

        await user.create({
            username: 'admin',
            email: 'admin@gmail.com',
            password: 'admin123@',
            role: 'admin',
        });

        console.log('Admin Seeded')
        console.log('Email: admin@gmail.com');
        console.log('password: admin123')
        process.exit()
    } catch (err) {
        console.error('failed to seed admin:', err.message)
        process.exit(1);
    }}


    seedAdmin();