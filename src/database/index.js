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
        this.connection = new Sequelize('postgresql://postgres:YGSBSlulY8mujJP1rhPS@containers-us-west-131.railway.app:7703/railway')
        models.map(model => model.init(this.connection)).
        map( model => model.associate && model.associate (this.connection.models))
    }

mongo(){
        this.mongoConnection = mongoose.connect('mongodb://mongo:MAYADAVBagYM47HtvpRu@containers-us-west-134.railway.app:5662', {
                useNewUrlParser: true,
            useUnifiedTopology: true,
        })
    }
}

export default  new Database()