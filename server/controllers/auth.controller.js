const config = require("../config/config.json");
const db = require("../models");
const User = db.user;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const TokenService = require("../services/token.service");
const {validationResult} = require('express-validator')

exports.signUp = async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                error: {
                    message: 'INVALID_DATA',
                    code: 400,
                    errors: errors.array()
                }
            })
        }

        const {name, email, password} = req.body;
        const user = await User.create({
            name,
            email,
            password: await bcrypt.hash(password, 12),
        });

        const tokens = TokenService.generate({_id: user._id});
        await TokenService.save(user._id, tokens.refreshToken);
        res.status(200).send({
            id: user._id,
            username: user.username,
            email: user.email,
            ...tokens
        });
    } catch (e) {
        res.status(500).send({message: e.message});
    }
};

exports.signIn = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email}).select('+password');
        if (!user) {
            return res.status(404).send({message: "User Not found."});
        }

        const passwordIsValid = await bcrypt.compare(password, user.password)
        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password!",
            });
        }
        const tokens = TokenService.generate({_id: user._id});
        await TokenService.save(user._id, tokens.refreshToken);
        res.status(200).send({
            id: user._id,
            username: user.username,
            email: user.email,
            ...tokens
        });
    } catch (e) {
        res.status(500).send({message: e.message});
    }
};

function isTokenInvalid(data, dbToken) {
    return !data || !dbToken || data._id !== dbToken?.user?.toString()
}

exports.refreshToken = async (req, res) => {
    try {
        const {refreshToken} = req.body;

        const data = await TokenService.validateRefresh(refreshToken)
        const dbToken = await TokenService.findToken(refreshToken);

        if (isTokenInvalid(data, dbToken)) {
            return res.status(401).send({message: "Unauthorized"});
        }

        const user = await User.findOne({_id: data._id});
        console.log('user', user)
        if (!user) {
            return res.status(401).send({message: "Unauthorized"});
        }

        const tokens = TokenService.generate({_id: user._id});
        // await TokenService.save(user._id, tokens.refreshToken);
        res.status(200).send({
            id: user._id,
            username: user.username,
            email: user.email,
            ...tokens,
            refreshToken
        });
    } catch (e) {
        res.status(500).send({message: e.message});
    }
};

exports.revokeToken = async (req, res) => {
    try {
        const {refreshToken} = req.body;
        const token = await TokenService.findToken(refreshToken);
        if (token) {
            token.deleteOne();
            res.status(200).send({message: "RefreshToken has been deleted"});
        } else {
            return res.status(401).send({message: "RefreshToken unavailable"});
        }
    } catch (e) {
        res.status(500).send({message: e.message});
    }
};