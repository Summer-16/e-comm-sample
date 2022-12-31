module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      name: String,
      description: String,
      price: Number,
      currency: String,
      isActive: Number,
    },
    { collection: "product" },
    { autoCreate: true },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Product = mongoose.model("product", schema);
  return Product;
};
