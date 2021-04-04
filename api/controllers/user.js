const { User } = require('../models');

exports.getAll = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.create = async (req, res) => {
  try {
    const user = await User.create({
      email: req.body.email,
      password: req.body.password,
      rol: req.body.rol,
      name: req.body.name,
      lastname: req.body.lastname,
      document: req.body.document,
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.get = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.update = async (req, res) => {
  const _id = req.params.id;
  try {
    const dataUser = {
      email: req.body.email,
      name: req.body.name,
      lastname: req.body.lastname,
      rol: req.body.rol,
      document: req.body.document,
    };
    const user = await User.findOneAndUpdate({ _id, }, dataUser, { new: true });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.delete = async (req, res) => {
  const _id = req.params.id;
  try {
    const user = await User.deleteOne({ _id });
    res.status(200).json({ _id });
  } catch (error) {
    res.status(500).json({ error });
  }
};
