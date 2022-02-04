const Token = require("../models/token.model");
const jwt = require('jsonwebtoken')
const config = require('../config/config.json')

exports.findToken = async function (refreshToken) {
    try {
        return await Token.findOne({refreshToken});
    } catch (e) {
        return null
    }
};

exports.save = async function (userId, refreshToken) {
    const data = await Token.findOne({user: userId});
    if (data) {
        data.refreshToken = refreshToken
        return data.save()
    }
    return await Token.create({user: userId, refreshToken});
};

exports.validateRefresh = async function (refreshToken) {
    try {
        return jwt.verify(refreshToken, config.refreshTokenSecret)
    } catch (e) {
        return null
    }
};

exports.generate = function (payload) {
    const accessToken = jwt.sign(payload, config.secret, {
        expiresIn: '1h'
    });
    const refreshToken = jwt.sign(payload, config.refreshTokenSecret);
    return {
        accessToken, refreshToken, expiresIn: 3600
    }
}