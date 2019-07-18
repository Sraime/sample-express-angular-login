const userService = require('../../../app/services/user.service');
const authController = require('../../../app/controllers/auth.controller')
const jwt = require('jsonwebtoken');
const config = require('../../../config');

describe('signin', () => {

    let req;
    let res;

    beforeEach(() => {
        jest.spyOn(userService, 'getUserByEmail');
        req = {body: {}}
        res = {
            send: jest.fn(),
            status: jest.fn()
        }
        res.status.mockReturnValue(res);
    });

    afterEach(() => {
        userService.getUserByEmail.mockRestore();
    });

    describe('user found', () => {

        req = {
            body: {
                email : "xx.xx@xx.xx",
                password: "given-password"
            }
        };

        const fakeUser = {
            id: "1",
            email: "xx.xx@xx.xx",
            pseudo: "toto",
            password: "encoded-password"
        }

        beforeEach(() => {
            userService.getUserByEmail.mockReturnValue(fakeUser);
            jest.spyOn(userService, 'isCorrectPassword');
        });

        afterEach(() => {
            userService.isCorrectPassword.mockRestore();
        });

        describe('valid password', () => {

            const token = "generated-token";
            const secret = "app-secret"
            beforeEach(() => {
                userService.isCorrectPassword.mockReturnValue(true);
                jest.spyOn(jwt, 'sign').mockReturnValue(token);
                config.auth.secret = secret;
                config.auth.expiresIn = 10;
            });

            afterEach(() => {
                jwt.sign.mockRestore();
            });


            it('should return a token', async () => {
                await authController.singin(req, res);
                expect(userService.isCorrectPassword).toHaveBeenCalledWith(req.body.password, fakeUser.password);
                expect(jwt.sign).toHaveBeenCalledWith({id: fakeUser.id}, secret, {
                    expiresIn: config.auth.expiresIn,
                    subject: fakeUser.id});
                expect(res.send).toHaveBeenCalledWith({
                    pseudo: fakeUser.pseudo, 
                    token: token, 
                    expiresIn: config.auth.expiresIn
                });
            });
        });
        
        describe('not valid password', () => {
            beforeEach(() => {
                userService.isCorrectPassword.mockReturnValue(false);
            });

            it('should return an error 400', async () => {
                await authController.singin(req, res);
                expect(res.status).toHaveBeenCalledWith(400);
                expect(res.send).toHaveBeenCalledTimes(1);
            });
        });
    });


    it('should return an error 400 when the user is not found', async () => {
        userService.getUserByEmail.mockReturnValue(null);
        await authController.singin(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledTimes(1);
    });
   
});