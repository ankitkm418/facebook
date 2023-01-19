const Post = require("../models/posts");

exports.create_post = (req, res, next) => {
    const post = new Post(req.body);
    post
      .save()
      .then(result => {
        console.log(result);
        res.status(201).json({
          message: "Created product successfully",
          createdProduct: {
           post,
            request: {
              type: "GET",
              url: "http://localhost:3000/products/" + result._id
            }
          }
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  };