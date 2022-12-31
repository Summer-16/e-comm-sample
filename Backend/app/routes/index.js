module.exports = app => {
  const express = require("express");
  const path = require('path');
  const router = require("express").Router();
  const { checkTokenRouter } = require("../middleware/auth");
  const user = require("../controllers/user.js");
  const product = require("../controllers/product.js");

  // public route
  router.post("/signUp", user.create);
  router.post("/login", user.login);
  router.post("/getProduct", product.list);

  // private route
  router.post("/getUser", checkTokenRouter, user.list);
  router.post("/addProduct", checkTokenRouter, product.create);
  router.post("/updateProduct", checkTokenRouter, product.update);
  router.delete("/deleteProduct", checkTokenRouter, product.delete);

  app.use("/api/", router);

  // Frontend routes for redirecting then to static folder
  app.use("/Dashboard", express.static(path.resolve("app/www")));
  app.use("/Sales", express.static(path.resolve("app/www")));
  app.use("/Product", express.static(path.resolve("app/www")));
  app.use("/sign-in", express.static(path.resolve("app/www")));
  app.use("/", express.static(path.resolve("app/www")));

};
