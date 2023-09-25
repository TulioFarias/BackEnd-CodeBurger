"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);
var _multerjs = require('./config/multer.js'); var _multerjs2 = _interopRequireDefault(_multerjs);
var _UserControllerjs = require('./app/controllers/UserController.js'); var _UserControllerjs2 = _interopRequireDefault(_UserControllerjs);
var _SessionContollerjs = require('./app/controllers/SessionContoller.js'); var _SessionContollerjs2 = _interopRequireDefault(_SessionContollerjs);
var _ProductControllerjs = require('./app/controllers/ProductController.js'); var _ProductControllerjs2 = _interopRequireDefault(_ProductControllerjs);


var _authjs = require('./app/middlewares/auth.js'); var _authjs2 = _interopRequireDefault(_authjs);
var _CategoryControllerjs = require('./app/controllers/CategoryController.js'); var _CategoryControllerjs2 = _interopRequireDefault(_CategoryControllerjs);
var _OrderControllerjs = require('./app/controllers/OrderController.js'); var _OrderControllerjs2 = _interopRequireDefault(_OrderControllerjs);

const upload = _multer2.default.call(void 0, _multerjs2.default)
const routes = new (0, _express.Router)();

routes.get('/', (req, res) => {
    return res.json({message: 'Hello to my first API'})
})

routes.post("/users", _UserControllerjs2.default.store );

routes.post("/sessions", _SessionContollerjs2.default.store);

routes.use(_authjs2.default)

routes.post("/products", upload.single('file'), _ProductControllerjs2.default.store);
routes.get("/products", _ProductControllerjs2.default.index);
routes.put("/products/:id", upload.single('file'), _ProductControllerjs2.default.update);

routes.post("/categories", upload.single('file'),  _CategoryControllerjs2.default.store);
routes.get("/categories", _CategoryControllerjs2.default.index);
routes.put("/categories/:id", upload.single('file'), _CategoryControllerjs2.default.update);


routes.post("/orders", _OrderControllerjs2.default.store);
routes.put("/orders/:id", _OrderControllerjs2.default.update);
routes.get("/orders", _OrderControllerjs2.default.index);


exports. default = routes;
