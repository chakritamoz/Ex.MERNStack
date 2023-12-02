const Product = require('../models/product');
const fs = require('fs');

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
    let data = req.body;

    if (req.file) data.file = req.file.filename;

    const product = await Product(data).save();
    res.send(product);
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
}

exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    let newData = req.body;

    if (req.file) {
      newData.file = req.file.filename
      
      await fs.unlink('./uploads/' + newData.oldFile, (err) => {
        if (err) console.log(err);
        else console.log(`Remove file success`);
      });
    };

    const product = await Product
      .findOneAndUpdate(
        { _id: id },
        newData,
        { new: true }
      );

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

    if (product?.file) {
      await fs.unlink('./uploads/' + product.file, (err) => {
        if (err) console.log(err);
        else console.log(`Remove file success`);
      });
    }
    res.send(product);
   } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
   }
}