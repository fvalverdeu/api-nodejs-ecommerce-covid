const { Category } = require('../models');

exports.getAll = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.create = async (req, res) => {
  try {
    const category = await Category.create({
      title: req.body.title,
      parent: req.body.parent,
      path: req.body.path,
    });
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.get = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Not found' });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.update = async (req, res) => {
  const _id = req.params.id;
  try {
    const dataCategory = {
      title: req.body.title,
      parent: req.body.parent,
      path: req.body.path,
    };
    const category = await Category.findOneAndUpdate({ _id, }, dataCategory, { new: true });
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.delete = async (req, res) => {
  const _id = req.params.id;
  try {
    const category = await Category.deleteOne({ _id });
    res.status(200).json({ _id });
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.getMain = async (req, res) => {
  try {
    const categories = await Category.find({ parent: '' });
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error });
  }
};
