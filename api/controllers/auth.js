const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.signUp = (req, res, next) => {
    const { email } = req.body;
    User.find({ email })
      .exec()
      .then(user => {
        if (user.length >= 1) {
          return res.status(409).json({
            message: `El correo ${ email } se encuetra registrado`
          });
        } else {
          bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
              return res.status(500).json({error: err, message: 'Error Interno', code: 101});
            } else {
              const user = new User({
                _id: new mongoose.Types.ObjectId(),
                email: req.body.email,
                password: hash,
                name: req.body.name,
                lastname: req.body.lastname,
                document: req.body.document
              });
              user
                .save()
                .then(result => {
                    res.status(201).json({
                        message: "Usuario creado correctamente, porfavor inicie sesión"
                    });
                })
                .catch(err => {
                  res.status(500).json({error: err, message: 'Error Interno', code: 102});
                });
            }
          });
        }
      });
};

exports.signIn = (req, res, next) => {
    const { email } = req.body;
    User.find({ email })
      .exec()
      .then(user => {
        if (user.length < 1) {
          return res.status(404).json({
            message: `El correo ${ email } no se encuetra registrado`
        });
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
          console.log(user[0].password);
          if (err) {
            return res.status(500).json({
              message: "Error Interno, en la validación de la contraseña"
            });
          }
          if (result) {
            const payload = {
              email: user[0].email,
              id: user[0]._id,
              name: user[0].name,
              lastname: user[0].lastname,
              rol: user[0].rol
            };
            const token = jwt.sign(
              payload,
              process.env.JWT_KEY,
              { expiresIn: "5h"}
            );
            return res.status(200).json({
              token: token
            });
          }
          res.status(404).json({
            message: "La contraseña ingresada es incorrecta"
          });
        });
      })
      .catch(err => {
        res.status(500).json({
            message: 'Error Interno',
            error: err,
            code: 201
        });
      });
};
