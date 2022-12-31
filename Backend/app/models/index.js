const dbConfig = require("../config");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.user = require("./user.js")(mongoose);
db.product = require("./product.js")(mongoose);

module.exports = db;
