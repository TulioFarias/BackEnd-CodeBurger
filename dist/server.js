"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _appjs = require('./app.js'); var _appjs2 = _interopRequireDefault(_appjs);

const port = process.env.PORT || 3001;
_appjs2.default.listen(port, '0.0.0.0');
