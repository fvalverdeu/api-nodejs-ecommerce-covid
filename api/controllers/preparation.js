const mongoose = require("mongoose");
const Preparation = require("../models/preparation");

exports.getAll = (req, res, next) => {
    Preparation.find()
        .exec()
        .then(docs => {
            res.status(200).json(docs)
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
};

exports.create = (req, res, next) => {
      const preparation = new Preparation({
        _id: mongoose.Types.ObjectId(),
        description: req.body.description,
        min: req.body.min,
        max: req.body.max,
      });
      preparation.save()
        .then(result => {
            res.status(201).json(result);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
};

exports.get = (req, res, next) => {
  Preparation.findById(req.params.id)
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
        description: req.body.description,
        min: req.body.min,
        max: req.body.max,
    };
    Preparation.findOneAndUpdate({ _id: _id }, { $set: body }, {new: true})
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
    Preparation.deleteOne({ _id: _id })
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

