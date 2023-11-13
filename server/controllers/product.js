const Product = require('../models/product');

exports.list = async (req, res) => {
  try {
    const products = await Product.find({}).exec();
    res.send(products);
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
}

exports.read = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findOne({ _id: id });
    res.send(product);
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
}

exports.create = async (req, res) => {
  try {
    const product = await Product(req.body).save();
    res.send(product);
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
}

exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product
      .findOneAndUpdate(
        { _id: id },
        req.body,
        { new: true }
      ).exec();
    res.send(product);
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
}

exports.remove = async (req, res) => {
  try {
    const id = req.params.id;
    const product= await Product.findOneAndDelete({ _id: id }).exec();
    res.send(product);
   } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
   }
}