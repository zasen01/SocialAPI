const {User} = require('../models');

const userController = {
    // get all Users
    getAllUsers(req, res) {
      User.find({})
        .select('-__v')
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
          console.log(err);
          res.sendStatus(400);
        });
    },
  
    // get one user by id
    getUserById({ params }, res) {
      User.findOne({ _id: params.id })
        .populate({
          path: 'thoughts',
          select: '-__v'
        })
        .populate({
            path: 'friends',
            select: '-__v'
          })
        .select('-__v')
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
          console.log(err);
          res.sendStatus(400);
        });
    },
  
    // createUser
    createUser({ body }, res) {
      User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    },
    addFriend(req,res){
        User.findOneAndUpdate(
            {_id:req.params.userId},
            {$addToSet:{friends:req.params.friendId}},
            {new:true}
        ).then(updatedUser => {
            if(!updatedUser)
            {res.json({msg:'User not Found'})}
            res.json({msg:"Added Friend ", data:updatedUser})

        })
        .catch(err => {
            console.log(err)
            res.sendStatus(400);
        })
    },
    removeFriend(req,res){
        User.findOneAndUpdate(
            {_id:req.params.userId},
            {$pull:{friends:req.params.friendId}},
            {new:true}
        ).then(updatedUser => {
            if(!updatedUser)
            {res.json({msg:'User not Found'})}
            res.json({msg:"Removed Friend ", data:updatedUser})

        })
        .catch(err => {
            console.log(err)
            res.sendStatus(400);
        })
    },
    updateUser({ body,params }, res) {
      User.findOneAndUpdate(
        {
          _id:params.id,
        },
        {
          $set:body
        },
        {
          runValidators:true,
          new:true
        }
      )
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    },
    deleteUser({params},res){
      User.findOneAndDelete({
        _id:params.id
      }).then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    }
    

  };

  module.exports = userController;