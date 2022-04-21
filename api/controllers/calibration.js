const mongoose = require("mongoose");
const Calibration = require("../models/calibration");

exports.getAll = (req, res, next) => {
    Calibration.find()
        .exec()
        .then(docs => {
            res.status(200).json(docs)
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
};

exports.create = (req, res, next) => {
      const calibration = new Calibration({
        _id: mongoose.Types.ObjectId(),
        value: req.body.value,
        date: req.body.date,
        user: req.body.user,
      });
      calibration.save()
        .then(result => {
            res.status(201).json(result);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
};

exports.get = (req, res, next) => {
  Calibration.findById(req.params.id)
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

exports.getFilterByDate = (req, res, next) => {
  const body = req.body;
  let query = {};
  let sort = {date: 1};
  body.date ? query.date = {$gte: new Date(body.date.min),$lt: new Date(body.date.max)} : '';
  Calibration.find(query)
      .sort(sort)
      .exec()
      .then(docs => {
          res.status(200).json(docs)
      })
      .catch(err => {
          res.status(500).json({ error: err });
      });
};