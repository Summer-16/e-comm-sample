'use strict';

const jwt = require('jsonwebtoken');
const config = require('../config');
const jwtSecretKey = config.jwt.key;
const logger = require('../utils/logger')('middleware/auth')

/**
 * check token middleware
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 */
const checkTokenRouter = (req, res, next) => {
    const token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase

    let jwtToken = token;

    if (token) {
        if (token.startsWith('Bearer ')) {
            // Remove Bearer from string
            jwtToken = token.slice(7, token.length);
        }

        jwt.verify(jwtToken, jwtSecretKey, (err, decoded) => {
            if (err) {
                logger.warn("Wrong Token is Provided")
                return res.send({
                    success: false,
                    message: "Wrong Token is Provided"
                })
            } else {
                req.userData = decoded;
                req.token = token;
                next();
            }
        });
    } else {
        logger.warn("Token is Missing")
        return res.send({
            success: false,
            message: "Token is Missing"
        })
    }
};

const checkToken = (req) => {
    try {
        const token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
        let jwtToken = token;
        if (token) {
            if (token.startsWith('Bearer ')) {
                // Remove Bearer from string
                jwtToken = token.slice(7, token.length);
            }
            const decoded = jwt.verify(jwtToken, jwtSecretKey);
            req.userData = decoded;
            req.token = token;
            return true;
        } else {
            return false;
        }
    } catch (err) {
        return false;
    }
};

module.exports = {
    checkTokenRouter,
    checkToken
};