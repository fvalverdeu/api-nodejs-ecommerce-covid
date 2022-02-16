const mongoose = require("mongoose");
const Minew = require("../models/minew");

exports.getAll = (req, res, next) => {
    Minew.find()
        .exec()
        .then(docs => {
            res.status(200).json(docs)
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
};

exports.create = (req, res, next) => {
      const minew = new Minew({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        mac: req.body.mac,
        description: req.body.description,
      });
      minew.save()
        .then(result => {
            res.status(201).json(result);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
};

exports.get = (req, res, next) => {
  Minew.findById(req.params.id)
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
