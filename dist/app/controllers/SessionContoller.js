"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _Userjs = require('../models/User.js'); var _Userjs2 = _interopRequireDefault(_Userjs);
var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _authjs = require('../../config/auth.js'); var _authjs2 = _interopRequireDefault(_authjs);

class SessionController{
    async store(request, response){
            
        const schema = Yup.object().shape({
            email: Yup.string().email().required(),
            password: Yup.string().required()

        })

        

       if(!(await schema.isValid(request.body))){
        return response.status(400).json({error: "Email ou senha inválidos."})
       }

       const { email, password } = request.body
       const user = await _Userjs2.default.findOne({
        where: { email },
       })

       if(!user){
        return response.status(400).json({error: "Email ou senha inválidos."})
       }

       if( user && !(await user.checkPassword(password))){
        return response.status(400).json({error: "Email ou senha inválidos."})
       }

       return response.json({
        id: user.id, 
        email, 
        name:user.name, 
        admin: user.admin,
        token: _jsonwebtoken2.default.sign({id: user.id, name:user.name}, _authjs2.default.secret , {
            expiresIn: _authjs2.default.expiresIn,
        }),
    
    })
    }
}

exports. default = new SessionController()