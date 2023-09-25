"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _authjs = require('../../config/auth.js'); var _authjs2 = _interopRequireDefault(_authjs);

exports. default = (request, response, next) => {

    const authToken = request.headers.authorization

    if(!authToken){
        return response.status(401).json({ error: "Token not provided"})
    }


    const token = authToken.split(' ')[1]

    try{
        _jsonwebtoken2.default.verify(token, _authjs2.default.secret, function (err, decoded){
            if(err){
                throw new Error()
            }
            

            request.userId = decoded.id
            request.userName = decoded.name
            

            return next()
        })

    }catch(err){
        return response.status(401).json({ error: "Token is invalid"})
    }

    
}