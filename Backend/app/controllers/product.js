const db = require("../models");
const Product = db.product;
const { checkToken } = require("../middleware/auth");
const logger = require('../utils/logger')('product')

exports.create = (req, res) => {
  const { name, description, price, currency, isActive } = req.body;

  if (!name || !description || !price || !currency) {
    res.json({ success: false, message: "All fields are mandatory" });
    return;
  }

  const product = new Product({ name, description, price, currency, isActive: isActive === undefined ? 1 : isActive });
  product.save(product)
    .then(data => {
      res.json({ success: true, message: "Product added successfully", data: data });
    })
    .catch(err => {
      logger.error(err);
      res.json({ success: false, message: err.message || "Some error occurred while creating the product." });
    });
};

exports.update = (req, res) => {
  const { id, updateObj } = req.body;

  if (!id) {
    res.json({ success: false, message: "Id missing" });
    return;
  }

  Product.findByIdAndUpdate(id, updateObj)
    .then(data => {
      res.json({ success: true, message: "Product updated successfully", data: data });
    })
    .catch(err => {
      logger.error(err);
      res.json({ success: false, message: err.message || "Some error occurred while updating the product." });
    });
};

exports.delete = (req, res) => {
  const { id } = req.body;

  if (!id) {
    res.json({ success: false, message: "Id missing" });
    return;
  }

  Product.findByIdAndDelete(id)
    .then(data => {
      res.json({ success: true, message: "Product deleted successfully", data: data });
    })
    .catch(err => {
      logger.error(err);
      res.json({ success: false, message: err.message || "Some error occurred while deleting the product." });
    });
};

exports.list = (req, res) => {
  const { filter } = req.body;
  const condition = filter && Object.keys(filter).length ? filter : {};

  const isAdmin = checkToken(req);
  if (!isAdmin) {
    condition.isActive = 1;
  }

  Product.find(condition)
    .then(data => {
      res.json({ success: true, message: "", data });
    })
    .catch(err => {
      logger.error(err);
      res.json({ success: false, message: err.message || "Some error occurred while retrieving product." });
    });
};