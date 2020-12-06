var User = require('../models/user');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('../config.js');

exports.getToken = function (user) {
    return jwt.sign(user, config.secretKey, {
        expiresIn: 3600
    });
};

exports.verifyOrdinaryUser = function (req, res, next) {
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, config.secretKey, function (err, decoded) {
            if (err) {
                var err = new Error('You are not authenticated!');
                err.status = 401;
                return next(err);
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });
    } else {
        // if there is no token
        // return an error
        var err = new Error('No token provided!');
        err.status = 403;
        return next(err);
    }
};


exports.verifyAdmin = function(req, res, next){
    if(!req.decoded){
        var err = new Error('You are not authorized to perform this operation!');
        err.status = 403;
        return next(err);
    }else{
        var id = req.decoded._id;
        
        if(!req.decoded.admin){
            var err = new Error('You are not authorized to perform this operation!');
            err.status = 403;
            return next(err);
        }else
            next();
    }
    
    // the property req.decoded is set by verifyOrdinaryUser
    /*if(req.decoded._doc.admin){//User with admin privilege
        next();
    }else{
        var err = new Error('You are not authorized to perform this operation!');
        err.status = 403;
        return next(err);
    }*/
};


/* I saw many of us using the following code and I wonder why it work, at witch moent so the initialised "req.decoded = decoded;" ??
exports.verifyAdmin = function(req, res, next){
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    // verifies secret and checks exp
    jwt.verify(token, config.secretKey, function (err, decoded) {
        if (err) {
            var err = new Error('You are not authenticated!');
            err.status = 401;
            return next(err);
        } else {
            // They are an admin
            if (decoded._doc.admin){
                return next();
            } else {
                // They are not an admin
                var err = new Error('You are not authorized to perform this operation!');
                err.status = 403;
                return next(err);
            }
        }
    });


}
*/