"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _Userjs = require('../models/User.js'); var _Userjs2 = _interopRequireDefault(_Userjs);
var _uuid = require('uuid');
var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);

class UserController{
    async store(request, response){

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().required().min(6),
            admin: Yup.boolean(),
        })
        

        try{
            await schema.validateSync(request.body, {abortEarly: false})
        } catch(err){
            return response.status(400).json({error: err.errors})
        }
        


        const {name , email, password, admin } = request.body

        const userExists = await _Userjs2.default.findOne({
            where: { email},
        })

        if(userExists){
            return response.status(409).json({error: 'Esse usuário já existe.'})
        }

        console.log( userExists)

        const users = await _Userjs2.default.create({  
        id: _uuid.v4.call(void 0, ),
        name,
        email,
        password,
        admin,
    })

        return response.status(201).json({id: users.id, name, email, admin})
    }
}

exports. default = new UserController()