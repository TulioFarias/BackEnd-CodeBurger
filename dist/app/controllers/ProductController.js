"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _Productjs = require('../models/Product.js'); var _Productjs2 = _interopRequireDefault(_Productjs);
var _Categoryjs = require('../models/Category.js'); var _Categoryjs2 = _interopRequireDefault(_Categoryjs);
var _Userjs = require('../models/User.js'); var _Userjs2 = _interopRequireDefault(_Userjs);


class ProductController {

    async store(request, response) {

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            price: Yup.number().required(),
            category_id: Yup.number().required(),
            offer: Yup.boolean(),
        })


        try {
            await schema.validateSync(request.body, { abortEarly: false })
        } catch (err) {
            return response.status(400).json({ error: err.errors })
        }

        const { admin: isAdmin } = await _Userjs2.default.findByPk(request.userId)

        if (!isAdmin) {
            return response.status(401).json()
        }

        const { filename: path } = request.file
        const { name, price, category_id, offer } = request.body;

        const products = await _Productjs2.default.create({
            name,
            price,
            category_id,
            path,
            offer,
        });

        return response.json(products)
    }

    async index(request, response) {

        const products = await _Productjs2.default.findAll({
            include: [
                {
                    model: _Categoryjs2.default,
                    as: 'category',
                    attributes: ['id', 'name']
                }
            ]
        })

        return response.json(products)

    }

    async update(request, response) {

        const schema = Yup.object().shape({
            name: Yup.string(),
            price: Yup.number(),
            category_id: Yup.number(),
            offer: Yup.boolean(),
        })


        try {
            await schema.validateSync(request.body, { abortEarly: false })
        } catch (err) {
            return response.status(400).json({ error: err.errors })
        }

        const { admin: isAdmin } = await _Userjs2.default.findByPk(request.userId)

        if (!isAdmin) {
            return response.status(401).json()
        }

        const { id } = request.params

        const productExist = await _Productjs2.default.findByPk(id)

        if (!productExist) {

            return response.status(401).json({ error: 'Esse produto não existe.' })
        }


        let path
        if(request.file){
            path = request.file.filename
        }
        const { name, price, category_id, offer } = request.body;

        await _Productjs2.default.update({
            name,
            price,
            category_id,
            path,
            offer,
        },
        
        {where : { id } }
        
        );

        return response.status(200).json()
    } 


}

exports. default = new ProductController()