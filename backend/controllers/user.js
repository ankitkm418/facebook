const User = require('../models/user');
const bcrypt = require('bcrypt');



exports.update_user_details = (req, res, next) => {
    User.find({ _id: req.params.id })
        .exec()
        .then(async user => {
            console.log(user);
            if (user.length >= 1) {
                if (req.body.password) {
                    try {
                        req.body.password = await bcrypt.hash(req.body.password, 10);
                    } catch (err) {
                        return res.status(500).json(err);
                    }
                }
                User.findByIdAndUpdate({_id: req.params.id}, { $set: req.body })
                    .exec()
                    .then(result => {
                        res.status(200).json({
                            message: "User details updated",
                            post: req.body,
                            body: result,
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

            } else {
                return res.status(409).json({
                    message: "Mail not exists."
                });
            }
        })
}