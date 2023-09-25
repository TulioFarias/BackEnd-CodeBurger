"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);



class Product extends _sequelize.Model{
        static init(sequelize){
            super.init(
                {
                    name: _sequelize2.default.STRING,
                    price: _sequelize2.default.INTEGER,
                    path: _sequelize2.default.STRING,
                    offer: _sequelize2.default.BOOLEAN,
                    url: {
                        type: _sequelize2.default.VIRTUAL,
                        get(){
                            return `http://localhost:3001/product-file/${this.path}`
                        },
                    },
                },
                {
                    sequelize,
                },
            )
            return this
        }

        static associate(models){
            this.belongsTo(models.Category, {foreignKey: 'category_id',
             as: 'category'})
        }
}

exports. default = Product