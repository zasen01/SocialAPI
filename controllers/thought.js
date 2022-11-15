const {Thought, User} = require('../models');

const thoughtController = {
    // get all thoughts
    getAllThoughts(req, res) {
      Thought.find({})
        .select('-__v')
        .sort({ createdAt: -1 })
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
          console.log(err);
          res.sendStatus(400);
        });
    },
  
    // get one thought by id
    getThoughtById({ params }, res) {
      Thought.findOne({ _id: params.id })
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
          console.log(err);
          res.sendStatus(400);
        });
    },
  
    // createThought
    createThought({ body }, res) {
      Thought.create(body)
       .then(dbThoughtData => {
        return User.findOneAndUpdate(
            {_id: body.userId},
            {$push:{thoughts:dbThoughtData._id}},
            {new:true}
        )
        .then(dbUserData => {
            if(!dbUserData){
                console.log('User Id does not exist');
                res.sendStatus(400);
            }
            res.json({msg:"Thought created Sucessfully"})
        })
       }).catch(err => {
        console.log(err);
        res.sendStatus(400);
       })
    }

  };

  module.exports = thoughtController;