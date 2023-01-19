const bcrypt = require('bcrypt');

const User = require('../models/user');
const jwt = require("jsonwebtoken");

exports.user_signup = (req, res, next) => {
  console.log("signup", req.body)
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "Mail exists"
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({ error: err });
          } else {
            const user = new User({
              username: req.body.username,
              email: req.body.email,
              password: hash,
            });
            user
              .save()
              .then(result => {
                console.log("RESULT", result);
                res.status(201).json({ message: "User created successfully." });
              })
              .catch(err => {
                console.log("Errors", err);
                res.status(500).json({ error: err });
              })
          }
        })
      }
    })
}


exports.user_login = (req, res, next) => {
  const user = User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Auth failed"
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: user[0].email,
              userId: user[0]._id
            },
            "process.env.JWT_KEY",
            {
              expiresIn: "1h"
            }
          );
          return res.status(200).json({
            message: "Auth successful",
            token: token,
            user: user
          });
        }
        res.status(401).json({
          message: "Auth failed"
        });
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};


// exports.user_delete = (req, res, next) => {
//   console.log(req.params)
//   User.remove({ _id: req.params.id })
//     .exec()
//     .then(result => {
//       res.status(200).json({ message: "User deleted Successfully" });
//     })
//     .catch(err => {
//       res.status(500).json({ error: err });
//     })
// }

// exports.user_pwd_reset = (req, res, next) => {
//   console.log(req.body)
//   User.find({ email: req.body.email })
//     .exec()
//     .then(user => {
//       console.log(user)
//       if (user.length < 1) {
//         return res.status(401).json({ message: "User does not exist" });
//       }
//       res.status(200).json({ "Your password is :- ": user[0].passwordKey })
//     })
// }


