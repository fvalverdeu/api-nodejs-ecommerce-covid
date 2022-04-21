const mongoose = require("mongoose");
const Temperature = require("../models/temperature");

exports.getAll = (req, res, next) => {
    Temperature.find()
        .exec()
        .then(docs => {
            res.status(200).json(docs)
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
};

exports.create = (req, res, next) => {
      const temperature = new Temperature({
        _id: mongoose.Types.ObjectId(),
        preparation: req.body.preparation,
        value: req.body.value,
        date: req.body.date,
        user: req.body.user,
        observation: req.body.observation,
        place: req.body.place
      });
      temperature.save()
        .then(result => {
            res.status(201).json(result);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
};

exports.get = (req, res, next) => {
  Temperature.findById(req.params.id)
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
  Temperature.find(query)
      .sort(sort)
      .exec()
      .then(docs => {
          res.status(200).json(docs)
      })
      .catch(err => {
          res.status(500).json({ error: err });
      });
};