const userService = require('../services/user.service')
const jwt = require('jsonwebtoken');
const config = require('../../config')

const AuthController = {

    singin : async (req, res) => {
        const user = await userService.getUserByEmail(req.body.email);
        if(user === null) {
            return res.status(400).send();
        }
        let isValid = await userService.isCorrectPassword(req.body.password, user.password);
        if(!isValid) {
            return res.status(400).send();
        }
        const token = jwt.sign({id: user.id},config.auth.secret, {
           // algorithm: 'RS256',
            expiresIn: config.auth.expiresIn,
            subject: user.id.toString()
        });
        res.send({pseudo: user.pseudo, token: token, expiresIn: config.auth.expiresIn});
    }
}

module.exports = AuthController;