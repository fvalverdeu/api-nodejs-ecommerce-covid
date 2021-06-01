const mongoose = require("mongoose");
const Maker = require("../models/maker");

exports.getAll = (req, res, next) => {
    console.log(Maker)
    Maker.find()
        .exec()
        .then(docs => {
            console.log('maker list', docs)
            res.status(200).json(docs)
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
};

exports.create = (req, res, next) => {
      const maker = new Maker({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        document: req.body.document,
        status: 'ACTIVE'
      });
      maker.save()
        .then(result => {
            res.status(201).json(result);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
};

exports.get = (req, res, next) => {
  Maker.findById(req.params.id)
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
        name: req.body.name,
        document: req.body.document,
    };
    Maker.findOneAndUpdate({ _id: _id }, { $set: body }, {new: true})
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
    Maker.deleteOne({ _id: _id })
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

exports.getAllPaginate = (req, res, next) => {
  const skip = parseInt(req.params.skip);
  const limit= parseInt(req.params.limit);
  const body = req.body;
  console.log(body)
  let query = {};
  body.name ? query.name = new RegExp(`${body.name}`,'i') : '';
  body.document ? query.document = new RegExp(`${body.document}`,'i') : '';
  body.status ? query.status = body.status : '';
  Maker.find(query)
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
