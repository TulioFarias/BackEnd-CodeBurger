"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _Productjs = require('../models/Product.js'); var _Productjs2 = _interopRequireDefault(_Productjs);
var _Categoryjs = require('../models/Category.js'); var _Categoryjs2 = _interopRequireDefault(_Categoryjs);
var _Orderjs = require('../schemas/Order.js'); var _Orderjs2 = _interopRequireDefault(_Orderjs);
var _Userjs = require('../models/User.js'); var _Userjs2 = _interopRequireDefault(_Userjs);

class OrderController{
    async store(request, response){

        const schema = Yup.object().shape({
            products : Yup.array()
            .required()
            .of(
                Yup.object().shape({
                    id: Yup.number().required(),
                    quantity: Yup.number().required(),
                })
            ),
            
        })
        

        try{
            await schema.validateSync(request.body, {abortEarly: false})
        } catch(err){
            return response.status(400).json({error: err.errors})
        }

        const productsId = request.body.products.map((products) => products.id)

        const updatedProducts = await _Productjs2.default.findAll({
            where: {
                id: productsId,
            },
            include: [
              {
                model: _Categoryjs2.default,
                as: 'category',
                attributes: ['name']

              }
            ],
        })

        const editProducts = updatedProducts.map(products => {

            const productIndex = request.body.products.findIndex(requestProducts =>  requestProducts.id == products.id
            )



            const newProduct = {
                id: products.id,
                name: products.name,
                price: products.price,
                category: products.category.name,
                url: products.url,
                quantity: request.body.products[productIndex].quantity,
            }
            return newProduct
        })

        const order = {
            user: {
                id: request.userId,
                name: request.userName,
            },
            products: editProducts,
            status: 'Pedido Realizado',
        }

        const orderResponse = await _Orderjs2.default.create(order)
        


       

        return response.status(201).json(orderResponse)
    }

    async index(request, response){
        const orders = await _Orderjs2.default.find()

        return response.json(orders)
    }

    async update(request, response){

        const schema = Yup.object().shape({
            status : Yup.string().required()
           
            
        })
        

        try{
            await schema.validateSync(request.body, {abortEarly: false})
        } catch(err){
            return response.status(400).json({error: err.errors})
        }

        const { admin: isAdmin} = await _Userjs2.default.findByPk(request.userId)

        if(!isAdmin){
            return response.status(401).json()
        }

        
        const {id} = request.params
        const { status } = request.body

        try{
            await _Orderjs2.default.updateOne({ _id: id} , {status})
        }catch(error){
            return response.status(400).json({error: error.message})
        }
        

        return response.json({message: 'Status atualizado com sucesso'})
    }
}

exports. default = new OrderController()