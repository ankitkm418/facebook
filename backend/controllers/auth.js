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
          const accessToken = generateAccessToken(user);
          const refreshToken = generateRefreshToken(user);
          refreshTokens.push(refreshToken);
          return res.status(200).json({
            message: "Auth successful",
            access_token: accessToken,
            refresh_Token: refreshToken,
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


let refreshTokens = [];

exports.api_refresh = (req, res, next) => {
  //take the refresh token from the user
  const refreshToken = req.body.token;

  //send error if there is no token or it's invalid
  if (!refreshToken) return res.status(401).json("You are not authenticated!");
  if (!refreshTokens.includes(refreshToken)) {
    return res.status(403).json("Refresh token is not valid!");
  }
  jwt.verify(refreshToken, process.env.JWT_KEY, (err, user) => {
    err && console.log(err);
    refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);

    refreshTokens.push(newRefreshToken);

    res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  });

  //if everything is ok, create new access token, refresh token and send to user
}

const generateAccessToken = (user) => {
  console.log(user);
  return jwt.sign({ id: user.userId, isAdmin: user.isAdmin }, process.env.JWT_KEY, {
    expiresIn: "1m",
  });
};

const generateRefreshToken = (user) => {
  return jwt.sign({ id: user.userId, isAdmin: user.isAdmin }, process.env.JWT_KEY);
};