const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require('../models/user');

exports.user_signup = (req, res, next) =>{
    console.log(req.body)
    User.find({ email: req.body.email})
        .exec()
        .then(user=>{
            if(user.length >= 1){
                return res.status(409).json({
                    message: "Mail exists"
                });
            } else{
                bcrypt.hash(req.body.password, 10, (err, hash) =>{
                    if(err){
                        return res.status(500).json({ error: err});
                    }else{
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash,
                            fName: req.body.fName,
                            lName: req.body.lName,
                            mobileNumber: req.body.mobileNumber
                        });
                        user
                            .save()
                            .then(result=>{
                                console.log(result);
                                res.status(201).json({ message: "User created successfully."});
                            })
                            .catch(err=>{
                                console.log(err);
                                res.status(500).json({ error: err});
                            })
                    }
                })
            }
        })
}
