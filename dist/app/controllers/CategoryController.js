"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _Categoryjs = require('../models/Category.js'); var _Categoryjs2 = _interopRequireDefault(_Categoryjs);
var _Userjs = require('../models/User.js'); var _Userjs2 = _interopRequireDefault(_Userjs);


class CategoryController {

    async store(request, response) {

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            
        })


        try {
            await schema.validateSync(request.body, { abortEarly: false })
        } catch (err) {
            return response.status(400).json({ error: err.errors })
        }

        const { admin: isAdmin} = await _Userjs2.default.findByPk(request.userId)

        if(!isAdmin){
            return response.status(401).json()
        }

      
        const { name } = request.body;

        const { filename: path} = request.file

        const categoryExists = await _Categoryjs2.default.findOne({
            where: {
                name,
            }
        })

        if(categoryExists){
            return response.status(400).json({err: "Essa categoria já existe."})
        }

        const { id } = await _Categoryjs2.default.create( {name, path});

        return response.json({id, name})
        
    }

    async index(request, response){
        
        const category = await _Categoryjs2.default.findAll()
        
        return response.json(category)
        
    }

    async update(request, response) {

        const schema = Yup.object().shape({
            name: Yup.string(),
            
        })


        try {
            await schema.validateSync(request.body, { abortEarly: false })
        } catch (err) {
            return response.status(400).json({ error: err.errors })
        }

        const { admin: isAdmin} = await _Userjs2.default.findByPk(request.userId)

        if(!isAdmin){
            return response.status(401).json()
        }

      
        const { name } = request.body;

        const { id } = request.params

        const category = await _Categoryjs2.default.findByPk(id)

        if(!category){
            return response.status(401).json({ error: "Verifique se seu id está correto"})
        }

        let path

        if (request.file) {
            path = request.file.filename
        }

        await _Categoryjs2.default.update({name, path}, { where: { id }})


        return response.status(200).json()
        
    }

}

exports. default = new CategoryController()