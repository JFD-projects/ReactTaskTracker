const {check} = require('express-validator')

console.log('check', check);
const signUpValidations = [
    check('name', 'Имя обязательное').notEmpty(),
    check('email', 'Некорректный email').normalizeEmail().isEmail(),
    check('password', 'Некорректный пароль').exists().isLength({min: 8}),
]

module.exports = {
    signUpValidations,
};
