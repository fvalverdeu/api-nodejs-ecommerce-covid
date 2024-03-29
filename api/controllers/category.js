const mongoose = require("mongoose");
const Category = require("../models/category");

exports.getAll = (req, res, next) => {
    Category.find()
        .exec()
        .then(docs => {
            res.status(200).json(docs)
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
};

exports.create = (req, res, next) => {
      const category = new Category({
        _id: mongoose.Types.ObjectId(),
        title: req.body.title,
        parent: req.body.parent,
        path: req.body.path,
        status: 'ACTIVE'
      });
      category.save()
        .then(result => {
            res.status(201).json(result);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
};

exports.get = (req, res, next) => {
  Category.findById(req.params.id)
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
        title: req.body.title,
        parent: req.body.parent,
        path: req.body.path
    };
    Category.findOneAndUpdate({ _id: _id }, { $set: body }, {new: true})
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
    Category.deleteOne({ _id: _id })
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

exports.getMain = (req, res, next) => {
  console.log('main')
  Category.find({parent: ""})
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
  const skip = parseInt(req.params.skip);
  const limit= parseInt(req.params.limit);
  const body = req.body;
  console.log(body)
  let query = {};
  body.title ? query.title = new RegExp(`${body.title}`,'i') : '';
  body.parent ? query.parent = body.parent : '';
  body.status ? query.status = body.status : '';
  Category.find(query)
      .skip(skip)
      .limit(limit)
      .exec()
      .then(docs => {
          // console.log('other', docs)
          res.status(200).json(docs)
      })
      .catch(err => {
          res.status(500).json({ error: err });
      });
};