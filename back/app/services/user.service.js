const userModel = require('../models/user.model')
const bcrypt = require('bcryptjs');

const UserService = {

    getUserByEmail : async (email) => {
        return userModel.findOne({email: email})
    },

    isCorrectPassword: async (password, encodedPassword) => {
        return bcrypt.compare(password, encodedPassword);
    }
}

module.exports = UserService;