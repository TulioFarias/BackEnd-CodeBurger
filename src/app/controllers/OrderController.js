
import * as Yup from 'yup'
import Product from '../models/Product'
import Category from '../models/Category'
import Order from '../schemas/Order'
import User from '../models/User'

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

        const updatedProducts = await Product.findAll({
            where: {
                id: productsId,
            },
            include: [
              {
                model: Category,
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

        const orderResponse = await Order.create(order)
        


       

        return response.status(201).json(orderResponse)
    }

    async index(request, response){
        const orders = await Order.find()

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

        const { admin: isAdmin} = await User.findByPk(request.userId)

        if(!isAdmin){
            return response.status(401).json()
        }

        
        const {id} = request.params
        const { status } = request.body

        try{
            await Order.updateOne({ _id: id} , {status})
        }catch(error){
            return response.status(400).json({error: error.message})
        }
        

        return response.json({message: 'Status atualizado com sucesso'})
    }
}

export default new OrderController()