const { Product } = require('../models');

exports.getAll = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.create = async (req, res) => {
  try {
    const product = await Product.create({
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
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.get = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.update = async (req, res,) => {
  const _id = req.params.id;
  try {
    const dataProduct = {
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
    };
    const product = await Product.findOneAndUpdate({ _id, }, dataProduct, { new: true });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.delete = async (req, res) => {
  const _id = req.params.id;
  try {
    const product = await Product.deleteOne({ _id });
    res.status(200).json({ _id });
  } catch (error) {
    res.status(500).json({ error });
  }
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
}

exports.getByCategory = async (req, res) => {
  try {
    const { id: category } = req.params;
    const products = await Product.find({ category });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.getAllPaginate = async (req, res) => {
  const skip = parseInt(req.params.skip);
  const limit = parseInt(req.params.limit);
  const body = req.body;
  let query = {};
  let sort = {};
  body.name ? query.name = new RegExp(`${body.name}`, 'i') : '';
  body.sku ? query.sku = new RegExp(`${body.sku}`, 'i') : '';
  body.category ? query.category = body.category : '';
  body.price ? query.price = { $gte: body.price.minPrice, $lte: body.price.maxPrice } : '';
  body.maker ? query.maker = body.maker : '';
  body.sort ? (body.sort === 'ASC' ? sort = { price: 1 } : sort = { price: -1 }) : { sku: 1 };
  try {
    const products = await Product.find(query).skip(skip).limit(limit).sort(sort);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error });
  }
};