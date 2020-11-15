const mongoose = require("mongoose");
const Product = require("../models/product");

exports.getAll = (req, res, next) => {
    Product.find()
        .exec()
        .then(docs => {
            res.status(200).json(docs)
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
};

exports.create = (req, res, next) => {
      const product = new Product({
        _id: mongoose.Types.ObjectId(),
        sku: req.body.sku,
        name: req.body.name,
        description: req.body.description,
        unit: req.body.unit,
        expiration: req.body.expiration,
        model: req.body.model,
        quantity: req.body.quantity,
        price: req.body.price,
        categories: req.body.categories,
        images: req.body.images
      });
      product.save()
        .then(result => {
            res.status(201).json(result);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
};

exports.get = (req, res, next) => {
  Product.findById(req.params.id)
    .exec()
    .then(doc => {
      if (!doc) {
        return res.status(404).json({ message: "Not found" });
      }
      res.status(200).json(doc);
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
};

exports.update = (req, res, next) => {
    const _id = req.params.id;
    const body = {
        sku: req.body.sku,
        name: req.body.name,
        description: req.body.description,
        unit: req.body.unit,
        expiration: req.body.expiration,
        model: req.body.model,
        quantity: req.body.quantity,
        price: req.body.price,
        categories: req.body.categories,
        images: req.body.images
    };
    Product.findOneAndUpdate({ _id: _id }, { $set: body }, {new: true})
      .exec()
      .then(doc => {
        res.status(200).json(doc);
      })
      .catch(err => {
        res.status(500).json({ error: err });
      });
};

exports.delete = (req, res, next) => {
    const _id = req.params.id;
    Product.deleteOne({ _id: _id })
        .exec()
        .then(result => {
            res.status(200).json({
                _id: _id,
            });
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
};

exports.updateImage = (req, res, next) => {
    const _id = req.params.id;
    const body = {
        image: '/uploads/' + req.file.filename
    };
    Product.findOneAndUpdate({ _id: _id }, { $set: body }, {new: true})
      .exec()
      .then(doc => {
        res.status(200).json({
            // image: doc.image
            image: doc
        });
      })
      .catch(err => {
        res.status(500).json({ error: err });
      });
  };