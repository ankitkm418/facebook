const Post = require("../models/posts");
const User = require("../models/user");


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

exports.update_posts = async (req, res, next) => {
    const post = await Post.findById(req.params.id);
   console.log(post.userId, req.body.userId)
   if(post.userId === req.body.userId){
    Post.updateOne({ $set: req.body })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Post updated",
        post: result,
        request: {
          type: "GET",
          url: "http://localhost:3000/products/" 
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
   }else{
    res.status(403).json("you can update only your post");
   }
    
};


exports.get_all_posts = (req, res, next) => {
    Post.find()
      .exec()
      .then(docs => {
        const response = {
          count: docs.length,
          products: docs.map(doc => {
            return {
              post: doc,
              request: {
                type: "GET",
                url: "http://localhost:3000/products/" + doc._id
              }
            };
          })
        };
        res.status(200).json(response);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
};



exports.delete_post = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      res.status(200).json("the post has been deleted");
    } else {
      res.status(403).json("you can delete only your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
    
};


exports.update_post_like = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post.likes.includes(req.body.userId)) {
          await post.updateOne({ $push: { likes: req.body.userId } });
          res.status(200).json("The post has been liked");
        } else {
          await post.updateOne({ $pull: { likes: req.body.userId } });
          res.status(200).json("The post has been disliked");
        }
      } catch (err) {
        res.status(500).json(err);
      }
};


exports.get_single_post = (req, res, next) => {
    const id = req.params.id;
    Post.findById(id)
      .exec()
      .then(doc => {
        console.log("From database", doc);
        if (doc) {
          res.status(200).json({
            post: doc,
            request: {
              type: "GET",
              url: "http://localhost:3000/products"
            }
          });
        } else {
          res
            .status(404)
            .json({ message: "No valid entry found for provided ID" });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
      });
};


exports.get_timeline_post = async (req, res, next) => {
try {
  const currentUser = await User.findById(req.body.userId);
  const userPosts = await Post.find({ userId: currentUser._id });
  const friendPosts = await Promise.all(
    currentUser.followings.map((friendId) => {
      return Post.find({ userId: friendId });
    })
  );
  res.json(userPosts.concat(...friendPosts))
} catch (err) {
  res.status(500).json(err);
}

}