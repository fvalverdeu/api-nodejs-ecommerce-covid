const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

exports.signUp = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({
        message: `El correo ${email} se encuetra registrado`,
      });
    }
    const hashPass = await bcrypt.hash(req.body.password, 10);
    const newUser = await User.create({
      email: req.body.email,
      password: hashPass,
      name: req.body.name,
      lastname: req.body.lastname,
      document: req.body.document,
    });
    res.status(201).json({
      message: 'Usuario creado correctamente. Por favor inicie sesión',
  });
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: `El correo ${email} no se encuetra registrado`,
      });
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(404).json({
        message: 'La contraseña ingresada es incorrecta',
      });
    }
    const payload = {
      id: user._id,
      email: user.email,
      name: user.name,
      lastname: user.lastname,
      rol: user.rol,
    };
    const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '1h'});
    return res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error });
  }
};
