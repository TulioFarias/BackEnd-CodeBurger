import Sequelize from 'sequelize'
import mongoose from 'mongoose'
import Product from '../app/models/Product.js'
import User from '../app/models/User.js'
import Category from '../app/models/Category.js'
// import configDatabase from '../config/database'

const models = [User, Product, Category]

class Database {
    constructor(){
        this.init()
        this.mongo()
    }

    init(){
        this.connection = new Sequelize('postgresql://postgres:m44U6mMnomRdGohrTh4o@containers-us-west-129.railway.app:8019/railway')
        models.map(model => model.init(this.connection)).
        map( model => model.associate && model.associate (this.connection.models))
    }

mongo(){
        this.mongoConnection = mongoose.connect('mongodb://mongo:23GqdxvcbVc8ZBH0SWXQ@containers-us-west-133.railway.app:6438', {
                useNewUrlParser: true,
            useUnifiedTopology: true,
        })
    }
}

export default  new Database()