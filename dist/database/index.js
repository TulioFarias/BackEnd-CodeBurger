"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);
var _mongoose = require('mongoose'); var _mongoose2 = _interopRequireDefault(_mongoose);
var _Productjs = require('../app/models/Product.js'); var _Productjs2 = _interopRequireDefault(_Productjs);
var _Userjs = require('../app/models/User.js'); var _Userjs2 = _interopRequireDefault(_Userjs);
var _Categoryjs = require('../app/models/Category.js'); var _Categoryjs2 = _interopRequireDefault(_Categoryjs);
var _database = require('../config/database'); var _database2 = _interopRequireDefault(_database);

const models = [_Userjs2.default, _Productjs2.default, _Categoryjs2.default]

class Database {
    constructor(){
        this.init()
        this.mongo()
    }

    init(){
        this.connection = new (0, _sequelize2.default)('postgresql://postgres:ZHPXJehAX0HIGCJ8nyLt@containers-us-west-52.railway.app:7382/railway')
        models.map(model => model.init(this.connection)).
        map( model => model.associate && model.associate (this.connection.models))
    }

mongo(){
        this.mongoConnection = _mongoose2.default.connect('mongodb://mongo:q1iGoHaZDriurOSN5qW6@containers-us-west-162.railway.app:7642', {
                useNewUrlParser: true,
            useUnifiedTopology: true,
        })
    }
}

exports. default =  new Database()