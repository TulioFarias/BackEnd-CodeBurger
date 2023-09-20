import Sequelize from 'sequelize'
import mongoose from 'mongoose'
import Product from '../app/models/Product'
import User from '../app/models/User'
import Category from '../app/models/Category'
import configDatabase from '../config/database'

const models = [User, Product, Category]

class Database {
    constructor(){
        this.init()
        this.mongo()
    }

    init(){
        this.connection = new Sequelize('postgresql://postgres:qDIRHx365DmA9wrKHCN9@containers-us-west-194.railway.app:6986/railway')
        models.map(model => model.init(this.connection)).
        map( model => model.associate && model.associate (this.connection.models))
    }

    mongo(){
        this.mongoConnection = mongoose.connect('mongodb://mongo:CfQVbfZX6iLhtJiKp0gM@containers-us-west-190.railway.app:7004', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
    }
}

export default  new Database()