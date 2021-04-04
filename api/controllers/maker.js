const { Maker } = require('../models');

exports.getAll = async (req, res) => {
  try {
    const makers = await Maker.find();
    res.status(200).json(makers);
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.create = async (req, res) => {
  try {
    const maker = await Maker.create({
      name: req.body.name,
      document: req.body.document,
    });
    res.status(201).json(maker);
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.get = async (req, res) => {
  try {
    const maker = await Maker.findById(req.params.id);
    if (!maker) {
      return res.status(404).json({ message: 'Not found' });
    }
    res.status(200).json(maker);
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.update = async (req, res) => {
  const _id = req.params.id;
  try {
    const dataMaker = {
      name: req.body.name,
      document: req.body.document,
    };
    const maker = await Maker.findOneAndUpdate({ _id, }, dataMaker, { new: true });
    res.status(200).json(maker);
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.delete = async (req, res) => {
  const _id = req.params.id;
  try {
    const maker = await Maker.deleteOne({ _id });
    res.status(200).json({ _id });
  } catch (error) {
    res.status(500).json({ error });
  }
};
