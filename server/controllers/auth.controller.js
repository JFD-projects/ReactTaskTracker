const config = require("../config/config.json");
const db = require("../models");
const User = db.user;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const tokenList = {}

exports.signUp = (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 5),
    });

    user.save((err, user) => {
        if (err) {
            res.status(500).send({message: err});
            return;
        }
        delete user.password;
        res.send({message: "User was registered successfully!", user});
    });
};

exports.signIn = (req, res) => {
    User.findOne({
        email: req.body.email,
    }).select('+password').exec((err, user) => {
        if (err) {
            res.status(500).send({message: err});
            return;
        }

        if (!user) {
            return res.status(404).send({message: "User Not found."});
        }

        var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );

        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password!",
            });
        }

        let token = jwt.sign({id: user.id}, config.secret, {expiresIn: config.tokenLife});
        let refreshToken = jwt.sign({id: user.id}, config.refreshTokenSecret, {expiresIn: config.refreshTokenLife});
        tokenList[refreshToken] = refreshToken

        res.status(200).send({
            id: user._id,
            username: user.username,
            email: user.email,
            accessToken: token,
            expiresIn: config.tokenLife,
            refreshToken: refreshToken,
        });
    });
};

exports.refreshToken = (req, res) => {
    const refreshToken = req.body.refreshToken;
    if (!refreshToken || !(refreshToken in tokenList)) {
        return res.status(401).send({message: "RefreshToken unavailable"});
    }

    User.findOne({
        _id: req.userId,
    }).exec((err, user) => {
        if (err) {
            res.status(500).send({message: err});
            return;
        }
        if (!user) {
            return res.status(404).send({message: "User Not found."});
        }

        let token = jwt.sign({id: user.id}, config.secret, {expiresIn: config.tokenLife});
        res.status(200).send({
            id: user._id,
            username: user.username,
            email: user.email,
            accessToken: token,
            expiresIn: config.tokenLife,
            refreshToken: refreshToken,
        });

    });
};

exports.revokeToken = (req, res) => {
    const refreshToken = req.body.refreshToken;
    if (refreshToken && (refreshToken in tokenList)) {
        delete tokenList[refreshToken];
        res.status(200).send({});
    } else {
        return res.status(401).send({message: "RefreshToken unavailable"});
    }
};