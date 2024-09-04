const db = require('../models')
const pwd = require('../utilites/passwordHashing')
const jwt = require('jsonwebtoken');
const { user: User } = db
const jwtSecretKey = process.env.JWT_SECRET;






//Get all users
const getAllUser = async (req, res, next) => {
    try {
        const items = await User.findAll({
            attributes: ['user_id', 'first_name']
        });
        res.status(200).json(items);
    } catch (err) {
        next(err);
    }
};


// Controller method to delte item by id
const createUser = async (req, res, next) => {
    try {
        const {
            first_name,
            last_name,
            email, username,
            phone_number,
            password,
            address1_line1,
            address1_line2,
            city1,
            state1,
            country1,
            postal_code1,
            address2_line1,
            address2_line2,
            city2,
            state2,
            country2,
            postal_code2,
            dept_id,
            design_id,
            role,
            is_active,
            date_of_birth,
            registration_date
        } = req.body;

        // console.log(first_name, last_name, email, username, phone_number, password);
        const newItem = await User.create({
            first_name, last_name, email, username, phone_number, password_hash: password, address1_line1,
            address1_line2,
            city1,
            state1,
            country1,
            postal_code1,
            address2_line1,
            address2_line2,
            city2,
            state2,
            country2,
            postal_code2,
            dept_id,
            design_id,
            role,
            is_active,
            date_of_birth,
            registration_date
        });

        res.status(201).json(newItem);
    } catch (err) {
        // console.error('Error creating item:', err);s
        // res.status(500).json({ error: 'Error creating item' });
        next(err);
    }
};

// Verifying a user's password
const loginUser = async (req, res, next) => {
    try {
        let { email, password } = req.body;
        const user = await User.findOne({ where: { email }, attributes: ['first_name', 'email', 'role', 'password_hash'] });
        if (user) {

            const isValid = await pwd.verifyPassword(password, user.dataValues.password_hash);

            if (isValid) {
                let { first_name, email, role } = user;
                //token genration
                const jwtToken = jwt.sign({ first_name, email, role }, jwtSecretKey);
                res.status(200).json({ first_name, email, role, servicetoken: jwtToken });
            } else {
                res.status(401).json({ msg: 'Invalid password' });
            }
        } else {
            res.status(404).json({ msg: 'User not found' });
        }
    } catch (error) {
        console.error('Error login User:', error);
        next(error);
    }
};


module.exports = {
    getAllUser,
    // getUserById,
    createUser,
    loginUser,
    // deleteUserById,
    // getUserByToken,
};