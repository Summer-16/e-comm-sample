const express = require("express");
const cors = require("cors");
const multer = require('multer');
const path = require('path');
const upload = multer();
const logger = require('./app/utils/logger')('Server')
const app = express()
const db = require("./app/models");
const user = require("./app/controllers/user.js");

const corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json({
  limit: '5mb',
  extended: true
}));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({
  limit: '5mb',
  extended: true
}));

app.use(upload.array());
app.use(express.static(path.resolve("app/www")));

db.mongoose.connect(db.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    logger.info("Connected to the MongoDb database!");
    user.createDefaultAdmin();
  })
  .catch(err => {
    logger.error("Cannot connect to the MongoDb database!", err);
    process.exit();
  });

require("./app/routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 2000;
app.listen(PORT, function () {
  logger.info(`App listening at ${PORT}`)
});

// ========== process error handling [ start ] ==========
process.on('uncaughtException', err => {
  logger.error("'uncaughtException' occurred! \n error:", err);
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', reason.stack || reason);
});
// ========== process error handling [ end ] ==========