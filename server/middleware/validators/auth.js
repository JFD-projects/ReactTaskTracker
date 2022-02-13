const {check} = require('express-validator')

const signUpValidations = [
    check('name', 'Имя обязательное').notEmpty(),
    check('email', 'Некорректный email').normalizeEmail().isEmail(),
    check('password', 'Некорректный пароль').exists().isLength({min: 8}),
]

module.exports = {
    signUpValidations,
};
