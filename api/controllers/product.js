const mongoose = require("mongoose");
const Product = require("../models/product");

exports.getAll = (req, res, next) => {
    Product.find()
        .exec()
        .then(docs => {
          console.log('docs')
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
        category: req.body.category,
        maker: req.body.maker,
        // categories: req.body.categories,
        // images: req.body.images,
        status: 'ACTIVE'
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
        category: req.body.category,
        maker: req.body.maker
        // categories: req.body.categories,
        // images: req.body.images
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
    let images = [];
    Product.findById(_id, (error, response) => {
      console.log('product find', response)
      images = response.images;
      if (error) return res.status(404).json({ message: "Error to find product!!" });
      console.log('find', images)
      console.log(`req.position: ${req.body.position}, req.file: ${req.file.filename}`)
      if (req.body.position === 0 || req.body.position && req.file) {
        const body = {
          position: req.body.position,
          image: `/uploads/${_id}/${req.file.filename}`//'/uploads/' + req.file.filename
        };
        if (images.length > body.position) {
          console.log('if', images);
          images[body.position] = body.image;
        } else {
          console.log('else', images);
          images.push(body.image);
        }
      } else {
        return res.status(404).json({ message: "Error to request!!" });
      }
      console.log('set', images)
    Product.findOneAndUpdate({ _id: _id }, { $set: {images: images} }, {new: true})
      .exec()
      .then(doc => {
        console.log('update', images)
        res.status(200).json({
            image: doc
        });
      })
      .catch(err => {
        res.status(500).json({ error: err });
      });
    });

    
  };

  exports.getByCategory = (req, res, next) => {
    Product.find({category: req.params.id})
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

  
exports.getAllPaginate = (req, res, next) => {
  console.log('params', req.params)
  const skip = parseInt(req.params.skip);
  const limit= parseInt(req.params.limit);
  const { body } = req.body;
  Product.find()
      .skip(skip)
      .limit(limit)
      .exec()
      .then(docs => {
          console.log('other', docs)
          res.status(200).json(docs)
      })
      .catch(err => {
          res.status(500).json({ error: err });
      });
};