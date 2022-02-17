const mongoose = require("mongoose");
const Logger = require("../models/logger");

exports.getAll = (req, res, next) => {
    Logger.find()
        .exec()
        .then(docs => {
            res.status(200).json(docs)
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
};

exports.create = (req, res, next) => {
      const logger = new Logger({
        _id: mongoose.Types.ObjectId(),
        date: req.body.date,
        description: req.body.description,
      });
      logger.save()
        .then(result => {
            res.status(201).json(result);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
};

exports.get = (req, res, next) => {
  Logger.findById(req.params.id)
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

exports.delete = (req, res, next) => {
  const _id = req.params.id;
  Logger.deleteOne({ _id: _id })
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
